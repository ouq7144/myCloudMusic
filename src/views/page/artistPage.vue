<template>
    <div class="box">
        <div class="con">
            <div class="top_area">
                <div class="ar_pic_box">
                    <el-image :src="picUrl" fit="contain" class="ar_pic">
                        <div slot="placeholder">
                            <el-image :src="require('../../assets/loading.gif')" class="ar_pic" fit="cover"></el-image>
                        </div>
                    </el-image>
                </div>
                <div class="ar_info_box">
                    <div class="ar_name">
                        <span>{{ name }}</span>
                    </div>
                    <div class="ar_nickname">
                        <span v-for="item in alias" :key="item">{{ `${item};` }}</span>
                    </div>
                    <div class="btn_group">
                        <div class="ar_btn">
                            <svg t="1661362664451" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2339" width="14" height="14"><path d="M512 720.416l232.096 171.904a19.2 19.2 0 0 0 16.864 2.88c9.536-2.88 14.592-12.224 11.84-20.864l-88.96-281.6 237.344-176.96a16.48 16.48 0 0 0 6.816-13.152c0-9.152-7.904-16.928-18.112-16.96l-292-0.448-88.48-277.12a17.568 17.568 0 0 0-11.776-11.264c-9.856-2.976-20.16 2.304-23.04 11.264l-88.48 277.12-292 0.48a18.624 18.624 0 0 0-14.624 6.944 16.096 16.096 0 0 0 3.328 23.136l237.376 176.96-88.992 281.6a15.904 15.904 0 0 0 2.72 14.688c6.048 7.744 17.856 9.312 25.984 3.296L512 720.416z m-194.016 223.36a83.008 83.008 0 0 1-114.56-15.424 79.904 79.904 0 0 1-13.28-73.28l75.296-238.24-200.864-149.76a80.096 80.096 0 0 1-15.424-113.92 82.624 82.624 0 0 1 64.864-31.456l245.312-0.384 74.304-232.672c13.6-42.56 59.52-66.112 102.56-53.024A81.536 81.536 0 0 1 590.4 88.64l74.304 232.64 245.312 0.416c45.184 0.064 82.08 36.16 82.016 81.024a80.48 80.48 0 0 1-32.576 64.352l-200.864 149.76 75.296 238.24c13.568 42.976-11.072 88.352-54.496 101.408a83.2 83.2 0 0 1-73.344-12.736L512 800.064l-194.016 143.68z" p-id="2340"></path></svg>
                            <span>收藏</span>
                        </div>
                        <!-- <div class="ar_btn" @click="gotoPersonalHomePage()">
                            <svg t="1661362941230" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3403" width="16" height="16"><path d="M922.048 1017.856a25.408 25.408 0 1 1 0-50.88c14.72 0 27.968-6.848 36.416-18.88a46.336 46.336 0 0 0 5.632-42.752 471.104 471.104 0 0 0-294.528-286.656 25.472 25.472 0 0 1 15.744-48.448 522.368 522.368 0 0 1 326.656 318.016c10.688 29.952 6.336 63.232-12.032 89.152-17.92 25.728-46.4 40.448-77.888 40.448zM95.744 1017.856a94.08 94.08 0 0 1-78.016-40.512 97.6 97.6 0 0 1-11.904-89.152 522.24 522.24 0 0 1 326.656-318.016 25.536 25.536 0 0 1 15.808 48.448 470.72 470.72 0 0 0-294.592 286.656 46.272 46.272 0 0 0 5.568 42.752 43.904 43.904 0 0 0 36.416 18.88 25.408 25.408 0 0 1 0.064 50.944z" fill="#4D4D4D" p-id="3404"></path><path d="M508.928 661.632c-182.4 0-330.816-148.416-330.816-330.816S326.528 0 508.928 0c182.4 0 330.752 148.352 330.752 330.752s-148.352 330.88-330.752 330.88z m0-610.752a280.192 280.192 0 0 0-279.936 279.872 280.32 280.32 0 0 0 279.936 280 280.32 280.32 0 0 0 279.872-280A280.32 280.32 0 0 0 508.928 50.88z" fill="#4D4D4D" p-id="3405"></path></svg>
                            <span>个人主页</span>
                        </div> -->
                    </div>
                    <div class="ar_songs_info">
                        <span>单曲数：{{ musicSize }}</span>
                        <span>专辑数：{{ albumSize }}</span>
                    </div>
                </div>
            </div>
            <div class="bottom_area">
                <div class="nav_box">
                    <div v-for="item in navList" :key="item.index" class="nav_item"
                        :style="{ borderBottom: curNavIndex == item.index ? `2px solid ${gettheme}` : '0', fontWeight: curNavIndex == item.index ? 'bold' : 'unset', fontSize: curNavIndex == item.index ? '20px' : '16px' }"
                        @click="navChange(item.index)">{{ item.label }}</div>
                </div>
                <!-- 专辑 -->
                <div class="contains" v-infinite-scroll="load" v-if="curNavIndex == 0">
                    <div v-for="item in hotAlbums" :key="item.id" class="al_item">
                        <div class="al_pic_box">
                            <div class="al_pic_contain" @click="gotoAlbumPage(item.id)">
                                <el-image :src="item.picUrl" cover="fit" lazy class="al_pic">
                                    <div slot="placeholder">
                                        <el-image :src="require('../../assets/loading.gif')" class="ar_pic" fit="cover"></el-image>
                                    </div>
                                </el-image>
                            </div>
                            <common-play-btn-vue class="al_play_btn"></common-play-btn-vue>
                        </div>
                        <div class="al_name">
                            <span>{{ item.name }}</span>
                        </div>
                        <div class=al_publishtime>
                            <span>{{ util.filterDay(item.publishTime) }}</span>
                        </div>
                    </div>
                    <div class="empty_box"></div>
                    <div class="empty_box"></div>
                    <div class="empty_box"></div>
                    <div class="empty_box"></div>
                    <div class="empty_box"></div>
                    <div class="empty_box"></div>
                </div>
                <!-- mv -->
                <div class="contains_mv" v-infinite-scroll="load" v-if="curNavIndex == 1">
                    <div class="no_mv" v-show="mvList.length == 0">
                        <span>没有相关MV</span>
                    </div>
                    <div v-for="item in mvList" :key="item.id" class="mv_item">
                        <div class="mv_pic_box">
                            <div class="mv_pic_contains" @click="playMv(item.id)">
                                <el-image :src="item.imgurl16v9" cover="fit" lazy class="mv_pic">
                                    <div slot="placeholder">
                                        <el-image :src="require('../../assets/loading.gif')" class="mv_pic" fit="cover"></el-image>
                                    </div>
                                </el-image>
                            </div>
                            <div class="mv_play_count">
                                <span>▷{{ util.filterPlayCount(item.playCount) }}</span>
                            </div>
                            <div class="mv_dt">
                                <span>{{ util.filterTime(item.duration) }}</span>
                            </div>
                        </div>
                        <div class="mv_name">
                            <span>{{ item.name }}</span>
                        </div>
                    </div>
                    <div class="empty_box"></div>
                    <div class="empty_box"></div>
                    <div class="empty_box"></div>
                    <div class="empty_box"></div>
                    <div class="empty_box"></div>
                </div>
                <div class="contains_description" v-if="curNavIndex == 2">
                    <div class="des_title">
                        <span>{{ name }}简介</span>
                    </div>
                    <div class="des">
                        <span>{{ briefDesc }}</span>
                    </div>
                    <div v-for="item in introduction" :key="item" style="padding: 20px 0;">
                        <div class="des_title">
                            <span>{{ item.ti }}</span>
                        </div>
                        <div class="des">
                            <span>{{ item.txt }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import util from '@/tools/index'
import commonPlayBtnVue from '@/components/commonPlayBtn.vue'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
const navList = [
    {
		label: '专辑',
		index: 0
	},
	{
		label: 'MV',
		index: 1
	},
	{
		label: '歌手详情',
		index: 2
	}
]
export default {
    components: { commonPlayBtnVue },
    data() {
        return {
            albumSize: 0, // 歌手专辑数量
            musicSize: 0, // 歌手单曲数量
            picUrl: '', // 歌手照片
            name: '', // 歌手名称
            alias: '', // 歌手别名
            briefDesc: '', // 歌手描述
            introduction: '', // 歌手介绍
            simiArtist: [], // 相似歌手
            hotAlbums: [], // 歌手专辑
            mvList: [], // mv
            navList, // 导航栏内容
            curNavIndex: 0, // 当前导航栏index
            offset: -18, // 接口数据偏移量
            more: true, // 是否有更多
            timer: undefined, // 用于防抖
            lastTime: undefined, // 用于防抖
            util
        }
    },
    computed: {
        ...mapGetters(['getuserId', 'getartistId', 'gettheme'])
    },
    methods: {
        ...mapMutations(['setuserId', 'setalbumId']),
        // 前往个人主页
        gotoPersonalHomePage() {
            // 设置vuex中的userId
            this.setuserId({val: this.getuserId})
            // 跳转页面
            this.$router.push({path: 'personalHomePage'})
        },
        // 打开某歌单
        gotoAlbumPage(id) {
            // 跳转页面
            this.$router.push({path: `albumPage?id=${id}`})
        },
        // 播放MV
        playMv(id) {
            this.$emit('playMv', id)
        },
        // 获取歌手专辑
        getArtistAlbum() {
            axios.get(`/artist/album?id=${util.getUrlParam()}&limit=18&offset=${this.offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取歌手专辑')
                    this.albumSize = res.data.artist.albumSize
                    this.musicSize = res.data.artist.musicSize
                    this.alias = res.data.artist.alias
                    this.id = res.data.artist.id
                    this.picUrl = res.data.artist.img1v1Url
                    this.name = res.data.artist.name
                    res.data.hotAlbums.forEach((item) => {
                        this.hotAlbums.push(item)
                    })
                    this.more = res.data.more
                } else {
                    this.$message(`获取歌手专辑失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 获取歌手MV
        getArtistMV() {
            axios.get(`/artist/mv?id=${util.getUrlParam()}&limit=20&offset=${this.offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取歌手MV')
                    res.data.mvs.forEach((item) => {
                        this.mvList.push(item)
                    })
                    this.more = res.data.hasMore
                } else {
                    this.$message(`获取歌手MV失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 获取歌手描述
        getArtistDescription() {
            axios.get(`/artist/desc?id=${util.getUrlParam()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取歌手描述')
                    this.briefDesc = res.data.briefDesc
                    this.introduction = res.data.introduction || []
                } else {
                    this.$message(`获取歌手描述失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 切换
        navChange(index) {
            this.curNavIndex = index
            this.offset = 0
            this.more = true
            if (index == 1) {
                this.getArtistMV()
            } else if (index == 2) {
                this.getArtistDescription()
            }
        },
        // 滑动到最底部时
        load() {
            if (this.curNavIndex == 0) {
                if (this.more) {
                    // this.offset += 18
                    // this.getArtistAlbum()
                    let that = this
                    let now = +new Date();
                    if(that.lastTime && that.lastTime - now < 2000){
                        clearTimeout(that.timer)
                    }
                    that.timer = setTimeout(function () {
                        that.lastTime = +new Date()
                        that.offset += 18
                        that.getArtistAlbum()
                    },500)
                }
            } else if (this.curNavIndex == 1) {
                if (this.more) {
                    let that = this
                    let now = +new Date();
                    if(that.lastTime && that.lastTime - now < 2000){
                        clearTimeout(that.timer)
                    }
                    that.timer = setTimeout(function () {
                        that.lastTime = +new Date()
                        that.offset += 20
                        that.getArtistMV()
                    },500)
                }
            }
        },
    }
}
</script>

<style lang="less" scoped>
.box {
    overflow: auto;
    .con {
        padding: 20px;
        .top_area {
            display: flex;
            .ar_pic_box {
                .ar_pic {
                    width: 180px;
                    height: 180px;
                    border-radius: 4px;
                }
            }
            .ar_info_box {
                display: flex;
                flex-direction: column;
                padding-left: 20px;
                .ar_name {
                    font-size: 22px;
                    font-weight: bold;
                }
                .ar_nickname {
                    font-size: 14px;
                    margin-top: 10px;
                    span {
                        margin-right: 10px;
                    }
                }
                .btn_group {
                    display: flex;
                    margin-top: 10px;
                    .ar_btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid #D9D9D9;
                        padding: 4px 12px;
                        border-radius: 24px;
                        font-size: 14px;
                        cursor: pointer;
                        margin-right: 10px;
                    }
                    .ar_btn:hover {
                        background: rgb(242, 242, 242);
                    }
                }
                .ar_songs_info {
                    font-size: 12px;
                    margin-top: 10px;
                    span {
                        margin-right: 20px;
                    }
                }
            }
        }
        .bottom_area {
            margin-top: 40px;
            .nav_box {
                display: flex;
                align-items: baseline;
                padding: 20px 0;
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
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                .al_item {
                    padding-bottom: 20px;
                    .al_pic_box {
                        position: relative;
                        cursor: pointer;
                        .al_play_btn {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            padding: 5px;
                            transform: translate(-50%, -50%);
                            display: none;
                        }
                        .al_pic_contain {
                            width: 220px;
                            height: 220px;
                            display: flex;
                            align-items: center;
                            border: 1px solid #F2F2F2;
                            .al_pic {
                                width: 100%;
                                height: 100%;
                                border-radius: 4px;
                            }
                        }
                    }
                    .al_pic_box:hover .al_play_btn{
                        display: block;
                    }
                    .al_name {
                        font-size: 14px;
                        margin: 5px 0 10px 0;
                        cursor: pointer;
                        color: rgb(55, 55, 55);
                        width: 220px;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1; /* 这里是超出几行省略 */
                        overflow: hidden;
                    }
                    .al_name:hover {
                        color: #000;
                    }
                    .al_publishtime {
                        font-size: 12px;
                    }
                }
                .empty_box {
                    width: 220px;
                    height: 0;
                    padding-bottom: 20px;
                }
            }
            .contains_mv {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                .no_mv {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 60px;
                    font-size: 12px;
                    color: rgb(103, 103, 103);
                }
                .mv_item {
                    padding-bottom: 20px;
                    .mv_pic_box {
                        position: relative;
                        cursor: pointer;
                        .mv_pic_contains {
                            width: 320px;
                            height: 180px;
                            border: 1px solid #F2F2F2;
                            display: flex;
                            align-items: center;
                            .mv_pic {
                                width: 100%;
                                height: 100%;
                                border-radius: 4px;
                            }
                        }
                        .mv_play_count {
                            position: absolute;
                            top: 5px;
                            right: 10px;
                            color: #fff;
                            font-size: 12px;
                        }
                        .mv_dt {
                            position: absolute;
                            bottom: 5px;
                            right: 10px;
                            color: #fff;
                            font-size: 12px;
                        }
                    }
                    .mv_name {
                        font-size: 14px;
                        color: rgb(55, 55, 55);
                        cursor: pointer;
                        width: 320px;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1; /* 这里是超出几行省略 */
                        overflow: hidden;
                        margin-top: 10px;
                    }
                    .mv_name:hover {
                        color: #000;
                    }
                }
                .empty_box {
                    width: 320px;
                    height: 0;
                    padding-bottom: 20px;
                }
            }
            .contains_description {
                padding-top: 20px;
                .des_title {
                    font-size: 14px;
                    font-weight: bold;
                }
                .des {
                    padding-top: 10px;
                    font-size: 14px;
                    text-indent: 28px;
                    color: rgb(103, 103, 103);
                    line-height: 28px;
                }
            }
        }
    }
}
</style>