<template>
    <div class="lyric_box" style="height: calc(100vh - 140px)">
        <div class="top_box">
            <div class="top_box_left">
                <div class="circle" :class="{ 'rotate': $store.state.cloudMusic.isPlaying }">
                    <el-image v-if="$store.state.cloudMusic.playList[0]" :src="$store.state.cloudMusic.playList[0].pic"
                        class="song_pic"></el-image>
                </div>
            </div>
            <div class="top_box_mid">
                <div class="song_name">
                    <span class="name" v-if="$store.state.cloudMusic.playList[0]">{{
                            $store.state.cloudMusic.playList[0].name
                    }}</span>
                    <div v-if="$store.state.cloudMusic.playList[0]">
                        <span class="author_al" v-for="(item, index) in $store.state.cloudMusic.playList[0].authors"
                            :key="item.id">{{ item.name }}{{
                                    index === $store.state.cloudMusic.playList[0].authors.length - 1 ?
                                        ' ' : '/'
                            }}</span>
                        <span> - </span>
                        <span class="author_al">{{ $store.state.cloudMusic.playList[0].al.name }}</span>
                    </div>
                </div>
                <div class="song_lyric" ref="lyrbox">
                    <div :class="['lyric_row', { 'lyr_is_active': $store.state.cloudMusic.currentTime > filterTime(lyrics[index].time) && $store.state.cloudMusic.currentTime < filterTime(lyrics[index + 1].time) }]"
                        v-for="(item, index) in lyrics" :key="index">{{ item.lyric }}</div>
                </div>
            </div>
            <div class="top_box_right">
            </div>
        </div>
        <div class="bottom_box" v-if="hotComments.length > 0 && comments.length > 0">
            <div class="comment_box">
                <h5>全部评论（{{ totalNum }}）</h5>
                <div v-for="item in hotComments" :key="item.commentId" class="each_comment">
                    <img :src="item.user.avatarUrl || ''" class="user_pic">
                    <div class="user_info">
                        <div>
                            <span class="user_info_color">{{ item.user.nickname }}：</span>
                            <span>{{ item.content }}</span>
                        </div>
                        <div>
                            <div v-for="jtem in item.beReplied">
                                <div class="replied_comment">
                                    <span class="user_info_color">@{{ jtem.user.nickname }}：</span>
                                    <span>{{ jtem.content }}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span class="user_info_time">{{ item.timeStr }}</span>
                            <span class="user_info_time">{{ filterSeconds(item.time) }}</span>
                            <div class="liked">
                                <span class="report">举报</span>
                                <span class="liked_margin">|</span>
                                <svg t="1658554485792" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2265" width="14" height="14">
                                    <path
                                        d="M890.908 429.534c-20.66-26.05-51.585-40.99-84.84-40.99l-189.34 0c10.34-28.83 17.18-60.165 19.615-90.48 3.785-47.147-3.465-89.02-20.955-121.095-21.53-39.46-58.18-64.072-105.997-71.177-21.662-3.22-40.292 0.945-55.377 12.372-30.495 23.102-36.092 67.065-42.575 117.97-5.182 40.692-11.055 86.817-30.79 119.877-13.172 22.065-38.807 51.397-109.092 51.397l-73.345 0c-48.842 0-88.58 39.722-88.58 88.545l0 334.754c0 48.82 39.737 88.545 88.58 88.545l534.336 0c24.33 0 48.22-8.325 67.275-23.43 19.06-15.11 32.605-36.475 38.145-60.155l73.52-314.264C919.058 489.054 911.553 455.569 890.908 429.534zM168.672 830.708 168.672 495.956c0-16.27 13.252-29.505 29.537-29.505l62.232 0 0 393.762-62.232 0C181.925 860.213 168.672 846.978 168.672 830.708zM853.998 507.956l-73.52 314.272c-5.23 22.36-24.94 37.985-47.93 37.985L319.484 860.213 319.484 462.169c49.877-9.52 87.4-34.92 111.86-75.895 26.05-43.64 32.75-96.257 38.662-142.68 2.67-20.977 5.193-40.79 9.2-55.99 4.297-16.302 8.745-21.08 10.457-22.377 1.96-1.485 5.677-1.835 11.05-1.035 29.615 4.4 50.175 17.83 62.84 41.052 25.99 47.642 14.505 128.052-10.265 182.86-5.93 13.127-4.83 28.167 2.96 40.232 7.78 12.052 21.01 19.247 35.395 19.247l214.424 0c15.125 0 29.185 6.792 38.58 18.637C854.028 478.049 857.438 493.261 853.998 507.956z"
                                        p-id="2266" fill="#707070"></path>
                                </svg>
                                <span>{{ item.likedCount }}</span>
                                <span class="liked_margin">|</span>
                                <svg t="1658554856163" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="3251" width="14" height="14">
                                    <path
                                        d="M512 939.804444c-57.612929 0-113.570909-11.274343-166.322424-33.616161-50.889697-21.514343-96.504242-52.337778-135.809293-91.539394C170.666667 775.447273 139.843232 729.729293 118.328889 678.839596 96.193939 626.191515 84.816162 570.233535 84.816162 512.620606s11.274343-113.570909 33.616161-166.322424c21.514343-50.889697 52.337778-96.504242 91.539394-135.809293 39.201616-39.201616 84.919596-70.025051 135.809293-91.539394 52.648081-22.238384 108.606061-33.616162 166.322424-33.616162h1.034344l-0.103435 57.923233h-0.930909c-98.676364 0-191.353535 38.374141-261.068282 108.192323-69.818182 69.818182-108.295758 162.495354-108.295758 261.171717s38.374141 191.353535 108.192323 261.068283c69.714747 69.818182 162.495354 108.192323 261.068283 108.192323 98.572929 0 191.250101-38.374141 261.068283-108.088889C842.78303 704.077576 881.260606 611.400404 881.260606 512.827475h57.923232c0 57.612929-11.377778 113.570909-33.616161 166.21899-21.514343 50.889697-52.337778 96.504242-91.539394 135.705858s-84.919596 69.921616-135.705859 91.43596c-52.751515 22.341818-108.606061 33.616162-166.322424 33.616161zM938.149495 352.711111h-57.923232V145.73899H672.530101v-57.923232H938.149495V352.711111z m0 0"
                                        p-id="3252" fill="#707070"></path>
                                    <path
                                        d="M888.371717 96.012929l40.96 40.96L560.484848 505.806869l-40.96-40.96L888.371717 96.012929z m0 0"
                                        p-id="3253" fill="#707070"></path>
                                </svg>
                                <span class="liked_margin">|</span>
                                <svg t="1658554967236" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="7706" width="14" height="14">
                                    <path
                                        d="M512.146827 268.510985c-250.902034 0-454.505322 157.57406-454.505322 359.095851 0 77.452531 32.639121 168.259723 83.298552 213.54786C166.24668 863.780505 88.131465 990.268512 109.075322 1018.193654c23.957624 31.943141 164.908706-79.128039 205.700895-61.760749C355.568406 973.800196 441.499439 987.04638 512.146827 987.04638c250.902034 0 447.742067-158.01764 454.089667-359.439545C972.069626 442.506103 768.001278 268.510985 512.146827 268.510985zM511.997535 950.528886C447.362645 950.528886 362.014817 933.770578 323.347087 920.455656c-38.351961-13.206444-179.982913 66.085924-179.982913 66.085924s52.530415-136.615167 29.151701-161.97227c-42.140114-45.708088-76.209862-124.513914-76.209862-195.375037 0-184.372531 186.277885-324.240977 415.827925-324.240977s415.35105 154.807323 415.447714 324.240977C927.690131 821.643613 741.54865 950.528886 511.997535 950.528886zM311.488568 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM504.000204 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM696.511839 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0Z"
                                        p-id="7707" fill="#707070"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="comment_box">
                <h5>最新评论（{{ totalNum }}）</h5>
                <div v-for="item in comments" :key="item.commentId" class="each_comment">
                    <img :src="item.user.avatarUrl || ''" class="user_pic">
                    <div class="user_info">
                        <div>
                            <span class="user_info_color">{{ item.user.nickname }}：</span>
                            <span>{{ item.content }}</span>
                        </div>
                        <div>
                            <div v-for="jtem in item.beReplied">
                                <div class="replied_comment">
                                    <span class="user_info_color">@{{ jtem.user.nickname }}：</span>
                                    <span>{{ jtem.content }}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span class="user_info_time">{{ item.timeStr }}</span>
                            <span class="user_info_time">{{ filterSeconds(item.time) }}</span>
                            <div class="liked">
                                <span class="report">举报</span>
                                <span class="liked_margin">|</span>
                                <svg t="1658554485792" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2265" width="14" height="14">
                                    <path
                                        d="M890.908 429.534c-20.66-26.05-51.585-40.99-84.84-40.99l-189.34 0c10.34-28.83 17.18-60.165 19.615-90.48 3.785-47.147-3.465-89.02-20.955-121.095-21.53-39.46-58.18-64.072-105.997-71.177-21.662-3.22-40.292 0.945-55.377 12.372-30.495 23.102-36.092 67.065-42.575 117.97-5.182 40.692-11.055 86.817-30.79 119.877-13.172 22.065-38.807 51.397-109.092 51.397l-73.345 0c-48.842 0-88.58 39.722-88.58 88.545l0 334.754c0 48.82 39.737 88.545 88.58 88.545l534.336 0c24.33 0 48.22-8.325 67.275-23.43 19.06-15.11 32.605-36.475 38.145-60.155l73.52-314.264C919.058 489.054 911.553 455.569 890.908 429.534zM168.672 830.708 168.672 495.956c0-16.27 13.252-29.505 29.537-29.505l62.232 0 0 393.762-62.232 0C181.925 860.213 168.672 846.978 168.672 830.708zM853.998 507.956l-73.52 314.272c-5.23 22.36-24.94 37.985-47.93 37.985L319.484 860.213 319.484 462.169c49.877-9.52 87.4-34.92 111.86-75.895 26.05-43.64 32.75-96.257 38.662-142.68 2.67-20.977 5.193-40.79 9.2-55.99 4.297-16.302 8.745-21.08 10.457-22.377 1.96-1.485 5.677-1.835 11.05-1.035 29.615 4.4 50.175 17.83 62.84 41.052 25.99 47.642 14.505 128.052-10.265 182.86-5.93 13.127-4.83 28.167 2.96 40.232 7.78 12.052 21.01 19.247 35.395 19.247l214.424 0c15.125 0 29.185 6.792 38.58 18.637C854.028 478.049 857.438 493.261 853.998 507.956z"
                                        p-id="2266" fill="#707070"></path>
                                </svg>
                                <span>{{ item.likedCount }}</span>
                                <span class="liked_margin">|</span>
                                <svg t="1658554856163" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="3251" width="14" height="14">
                                    <path
                                        d="M512 939.804444c-57.612929 0-113.570909-11.274343-166.322424-33.616161-50.889697-21.514343-96.504242-52.337778-135.809293-91.539394C170.666667 775.447273 139.843232 729.729293 118.328889 678.839596 96.193939 626.191515 84.816162 570.233535 84.816162 512.620606s11.274343-113.570909 33.616161-166.322424c21.514343-50.889697 52.337778-96.504242 91.539394-135.809293 39.201616-39.201616 84.919596-70.025051 135.809293-91.539394 52.648081-22.238384 108.606061-33.616162 166.322424-33.616162h1.034344l-0.103435 57.923233h-0.930909c-98.676364 0-191.353535 38.374141-261.068282 108.192323-69.818182 69.818182-108.295758 162.495354-108.295758 261.171717s38.374141 191.353535 108.192323 261.068283c69.714747 69.818182 162.495354 108.192323 261.068283 108.192323 98.572929 0 191.250101-38.374141 261.068283-108.088889C842.78303 704.077576 881.260606 611.400404 881.260606 512.827475h57.923232c0 57.612929-11.377778 113.570909-33.616161 166.21899-21.514343 50.889697-52.337778 96.504242-91.539394 135.705858s-84.919596 69.921616-135.705859 91.43596c-52.751515 22.341818-108.606061 33.616162-166.322424 33.616161zM938.149495 352.711111h-57.923232V145.73899H672.530101v-57.923232H938.149495V352.711111z m0 0"
                                        p-id="3252" fill="#707070"></path>
                                    <path
                                        d="M888.371717 96.012929l40.96 40.96L560.484848 505.806869l-40.96-40.96L888.371717 96.012929z m0 0"
                                        p-id="3253" fill="#707070"></path>
                                </svg>
                                <span class="liked_margin">|</span>
                                <svg t="1658554967236" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="7706" width="14" height="14">
                                    <path
                                        d="M512.146827 268.510985c-250.902034 0-454.505322 157.57406-454.505322 359.095851 0 77.452531 32.639121 168.259723 83.298552 213.54786C166.24668 863.780505 88.131465 990.268512 109.075322 1018.193654c23.957624 31.943141 164.908706-79.128039 205.700895-61.760749C355.568406 973.800196 441.499439 987.04638 512.146827 987.04638c250.902034 0 447.742067-158.01764 454.089667-359.439545C972.069626 442.506103 768.001278 268.510985 512.146827 268.510985zM511.997535 950.528886C447.362645 950.528886 362.014817 933.770578 323.347087 920.455656c-38.351961-13.206444-179.982913 66.085924-179.982913 66.085924s52.530415-136.615167 29.151701-161.97227c-42.140114-45.708088-76.209862-124.513914-76.209862-195.375037 0-184.372531 186.277885-324.240977 415.827925-324.240977s415.35105 154.807323 415.447714 324.240977C927.690131 821.643613 741.54865 950.528886 511.997535 950.528886zM311.488568 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM504.000204 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM696.511839 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0Z"
                                        p-id="7707" fill="#707070"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="colloctor_pagination">
                    <el-pagination background layout="prev, pager, next" :total="totalNum"
                        :page-size="20" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            lyrics: [], // 歌词
            times: 0,
            hotComments: [], // 热评
            comments: [], // 全部评论
            totalNum: 0
        }
    },
    watch: {
        '$store.state.cloudMusic.currentTime': function () {
            if (!this.$store.state.cloudMusic.lyricVisible) return
            if (document.getElementsByClassName('lyr_is_active')[0] && document.getElementsByClassName('lyr_is_active')[0].offsetTop > 300) {
                let interval = setInterval(() => {
                    this.times += 1
                    if (this.times == 5) {
                        clearInterval(interval)
                        this.times = 0
                    }
                    let active = document.getElementsByClassName('lyr_is_active')[0]
                    if (typeof active !== 'undefined') {
                        this.$refs.lyrbox.scrollTop += ((active.offsetTop - 300) - (this.$refs.lyrbox.scrollTop)) / 5
                    }
                }, 200)
            }
        },
        '$store.state.cloudMusic.playList': function () {
            // 调用接口获取歌词
            axios.get(`/lyric?id=${this.$store.state.cloudMusic.playList[0].id}`).then(res => {
                let data = res.data.lrc.lyric.split('\n')
                this.lyrics = []
                data.forEach((item, index) => {
                    this.lyrics.push({
                        time: item.substring(1, item.indexOf(']')),
                        lyric: item.substring(item.indexOf(']') + 1),
                        index: index
                    })
                })
            })
            // 调用接口获取评论
            axios.get(`/comment/music?id=${this.$store.state.cloudMusic.playList[0].id}`).then(res => {
                this.totalNum = res.data.total
                this.hotComments = []
                this.comments = []
                res.data.hotComments.forEach((item) => {
                    this.hotComments.push(item)
                })
                res.data.comments.forEach((item) => {
                    this.comments.push(item)
                })
            })
        }
    },
    methods: {
        // 翻页
        handleCurrentChange(val) {
            axios.get(`/comment/music?id=${this.$store.state.cloudMusic.playList[0].id}&limit=20&offset=${(val - 1) * 20}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.comments = []
                    res.data.comments.forEach((item) => {
                        this.comments.push(item)
                    })
                    //回到顶部方法 点击按钮调用
                    document.getElementsByClassName('lyric_box')[0].scrollTop = 580
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 时间戳转时分
        filterSeconds(timestamp) {
            let date = new Date(timestamp);
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
            return h + m
        },
        test() {
        },
        filterTime(time) {
            let m = time.split(':')[0]
            let s = time.split(':')[1]
            return Number(m * 60) + Number(s)
        }
    }
}
</script>

<style lang="less" scoped>
@keyframes rotat {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.lyric_box {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100vw;
    background: #fff;
    z-index: 20;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .top_box {
        width: 100%;
        height: 65%;
        display: flex;
        align-items: center;

        .top_box_left {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .circle {
                width: 300px;
                height: 300px;
                background: rgb(28, 29, 31);
                border-radius: 50%;
                border: 10px solid rgb(208, 206, 203);
                display: flex;
                align-items: center;
                justify-content: center;

                .song_pic {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                }
            }

            .rotate {
                animation: rotat 5s linear infinite;
            }
        }

        .top_box_mid {
            width: 40%;

            .song_name {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #999;

                .name {
                    font-size: 32px;
                    color: #000;
                    margin-bottom: 10px;
                    text-align: center;
                }

                .author_al {
                    font-size: 14px;
                    cursor: pointer;
                }

                .author_al:hover {
                    color: rgb(11, 88, 176);
                }
            }

            .song_lyric {
                overflow: hidden;
                height: 400px;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 20px;

                .lyric_row {
                    font-size: 18px;
                    color: #999;
                    margin: 10px 0;
                }

                .lyr_is_active {
                    color: #000;
                    font-size: 22px;
                    font-weight: 600;
                }
            }
        }

        .top_box_right {
            flex: 1;
        }
    }

    .bottom_box {
        width: 50%;
        height: 35%;
        background: #fff;
        padding: 0 25%;
        .colloctor_pagination {
            padding: 20px;
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }
        .comment_box {
            padding-top: 60px;
        }
        .each_comment {
                display: flex;
                border-bottom: 1px solid #f2f2f2;
                padding: 20px 0;

                .user_pic {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }

                .replied_comment {
                    padding: 10px;
                    background-color: rgb(245, 245, 245);
                }

                .user_info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 10px;
                    font-size: 12px;
                    width: 100%;

                    .user_info_color {
                        color: rgb(80, 125, 175);
                        cursor: pointer;
                    }

                    .user_info_color:hover {
                        color: rgb(11, 88, 176);
                    }

                    .user_info_time {
                        color: rgb(159, 159, 159);
                        padding-right: 10px;
                    }

                    .liked {
                        float: right;
                        display: flex;
                        align-items: center;
                        color: rgb(112, 112, 112);

                        .liked_margin {
                            margin: 0 10px;
                        }

                        .liked_icons:hover {
                            -webkit-filter: drop-shadow(0px 0px 0px #000);
                            cursor: pointer;
                        }

                        .report {
                            cursor: pointer;
                            color: #707070;
                        }

                        .report:hover {
                            color: #000;
                        }
                    }
                }
            }
    }
}
</style>