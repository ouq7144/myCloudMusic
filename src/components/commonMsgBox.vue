<template>
    <div class="box" style="height: calc(100vh - 140px)">
        <div v-show="!isShowChatRoom">
            <!-- 消息顶部内容 -->
        <div class="box_title">
                <div class="title">
                    <span>消息</span>
                </div>
                <div :class="{'all_cancel': newMsgCount == 0}">
                    <span>一键已读</span>
                </div>
            </div>
            <!-- 导航栏 -->
            <div class="nav">
                <div class="nav_list">
                    <div
                        v-for="item in navList"
                        :key="item" class="nav_item"
                        :style="{background: item.index == curNavIndex ? 'rgb(187, 187, 187)' : '', color: item.index == curNavIndex ? '#fff' : ''}"
                        @click="navChange(item.index)"
                    >
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </div>
            <!-- 私信 -->
            <div v-if="curNavIndex == 0" class="private_letter_box">
                <div
                    v-for="item in privateLetter"
                    :key="item.lastMsgId"
                    class="private_letter"
                >
                    <div v-if="item.fromUser" class="pic_box">
                        <el-image :src="item.fromUser.avatarUrl" class="user_pic" fit="cover"></el-image>
                    </div>
                    <div class="letter_info">
                        <div class="from_user_info">
                            <div class="user_name">
                                <span @click="showChatRoom(item.fromUser.userId, item.fromUser.nickname)">{{ item.fromUser.nickname }}</span>
                            </div>
                            <div class="msg_time">
                                <span>{{ util.filterDay(item.lastMsgTime) }}</span>
                            </div>
                        </div>
                        <div class="msg_content">
                            <span @click="showChatRoom(item.fromUser.userId, item.fromUser.nickname)">{{ JSON.parse(item.lastMsg).msg }}</span>
                        </div>
                    </div>
                </div>
                <div v-show="privateLetter.length == 0" style="font-size: 12px; color: rgb(103, 103, 103);display: flex; align-items: center; justify-content: center; margin-top: 60px;">暂无内容</div>
            </div>
            <!-- 评论 -->
            <div v-if="curNavIndex == 1" class="comments_box">
                <div v-for="item in comments" :key="item.combindId" class="comment">
                    <div class="top_area">
                        <div class="pic_box" v-if="item.user">
                            <el-image :src="item.user.avatarUrl" fit="cover" class="user_pic"></el-image>
                        </div>
                        <div class="comment_info">
                            <div class="from_user_info">
                                <div class="user_name">
                                    <span>{{ item.user.nickname }}</span>
                                </div>
                                <div class="msg_time">
                                    <span>{{ util.filterDay(item.time) }}</span>
                                </div>
                            </div>
                            <div class="msg_content">
                                <span>回复我：{{ item.content }}</span>
                            </div>
                            <div class="content_box">
                                <div class="msg_content" style="margin: 0;">
                                    <span>{{ item.beRepliedContent }}</span>
                                </div>
                            </div>
                            <div class="reply" @click="showReply = !showReply">
                                <svg t="1662542489796" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2390" width="14" height="14"><path d="M288 444.8m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z" p-id="2391"></path><path d="M512 444.8m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z" p-id="2392"></path><path d="M736 444.8m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z" p-id="2393"></path><path d="M825.6 108.8H198.4C124.5 108.8 64 169.3 64 243.2v403.2c0 73.9 60.5 134.4 134.4 134.4H288c12.4 0 22.4-10 22.4-22.4 0-12.4-10-22.4-22.4-22.4h-89.6c-49.5 0-89.6-40.1-89.6-89.6V243.2c0-49.5 40.1-89.6 89.6-89.6h627.2c49.5 0 89.6 40.1 89.6 89.6v403.2c0 49.5-40.1 89.6-89.6 89.6H534.4c-9.7 0-19.1 3.1-26.9 9L341 876.3c-5.2 4.3-8.2 10.6-8.2 17.3 0 18.2 21.1 28.2 35.2 16.7l154.5-120.5c7.8-5.8 17.2-9 26.9-9h276.3c73.9 0 134.4-60.5 134.4-134.4V243.2c-0.1-73.9-60.6-134.4-134.5-134.4z" p-id="2394"></path></svg>
                                <span>回复</span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom_area">
                        <div class="comment_area">
                            <div class="reply_box" v-show="showReply">
                                <div class="input_comment">
                                    <el-input class="input" type="textarea" :rows="3" placeholder="请输入评论" v-model="yourComment"
                                        resize="none" maxlength="140" :show-word-limit="true">
                                    </el-input>
                                    <div class="tools">
                                        <div>
                                            <el-popover placement="bottom" width="300" trigger="click" popper-class="theme_box">
                                                <div class="emoji_box">
                                                    <div @click="addEmoji(item)" v-for="(item, index) in emojiList" :key="index"
                                                        class="emoji_item">
                                                        <span>{{ String.fromCodePoint(item) }}</span>
                                                    </div>
                                                </div>
                                                <svg slot="reference" t="1658519360638" class="icon icons" viewBox="0 0 1026 1024"
                                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2342" width="20"
                                                    height="20">
                                                    <path
                                                        d="M495.465 830.665c-187.138 0-264.948-168.222-268.193-175.401l62.966-28.307c2.486 5.49 62.207 134.667 205.194 134.667 153.067-1.795 211.302-129.213 213.685-134.633l63.103 27.996c-3.141 7.077-79.054 173.364-273.13 175.643l-3.625 0.034zM500.16 991.221c-256.974 0-466.034-209.060-466.034-466.034s209.060-466.034 466.034-466.034 466.034 209.060 466.034 466.034-209.060 466.034-466.034 466.034zM500.16 128.196c-218.897 0-396.991 178.094-396.991 396.991s178.094 396.991 396.991 396.991 396.991-178.094 396.991-396.991-178.059-396.991-396.991-396.991zM311.088 444.27c0 29.689 24.062 53.818 53.818 53.818s53.818-24.096 53.818-53.818-24.062-53.818-53.818-53.818-53.818 24.096-53.818 53.818zM580.765 444.27c0 29.689 24.062 53.818 53.818 53.818s53.818-24.096 53.818-53.818-24.062-53.818-53.818-53.818-53.818 24.096-53.818 53.818z"
                                                        p-id="2343"></path>
                                                </svg>
                                            </el-popover>
                                            <el-popover placement="bottom" width="200" trigger="click" popper-class="theme_box" v-show="followList && followList.length > 0">
                                                <div @click="addContacts(item)" v-for="item in followList" :key="item.userId"
                                                    class="toplic_item">
                                                    <span>@{{ item.nickname }}</span>
                                                </div>
                                                <svg slot="reference" t="1658519439106" class="icon icons" viewBox="0 0 1024 1024"
                                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2899" width="20"
                                                    height="20">
                                                    <path
                                                        d="M513.221155 1023.997336a511.99667 511.99667 0 0 1 0-1023.993339 521.099819 521.099819 0 0 1 375.67145 157.861939 478.692463 478.692463 0 0 1 133.216827 355.24487v2.664337c-27.531477 175.846211-139.877668 263.32526-234.461615 259.328755-73.047226-3.108393-123.669621-56.839179-129.220321-136.769275a22.202804 22.202804 0 0 1 20.648608-23.090916 22.202804 22.202804 0 0 1 23.757001 20.648608c3.774477 56.617151 37.078683 93.251779 86.812965 95.472059 75.933591 2.664337 164.522781-71.49303 188.279781-222.028044a434.952938 434.952938 0 0 0-121.227312-321.27458A476.916239 476.916239 0 0 0 513.221155 44.409605a467.591061 467.591061 0 0 0 0 935.182122 480.912743 480.912743 0 0 0 365.680189-166.076977 22.202804 22.202804 0 0 1 31.305954-2.664337 22.202804 22.202804 0 0 1 2.664336 31.305955 526.428492 526.428492 0 0 1-399.650479 181.840968z"
                                                        fill="#666666" p-id="2900"></path>
                                                    <path
                                                        d="M488.354014 773.549702a212.924894 212.924894 0 0 1-133.216826-49.95631c-112.568218-88.811218-121.44934-215.145175-24.423085-346.363749 86.590937-117.008779 238.680147-151.423126 339.258851-77.265759s116.786751 229.799026 32.860151 343.477384c-54.840927 73.713311-122.115424 119.451088-189.61195 128.33221a197.382931 197.382931 0 0 1-24.867141 1.776224z m-121.227312-369.898721c-58.171348 78.3759-102.354928 191.388174 16.208047 285.084008a164.300753 164.300753 0 0 0 124.779761 39.076936c55.507011-7.326925 112.124162-46.847917 159.638164-111.014022 69.494778-93.917863 58.837432-220.029792-23.757001-281.309532s-204.931885-29.307702-276.868971 67.940582z"
                                                        fill="#666666" p-id="2901"></path>
                                                </svg>
                                            </el-popover>
                                            <el-popover placement="bottom" width="200" trigger="click" popper-class="theme_box">
                                                <div @click="addToplic(item)" v-for="item in topicList" :key="item.actId"
                                                    class="toplic_item">
                                                    <span>#{{ item.title }}#</span>
                                                </div>
                                                <svg slot="reference" t="1658519477875" class="icon icons" viewBox="0 0 1219 1024"
                                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3074" width="20"
                                                    height="20">
                                                    <path
                                                        d="M1194.381437 280.314011h-108.713086a24.375131 24.375131 0 0 1 0-48.750263H1194.381437a24.375131 24.375131 0 0 1 0 48.750263zM955.261398 280.314011H73.125394a24.375131 24.375131 0 0 1 0-48.750263h882.136004a24.375131 24.375131 0 0 1 0 48.750263zM1145.631174 799.991811H390.002102a24.375131 24.375131 0 0 1 0-48.750262h755.629072a24.375131 24.375131 0 1 1 0 48.750262zM250.332599 799.991811H24.375131a24.375131 24.375131 0 0 1 0-48.750262h225.957468a24.375131 24.375131 0 1 1 0 48.750262z"
                                                        fill="#666666" p-id="3075"></path>
                                                    <path
                                                        d="M167.700904 1023.999269a20.231359 20.231359 0 0 1-8.287545-1.706259 24.375131 24.375131 0 0 1-14.625079-31.200169L499.690193 16.087587a24.399506 24.399506 0 0 1 45.825247 16.81884l-354.901913 975.005255a24.375131 24.375131 0 0 1-22.912623 16.087587zM684.69744 1023.999269a20.231359 20.231359 0 0 1-8.287545-1.706259 24.375131 24.375131 0 0 1-14.625078-31.200169l354.901912-975.005254a24.399506 24.399506 0 0 1 45.825247 16.81884l-354.901912 975.005255a24.375131 24.375131 0 0 1-22.912624 16.087587z"
                                                        fill="#666666" p-id="3076"></path>
                                                </svg>
                                            </el-popover>
                                        </div>
                                        <div>
                                            <div class="send_comment_btn">发送</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="comments.length == 0" style="font-size: 12px; color: rgb(103, 103, 103);display: flex; align-items: center; justify-content: center; margin-top: 60px;">暂无内容</div>
            </div>
            <!-- @我 -->
            <div v-if="curNavIndex == 2">
                <div style="font-size: 12px; color: rgb(103, 103, 103);display: flex; align-items: center; justify-content: center; margin-top: 60px;">暂无内容</div>
            </div>
            <!-- 通知 -->
            <div v-if="curNavIndex == 3" class="private_letter_box">
                <div
                    v-for="item in notices"
                    :key="item.id"
                    class="private_letter"
                >
                    <div class="pic_box">
                        <el-image :src="JSON.parse(item.notice).user.avatarUrl" class="user_pic" fit="cover"></el-image>
                    </div>
                    <div class="letter_info">
                        <div class="from_user_info">
                            <div class="user_name">
                                <span>{{ JSON.parse(item.notice).user.nickname }}</span>
                                <span style="color: #9F9F9F;">赞了你的评论</span>
                            </div>
                            <div class="msg_time">
                                <span>{{ util.filterDay(item.time) }}</span>
                            </div>
                        </div>
                        <div class="msg_content">
                            <span>{{ JSON.parse(item.notice).comment.content }}</span>
                        </div>
                    </div>
                </div>
                <div v-show="notices.length == 0" style="font-size: 12px; color: rgb(103, 103, 103);display: flex; align-items: center; justify-content: center; margin-top: 60px;">暂无内容</div>
            </div>
        </div>
        <!-- 聊天室 -->
        <div class="chat_box" v-show="isShowChatRoom">
            <div class="chat_top">
                <i class="el-icon-arrow-left" @click="isShowChatRoom = false"></i>
                <span>{{ curName }}</span>
            </div>
            <div class="chat_list">
                <div v-for="item in letterHistories" :key="item.lastMsgId" class="each_history">
                    <div class="top_area">
                        <span>{{ util.filterMin(item.time) }}</span>
                    </div>
                    <div class="bottom_area" :class="{'your_box': item.fromUser.userId == yourId}">
                        <div class="left_area" v-if="item.fromUser && item.fromUser.userId !== yourId">
                            <el-image :src="item.fromUser.avatarUrl" fit="cover" class="user_pic"></el-image>
                        </div>
                        <div class="right_area">
                            <div class="content_container" :class="{'your_container': item.fromUser.userId == yourId}">
                                <div class="content_box">{{ JSON.parse(item.msg).msg }}</div>
                                <div class="link_box" v-if="JSON.parse(item.msg).generalMsg">
                                    <div class="link_box_left">
                                        <el-image :src="JSON.parse(item.msg).generalMsg.cover" class="link_pic" fit="cover"></el-image>
                                    </div>
                                    <div class="link_box_right">
                                        <div v-if="JSON.parse(item.msg).generalMsg">{{ JSON.parse(item.msg).generalMsg.noticeMsg }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="left_area" v-if="item.fromUser && item.fromUser.userId == yourId">
                            <el-image :src="item.fromUser.avatarUrl" fit="cover" class="user_pic"></el-image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import util from '@/tools/index'
import { emojiList } from '@/tools/lists'
const navList = [
    {
        label: '私信',
        index: 0
    },
    {
        label: '评论',
        index: 1
    },
    {
        label: '@我',
        index: 2
    },
    {
        label: '通知',
        index: 3
    }
]
export default {
    data() {
        return {
            // 导航栏
            navList,
            // 导航栏所处位置
            curNavIndex: 0,
            // 私信
            privateLetter: [],
            // 新私信数量
            newMsgCount: 0,
            // 评论
            comments: [],
            // 工具类
            util,
            // 表情
            emojiList,
            // 回复内容
            yourComment: '',
            // 热门话题
            topicList: [],
            // 最近联系人
            followList: [],
            // 显示回复区域
            showReply: false,
            // 通知
            notices: [],
            // 是否显示聊天室
            isShowChatRoom: false,
            // 聊天记录
            letterHistory: [],
            // 聊天对象
            curName: '',
            // 当前登录用户id
            yourId: 0
        }
    },
    computed: {
        letterHistories() {
            return this.letterHistory.reverse()
        }
    },
    created() {
        // 获取私信
        this.getPrivateLetter()
        this.yourId = JSON.parse(localStorage.getItem('profile')).userId
        console.log(this.yourId, '123')
    },
    methods: {
        // 显示聊天室
        showChatRoom(id, name) {
            this.curName = name
            axios.get(`/msg/private/history?uid=${id}`).then(res => {
                this.letterHistory = res.data.msgs
            })
            this.isShowChatRoom = true
        },
        // 点击导航栏
        navChange(index) {
            this.curNavIndex = index
            if (index == 1) {
                this.getComments()
                this.getHotTopic()
                this.getContacts()
            } else if (index == 3) {
                this.getNotices()
            }
        },
        // 获取私信
        getPrivateLetter() {
            axios.get(`/msg/private`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '私信')
                    this.privateLetter = res.data.msgs
                    this.newMsgCount = res.data.newMsgCount
                } else {
                    this.$message('获取私信失败')
                }
            })
        },
        // 获取评论
        getComments() {
            axios.get(`/msg/comments?uid=${JSON.parse(localStorage.getItem('profile')).userId}`).then(res => {
                console.log(res)
                this.comments = res.data.comments
            })
        },
        // 获取通知
        getNotices() {
            axios.get(`/msg/notices`).then(res => {
                console.log(res)
                console.log(JSON.parse(res.data.notices[0].notice), '123')
                this.notices = res.data.notices
            })
        },
        // 获取热门话题
        getHotTopic() {
            axios.get(`/hot/topic`).then(res => {
                this.topicList = res.data.hot.splice(0, 8)
            })
        },
        // 获取最近联系人
        getContacts() {
            if (localStorage.getItem('profile')) {
                axios.get(`/msg/recentcontact`).then(res => {
                    if (res.data && res.data.code == 200) {
                        this.followList = res.data.data.follow
                    } else {
                        this.$message('获取最近联系人失败')
                    }
                })
            }
        },
        // 为评论添加表情
        addEmoji(item) {
            this.yourComment = this.yourComment  + `${String.fromCodePoint(item)}`
        },
        // 为评论添加@联系人
        addContacts(item) {
            this.yourComment = this.yourComment + '\xa0' + `@${item.nickname}` + '\xa0'
        },
        // 为评论添加话题
        addToplic(item) {
            this.yourComment = this.yourComment + '\xa0' + `#${item.title}#` + '\xa0'
        },
    }
}
</script>

