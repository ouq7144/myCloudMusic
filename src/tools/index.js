import store from "@/store";

// 毫秒转分:秒
function filterTime(timestamp) {
    let minutes = parseInt((timestamp % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = parseInt((timestamp % (1000 * 60)) / 1000);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// 时间戳转年月日
function filterDay(timestamp) {
    let date = new Date(timestamp)
    let year = date.getFullYear() + '-';
    let mouth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let day = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    return year + mouth + day
}

// 时间戳转年月日时分
function filterMin(timestamp) {
    let date = new Date(timestamp)
    let year = date.getFullYear() + '-';
    let mouth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let day = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    let hours = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours() + ' ');
    let mins = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes() + ' ');
    return year + mouth + day + hours + ':' + mins
}

// 时间戳转时分
function filterSeconds(timestamp) {
    let date = new Date(timestamp);
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    return h + m
}

// 播放次数格式化
function filterPlayCount(playCount) {
    if (playCount < 10000) {
        return playCount
    } else if (playCount >= 10000 && playCount < 100000000) {
        return (Math.floor(playCount / 1000) / 10) + '万'
    } else if (playCount >= 100000000) {
        return (Math.floor(playCount / 10000) / 10000) + '亿'
    }
}

// 字符串前面补0
function computedIndex(length, index) {
    let len = length.toString().length
    let temp = ''
    for (let i = (index + 1).toString().length; i < len; i++) {
        temp += '0'
    }
    return `${temp}${index + 1}`
}

// 获取url中的参数
function getUrlParam() {
    return decodeURIComponent(window.location.search).slice(decodeURIComponent(window.location.search).indexOf('=') + 1)
}

// 设置主题
function setTheme(val) {
    store.commit('settheme', {val: val})
    localStorage.setItem('theme', val)
}

// 获取主题
function getTheme() {
    return localStorage.getItem('theme') || '#ec4141'
}

// 设置历史搜索
function setsearchHistory(val) {
    let arr
    if (JSON.parse(localStorage.getItem('searchHistory')) == null) {
        arr = []
    } else {
        arr = JSON.parse(localStorage.getItem('searchHistory'))
    }
    // 判断该搜索内容是否存在于数组中
    let index = arr.indexOf(val)
    // 如果该搜索内容不在搜索历史中则加入数组，如果已在搜索历史中则置顶
    index === -1 ? arr.unshift(val) : arr.unshift(arr.splice(index, 1)[0])
    localStorage.setItem('searchHistory', JSON.stringify(arr))
    store.commit('setsearchHistory', {val: JSON.stringify(arr)})
}

// 获取历史搜索
function getsearchHistory() {
    return JSON.parse(localStorage.getItem('searchHistory'))
}

const util = {
    filterTime,
    filterDay,
    filterSeconds,
    filterPlayCount,
    computedIndex,
    getUrlParam,
    setTheme,
    getTheme,
    setsearchHistory,
    getsearchHistory,
    filterMin
}

export default util