<template>
    <div>
        <div class="footer">
            <div class="footer_box">
                <div class="left_box" v-if="$store.state.cloudMusic.playList[0]">
                    <div class="cur_song_pic" @click="setLyricVisible">
                        <img :src="$store.state.cloudMusic.playList[0].pic" alt="" class="cur_song_pic">
                    </div>
                    <div class="cur_song_info">
                        <div class="first_row">
                            <span style="margin-right: 10px;">{{ $store.state.cloudMusic.playList[0].name }}</span>
                            <svg t="1658489150980" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="6115" width="20" height="20">
                                <path
                                    d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z"
                                    p-id="6116" fill="#707070"></path>
                            </svg>
                        </div>
                        <div class="author_box">
                            <span class="cur_song_author" v-for="(item, index) in $store.state.cloudMusic.playList[0].authors"
                                :key="item.id">{{ item.name }} {{
                                    index === $store.state.cloudMusic.playList[0].authors.length - 1 ?
                                        ' ' : '/'
                            }}</span>
                        </div>
                    </div>
                </div>
                <div class="mid_box">
                    <common-audio></common-audio>
                </div>
                <div class="right_box" v-show="$store.state.cloudMusic.playList[0]">
                    <el-popover placement="top" trigger="hover" class="volume">
                        <el-slider v-model="$store.state.cloudMusic.volume" vertical height="80px" class="slider_box" :show-tooltip="false" @change="onChange">
                        </el-slider>
                        <div slot="reference">
                            <svg t="1658752457949" class="icon volume" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2264" width="20" height="20">
                                <path
                                    d="M257.493333 322.4l215.573334-133.056c24.981333-15.413333 57.877333-7.914667 73.493333 16.746667 5.301333 8.373333 8.106667 18.048 8.106667 27.914666v555.989334C554.666667 819.093333 530.784 842.666667 501.333333 842.666667c-9.994667 0-19.786667-2.773333-28.266666-8L257.493333 701.6H160c-41.237333 0-74.666667-33.013333-74.666667-73.738667V396.138667c0-40.725333 33.429333-73.738667 74.666667-73.738667h97.493333z m26.133334 58.4a32.298667 32.298667 0 0 1-16.96 4.8H160c-5.888 0-10.666667 4.714667-10.666667 10.538667v231.733333c0 5.813333 4.778667 10.538667 10.666667 10.538667h106.666667c5.994667 0 11.872 1.664 16.96 4.8L490.666667 770.986667V253.013333L283.626667 380.8zM800.906667 829.653333a32.288 32.288 0 0 1-45.248-0.757333 31.317333 31.317333 0 0 1 0.768-44.693333c157.653333-150.464 157.653333-393.962667 0-544.426667a31.317333 31.317333 0 0 1-0.768-44.682667 32.288 32.288 0 0 1 45.248-0.757333c183.68 175.306667 183.68 460.010667 0 635.317333z m-106.901334-126.186666a32.288 32.288 0 0 1-45.248-1.216 31.328 31.328 0 0 1 1.237334-44.672c86.229333-80.608 86.229333-210.56 0-291.178667a31.328 31.328 0 0 1-1.237334-44.672 32.288 32.288 0 0 1 45.248-1.216c112.885333 105.546667 112.885333 277.418667 0 382.965333z"
                                    p-id="2265"></path>
                            </svg>
                        </div>
                    </el-popover>
                </div>
            </div>
        </div>
        <common-lyric v-show="$store.state.cloudMusic.lyricVisible"></common-lyric>
    </div>
</template>

<script>
import commonAudio from './commonAudio.vue'
import commonLyric from './commonLyric.vue'
import { mapGetters } from 'vuex'
export default {
    components: { commonAudio, commonLyric },
    data() {
        return {}
    },
    watch: {
        '$store.state.cloudMusic.playList':function() {
            document.getElementsByClassName('el-slider__bar')[1].style.backgroundColor = this.gettheme
            document.getElementsByClassName('el-slider__button')[1].style.backgroundColor = this.gettheme
            document.getElementsByClassName('el-slider__button')[1].style.borderColor = this.gettheme
        },
        gettheme() {
            document.getElementsByClassName('el-slider__bar')[1].style.backgroundColor = this.gettheme
            document.getElementsByClassName('el-slider__button')[1].style.backgroundColor = this.gettheme
            document.getElementsByClassName('el-slider__button')[1].style.borderColor = this.gettheme
        }
    },
    computed: {
        ...mapGetters(['gettheme'])
    },
    methods: {
        // 调节音量
        onChange(value) {
            this.$store.commit('setVolume', value)
        }, 
        // 打开歌词板
        setLyricVisible() {
            if (this.$store.state.cloudMusic.lyricVisible) {
                this.$store.commit('setLyricVisible', false)
            } else if (!this.$store.state.cloudMusic.lyricVisible) {
                this.$store.commit('setLyricVisible', true)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.footer {
    position: absolute;
    bottom: 0;
    height: 80px;
    width: 100vw;
    background-color: #fff;
    box-sizing: border-box;
    border-top: 1px solid rgb(224, 224, 224);

    .footer_box {
        height: 100%;

        .left_box {
            float: left;
            display: flex;
            align-items: center;
            height: 100%;
            margin-left: 10px;

            .cur_song_pic {
                width: 50px;
                height: 50px;
                border-radius: 8px;
            }
            .cur_song_pic::before {
                content:'';
                display: none;
                width: 50px;
                height: 50px;
                position: absolute;
                left: 10px;
                background-color: rgba(0, 0, 0, .4) ;
                border-radius: 8px;
                cursor: pointer;
            }
            .cur_song_pic:hover::before {
                display:block;
            }
            .cur_song_info {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding-left: 10px;

                .first_row {
                    display: flex;
                    align-items: center;
                }
            }
        }

        .mid_box {
            position: absolute;
            left: 40%;
            display: flex;
            align-items: center;
            height: 100%;
        }

        .right_box {
            float: right;
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 20px;
            .volume {
                cursor: pointer;
            }
        }
    }
}

.author_box {
    max-width: 150px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* 这里是超出几行省略 */
    overflow: hidden;
    .cur_song_author {
        font-size: 12px;
        margin-right: 5px;
    }
}
</style>

<style>
.el-popover {
    min-width: 0 !important;
    display: flex;
    justify-content: center;
    width: 20px;
}
.el-slider__button {
    width: 6px !important;
    height: 6px !important;
}
</style>