<style lang="less" scoped>
.box {
    width: 360px;
    background: #fff;
    position: absolute;
    right: 0;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    z-index: 100;
    overflow: auto;
    .box_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            .title {
                font-size: 18px;
            }
            .all_cancel {
                color: rgb(219, 228, 238);
            }
        }
        .nav {
            display: flex;
            align-items: center;
            justify-content: center;
            .nav_list {
                border: 1px solid #BBBBBB;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 24px;
                .nav_item {
                    border-radius: 24px;
                    padding: 5px 24px;
                    font-size: 12px;
                }
                .nav_item:hover {
                    background: rgb(245, 245, 245);
                }
            }
        }
        .private_letter_box {
            margin-top: 10px;
            .private_letter {
                display: flex;
                padding: 0 20px;
                .pic_box {
                    padding: 10px 0;
                    .user_pic {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                }
                .letter_info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid #F2F2F2;
                    margin-left: 10px;
                    padding: 10px 0;
                    .from_user_info {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 12px;
                        .user_name {
                            cursor: pointer;
                            color: rgb(80, 125, 175);
                        }
                        .msg_time {
                            color: rgb(207, 207, 207);
                        }
                    }
                    .msg_content {
                        cursor: pointer;
                        font-size: 12px;
                        color: rgb(55, 55, 55);
                        width: 100%;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1; /* 这里是超出几行省略 */
                        overflow: hidden;
                        margin: 5px 0;
                    }
                    .content_box {
                        padding: 5px;
                        background: rgb(245, 245, 245);
                    }
                }
            }
            .private_letter:hover {
                background: rgb(246, 246, 247);
            }
        }
        .comments_box {
            margin-top: 10px;
            .comment {
                display: flex;
                flex-direction: column;
                .top_area {
                    display: flex;
                    padding: 0 20px;
                    .pic_box {
                        padding: 10px 0;
                        .user_pic {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            cursor: pointer;
                        }
                    }
                    .comment_info {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        margin-left: 10px;
                        padding: 10px 0;
                        .from_user_info {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 12px;
                            .user_name {
                                cursor: pointer;
                                color: rgb(80, 125, 175);
                            }
                            .msg_time {
                                color: rgb(207, 207, 207);
                            }
                        }
                        .msg_content {
                            font-size: 12px;
                            color: rgb(55, 55, 55);
                            width: 100%;
                            word-break: break-all;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1; /* 这里是超出几行省略 */
                            overflow: hidden;
                            margin: 5px 0;
                        }
                        .content_box {
                            cursor: pointer;
                            padding: 8px;
                            background: rgb(245, 245, 245);
                        }
                        .reply {
                            margin-top: 20px;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            justify-content: flex-end;
                            cursor: pointer;
                            span {
                                margin-left: 5px;
                                color: rgb(103, 103, 103);
                            }
                        }
                        .reply:hover span{
                            color: rgb(55, 55, 55);
                        }
                    }
                }
                .bottom_area {
                    margin-top: 10px;
                    padding: 0 20px;
                    .comment_area {
                        padding-bottom: 10px;
                        border-bottom: 1px solid #F2F2F2;
                        .reply_box {
                            .input_comment {
                        .input {
                            /deep/.el-textarea__inner {
                                border-color: rgb(229, 229, 229);
                            }
                        }
            
                        .tools {
                            margin-top: 10px;
                            display: flex;
                            justify-content: space-between;
            
                            .icons {
                                padding-right: 10px;
                            }
            
                            .send_comment_btn {
                                border-radius: 24px;
                                padding: 5px 16px;
                                font-size: 12px;
                                border: 1px solid #D9D9D9;
                                color: rgb(55, 55, 55);
                                cursor: pointer;
                            }
            
                            .send_comment_btn:hover {
                                background-color: rgb(245, 245, 245);
                            }
                        }
                    }
                        }
                    }
                }
            }
        }
        .chat_box {
            height: 100%;
            display: flex;
            flex-direction: column;
            .chat_top {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px 0;
                position: relative;
                i {
                    position: absolute;
                    left: 10px;
                    cursor: pointer;
                }
                span {
                    font-size: 12px;
                }
            }
            .chat_list {
                flex: 1;
                overflow-y: auto;
                .each_history {
                    display: flex;
                    flex-direction: column;
                    margin: 20px 0;
                    .top_area {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        color: rgb(153, 153, 154);
                        span {
                            padding: 3px 6px;
                            border-radius: 24px;
                            background: rgb(246, 246, 247);
                        }
                    }
                    .bottom_area {
                        display: flex;
                        align-items: flex-start;
                        margin-top: 20px;
                        .left_area {
                            padding: 0 15px 0 20px;
                            .user_pic {
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                cursor: pointer;
                            }
                        }
                        .right_area {
                            font-size: 12px;
                            .content_container {
                                max-width: 220px;
                                padding: 8px;
                                background: rgb(241, 242, 243);
                                border-bottom-left-radius: 16px;
                                border-bottom-right-radius: 16px;
                                border-top-right-radius: 16px;
                                .link_box {
                                    margin: 6px;
                                    padding: 6px;
                                    background: #fff;
                                    display: flex;
                                    align-items: flex-start;
                                    .link_box_left {
                                        .link_pic {
                                            width: 40px;
                                            border-radius: 4px;
                                            cursor: pointer;
                                        }
                                    }
                                    .link_box_right {
                                        margin-left: 5px;
                                    }
                                }
                                .link_box:hover {
                                    background: rgb(226, 227, 229);
                                }
                            }
                        }
                    }
                    .your_box {
                        justify-content: flex-end;
                    }
                    .your_container {
                        background: rgb(213, 231, 249) !important;
                        border-top-left-radius: 16px !important;
                        border-bottom-right-radius: 0 !important;
                    }
                }
            }
        }
}
</style>