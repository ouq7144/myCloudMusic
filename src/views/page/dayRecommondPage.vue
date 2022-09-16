<template>
    <div>
        <div class="songs_list">
            <div class="header_box">
                <div class="songs_list_header">
                    <div class="cur_date_box">
                        <svg t="1658481752232" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3364" width="100" height="100">
                            <path
                                d="M874.496 134.144H788.48V84.992c0-17.408-14.336-31.744-31.744-31.744-17.408 0-31.744 14.336-31.744 31.744v49.152h-409.6V84.992c0-17.408-14.336-31.744-31.744-31.744-17.408 0-31.744 14.336-31.744 31.744v49.152h-86.016c-46.08 0-83.968 36.864-83.968 82.944v666.624c0 46.08 37.888 82.944 83.968 82.944h707.584c46.08 0 83.968-36.864 83.968-82.944V217.088c0-46.08-36.864-82.944-82.944-82.944z m20.48 749.568c0 11.264-9.216 20.48-21.504 20.48h-706.56c-11.264 0-21.504-9.216-21.504-20.48V217.088c0-11.264 9.216-20.48 21.504-20.48h707.584c11.264 0 21.504 9.216 21.504 20.48v666.624z"
                                :fill="gettheme" p-id="3365"></path>
                            <path
                                d="M806.912 290.816h-573.44c-17.408 0-31.744 14.336-31.744 31.744 0 17.408 14.336 31.744 31.744 31.744h573.44c17.408 0 31.744-14.336 31.744-31.744 0-17.408-14.336-31.744-31.744-31.744z"
                                :fill="gettheme" p-id="3366"></path>
                        </svg>
                        <span class="cur_date" :style="{ color: gettheme, left: curDate < 10 ? '40px' : '30px' }">{{
                                curDate
                        }}</span>
                    </div>
                    <div class="list_title">
                        <span class="row_first">每日歌曲推荐</span>
                        <span class="row_second">根据你的音乐口味生成，每天6：00更新</span>
                    </div>
                </div>
                <div class="list_info">
                    <el-button class="play_all_btn" @click="playAll" :style="{ background: gettheme }" round>▷ 播放全部
                    </el-button>
                    <el-button type="info" round>+ 收藏全部</el-button>
                </div>
            </div>
            <div>
                <el-table :data="tableData" style="width: 100%" @row-dblclick="playMusic" stripe
                    :row-class-name="tableRowClassName">
                    <el-table-column width="40" type="index" class-name="playtime">
                        <template slot-scope='scope'>
                                <div style="display: flex; align-items: center;">
                                    <span class="playtime" v-show="!($store.state.cloudMusic.playList[0] && $store.state.cloudMusic.playList[0].id == scope.row.id)">{{ util.computedIndex(tableData.length, scope.row.index) }}</span>
                                    <svg v-show="$store.state.cloudMusic.playList[0] && $store.state.cloudMusic.playList[0].id == scope.row.id" t="1661514845013" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2446" width="20" height="20"><path d="M525.541411 131.503033l-230.494605 148.031475h-114.988917c-63.895239 0-115.679649 51.14996-115.679649 115.219161v230.898811c0 63.664995 51.150984 115.219161 115.679649 115.219161h114.988917l230.494605 147.915841c32.582069 14.128789 57.840336-0.980327 57.840336-33.04358V164.54559c0-32.120558-25.892717-46.825468-57.840336-33.042557z m194.223516 186.033997c-10.841929-11.649318-29.122271-12.283768-40.712237-1.384533-11.649318 10.899234-12.226462 29.122271-1.384533 40.770565 5.363148 5.76633 14.531971 18.511609 23.989367 37.772279 16.146749 32.870642 25.892717 71.449285 25.892717 115.507733 0 44.058448-9.745968 82.694397-25.892717 115.507734-9.457396 19.259646-18.626219 32.004925-23.989367 37.772278-10.899234 11.648294-10.264784 29.871331 1.384533 40.770566 11.648294 10.899234 29.871331 10.264784 40.770566-1.384533 9.054213-9.68764 21.509896-26.987654 33.620725-51.727105 19.895119-40.483017 31.774681-87.654362 31.774681-140.996245 0-53.341882-11.879562-100.514251-31.774681-140.996244-12.169157-24.62484-24.625864-41.983183-33.679054-51.612495z m176.806845-35.69599c-23.297612-39.444361-46.825468-66.778916-63.318094-81.483826-11.880585-10.609639-30.102598-9.572006-40.714284 2.36486-10.609639 11.936867-9.573029 30.101575 2.364861 40.712238 2.709715 2.421142 8.131191 7.842619 15.396665 16.261358 12.455683 14.416338 24.911366 31.601742 36.619012 51.439556 33.504068 56.860009 53.630455 123.349329 53.630455 199.066825s-20.126386 142.206816-53.68776 199.125153c-11.706623 19.836791-24.220634 37.022195-36.619012 51.438533-7.265474 8.41874-12.68695 13.840216-15.397689 16.261359-11.879562 10.610662-12.916171 28.833699-2.363837 40.714283 10.553357 11.879562 28.833699 12.916171 40.713261 2.363838 16.493649-14.70491 40.021505-41.98216 63.319117-81.483826 38.522362-65.336054 61.646012-141.745305 61.646012-228.41934 0.058328-86.614683-23.066345-163.023934-61.588707-228.361011z" :fill="gettheme" p-id="2447"></path></svg>
                                </div>
                            </template>
                    </el-table-column>
                    <el-table-column width="40" class-name="playtime">
                        <template slot-scope='scope'>
                            <svg t="1658489150980" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="6115" width="20" height="20">
                                <path
                                    d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z"
                                    p-id="6116" fill="#707070"></path>
                            </svg>
                        </template>
                    </el-table-column>
                    <el-table-column width="40" class-name="playtime">
                        <template slot-scope='scope'>
                            <svg t="1658489442655" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="7625" width="20" height="20">
                                <path
                                    d="M828.975746 894.125047 190.189132 894.125047c-70.550823 0-127.753639-57.18542-127.753639-127.752616L62.435493 606.674243c0-17.634636 14.308891-31.933293 31.93227-31.933293l63.889099 0c17.634636 0 31.93227 14.298658 31.93227 31.933293l0 95.821369c0 35.282574 28.596292 63.877843 63.87682 63.877843L765.098927 766.373455c35.281551 0 63.87682-28.595268 63.87682-63.877843l0-95.821369c0-17.634636 14.298658-31.933293 31.943526-31.933293l63.877843 0c17.634636 0 31.933293 14.298658 31.933293 31.933293l0 159.699212C956.729385 836.939627 899.538849 894.125047 828.975746 894.125047L828.975746 894.125047zM249.938957 267.509636c12.921287-12.919241 33.884738-12.919241 46.807049 0l148.97087 148.971893L445.716876 94.89323c0-17.634636 14.300704-31.94762 31.933293-31.94762l63.875796 0c17.637706 0 31.945573 14.312984 31.945573 31.94762l0 321.588299 148.97087-148.971893c12.921287-12.919241 33.875528-12.919241 46.796816 0l46.814212 46.818305c12.921287 12.922311 12.921287 33.874505 0 46.807049L552.261471 624.930025c-1.140986 1.137916-21.664416 13.68365-42.315758 13.69286-20.87647 0.010233-41.878806-12.541641-43.020816-13.69286L203.121676 361.13499c-12.922311-12.933567-12.922311-33.884738 0-46.807049L249.938957 267.509636 249.938957 267.509636z"
                                    p-id="7626" fill="#999999"></path>
                            </svg>

                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="标题">
                        <div slot-scope='scope' style="display: flex;align-items: center;justify-content: center;">
                            <span>{{ scope.row.name }}</span>
                            <el-tag class="tags" v-if="scope.row.song.fee == 1 || scope.row.song.fee == 4">VIP</el-tag>
                            <el-tag class="tags" v-if="scope.row.song.fee == 1 || scope.row.song.fee == 4"
                                :style="{ borderColor: gettheme, color: gettheme }">
                                试听</el-tag>
                            <el-tag class="tags mvtag" @click="playMv(scope.row)" v-if="scope.row.song.mvid !== 0"
                                :style="{ borderColor: gettheme, color: gettheme }">
                                MV</el-tag>
                            <el-tag class="tags" v-if="scope.row.song.sqMusic"
                                :style="{ borderColor: gettheme, color: gettheme }">
                                SQ</el-tag>
                        </div>
                    </el-table-column>
                    <el-table-column label="歌手" width="260" :show-overflow-tooltip="true">
                        <template slot-scope='scope'>
                            <span @click="gotoArtistPage(item.id)" class="artist" v-for="(item, index) in scope.row.song.artists" :key="item.id">{{ item.name }} {{
                                    index === scope.row.song.artists.length - 1 ?
                                        '' : '/'
                            }}&nbsp</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="专辑">
                        <template slot-scope='scope'>
                            <span class="artist" @click="gotoAlbumPage(scope.row.song.album.id)">{{ scope.row.song.album.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="时长" width="180">
                        <template slot-scope='scope'>
                            <span class="playtime">{{ filterTime(scope.row.song.bMusic.playTime) }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import util from '@/tools/index'
export default {
    data() {
        return {
            curDate: new Date().getDate(),
            tableData: [],
            mvid: 0,
            audioList: [],
            util
        }
    },
    created() {
        this.getMusicInfo()
    },
    computed: {
        ...mapGetters(['gettheme'])
    },
    methods: {
        // 前往歌手页面
        gotoArtistPage(id) {
            this.$router.push({path: `artistPage?id=${id}`})
        },
        // 前往专辑页面
        gotoAlbumPage(id) {
            this.$router.push({path: `albumPage?id=${id}`})
        },
        // 播放MV
        playMv(row) {
            this.mvid = row.song.mvid
            this.$store.commit('setmvType', 3)
            this.$store.commit('setMvVisible', true)
        },
        // 获取全部歌曲信息
        getMusicInfo() {
            axios.get('/personalized/newsong?limit=30').then(res => {
                if (res.data && res.data.code == 200) {
                    this.tableData = res.data.result
                    for(let i = 0; i < this.tableData.length - 1; i++) {
                        axios.get(`/song/detail?ids=${this.tableData[i].id}`).then(res => {
                            if (res.data && res.data.code == 200) {
                                this.tableData[i].dt = res.data.songs[0].dt
                                this.tableData[i].al = res.data.songs[0].al
                            } else {
                                this.$message(res.message || '网络拥挤，请稍后再试')
                            }
                        })
                    }
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 播放全部
        playAll() {
            for(let i = this.tableData.length - 1; i >= 0; i--) {
                const audio = {
                    id: this.tableData[i].id,
                    dt: this.tableData[i].dt,
                    pic: this.tableData[i].picUrl,
                    name: this.tableData[i].name,
                    authors: this.tableData[i].ar,
                    isvip: this.tableData[i].fee === 1 || this.tableData[i].fee === 4,
                    al: this.tableData[i].al
                }
                this.$store.commit('unshiftPlayList', audio)
            }
        },
        // 播放音乐
        playMusic(item) {
            axios.get(`/song/detail?ids=${item.id}`).then(res => {
                if (res.data && res.data.code == 200) {
                    const audio = {
                        id: item.id,
                        dt: res.data.songs[0].dt,
                        pic: item.picUrl,
                        name: item.name,
                        authors: item.song.artists,
                        isvip: item.song.fee === 1 || item.song.fee === 4,
                        al: res.data.songs[0].al
                    }
                    this.$store.commit('unshiftPlayList', audio)
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 给每一行添加索引
        tableRowClassName({ row, rowIndex }) {
            row.index = rowIndex;
        },
        filterTime(timestamp) {
            let minutes = parseInt((timestamp % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = parseInt((timestamp % (1000 * 60)) / 1000);
            return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        }
    }
}
</script>

<style lang="less" scoped>
.songs_list {
    overflow: auto;

    .header_box {
        border-bottom: 1px solid rgb(154, 151, 151);

        .songs_list_header {
            display: flex;
            align-items: center;
            padding: 20px 20px 0 20px;

            .cur_date_box {
                position: relative;

                .cur_date {
                    position: absolute;
                    top: 40%;
                    left: 30px;
                    font-size: 32px;
                    font-weight: bold;
                }
            }

            .list_title {
                display: flex;
                flex-direction: column;
                margin-left: 20px;

                .row_first {
                    font-size: 22px;
                    font-weight: bold;
                    padding-bottom: 5px;
                }

                .row_second {
                    font-size: 12px;
                }
            }
        }

        .list_info {
            padding: 10px 20px 20px 20px;

            .play_all_btn {
                color: #fff;
            }

            .play_all_btn:hover {
                opacity: 0.9;
            }
        }
    }

    .artist {
        color: rgb(101, 101, 101);
        cursor: pointer;
    }

    .artist:hover {
        color: #000;
    }

    .playtime {
        color: rgb(156, 156, 187);
    }
}

.tags {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    transform: scale(0.833333);
    margin-left: 5px;
    border-color: rgb(254, 103, 46);
    color: rgb(254, 103, 46);
    background-color: unset;
    padding: 0 5px;
    opacity: .8;
}

.mvtag {
    opacity: .8;
    cursor: pointer;
}

.mvtag:hover {
    opacity: 1;
}
</style>

<style>

.cell {
    display: flex;
}
</style>

