<template>
    <div class="contain">
        <!-- 菜单 -->
        <div class="nav">
            <div v-for="item in navList" :key="item.index" class="nav_item"
                :style="{ borderBottom: 0 == item.index ? `2px solid ${gettheme}` : '0', fontWeight: 0 == item.index ? 'bold' : 'unset', fontSize: 0 == item.index ? '20px' : '16px' }"
                @click="clickNav(item.index)">
                {{ item.label }}
            </div>
        </div>
        <!-- 内容区域 -->
        <div class="contains">
            <div class="box">
                <div class="_nav">
                    <div v-for="(item, index) in videoCategoryList" :key="item.id" class="nav_item"
                        :style="{ color: index == curTag ? gettheme : '#676767', backgroundColor: index == curTag ? colorRGB : 'unset' }"
                        :class="{ nav_item_active: index == curTag }" @click="navChange(item, index)">
                        <span>{{ item.name }}</span>
                    </div>
                </div>
                <div class="vedio_list" v-infinite-scroll="loadMore">
                    <div v-for="item in vedioList" :key="item.data.vid" class="vedio_item" v-if="item.data.coverUrl">
                        <div class="vedio_pic_box">
                            <el-image :src="item.data.coverUrl" lazy fit="cover" class="vedio_pic"
                                @click="playMv(item.data.vid)">
                                <div slot="placeholder">
                                    <el-image :src="require('@/assets/loading.gif')" fit="cover" class="vedio_pic">
                                    </el-image>
                                </div>
                            </el-image>
                            <div class="vedio_play_count">
                                <span>▷{{ util.filterPlayCount(item.data.playTime) }}</span>
                            </div>
                        </div>
                        <div class="vedio_name">
                            <span @click="playMv(item.data.vid)">{{ item.data.title }}</span>
                        </div>
                        <div class="vedio_creator" v-if="item.data.creator">
                            <span>{{ item.data.creator.nickname }}</span>
                        </div>
                    </div>
                    <div class="empty_box"></div>
                    <div class="empty_box"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import util from '@/tools/index'
