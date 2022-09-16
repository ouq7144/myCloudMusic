<template>
    <div>
        <!-- 头部 -->
        <div class="header" :style="{ backgroundColor: gettheme }">
            <!-- 左侧内容 -->
            <div class="left_content">
                <!-- logo -->
                <img src="../assets/logo.png" class="logo" @click="toHome">
                <!-- 退到上一个页面 -->
                <div class="btn_background" @click="back">
                    <span class="btn">&lt</span>
                </div>
                <!-- 进到下一个页面 -->
                <div class="btn_background" @click="forward">
                    <span class="btn">></span>
                </div>
                <div>
                    <!-- 搜索框 -->
                    <el-input class="search_input" v-model="searchKeywords"
                        @keyup.enter.native="handleSearch(searchKeywords)" @focus="inputFocus" @blur="inputBlur">
                        <i slot="prefix" class="el-input__icon el-icon-search"
                            @click="handleSearch(searchKeywords)"></i>
                    </el-input>
                    <div class="popular" v-show="showHistory">
                        <!-- 历史搜索 -->
                        <div class="search_history" v-show="searchHistory.length > 0">
                            <span class="titles">历史搜索</span>
                            <i class="el-icon-delete delete_all_btn" @click="delAllHistory"></i>
                            <div class="tagbox">
                                <el-tag v-for="tag in searchHistory" :key="tag" type="info" closable
                                    class="history_tags" @close="delHistory(tag)" @click="handleSearch(tag)">
                                    {{ tag }}
                                </el-tag>
                            </div>
                        </div>
                        <!-- 热搜榜 -->
                        <div class="hot_searchs">
                            <span class="titles">热搜榜</span>
                            <div class="hotbox">
                                <div v-for="(item, index) in hotSearch" :key="item.score" class="each_item"
                                    @click="handleSearch(item.searchWord)">
                                    <div class="hot_index">
                                        <span class="hot_tempindex">{{ index + 1 }}</span>
                                    </div>
                                    <div class="item_right_content">
                                        <div class="right_first">
                                            <span class="search_word">{{ item.searchWord }}</span>
                                            <span class="show_hot" v-show="index === 0">Hot</span>
                                            <span class="search_score">{{ item.score }}</span>
                                        </div>
                                        <div v-show="item.content" class="right_second">
                                            <span class="search_content">{{ item.content }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右侧内容 -->
            <div class="right_content">
                <!-- 用户头像 -->
                <img :src="userImg" class="userImg" @click="login" v-show="!isLogin">
                <!-- 用户昵称 -->
                <span class="userName" @click="login" v-show="!isLogin">{{ userName }}</span>
                <!-- 退出登录 -->
                <el-popover placement="bottom" width="280" trigger="click" popper-class="theme_box" ref="popoverRef">
                    <div class="user_follow">
                        <div class="follow_item">
                            <div class="follow_number">{{ userInfo.userGender }}</div>
                            <div>动态</div>
                        </div>
                        <div class="follow_item second_item">
                            <div class="follow_number">{{ userInfo.userFollows }}</div>
                            <div>关注</div>
                        </div>
                        <div class="follow_item">
                            <div class="follow_number">{{ userInfo.userFolloweds }}</div>
                            <div>粉丝</div>
                        </div>
                    </div>
                    <div class="signin">
                        <span>签到</span>
                    </div>
                    <div class="outlogin_box">
                        <div v-for="item in outLoginList" :key="item" class="outlogin_item"
                            @click="clickOutLoginItem(item.event)">
                            {{ item.label }}
                        </div>
                    </div>
                    <div slot="reference" class="_user" v-show="isLogin">
                        <!-- 用户头像 -->
                        <img :src="userImg" class="userImg" @click="login">
                        <!-- 用户昵称 -->
                        <span class="userName" @click="login">{{ userName }}</span>
                    </div>
                </el-popover>
                <!-- 主题 -->
                <el-popover placement="bottom" width="350" trigger="click" popper-class="theme_box">
                    <div class="theme_title">纯色</div>
                    <div class="color_area">
                        <div v-for="item in themeData" :key="item" class="each_color"
                            :style="{ backgroundColor: item, border: `1px solid ${item === '#ffffff' ? '#000' : item}` }"
                            @click="changeTheme(item)">
                            <i v-show="util.getTheme() == item" class="el-icon-circle-check ischecked"></i>
                        </div>
                    </div>
                    <svg id="theme" t="1658244290365" class="icon icons" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2626" width="20" height="20" slot="reference">
                        <path
                            d="M752.8 143.2c3.2 0 6.3 1.3 8.5 3.5L955.6 341c5.5 5.5 5.5 14.3 0 19.8L864 452.5l-96-96V895H448v1H256V357.5l-96 96-91.6-91.6c-5.5-5.5-5.5-14.3 0-19.8L263 147.5c2.3-2.3 5.3-3.5 8.5-3.5H351c33.4 26.9 92.6 64 164.6 64 72.1 0 131.4-37.2 164.8-64.2l72.3-0.6h0.1z m0-64h-0.6l-83.8 0.7c-7.6 0.1-15 2.8-20.7 7.8-19.6 17-71.3 56.3-132.1 56.3-60.6 0-112.3-39.1-132-56.2-5.8-5.1-13.3-7.8-21-7.8h-91c-20.2 0-39.5 8-53.7 22.3L23.1 296.8c-30.5 30.5-30.5 79.8 0 110.3L128 512c8.8 8.8 20.4 13.3 32 13.3s23.2-4.4 32-13.3v416c0 17.7 14.3 32 32 32h288v-1h288c17.7 0 32-14.3 32-32V511c8.8 8.8 20.4 13.3 32 13.3s23.2-4.4 32-13.3l104.8-104.8c30.5-30.5 30.5-79.8 0-110.3L806.5 101.5c-14.2-14.2-33.6-22.3-53.7-22.3z"
                            p-id="2627" fill="#fff"></path>
                    </svg>
                </el-popover>
                <!-- 设置 -->
                <svg t="1658244646835" class="icon icons" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4348" width="20" height="20">
                    <path
                        d="M511.913993 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S564.894339 607.897867 511.913993 607.897867zM511.913993 479.919368c-17.545439 0-31.994625 14.449185-31.994625 31.994625s14.449185 31.994625 31.994625 31.994625 31.994625-14.449185 31.994625-31.994625S529.631446 479.919368 511.913993 479.919368z"
                        p-id="4349" fill="#fff"></path>
                    <path
                        d="M630.947757 960.010751c-9.976818 0-19.781623-4.816395-25.802117-13.073072L531.695616 846.309424c-13.589115 0.860071-25.974131 0.860071-39.563245 0l-73.450025 100.456241c-7.912649 10.836889-21.673778 15.653284-34.574836 11.868974-34.574836-9.804804-67.429531-23.393919-97.704015-40.251302-11.69696-6.536536-18.061482-19.609609-15.997312-32.854695l19.26558-123.334117c-9.804804-8.77272-19.093566-18.061482-27.866286-27.866286l-123.334117 19.26558c-13.073072 2.064169-26.318159-4.300353-32.854695-15.997312-16.857383-30.446498-30.446498-63.301193-40.251302-97.876029-3.612296-12.901058 1.032085-26.662187 11.868974-34.574836l100.456241-73.450025c-0.516042-6.880564-0.688056-13.417101-0.688056-19.781623s0.172014-12.901058 0.688056-19.781623l-100.456241-73.450025c-10.836889-7.912649-15.653284-21.673778-11.868974-34.574836 9.804804-34.574836 23.393919-67.429531 40.251302-97.704015 6.536536-11.69696 19.781623-18.061482 32.854695-15.997312l123.334117 19.26558c8.77272-9.804804 18.061482-19.093566 27.866286-27.866286l-19.26558-123.334117c-2.064169-13.245087 4.300353-26.318159 16.169326-32.854695 30.446498-16.857383 63.301193-30.446498 97.704015-40.251302 12.901058-3.612296 26.662187 1.032085 34.574836 11.868974l73.450025 100.456241c13.589115-0.860071 25.802117-0.860071 39.563245 0l73.450025-100.456241c7.912649-10.836889 21.673778-15.48127 34.574836-11.868974 34.402822 9.804804 67.257517 23.393919 97.704015 40.251302 11.69696 6.536536 18.061482 19.609609 15.997312 32.854695l-19.26558 123.334117c9.804804 8.77272 19.093566 18.061482 27.866286 27.694272l123.334117-19.26558c13.073072-2.064169 26.318159 4.300353 32.854695 15.997312 16.857383 30.446498 30.446498 63.301193 40.423316 97.876029 3.612296 12.901058-1.032085 26.662187-11.868974 34.574836L846.309424 492.13237c0.516042 6.880564 0.688056 13.417101 0.688056 19.781623 0 6.364522-0.172014 12.901058-0.688056 19.781623l100.456241 73.450025c10.836889 7.912649 15.48127 21.673778 11.868974 34.574836-9.804804 34.574836-23.393919 67.429531-40.423316 97.876029-6.536536 11.69696-19.437594 18.061482-32.854695 15.997312L762.194524 734.500252c-8.600706 9.804804-18.061482 19.093566-27.866286 27.694272l19.26558 123.334117c2.064169 13.245087-4.300353 26.318159-15.997312 32.854695-30.274483 16.857383-63.129179 30.446498-97.704015 40.251302C636.968251 959.494709 634.044011 960.010751 630.947757 960.010751zM337.147657 872.627583c13.933143 6.70855 28.554342 12.729044 43.51957 17.889467l70.525785-96.499916c6.70855-9.288762 18.061482-14.277171 29.414413-12.901058 20.641693 2.408198 42.143457 2.408198 62.613136 0 11.868974-1.376113 22.705863 3.612296 29.414413 12.901058l70.525785 96.499916c14.965228-5.160423 29.586427-11.180917 43.51957-17.889467l-18.40551-118.345708c-1.720141-11.352931 2.752226-22.877877 11.69696-29.930455 16.341341-13.073072 31.306568-27.866286 44.207626-44.207626 7.224593-8.944734 18.40551-13.589115 29.930455-11.69696l118.345708 18.40551c6.70855-13.933143 12.729044-28.554342 17.889467-43.51957l-96.499916-70.525785c-9.288762-6.70855-14.277171-18.061482-12.901058-29.414413 1.204099-10.320847 1.892155-20.641693 1.892155-31.306568s-0.688056-20.985721-1.892155-31.306568c-1.376113-11.352931 3.612296-22.705863 12.901058-29.414413l96.499916-70.525785c-5.160423-14.965228-11.180917-29.586427-17.889467-43.51957l-118.345708 18.40551c-11.352931 1.720141-22.877877-2.752226-29.930455-11.69696-12.901058-16.169326-27.694272-31.134554-44.207626-44.207626-8.944734-7.224593-13.417101-18.577524-11.69696-29.930455L686.852343 151.372417c-13.933143-6.70855-28.554342-12.729044-43.51957-17.889467l-70.525785 96.499916c-6.70855 9.288762-17.717453 14.449185-29.414413 12.901058-20.469679-2.408198-41.971443-2.408198-62.613136 0-11.524945 1.376113-22.705863-3.612296-29.586427-12.901058l-70.525785-96.499916c-14.965228 5.160423-29.586427 11.180917-43.51957 17.889467l18.40551 118.345708c1.720141 11.352931-2.752226 22.877877-11.69696 29.930455-16.341341 12.901058-31.134554 27.866286-44.207626 44.207626-7.224593 8.944734-18.577524 13.417101-29.930455 11.69696L151.372417 337.147657c-6.70855 13.933143-12.729044 28.554342-17.889467 43.51957l96.499916 70.525785c9.288762 6.70855 14.277171 18.061482 12.901058 29.586427-1.204099 10.148833-1.892155 20.641693-1.892155 31.134554 0 10.664875 0.688056 20.985721 1.892155 31.306568 1.376113 11.524945-3.612296 22.705863-12.901058 29.586427l-96.499916 70.525785c5.160423 14.965228 11.180917 29.586427 17.889467 43.51957l118.345708-18.40551c11.352931-1.720141 22.877877 2.752226 29.930455 11.69696 12.901058 16.341341 27.694272 31.134554 44.207626 44.207626 8.944734 7.224593 13.589115 18.577524 11.69696 29.930455L337.147657 872.627583z"
                        p-id="4350" fill="#fff"></path>
                </svg>
                <!-- 个人信箱 -->
                <svg @click="setmsgBoxVisible" t="1658244715900" class="icon icons separate" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5478" width="20" height="20">
                    <path
                        d="M62.58 212.3v599.17c0 11.27 9.14 20.41 20.41 20.41h856.06c11.27 0 20.41-9.14 20.41-20.41V212.3c0-11.27-9.14-20.41-20.41-20.41H82.99c-11.27 0-20.41 9.14-20.41 20.41zM840 255.89l-328 254.6-328-254.6h656z m-713.42 512V292.34l372.9 289.45a20.414 20.414 0 0 0 25.04 0l370.95-287.94v474.03H126.58z"
                        fill="#fff" p-id="5479"></path>
                </svg>
                <!-- 最小化 -->
                <svg t="1658244955247" class="icon icons" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="6540" width="20" height="20">
                    <path d="M98.23 451.003l829.685-1.992 0.154 64-829.685 1.992z" fill="#fff" p-id="6541"></path>
                </svg>
                <!-- 窗口化 -->
                <svg t="1658245035409" class="icon icons" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="7518" width="15" height="15" @click="windowIzation">
                    <path
                        d="M959.72 0H294.216a63.96 63.96 0 0 0-63.96 63.96v127.92H64.28A63.96 63.96 0 0 0 0.32 255.84V959.4a63.96 63.96 0 0 0 63.96 63.96h703.56a63.96 63.96 0 0 0 63.96-63.96V792.465h127.92a63.96 63.96 0 0 0 63.96-63.96V63.96A63.96 63.96 0 0 0 959.72 0zM767.84 728.505V959.4H64.28V255.84h703.56z m189.322 0H831.8V255.84a63.96 63.96 0 0 0-63.96-63.96H294.216V63.96H959.72z"
                        p-id="7519" fill="#fff"></path>
                </svg>
                <!-- 关闭 -->
                <svg t="1658245085825" class="icon icons" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="8550" width="18" height="18" @click="closeCurPage">
                    <path
                        d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                        p-id="8551" fill="#fff"></path>
                </svg>
            </div>
        </div>
        <common-login v-if="getloginCardVisible"></common-login>
        <common-msg-box v-if="msgBoxVisible"></common-msg-box>
    </div>
</template>

<script>
const outLoginList = [
    {
        label: '会员中心',
        event: 'gotoVipCenter'
    },
    {
        label: '等级',
        event: 'gotoLevel'
    },
    {
        label: '商城',
        event: 'gotoShop'
    },
    {
        label: '个人信息设置',
        event: 'gotoPersonalSetting'
    },
    {
        label: '绑定社交账号',
        event: 'gotoBanding'
    },
    {
        label: '我的客服',
        event: 'gotoKeFu'
    },
    {
        label: '退出登录',
        event: 'outLogin'
    }
]
import axios from '@/plugins/axios.js'
import screenfull from 'screenfull'
import commonLogin from './commonLogin.vue'
import commonMsgBox from './commonMsgBox.vue'
import util from '@/tools/index'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
export default {
    components: { commonLogin, commonMsgBox },
    data() {
        return {
            searchKeywords: '', // 搜索关键词
            searchHistory: [], // 搜索历史
            hotSearch: [], // 热搜榜
            userInfo: {
                userGender: 0, // 用户动态数量
                userFollows: 0, // 用户关注数量
                userFolloweds: 0, // 用户粉丝数量
            },
            showHistory: false, // 是否展示热搜榜&搜索历史
            isShowThemeBox: false, // 是否展示主题设置面板
            themeData: [
                '#ffffff',
                '#ff5c8a',
                '#ff7a9e',
                '#717ff9',
                '#4791eb',
                '#39afea',
                '#2bb669',
                '#6acc19',
                '#e2ab12',
                '#ff8f57',
                '#fd726d',
                '#ec4141'
            ],
            util,
            outLoginList,
            msgBoxVisible: false,
            isLogin: localStorage.getItem('profile') !== null ? true : false,
            userImg: localStorage.getItem('profile') !== null ? JSON.parse(localStorage.getItem('profile')).avatarUrl : require('../assets/userImg_noLogin.png'),
            userName: localStorage.getItem('profile') !== null ? JSON.parse(localStorage.getItem('profile')).nickname : '未登录',
            userId: localStorage.getItem('profile') !== null ? JSON.parse(localStorage.getItem('profile')).userId : 0
        }
    },
    computed: {
        ...mapGetters(['gettheme', 'getsearchHistory', 'getloginFlag', 'getloginCardVisible', 'getloginState']),
    },
    created() {
        // 添加鼠标点击监听事件，用于关闭热搜
        this.addClickEvent()
    },
    watch: {
        getloginState() {
            if (this.getloginState !== null) {
                this.userImg = JSON.parse(localStorage.getItem('profile')).avatarUrl
                this.userName = JSON.parse(localStorage.getItem('profile')).nickname
                this.userId = JSON.parse(localStorage.getItem('profile')).userId
                this.isLogin = true
            } else {
                this.userImg = require('../assets/userImg_noLogin.png')
                this.userName = '未登录'
                this.userId = 0
                this.isLogin = false
                this.$refs.popoverRef.doClose()
            }
        }
    },
    methods: {
        ...mapMutations(['setloginCardVisible', 'setloginState']),
        setmsgBoxVisible() {
            this.msgBoxVisible = !this.msgBoxVisible
        },
        clickOutLoginItem(event) {
            if (event == 'outLogin') {
                this.outLogin()
            }
        },
        // 退出登录
        outLogin() {
            axios.get(`/logout?timerstamp=${Date.now()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    localStorage.clear()
                    this.setloginState({val: null})
                    this.$message('退出登录成功')
                }
            })
        },
        // 获取用户粉丝数量
        getUserFunsInfo() {
            axios.get(`/user/detail?uid=${JSON.parse(localStorage.getItem('profile')).userId}`).then(res => {
                this.userInfo.userGender = res.data.profile.gender
                this.userInfo.userFollows = res.data.profile.follows
                this.userInfo.userFolloweds = res.data.profile.followeds
            })
        },
        // 添加鼠标点击监听事件，用于关闭热搜
        addClickEvent() {
            document.addEventListener('click', (e) => {
                if (e.target.className !== 'hot_tempindex' && e.target.className !== 'right_first' && e.target.className !== 'search_word' && e.target.className !== 'show_hot' && e.target.className !== 'search_score' && e.target.className !== 'right_second' && e.target.className !== 'search_content' && e.target.className !== 'el-input__inner' && e.target.className !== 'el-hot_searchs' && e.target.className !== 'titles' && e.target.className !== 'hotbox' && e.target.className !== 'each_item' && e.target.className !== 'hot_index' && e.target.className !== 'item_right_content' && e.target.className !== 'item_right_content') {
                    this.showHistory = false
                }
            })
        },
        // 搜索
        handleSearch(searchWord) {
            if (searchWord == '') return
            util.setsearchHistory(searchWord)
            // 为关键词赋值
            this.$router.push({ path: `/searchPage?keywords=${searchWord}` })
            // 关闭热搜/历史搜索
            this.showHistory = false
            // 关闭mv
            this.$store.commit('setMvVisible', false)
        },
        // 回到首页
        toHome() {
            this.$router.push({ path: '/findMusic' })
        },
        // 后退
        back() {
            window.history.back()
        },
        // 前进
        forward() {
            window.history.forward()
        },
        // 登录
        login() {
            // 判断当前登录状态
            if (JSON.parse(localStorage.getItem('profile'))) {
                // 获取用户粉丝数量
                this.getUserFunsInfo()
            } else {
                // 登录
                this.setloginCardVisible({ val: true })
            }
        },
        // 删除某项历史记录
        delHistory(key) {
            // // 找到该搜索记录对应的下标
            // const index = JSON.parse(localStorage.getItem('searchHistory')).indexOf(key)
            // // 删除该搜索记录
            // localStorage.getItem('searchHistory', JSON.stringify(JSON.parse(localStorage.getItem('searchHistory')).splice(index, 1)))
        },
        // 删除所有历史记录
        delAllHistory() {
            this.searchHistory = []
        },
        // 打开主题设置面板
        showTheme() {
            this.isShowThemeBox = !this.isShowThemeBox
        },
        // 切换主题
        changeTheme(item) {
            util.setTheme(item)
        },
        // 窗口化
        windowIzation() {
            screenfull.toggle()
        },
        // 关闭页面
        closeCurPage() {
            window.opener = null;
            window.open("about:blank", "_top").close()
        },
        // input聚焦时展示热搜榜&搜索历史
        inputFocus() {
            // 获取热搜榜
            axios.get('/search/hot/detail').then(res => {
                if (res.data && res.data.code == 200) {
                    this.hotSearch = res.data.data
                    this.showHistory = true
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // input失焦时关闭热搜榜&搜索历史
        inputBlur(e) {
            // if (e.target.className !== 'popular') {
            //     this.showHistory = false
            // }
        }
    }
}
</script>

<style lang="less">
.theme_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

<style lang="less" scoped>
.header {
    position: absolute;
    top: 0;
    height: 60px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.left_content {
    display: flex;
    align-items: center;
}

.right_content {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 20px;

    ._user {
        display: flex;
        align-items: center;
    }
}

.logo {
    cursor: pointer;
    margin-right: 70px;
}

.btn_background {
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.1);
    margin-left: 10px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    color: #fff;
}

.btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-55%, -55%);
}

.search_input {
    width: 150px;
    margin-left: 20px;

    /deep/.el-input__inner {
        border-radius: 24px;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.1);
        border: none;
        color: #fff;
    }

    /deep/.el-input__icon {
        line-height: 30px;
        color: #fff;
        cursor: pointer;
    }
}

.popular {
    width: 350px;
    height: 800px;
    position: absolute;
    top: 60px;
    left: 220px;
    box-shadow: 2px 2px 10px #909090;
    overflow: auto;
    background-color: #fff;
    z-index: 30;

    .titles {
        font-size: 14px;
        color: #4f4e4e;
        padding-left: 20px;
        line-height: 40px;
        margin-right: 10px;
    }

    .delete_all_btn {
        cursor: pointer;
    }

    .tagbox {
        padding: 0 20px;

        .history_tags {
            cursor: pointer;
            border-radius: 24px;
            background-color: unset;
            border-color: #939393;
            color: #4f4e4e;
            height: 25px;
            line-height: 25px;
            margin-right: 10px;
            margin-bottom: 10px;
        }
    }

    .hotbox {
        .each_item {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .hot_index {
                width: 60px;
                text-align: center;
            }

            .item_right_content {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                flex: 1;
                padding-right: 10px;

                .search_word {
                    font-size: 12px;
                    font-weight: bold;
                }

                .show_hot {
                    font-size: 12px;
                    font-style: oblique;
                    padding-left: 10px;
                    color: red;
                    font-weight: bold;
                }

                .search_score {
                    font-size: 12px;
                    color: #a3a0a0;
                    padding-left: 10px;
                }

                .search_content {
                    font-size: 12px;
                    color: #767474;
                    white-space: nowrap;
                    /*强制span不换行*/
                    display: inline-block;
                    /*将span当做块级元素对待*/
                    width: 275px;
                    /*限制宽度*/
                    overflow: hidden;
                    /*超出宽度部分隐藏*/
                    text-overflow: ellipsis;
                    /*超出部分以点号代替*/
                }
            }
        }

        .each_item:hover {
            background-color: #f3f3f3;
            cursor: pointer;
        }

        .each_item:nth-child(-n+3) {
            .hot_index {
                color: red;
            }
        }
    }
}

.userImg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}

.userName {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
    cursor: pointer;
    margin-right: 30px;
}

.userName::after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #fff;
    content: "";
    position: relative;
    width: 0;
    top: 13px;
    left: 10px;
}

.user_follow {
    display: flex;
    padding: 10px 0;

    .follow_item {
        font-size: 12px;
        color: rgb(103, 103, 103);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 30px;
        cursor: pointer;
    }

    .follow_item:hover {
        color: #000;
    }

    .first_item {
        padding-left: 0px;
    }

    .second_item {
        border-left: 1px solid #D9D9D9;
        border-right: 1px solid #D9D9D9;
    }

    .follow_number {
        font-size: 18px;
        font-weight: 500;
        color: #000;
    }
}

.signin {
    border: 1px solid #D9D9D9;
    border-radius: 24px;
    padding: 5px 24px;
    cursor: pointer;
    margin-top: 10px;
}

.outlogin_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 10px;

    .outlogin_item {
        padding: 10px 0;
        cursor: pointer;
    }

    .outlogin_item:hover {
        background: rgb(241, 242, 243);
    }
}

.icons {
    margin-left: 15px;
    cursor: pointer;
}

.separate {
    border-right: 1px solid #f7c7c4;
    padding-right: 20px;
}

.submit_btn {
    background-color: #ec4141 !important;
    border-color: #ec4141 !important;
    border-radius: 24px !important;
}

.theme_title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.color_area {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.each_color {
    width: 40px;
    height: 40px;
    background: red;
    margin: 5px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;

    .ischecked {
        background: red;
        border-radius: 50%;
        color: #fff;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translate(40%, 40%);
    }
}
</style>