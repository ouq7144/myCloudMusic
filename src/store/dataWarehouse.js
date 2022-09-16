// 数据仓库
export default {
    state: {
        // 主题颜色
        theme: localStorage.getItem('theme') || '#ec4141',
        // 搜索历史
        searchHistory: localStorage.getItem('searchHistory'),
        // 登录状态flag (登录状态改变时+1，用于监听)
        loginFlag: 0,
        // 登录卡片
        loginCardVisible: false,
        // 登录状态
        loginState: undefined,
        // 更新数据标记
        dataFlag: 0
    },
    mutations: {
        settheme(state, payload) {
            state.theme = payload.val
        },
        setsearchHistory(state, payload) {
            state.searchHistory = payload.val
        },
        setloginFlag(state) {
            state.loginFlag += 1
        },
        setloginCardVisible(state, payload) {
            state.loginCardVisible = payload.val
        },
        setloginState(state, payload) {
            state.loginState = payload.val
        },
        setdataFlag(state) {
            state.dataFlag++
        }
    },
    getters: {
        gettheme(state) {
            return state.theme
        },
        getsearchHistory(state) {
            return JSON.parse(state.searchHistory)
        },
        getloginFlag(state) {
            return state.loginFlag
        },
        getloginCardVisible(state) {
            return state.loginCardVisible
        },
        getloginState(state) {
            return state.loginState
        },
        getdataFlag(state) {
            return state.dataFlag
        }
    }
}