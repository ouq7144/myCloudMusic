<template>
    <div class="box">
        <el-aside width="200px" style="height: 100%;">
            <div class="links_box">
                <div v-for="(item, index) in $router.options.routes.slice(0, 4)" :key="item.path" class="links"
                    :class="{ 'active_link': $route.path.includes(item.path) }" @click="clickNav(item, index)">
                    <span>{{ item.name }}</span>
                </div>
            </div>
            <div v-show="isLogin">
                <div class="title_open" v-show="createdListVisible" @click="createdListVisible = !createdListVisible">
                    <div>创建的歌单</div>
                    <div class="close"></div>
                </div>
                <div class="title_close" v-show="!createdListVisible" @click="createdListVisible = !createdListVisible">
                    <div>创建的歌单</div>
                    <div class="open"></div>
                </div>
                <div v-for="(item, index) in userCreateList" class="links" :key="item.id" v-show="createdListVisible" @click="gotoSongsListPage(item.id)">
                    <div class="link_item">
                        <svg t="1662277566607" class="icon link_icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1643" width="16" height="16">
                            <path
                                d="M838.99432863 162.40722482l-186.33127437 38.02037807c-13.51137403 2.82796201-23.25213204 14.61113702-23.25213205 28.43672906v412.09690783c0 23.09502305-15.86800901 43.20497508-38.49170507 48.54668107L534.04575904 702.86218588c-34.24976206 8.01255901-61.27251012 37.39194207-61.42961915 72.58435814-0.31421799 48.07535409 44.30473808 83.58198817 90.96611119 72.74146715l29.85071007-6.91279599c48.70379009-11.31184801 83.26777017-53.73127811 85.62440516-103.22061322h0.47132701v-372.34833075c0-10.84052103 7.69834101-20.26706103 18.38175304-22.46658704l150.35331329-30.63625506c10.84052103-2.19952601 18.69597103-11.78317502 18.69597104-22.93791404v-104.47748521c0.15710901-14.76824603-13.35426503-25.76587604-27.96540206-22.78080504zM166.72491631 255.88708001h375.96183773v33.14999904H166.72491631zM166.72491631 387.38731327h375.96183773v33.14999905H166.72491631z"
                                fill="#515151" p-id="1644"></path>
                            <path
                                d="M166.72491631 518.88754654h375.96183773V552.03754558H166.72491631zM166.72491631 650.3877798h202.98482839v33.14999904H166.72491631z"
                                fill="#515151" p-id="1645"></path>
                        </svg>
                        <div class="link_name">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="title_open" v-show="colledctListVisible" @click="colledctListVisible = !colledctListVisible">
                    <div>收藏的歌单</div>
                    <div class="close"></div>
                </div>
                <div class="title_close" v-show="!colledctListVisible" @click="colledctListVisible = !colledctListVisible">
                    <div>收藏的歌单</div>
                    <div class="open"></div>
                </div>
                <div v-for="(item, index) in userCollectList" class="links" :key="item.id" v-show="colledctListVisible" @click="gotoSongsListPage(item.id)">
                    <div class="link_item">
                        <svg t="1662277566607" class="icon link_icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1643" width="16" height="16">
                            <path
                                d="M838.99432863 162.40722482l-186.33127437 38.02037807c-13.51137403 2.82796201-23.25213204 14.61113702-23.25213205 28.43672906v412.09690783c0 23.09502305-15.86800901 43.20497508-38.49170507 48.54668107L534.04575904 702.86218588c-34.24976206 8.01255901-61.27251012 37.39194207-61.42961915 72.58435814-0.31421799 48.07535409 44.30473808 83.58198817 90.96611119 72.74146715l29.85071007-6.91279599c48.70379009-11.31184801 83.26777017-53.73127811 85.62440516-103.22061322h0.47132701v-372.34833075c0-10.84052103 7.69834101-20.26706103 18.38175304-22.46658704l150.35331329-30.63625506c10.84052103-2.19952601 18.69597103-11.78317502 18.69597104-22.93791404v-104.47748521c0.15710901-14.76824603-13.35426503-25.76587604-27.96540206-22.78080504zM166.72491631 255.88708001h375.96183773v33.14999904H166.72491631zM166.72491631 387.38731327h375.96183773v33.14999905H166.72491631z"
                                fill="#515151" p-id="1644"></path>
                            <path
                                d="M166.72491631 518.88754654h375.96183773V552.03754558H166.72491631zM166.72491631 650.3877798h202.98482839v33.14999904H166.72491631z"
                                fill="#515151" p-id="1645"></path>
                        </svg>
                        <div class="link_name">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </el-aside>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            createdListVisible: true,
            colledctListVisible: true,
            userCreateList: [],
            userCollectList: [],
            isLogin: localStorage.getItem('profile') !== null ? true : false
        }
    },
    created() {
        this.getUserSongsList()
    },
    watch: {
        getloginState() {
            if (this.getloginState !== null) {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
            this.$forceUpdate()
        },
        getdataFlag() {
            this.getUserSongsList()
        }
    },
    computed: {
        ...mapGetters(['getloginState', 'getdataFlag'])
    },
    methods: {
        clickNav(item) {
            console.log(this.$route.path)
            console.log(item.path)
            this.$router.push({ path: item.path })
        },
        // 获取用户歌单
        getUserSongsList() {
            if (!localStorage.getItem('profile')) return
            this.userCollectList = []
            this.userCreateList = []
            axios.get(`/user/playlist?uid=${JSON.parse(localStorage.getItem('profile')).userId}&timerstamp=${Date.now()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取用户歌单')
                    res.data.playlist.forEach((item) => {
                        // 如果歌单创建者id与该用户id一致则为用户创建的歌单
                        if (item.creator.userId == JSON.parse(localStorage.getItem('profile')).userId) {
                            if (item.name !== `${JSON.parse(localStorage.getItem('profile')).nickname}喜欢的音乐`) {
                                this.userCreateList.push(item)
                            }
                            // 如果歌单创建者id与该用户id不一致则为用户收藏的歌单
                        } else {
                            this.userCollectList.push(item)
                        }
                    })
                } else {
                    this.$message(`获取用户歌单失败，原因为：${res.data.message || '网络拥挤，请稍后再试！'}`)
                }
            })
        },
        // 前往歌单页面
        gotoSongsListPage(id) {
            this.$router.push({path: `/songsListPage?id=${id}`})
        }

    }
}
</script>

<style lang="less" scoped>
.box {
    border-right: 1px solid #e0e0e0;
    height: 100%;

    .links_box {
        margin-top: 10px;

        .links {
            height: 20px;
            line-height: 20px;
            padding: 10px 0 10px 10px;
            margin: 5px 0 5px 5px;
            font-size: 16px;
            font-family: 'Courier New', Courier, monospace;
            cursor: pointer;
        }

        .links:hover {
            background: rgb(246, 246, 247);
        }

        .active_link {
            background: rgb(246, 246, 247);
            font-weight: bolder;
            font-size: 18px;
        }

    }

    .title_open {
        height: 20px;
        line-height: 20px;
        padding: 10px 0 10px 10px;
        margin: 5px 0 5px 5px;
        font-size: 12px;
        font-family: 'Courier New', Courier, monospace;
        color: rgb(159, 159, 159);
        cursor: pointer;
        display: flex;
        align-items: center;

        .close {
            width: 0;
            height: 0;
            border-left: 4px solid #9F9F9F;
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            margin-left: 8px;
        }
    }

    .title_close {
        height: 20px;
        line-height: 20px;
        padding: 10px 0 10px 10px;
        margin: 5px 0 5px 5px;
        font-size: 12px;
        font-family: 'Courier New', Courier, monospace;
        color: rgb(159, 159, 159);
        cursor: pointer;
        display: flex;
        align-items: center;

        .open {
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 4px solid #9F9F9F;
            margin-left: 8px;
        }
    }

    .links {
        height: 40px;
        line-height: 40px;
        margin: 5px 0 5px 5px;
        font-size: 14px;
        cursor: pointer;
        padding-left: 10px;
        color: rgb(55, 55 ,55);
        .link_item {
            display: flex;
            align-items: center;
            .link_name {
                padding-left: 5px;
                width: 150px;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                /* 这里是超出几行省略 */
                overflow: hidden;
            }
        }
    }

    .links:hover {
        background: rgb(246, 246, 247);
        color: #000;
    }

    .active_link {
        background: rgb(246, 246, 247);
        font-weight: bolder;
        font-size: 18px;
    }

}
</style>