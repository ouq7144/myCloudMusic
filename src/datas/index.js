// 设置搜索关键字
function setKeyWords(val) {
    console.log(getKeyWords() !== null)
    let arr = []
    if (getKeyWords() !== null) {
        arr = [...getKeyWords()]
    }
    arr.unshift(val)
    sessionStorage.setItem('keywords', JSON.stringify(arr))
}

// 获取搜索关键字
function getKeyWords() {
    return JSON.parse(sessionStorage.getItem('keywords'))
}

const datas = {
    setKeyWords,
    getKeyWords
}

export default datas