const navList = [
    {
        label: '视频',
        index: 0,
        path: '/vedioAndMv'
    },
    {
        label: 'MV',
        index: 1,
        path: '/vedioAndMv/mv'
    }
]
const colorList = [
    {
        key: '#ffffff',
        value: 'rgba(255,255,255,.1)'
    },
    {
        key: '#ff5c8a',
        value: 'rgba(255,92,138,.1)'
    },
    {
        key: '#ff7a9e',
        value: 'rgba(255,122,158,.1)'
    },
    {
        key: '#717ff9',
        value: 'rgba(113,127,249,.1)'
    },
    {
        key: '#4791eb',
        value: 'rgba(71,145,235,.1)'
    },
    {
        key: '#39afea',
        value: 'rgba(57,175,234,.1)'
    },
    {
        key: '#2bb669',
        value: 'rgba(43,182,105,.1)'
    },
    {
        key: '#6acc19',
        value: 'rgba(106,204,25,.1)'
    },
    {
        key: '#e2ab12',
        value: 'rgba(226,171,18,.1)'
    },
    {
        key: '#ff8f57',
        value: 'rgba(255,143,87,.1)'
    },
    {
        key: '#fd726d',
        value: 'rgba(253,114,109,.1)'
    },
    {
        key: '#ec4141',
        value: 'rgba(236,65,65,.1)'
    }
]
export default {
    data() {
        return {
            navList,
            vedioList: [], // 视频列表
            hasmore: true,
            offset: -1,
            videoCategoryList: [], // 视频分类列表
            curTag: 0, // 最新MV分类标签
            curId: 58100, // 当前标签的id
            colorRGB: '', // 当前主题颜色
            colorList, // 主题列表
            util,
            timer: undefined, // 用于防抖
            lastTime: undefined // 用于防抖
        }
    },
    computed: {
        ...mapGetters(['gettheme'])
    },
    created() {
        // 获取视频分类列表
        this.getVideoCategoryList()
        // 获取主题颜色RGB格式
        this.getColorRGB()
    },
    watch: {
        gettheme() {
            // 获取主题颜色RGB格式
            this.getColorRGB()
        }
    },
    methods: {
        clickNav(index) {
            this.$router.push({ path: `${this.navList[index].path}` })
        },
        // 获取视频分类列表
        getVideoCategoryList() {
            axios.get(`/video/category/list`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.videoCategoryList = res.data.data
                } else {
                    this.$message(`获取视频分类列表失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 滑动到最底部时执行方法
        loadMore() {
            if (this.hasmore) {
                // this.offset += 18
                // this.getArtistAlbum()
                let that = this
                let now = +new Date();
                if (that.lastTime && that.lastTime - now < 2000) {
                    clearTimeout(that.timer)
                }
                that.timer = setTimeout(function () {
                    that.lastTime = +new Date()
                    that.offset += 1
                    that.getAllVedios()
                }, 500)
            }
        },
        // 筛选视频
        navChange(item, index) {
            this.vedioList = []
            this.offset = 0
            this.curTag = index
            this.curId = item.id
            for (let i = 0; i < 2; i++) {
                this.getAllVedios()
                this.offset += 1
            }
        },
        // 播放视频
        playMv(id) {
            this.$router.push({path: `mvPage?id=${id}`})
        },
        // 获取全部视频
        getAllVedios() {
            axios.get(`/video/group?id=${this.curId}&offset=${this.offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    res.data.datas.forEach(item => {
                        this.vedioList.push(item)
                    })
                    this.hasmore = res.data.hasmore
                } else {
                    this.$message(`获取视频失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 获取主题颜色RGB格式
        getColorRGB() {
            this.colorList.forEach(item => {
                if (this.gettheme == item.key) {
                    this.colorRGB = item.value
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
.contain {
    .nav {
        display: flex;
        align-items: baseline;
        padding: 20px;

        .nav_item {
            margin-right: 20px;
            padding-bottom: 5px;
            color: rgb(55, 55, 55);
            cursor: pointer;
            font-size: 16px;
        }

        .nav_item:hover {
            color: #000;
        }
    }

    .contains {
        display: flex;
        align-items: center;
        flex-direction: column;

        .box {
            width: 1080px;

            ._nav {
                display: flex;
                align-items: baseline;
                .nav_item {
                    font-size: 12px;
                    color: rgb(103, 103, 103);
                    cursor: pointer;
                    padding: 3px 10px;
                    border-radius: 24px;
                }

                .nav_item:hover {
                    color: #000;
                }
            }

            .vedio_list {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;

                .vedio_item {
                    padding: 15px 0;

                    .vedio_pic_box {
                        position: relative;

                        .vedio_pic {
                            width: 260px;
                            height: 150px;
                            border-radius: 4px;
                            cursor: pointer;
                        }

                        .vedio_play_count {
                            position: absolute;
                            top: 5px;
                            right: 5px;
                            color: #fff;
                            font-size: 12px;
                        }
                    }

                    .vedio_name {
                        font-size: 12px;
                        color: rgb(55, 55, 55);
                        margin: 5px 0;
                        width: 260px;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        /* 这里是超出几行省略 */
                        overflow: hidden;

                        span {
                            cursor: pointer;
                        }

                        span:hover {
                            color: #000;
                        }
                    }

                    .vedio_creator {
                        font-size: 12px;
                        color: rgb(103, 103, 103);
                        width: 260px;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        /* 这里是超出几行省略 */
                        overflow: hidden;

                        span {
                            cursor: pointer;
                        }

                        span:hover {
                            color: #000;
                        }
                    }
                }
            }

            .empty_box {
                width: 260px;
                height: 0;
                padding: 15px 0;
            }
        }
    }
}
</style>