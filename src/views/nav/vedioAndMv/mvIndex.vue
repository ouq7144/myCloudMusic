<template>
    <div class="contain">
        <!-- 菜单 -->
        <div class="nav">
            <div v-for="item in navList" :key="item.index" class="nav_item"
                :style="{ borderBottom: 1 == item.index ? `2px solid ${gettheme}` : '0', fontWeight: 1 == item.index ? 'bold' : 'unset', fontSize: 1 == item.index ? '20px' : '16px' }"
                @click="clickNav(item.index)">
                {{ item.label }}
            </div>
        </div>
        <!-- 内容区域 -->
        <div class="contains">
            <div class="box">
                <!-- 最新MV -->
                <div class="new_mv_box">
                    <div class="nav">
                        <div class="nav_title">
                            <span @click="openMvList">最新MV</span>
                        </div>
                        <div class="nav_tag">
                            <div v-for="(item, index) in listTags" :key="index" class="nav_item"
                                :style="{ color: index == curTag ? gettheme : '#676767', backgroundColor: index == curTag ? colorRGB : 'unset' }"
                                :class="{ nav_item_active: index == curTag }" @click="navChange(index)">
                                <span>{{ item }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="new_mv_list">
                        <div v-for="item in newMvList" :key="item.id" class="mv_item">
                            <el-image :src="item.cover" lazy fit="cover" class="mv_pic" @click="playMv(item.id)">
                                <div slot="placeholder">
                                    <el-image :src="require('@/assets/loading.gif')" class="mv_pic" fit="cover">
                                    </el-image>
                                </div>
                            </el-image>
                            <div class="mv_name">
                                <span @click="playMv(item.id)">{{ item.name }}</span>
                            </div>
                            <div class="mv_creator">
                                <span class="artist" v-for="(jtem, index) in item.artists" :key="jtem.id"
                                    :class="{ has_margin: index !== 0 }">{{ jtem.name }} {{
                                            index === item.artists.length - 1 ?
                                                '' : '/'
                                    }}</span>
                            </div>
                            <div class="mv_play_count">
                                <span>▷{{ filterPlayCount(item.playCount) }}</span>
                            </div>
                        </div>
                        <div class="empty_box"></div>
                        <div class="empty_box"></div>
                    </div>
                </div>
                <!-- 热播MV -->
                <div class="hot_mv_list">
                    <div class="list_title">
                        <span @click="openMvList">热播MV</span>
                    </div>
                    <div class="list_box">
                        <div v-for="item in hotMvList" :key="item.id" class="list_item">
                            <el-image :src="item.cover" lazy fit="cover" class="item_pic" @click="playMv(item.id)">
                                <div slot="placeholder">
                                    <el-image :src="require('@/assets/loading.gif')" class="item_pic" fit="cover">
                                    </el-image>
                                </div>
                            </el-image>
                            <div class="mv_name">
                                <span @click="playMv(item.id)">{{ item.name }}</span>
                            </div>
                            <div class="mv_creator">
                                <span class="artist" v-for="(jtem, index) in item.artists" :key="jtem.id"
                                    :class="{ has_margin: index !== 0 }">{{ jtem.name }} {{
                                            index === item.artists.length - 1 ?
                                                '' : '/'
                                    }}</span>
                            </div>
                            <div class="mv_play_count">
                                <span>▷{{ filterPlayCount(item.playCount) }}</span>
                            </div>
                        </div>
                        <div class="empty_box"></div>
                        <div class="empty_box"></div>
                    </div>
                </div>
                <!-- 网易出品MV -->
                <div class="wy_mv_list">
                    <div class="list_title">
                        <span @click="openMvList">网易出品</span>
                    </div>
                    <div class="list_box">
                        <div v-for="item in wangyiMvList" :key="item.id" class="list_item">
                            <el-image :src="item.cover" lazy fit="cover" class="item_pic" @click="playMv(item.id)">
                                <div slot="placeholder">
                                    <el-image :src="require('@/assets/loading.gif')" class="item_pic" fit="cover">
                                    </el-image>
                                </div>
                            </el-image>
                            <div class="mv_name">
                                <span @click="playMv(item.id)">{{ item.name }}</span>
                            </div>
                            <div class="mv_creator">
                                <span class="artist" v-for="(jtem, index) in item.artists" :key="jtem.id"
                                    :class="{ has_margin: index !== 0 }">{{ jtem.name }} {{
                                            index === item.artists.length - 1 ?
                                                '' : '/'
                                    }}</span>
                            </div>
                            <div class="mv_play_count">
                                <span>▷{{ filterPlayCount(item.playCount) }}</span>
                            </div>
                        </div>
                        <div class="empty_box"></div>
                        <div class="empty_box"></div>
                    </div>
                </div>
                <!-- MV排行榜 -->
                <div class="mv_rank_box">
                    <div class="mv_rank_nav">
                        <div class="mv_rank_title">
                            <span @click="openMvList">MV排行榜</span>
                        </div>
                        <div class="mv_rank_nav_box">
                            <div v-for="(item, index) in listTags" :key="index" class="nav_item"
                                :style="{ color: index == curMvRankTag ? gettheme : '#676767', backgroundColor: index == curMvRankTag ? colorRGB : 'unset' }"
                                :class="{ nav_item_active: index == curTag }" @click="mvRankTagChange(index)">
                                <span>{{ item }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mv_rank_list">
                        <div v-for="(item, index) in mvRankList" :key="item.id" class="mv_rank_item">
                            <div class="mv_rank_item_index">
                                <span>{{ index + 1 < 10 ? `0${index + 1}` : index + 1 }}</span>
                            </div>
                            <div class="mv_rank_item_pic_box">
                                <el-image :src="item.cover" lazy fit="cover" class="mv_rank_item_pic"
                                    @click="playMv(item.id)">
                                    <div slot="placeholder">
                                        <el-image :src="require('@/assets/loading.gif')" class="mv_rank_item_pic"
                                            fit="cover"></el-image>
                                    </div>
                                </el-image>
                                <div class="mv_rank_item_score">
                                    <span>{{ item.score }}</span>
                                </div>
                            </div>
                            <div class="mv_rank_item_info">
                                <div class="mv_rank_item_name">
                                    <span @click="playMv(item.id)">{{ item.name }}</span>
                                </div>
                                <div class="mv_rank_item_creator">
                                    <span class="artist" v-for="(jtem, index) in item.artists" :key="jtem.id"
                                        :class="{ has_margin: index !== 0 }">
                                        {{ jtem.name }}
                                        {{ index === item.artists.length - 1 ? '' : '/' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
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
const listTags = [
    '内地',
    '港台',
    '欧美',
    '日本',
    '韩国'
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
            newMvList: [], // mv列表
            listTags, // 标签列表
            curTag: 0, // 最新MV分类标签
            colorRGB: '', // 当前主题颜色
            colorList, // 主题列表
            hotMvList: [], // 最热MV列表
            wangyiMvList: [], // 网易出品MV列表
            mvRankList: [], // MV排行榜
            curMvRankTag: 0 // MV排行榜标签
        }
    },
    created() {
        // 获取最新MV
        this.getNewMvs()
        // 获取主题颜色RGB格式
        this.getColorRGB()
        // 获取热播MV
        this.getHotMvs()
        // 获取网易出品MV
        this.getWangYiMvs()
        // 获取MV排行榜
        this.getMvRankList()
    },
    watch: {
        gettheme() {
            // 获取主题颜色RGB格式
            this.getColorRGB()
        }
    },
    computed: {
        ...mapGetters(['gettheme'])
    },
    methods: {
        clickNav(index) {
            this.$router.push({path: `${this.navList[index].path}`})
        },
        // 获取最新MV
        getNewMvs(area) {
            area = typeof area !== 'undefined' ? area : '内地'
            axios.get(`/mv/first?limit=8&area=${area}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.newMvList = res.data.data
                } else {
                    this.$meesage('获取最新MV失败，原因为：网络拥挤，请稍后再试')
                }
            })
        },
        // 获取热播MV
        getHotMvs() {
            axios.get(`/mv/all?order=最热&limit=8`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.hotMvList = res.data.data
                } else {
                    this.$meesage('获取热播MV失败，原因为：网络拥挤，请稍后再试')
                }
            })
        },
        // 获取网易出品MV
        getWangYiMvs() {
            axios.get(`/mv/exclusive/rcmd?limit=8`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.wangyiMvList = res.data.data
                } else {
                    this.$meesage('获取网易出品MV失败，原因为：网络拥挤，请稍后再试')
                }
            })
        },
        // 获取MV排行榜
        getMvRankList(area) {
            area = typeof area !== 'undefined' ? area : '内地'
            axios.get(`/top/mv?limit=10&area=${area}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.mvRankList = res.data.data
                } else {
                    this.$meesage('获取MV排行榜失败，原因为：网络拥挤，请稍后再试')
                }
            })
        },
        // 打开全部MV
        openMvList() {
            this.$emit('openMvList')
        },
        // 筛选MV类型
        navChange(index) {
            this.curTag = index
            this.getNewMvs(this.listTags[index])
        },
        // 筛选MV排行榜类型
        mvRankTagChange(index) {
            this.curMvRankTag = index
            this.getMvRankList(this.listTags[index])
        },
        // 播放MV
        playMv(id) {
            this.$router.push({path: `/mvPage?id=${id}`})
        },
        // 播放次数格式化
        filterPlayCount(playCount) {
            if (playCount < 10000) {
                return playCount
            } else if (playCount >= 10000 && playCount < 100000000) {
                return (Math.floor(playCount / 1000) / 10) + '万'
            } else if (playCount >= 100000000) {
                return (Math.floor(playCount / 10000) / 10000) + '亿'
            }
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
    overflow: auto;

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
            .new_mv_box {
                .nav {
                    padding: 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
        
                    .nav_title {
                        font-weight: bold;
                        cursor: pointer;
                    }
        
                    .nav_tag {
                        display: flex;
        
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
                }
        
                .new_mv_list {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
        
                    .mv_item {
                        padding: 10px 0;
                        position: relative;
        
                        .mv_pic {
                            width: 260px;
                            height: 145px;
                            border-radius: 4px;
                            cursor: pointer;
                        }
        
                        .mv_name {
                            font-size: 14px;
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
        
                        .mv_creator {
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
        
                            .has_margin {
                                margin-left: 5px;
                            }
                        }
        
                        .mv_play_count {
                            font-size: 12px;
                            color: #fff;
                            position: absolute;
                            top: 15px;
                            right: 5px;
                        }
                    }
        
                    .empty_box {
                        width: 260px;
                        height: 0;
                        padding: 15px;
                    }
                }
            }
        
            .hot_mv_list {
                .list_title {
                    font-weight: bold;
                    cursor: pointer;
                    padding-bottom: 20px;
                }
        
                .list_box {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
        
                    .list_item {
                        padding: 10px 0;
                        position: relative;
        
                        .item_pic {
                            width: 260px;
                            height: 145px;
                            border-radius: 4px;
                            cursor: pointer;
                        }
        
                        .mv_name {
                            font-size: 14px;
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
        
                        .mv_creator {
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
        
                            .has_margin {
                                margin-left: 5px;
                            }
                        }
        
                        .mv_play_count {
                            font-size: 12px;
                            color: #fff;
                            position: absolute;
                            top: 15px;
                            right: 5px;
                        }
                    }
        
                    .empty_box {
                        width: 260px;
                        height: 0;
                        padding: 15px;
                    }
                }
            }
        
            .wy_mv_list {
                .list_title {
                    font-weight: bold;
                    cursor: pointer;
                    padding-bottom: 20px;
                }
        
                .list_box {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
        
                    .list_item {
                        padding: 10px 0;
                        position: relative;
        
                        .item_pic {
                            width: 260px;
                            height: 145px;
                            border-radius: 4px;
                            cursor: pointer;
                        }
        
                        .mv_name {
                            font-size: 14px;
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
        
                        .mv_creator {
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
        
                            .has_margin {
                                margin-left: 5px;
                            }
                        }
        
                        .mv_play_count {
                            font-size: 12px;
                            color: #fff;
                            position: absolute;
                            top: 15px;
                            right: 5px;
                        }
                    }
        
                    .empty_box {
                        width: 260px;
                        height: 0;
                        padding: 15px;
                    }
                }
            }
        
            .mv_rank_box {
                .mv_rank_nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
        
                    .mv_rank_title {
                        font-weight: bold;
                        cursor: pointer;
                    }
        
                    .mv_rank_nav_box {
                        display: flex;
        
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
                }
        
                .mv_rank_list {
                    display: flex;
                    flex-wrap: wrap;
        
                    .mv_rank_item {
                        width: 50%;
                        padding: 20px 0;
                        display: flex;
        
                        .mv_rank_item_index {
                            display: flex;
                            align-items: center;
                            padding-right: 5px;
                            font-size: 18px;
                            font-family: 'Courier New';
                            Letter-spacing: 1px;
                            color: rgb(159, 159, 159);
                        }
        
                        .mv_rank_item_pic_box {
                            position: relative;
        
                            .mv_rank_item_pic {
                                width: 170px;
                                height: 90px;
                                border-radius: 4px;
                                cursor: pointer;
                            }
        
                            .mv_rank_item_score {
                                position: absolute;
                                color: #fff;
                                font-size: 12px;
                                right: 5px;
                                top: 5px;
                            }
                        }
        
                        .mv_rank_item_info {
                            padding-left: 10px;
        
                            .mv_rank_item_name {
                                font-size: 14px;
                                color: rgb(55, 55, 55);
                                padding-top: 5px;
                                width: 200px;
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
        
                            .mv_rank_item_creator {
                                font-size: 12px;
                                color: rgb(103, 103, 103);
                                padding-top: 15px;
                                width: 200px;
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
                }
            }
        }
    }
}

</style>