export default {
    state: {
        isLogin: false, // 是否登录
        loginCardVisible: false, // 登录面板
        theme: '#ec4141', // 主题颜色
        songslistVisible: false, // 每日推荐歌单组件
        songsGatherVisible: false, // 歌单组件
        lyricVisible: false, // 歌词组件
        mvVisible: false, // MV组件
        mvType: 0, // MV类型 1.从歌单 2.从独家播放
        volume: 100, // 音量(0 - 1), 使用时需 / 100
        playType: 1, // 播放顺序 1.顺序播放 2.随机播放 3.单曲循环
        playList: [], // 播放列表
        sliderTime: 0,// 播放进度
        currentTime: 0, // 播放时间
        isPlaying: false, // 是否在播
        list: [], // 操作列表
        searchResultVisible: false, // 搜索组件
        keyWords: '', // 搜索关键字
        artistVisible: false, // 歌手详情组件
        mvListVisible: false, // 全部MV组件
        albumVisible: false, // 专辑组件
    },
    mutations: {
        setKeyWords(state, val) {
            state.keyWords = val
        },
        // 设置登录状态
        setIsLogin(state, val) {
            state.isLogin = val
        },
        // 打开/关闭登录面板
        setLoginCardVisible(state, val) {
            state.loginCardVisible = val
        },
        // 设置mv打开方式(1. 从歌单 2.从独家播放)
        setmvType(state, val) {
            state.mvType = val
        },
        // 设置是否在播放
        setIsPlaying(state, val) {
            state.isPlaying = val
        },
        // 设置播放进度
        setSliderTime(state, val) {
            state.sliderTime = val
        },
        // 设置播放时间
        setCurrentTime(state, val) {
            state.currentTime = val
        },
        // 将目标歌曲push入播放列表
        unshiftPlayList(state, val) {
            state.playList.unshift(val)
        },
        // 播放下一首音乐
        playNext(state) {
            state.playList.push(state.playList.shift())
        },
        // 播放上一首音乐
        playFront(state) {
            state.playList.unshift(state.playList.pop())
        },
        // 随机播放
        playRamdom(state, val) {
            state.playList[0] = state.playList.splice(val, 1, state.playList[0])[0]
        },
        // 设置播放顺序
        setPlayType(state, val) {
            state.playType = val
        },
        // 设置主题
        setTheme(state, val) {
            state.theme = val
        },
        // 打开/关闭每日推荐
        setSongslistVisible(state, val) {
            if (val) {
                state.list.unshift('setSongslistVisible')
            } else {
                for(let i = 0; i < state.list.length; i++) {
                    if (state.list[i] == 'setSongslistVisible') {
                        state.list.splice(i, 1)
                        break
                    }
                }
            }
            state.songslistVisible = val
        },
        // 打开/关闭专辑组件
        setAlbumVisible(state, val) {
            if (val) {
                state.list.unshift('setAlbumVisible')
            } else {
                for(let i = 0; i < state.list.length; i++) {
                    if (state.list[i] == 'setAlbumVisible') {
                        state.list.splice(i, 1)
                        break
                    }
                }
            }
            state.albumVisible = val
        },
        // 打开/关闭搜索
        setSearchResultVisible(state, val) {
            if (val) {
                state.list.unshift('setSearchResultVisible')
            } else {
                for(let i = 0; i < state.list.length; i++) {
                    if (state.list[i] == 'setSearchResultVisible') {
                        state.list.splice(i, 1)
                        break
                    }
                }
            }
            state.searchResultVisible = val
        },
        // 打开/关闭歌手详情
        setArtistVisible(state, val) {
            if (val) {
                state.list.unshift('setArtistVisible')
            } else {
                for(let i = 0; i < state.list.length; i++) {
                    if (state.list[i] == 'setArtistVisible') {
                        state.list.splice(i, 1)
                        break
                    }
                }
            }
            state.artistVisible = val
        },
        // 打开/关闭歌单
        setSongsGatherVisible(state, val) {
            if (val) {
                state.list.unshift('setSongsGatherVisible')
            } else {
                for(let i = 0; i < state.list.length; i++) {
                    if (state.list[i] == 'setSongsGatherVisible') {
                        state.list.splice(i, 1)
                        break
                    }
                }
            }
            state.songsGatherVisible = val
        },
        // 歌词板开/关
        setLyricVisible(state, val) {
            if (val) {
                state.list.unshift('setLyricVisible')
            } else {
                for(let i = 0; i < state.list.length; i++) {
                    if (state.list[i] == 'setLyricVisible') {
                        state.list.splice(i, 1)
                        break
                    }
                }
            }
            state.lyricVisible = val
        },
        // 打开/关闭MV
        setMvVisible(state, val) {
            if (val) {
                state.list.unshift('setMvVisible')
            } else {
                for(let i = 0; i < state.list.length; i++) {
                    if (state.list[i] == 'setMvVisible') {
                        state.list.splice(i, 1)
                        break
                    }
                }
            }
            state.mvVisible = val
        },
        // 打开/关闭全部MV
        setMvListVisible(state, val) {
            if (val) {
                state.list.unshift('setMvListVisible')
            } else {
                for(let i = 0; i < state.list.length; i++) {
                    if (state.list[i] == 'setMvListVisible') {
                        state.list.splice(i, 1)
                        break
                    }
                }
            }
            state.mvListVisible = val
        },
        // 设置音量
        setVolume(state, val) {
            state.volume = val
        }
    }
}