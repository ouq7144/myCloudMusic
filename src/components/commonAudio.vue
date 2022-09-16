<template>
    <div>
        <div :style="{opacity: $store.state.cloudMusic.playList[0] ? '1' : '.5', pointerEvents: $store.state.cloudMusic.playList[0] ? 'unset' : 'none'}">
            <audio :src="url" ref="audio" @pause="onPause" @play="onPlay" @timeupdate="onTimeupdate" @load="onLoad" :loop="isLoop">
            </audio>
            <div class="audio-box">
                <div class="btns_row">
                    <!-- 随机播放 -->
                    <div class="single_btn" v-show="curIndex === 2" @click="playRamdom">
                        <el-tooltip content="随机播放" placement="top" effect="light">
                            <svg t="1658763316543" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3975" width="20" height="20">
                            <path
                                d="M968.6 704l43.4 25.1c5.3 3.1 5.3 10.8 0 13.9l-43.4 25-162.7 92.3c-2.7 1.5-6-0.4-6-3.5V772c0-2.2-1.8-4-4-4H592c-70.4 0-134.4-28.8-180.8-75.2-11.1-11.1-21.2-23.2-30.1-36.1-6.4-9.2-20-9.1-26.4 0.1C308.5 723.9 231.1 768 144 768H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h112c25.8 0 50.8-5.1 74.4-15.1 22.9-9.7 43.4-23.6 61.2-41.3 17.7-17.7 31.6-38.3 41.4-61.2 10-23.6 15.1-48.6 15.1-74.4s-5.1-50.8-15.1-74.4c-9.7-22.9-23.6-43.4-41.4-61.2-17.7-17.7-38.3-31.6-61.2-41.4-23.6-10-48.6-15.1-74.4-15.1H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h112c70.4 0 134.4 28.8 180.8 75.2 11.1 11.1 21.2 23.2 30.1 36.1 6.4 9.2 20 9.1 26.4-0.1C427.5 300.1 504.9 256 592 256h203.9c2.2 0 4-1.8 4-4v-84.8c0-3.1 3.3-5 6-3.5L968.6 256l43.4 25.1c5.3 3.1 5.3 10.8 0 13.9l-43.4 25-162.7 92.3c-2.7 1.5-6-0.4-6-3.5V324c0-2.2-1.8-4-4-4H592c-25.8 0-50.8 5.1-74.4 15.1-22.9 9.7-43.4 23.6-61.2 41.4-17.7 17.7-31.6 38.3-41.4 61.2-10 23.6-15.1 48.6-15.1 74.4s5.1 50.8 15.1 74.4c9.7 22.9 23.6 43.4 41.4 61.2 17.7 17.7 38.3 31.6 61.2 41.3 23.6 10 48.6 15.1 74.4 15.1h203.9c2.2 0 4-1.8 4-4v-84.8c0-3.1 3.3-5 6-3.5L968.6 704z"
                                p-id="3976"></path>
                        </svg>
                        </el-tooltip>
                    </div>
                    <!-- 顺序播放 -->
                    <div class="single_btn" v-show="curIndex === 1" @click="playInOrder">
                    <el-tooltip content="顺序播放" placement="bottom" effect="light">
                        <svg t="1658763434659" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1839" width="20" height="20">
                            <path
                                d="M861.090909 256H337.454545a34.909091 34.909091 0 0 1 0-69.818182H861.090909a34.909091 34.909091 0 0 1 0 69.818182z m0 290.909091H337.454545a34.909091 34.909091 0 0 1 0-69.818182H861.090909a34.909091 34.909091 0 0 1 0 69.818182zM861.090909 837.818182H337.454545a34.909091 34.909091 0 0 1 0-69.818182H861.090909a34.909091 34.909091 0 0 1 0 69.818182zM209.454545 221.090909a34.909091 34.909091 0 1 1-69.841454-0.023273A34.909091 34.909091 0 0 1 209.454545 221.090909zM209.454545 512a34.909091 34.909091 0 1 1-69.841454-0.023273A34.909091 34.909091 0 0 1 209.454545 512z m0 290.909091a34.909091 34.909091 0 1 1-69.841454-0.023273A34.909091 34.909091 0 0 1 209.454545 802.909091z"
                                fill="#797979" p-id="1840"></path>
                        </svg>
                    </el-tooltip>
                    </div>
                    <!-- 单曲循环 -->
                    <div class="single_btn" v-show="curIndex === 3" @click="playLoop">
                    <el-tooltip content="单曲循环" placement="bottom" effect="light">
                        <svg t="1658763518057" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2433" width="20" height="20">
                            <path
                                d="M773.597867 203.776l-0.273067 0.443733a33.621333 33.621333 0 0 0-20.343467-6.485333c-18.978133 0.785067-33.723733 16.725333-32.9728 35.771733a33.826133 33.826133 0 0 0 15.633067 26.794667l-0.1024 0.170667a375.227733 375.227733 0 0 1 166.2976 311.876266c0 207.018667-168.448 375.466667-375.466667 375.466667-27.818667 0-27.818667 0-54.340266-2.901333-90.453333-9.898667-152.610133-58.9824-155.5456-61.201067a375.330133 375.330133 0 0 1-165.5808-311.364267c0-201.4208 159.5392-365.841067 358.843733-374.647466l-41.984 40.823466 0.8192 0.853334a33.860267 33.860267 0 0 0-15.2576 29.218133c0.750933 18.978133 16.725333 33.757867 35.669333 33.041067a33.792 33.792 0 0 0 26.0096-14.472534l0.3072 0.341334 128.648534-124.996267L515.6864 34.0992l-0.4096 0.4096a33.6896 33.6896 0 0 0-26.3168-11.400533c-18.944 0.750933-33.6896 16.725333-32.9728 35.703466a33.8944 33.8944 0 0 0 13.038933 25.156267l45.226667 45.2608C275.182933 135.714133 82.602667 331.741867 82.602667 572.347733c0 147.626667 73.1136 285.149867 193.194666 366.114134 3.072 2.56 77.550933 62.190933 188.757334 74.308266 29.422933 3.208533 31.1296 3.310933 61.781333 3.310934 244.667733 0 443.733333-199.0656 443.733333-443.733334A443.392 443.392 0 0 0 773.597867 203.776"
                                p-id="2434"></path>
                            <path
                                d="M542.071467 400.827733a33.28 33.28 0 0 0-17.134934 6.075734l-0.170666-0.3072-106.8032 69.700266 0.170666 0.273067a33.9968 33.9968 0 0 0-15.837866 29.696c0.750933 18.944 16.725333 33.723733 35.669333 32.9728a33.109333 33.109333 0 0 0 17.1008-6.0416l0.2048 0.273067 53.998933-35.259734v249.856h0.034134c0 0.477867-0.238933 0.887467-0.2048 1.365334a34.2016 34.2016 0 1 0 68.4032-1.365334h0.034133v-0.170666c0-0.4096 0.2048-0.750933 0.2048-1.160534 0-0.273067-0.170667-0.477867-0.2048-0.785066V435.2c0-0.477867 0.2048-0.887467 0.2048-1.3312a34.4064 34.4064 0 0 0-35.669333-33.041067"
                                p-id="2435"></path>
                        </svg>
                    </el-tooltip>
                    </div>
                    <!-- 上一首 -->
                    <div class="single_btn next_btn" @click="playFront">
                        <svg t="1658763214806" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2911" width="20" height="20">
                            <path
                                d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z"
                                fill="#231815" p-id="2912"></path>
                        </svg>
                    </div>
                    <!-- 播放 -->
                    <div v-show="!$store.state.cloudMusic.isPlaying" class="play-btn single_btn" @click="startPlayOrPause">
                        <svg t="1658646837225" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3025" width="20" height="20">
                            <path
                                d="M852.5 533.9L279 864.7c-11.9 6.9-27.2 2.8-34.1-9.1-2.2-3.8-3.3-8.1-3.3-12.5V181.5c0-13.8 11.2-24.9 24.9-24.9 4.4 0 8.7 1.2 12.5 3.3l573.4 330.8c11.9 6.9 16 22.1 9.1 34.1-2.1 3.8-5.2 6.9-9 9.1z"
                                p-id="3026" fill="#000"></path>
                        </svg>
                    </div>
                    <!-- 暂停 -->
                    <div v-show="$store.state.cloudMusic.isPlaying" class="play-btn single_btn" @click="startPlayOrPause">
                        <svg t="1658652056907" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4043" width="20" height="20">
                            <path
                                d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z"
                                fill="#000" p-id="4044"></path>
                        </svg>
                    </div>
                    <!-- 下一首 -->
                    <div class="single_btn next_btn" @click="playNext">
                        <svg t="1658762986307" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3090" width="20" height="20">
                            <path
                                d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z"
                                fill="#231815" p-id="3091"></path>
                        </svg>
                    </div>
                </div>
                <div>
                    <div class="block second-row">
                        <span class="current-time">{{ $store.state.cloudMusic.currentTime | formatSecond }}</span>
                        <el-slider v-model="$store.state.cloudMusic.sliderTime" :show-tooltip="false" @change="changeCurrentTime"></el-slider>
                        <span class="max-time">{{ filterTime(audio.maxTime) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

function realFormatSecond(second) {
    var secondType = typeof second
    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second)
        var hours = Math.floor(second / 3600)
        second = second - hours * 3600
        var mimute = Math.floor(second / 60)
        second = second - mimute * 60
        return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
        return '00:00'
    }
}
export default {
    data() {
        return {
            url: this.$store.state.cloudMusic.currentSongUrl,
            audio: {
                maxTime: 0
            },
            curIndex: 1,
            isLoop: false
        }
    },
    computed: {
        ...mapGetters(['gettheme'])
    },
    watch: {
        gettheme() {
            document.getElementsByClassName('el-slider__bar')[0].style.backgroundColor = this.gettheme
            document.getElementsByClassName('el-slider__button')[0].style.backgroundColor = this.gettheme
        },
        $route() {
            console.log(this.$route)
            if (this.$route.path == '/mvPage') {
                this.onPause()
                this.$refs.audio.pause()
            }
        },
        // 当监听到播放歌曲变化时
        '$store.state.cloudMusic.playList': function () {
            document.getElementsByClassName('el-slider__bar')[0].style.backgroundColor = this.gettheme
            document.getElementsByClassName('el-slider__button')[0].style.backgroundColor = this.gettheme
            // 调用接口获取新的目标歌曲
            axios.get(`/song/url?id=${this.$store.state.cloudMusic.playList[0].id}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.url = res.data.data[0].url
                    this.audio.maxTime = this.$store.state.cloudMusic.playList[0].dt
                    this.$nextTick(() => {
                        this.play()
                        this.onPlay()
                    })
                } else {
                    this.$message(`获取音乐url失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 当监听到音量变化时
        '$store.state.cloudMusic.volume': function () {
            this.$refs.audio.volume = this.$store.state.cloudMusic.volume / 100
        },
        // 监听当前播放时间
        '$store.state.cloudMusic.sliderTime': function() {
            // 如果该歌曲需要VIP,播放试听部分
            if (this.$store.state.cloudMusic.playList[0].isvip) {
                if (Math.floor(this.$store.state.cloudMusic.currentTime) == 30) {
                    if (this.$store.state.cloudMusic.playType == 1) {
                        this.$store.commit('playNext')
                    } else if (this.$store.state.cloudMusic.playType == 2) {
                        this.$store.commit('playRamdom', Math.floor(Math.random() * this.$store.state.cloudMusic.playList.length))
                    } else if (this.$store.state.cloudMusic.playType == 3) {
                        this.isLoop = true
                    }
                }
            // 如果该歌曲不需要VIP则播放全部
            } else {
                if (this.$store.state.cloudMusic.sliderTime == 100) {
                    if (this.$store.state.cloudMusic.playType == 1) {
                        this.$store.commit('playNext')
                    } else if (this.$store.state.cloudMusic.playType == 2) {
                        this.$store.commit('playRamdom', Math.floor(Math.random() * this.$store.state.cloudMusic.playList.length))
                    } else if (this.$store.state.cloudMusic.playType == 3) {
                        this.isLoop = true
                    }
                }
            }
        }
    },
    methods: {
        // 毫秒转分:秒
        filterTime(timestamp) {
            let minutes = parseInt((timestamp % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = parseInt((timestamp % (1000 * 60)) / 1000);
            return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        },
        // 播放
        play() {
            this.$refs.audio.play()
        },
        // 播放下一首
        playNext() {
            if (this.$store.state.cloudMusic.playType == 1) {
                this.$store.commit('playNext')
            } else if (this.$store.state.cloudMusic.playType == 2) {
                this.$store.commit('playRamdom', Math.floor(Math.random() * this.$store.state.cloudMusic.playList.length))
            } else if (this.$store.state.cloudMusic.playType == 3) {
                this.isLoop = true
                this.changeCurrentTime(0)
            }
        },
        // 播放上一首
        playFront() {
            if (this.$store.state.cloudMusic.playType == 1) {
                this.$store.commit('playFront')
            } else if (this.$store.state.cloudMusic.playType == 2) {
                this.$store.commit('playRamdom', Math.floor(Math.random() * this.$store.state.cloudMusic.playList.length))
            } else if (this.$store.state.cloudMusic.playType == 3) {
                this.isLoop = true
                this.changeCurrentTime(0)
            }
        },
        // 点击随机播放（切换成单曲循环）
        playRamdom() {
            this.curIndex = 3
            this.$store.commit('setPlayType', 3)
        },
        // 点击顺序播放（切换成随机播放）
        playInOrder() {
            this.curIndex = 2
            this.$store.commit('setPlayType', 2)
        },
        // 点击单曲循环（切换成顺序播放）
        playLoop() {
            this.curIndex = 1
            this.$store.commit('setPlayType', 1)
        },
        // 暂停
        pause() {
            this.$refs.audio.pause()
        },
        // 点击按钮
        startPlayOrPause() {
            if (this.$store.state.cloudMusic.isPlaying) {
                this.pause()
                this.onPause()
            } else if (!this.$store.state.cloudMusic.isPlaying) {
                this.play()
                this.onPlay()
            }
        },
        // 加载资源
        onLoad() {
        },
        // 暂停时
        onPause() {
            this.$store.commit('setIsPlaying', false)
        },
        // 播放时
        onPlay() {
            this.$store.commit('setIsPlaying', true)
        },
        // 拖动进度条
        changeCurrentTime(index) {
            this.$refs.audio.currentTime = parseInt(this.audio.maxTime / 1000) * (index / 100)
            this.$store.commit('setCurrentTime', parseInt(this.audio.maxTime / 1000) * (index / 100))
        },
        // 更新当前播放时间
        onTimeupdate(res) {
            this.$store.commit('setCurrentTime', res.target.currentTime)
            // this.$store.state.cloudMusic.currentTime = res.target.currentTime
            this.$store.commit('setSliderTime', this.$store.state.cloudMusic.currentTime / (this.audio.maxTime / 1000) * 100)
            // this.$store.state.cloudMusic.sliderTime = this.audio.currentTime / (this.audio.maxTime / 1000) * 100
        },
        // // 
        // onLoaddata(res) {
        //     this.audio.maxTime = parseInt(res.target.duration)
        // }
    },
    filters: {
        // 将整数转化成时分秒
        formatSecond(second = 0) {
            return realFormatSecond(second)
        }
    }
}
</script>

<style lang="less" scoped>
audio {
    display: none;
}
.audio-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .btns_row {
        display: flex;
        align-items: baseline;
        justify-content: center;
        width: 100%;

        .single_btn {
            margin-right: 30px;
            cursor: pointer;
        }
        .next_btn {
            cursor: pointer;
        }
        .play-btn {
            width: 35px;
            height: 35px;
            background-color: rgb(245, 245, 245);
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .play-btn:hover {
            background-color: rgb(229, 229, 229);
        }
    }

    .second-row {
        display: flex;
        align-items: center;

        .current-time {
            padding-right: 10px;
        }

        .max-time {
            padding-left: 10px;
        }
    }
}

/deep/ .el-slider {
    width: 400px;
}

/deep/ .el-slider:hover {
    .el-slider__button-wrapper .el-tooltip,
    .el-slider__button-wrapper::after {
        display: inline-block;
    }
}

/deep/.el-slider__button {
    width: 8px;
    height: 8px;
    background: red;
    border: none;
}

/deep/ .el-slider__button-wrapper .el-tooltip,
.el-slider__button-wrapper::after {
    display: none;
}

/deep/.el-slider__runway {
    height: 4px;
}
</style>