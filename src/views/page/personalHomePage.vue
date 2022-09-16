<!-- 个人主页 -->
<template>
    <div class="box">
        <div class="top_area">
            <div class="top_left_area">
                <el-image :src="picUrl" fit="cover" class="user_pic"></el-image>
            </div>
            <div class="top_right_area">
                <div class="user_nickname">
                    <span>{{ nickname }}</span>
                </div>
                <div class="user_info">
                    <div class="user_level">
                        <span>Lv{{ level }}</span>
                    </div>
                    <div class="btn_group">
                        <div class="btn">
                            <svg t="1661621906228" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1921" width="16" height="16"><path d="M512.06191 578.983577c-5.098111 0-10.196223-1.518586-14.582113-4.556783L74.989413 281.818527c-11.627828-8.05342-14.525831-24.00881-6.472412-35.637662 8.054443-11.627828 24.007787-14.525831 35.637662-6.472412L512.06191 522.216689l407.880641-282.508235c11.628852-8.05342 27.583219-5.15644 35.637662 6.471388 8.05342 11.627828 5.15644 27.584242-6.471388 35.637662L526.645047 574.426795C522.259156 577.464991 517.161045 578.983577 512.06191 578.983577z" p-id="1922"></path><path d="M936.868035 792.583396 89.571527 792.583396c-14.145162 0-25.611308-11.466146-25.611308-25.611308l0-511.028882c0-14.145162 11.467169-25.611308 25.611308-25.611308l847.296509 0c14.145162 0 25.611308 11.467169 25.611308 25.611308l0 511.028882C962.480366 781.117251 951.013197 792.583396 936.868035 792.583396zM115.183857 741.360781l796.072871 0L911.256728 281.554514 115.183857 281.554514 115.183857 741.360781z" p-id="1923"></path></svg>
                            <span>发私信</span>
                        </div>
                        <div class="btn">
                            <svg t="1661622021361" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3036" width="16" height="16"><path d="M936.7 488.6l-399.9-0.6 0.5-399.8c0-13.3-10.7-24-24-24-13.2 0-24 10.7-24 24l-0.5 399.8-399.8-0.5c-13.2 0-24 10.7-24 24s10.7 24 24 24l399.8 0.5-0.5 399.9c0 13.3 10.7 24 24 24 13.2 0 24-10.7 24-24l0.5-399.9 399.9 0.5c13.2 0 24-10.7 24-24 0-13.2-10.7-23.9-24-23.9z" p-id="3037" fill="#d81e06"></path></svg>
                            <span>关注</span>
                        </div>
                        <div class="round_btn">...</div>
                    </div>
                </div>
                <div class="user_follow">
                    <div class="follow_item first_item">
                        <div class="follow_number">{{ dynamicNum }}</div>
                        <div>动态</div>
                    </div>
                    <div class="follow_item second_item">
                        <div class="follow_number">{{ userFollowNum }}</div>
                        <div>关注</div>
                    </div>
                    <div class="follow_item">
                        <div class="follow_number">{{ userFunsNum }}</div>
                        <div>粉丝</div>
                    </div>
                </div>
                <div class="user_sign">
                    <span>个人介绍：</span>
                    <span>{{ signature }}</span>
                </div>
            </div>
        </div>
        <div class="bottom_area">
            <div class="nav">
				<div class="nav_box">
					<div v-for="item in navList" :key="item.index" class="nav_item"
						:style="{ borderBottom: curNavIndex == item.index ? `2px solid ${gettheme}` : '0', fontWeight: curNavIndex == item.index ? 'bold' : 'unset', fontSize: curNavIndex == item.index ? '20px' : '16px' }"
						@click="navChange(item.index)">{{ item.label }}</div>
				</div>
			</div>
            <div v-show="curNavIndex == 0" class="user_create">
                <div class="user_create_list">
                    <div class="list_item_pic_box">
                        <el-image class="list_item_pic" :src="require('@/assets/userListen.png')"></el-image>
                        <common-play-btn-vue class="play_btn_vue"></common-play-btn-vue>
                    </div>
                    <div class="item_name">
                        <span>听歌排行</span>
                    </div>
                    <div class="item_track_count">
                        <span>累计听歌{{ listenSongs }}首</span>
                    </div>
                </div>
                <div v-for="item in userCreateList" :key="item.id" class="user_create_list">
                    <div class="list_item_pic_box">
                        <el-image class="list_item_pic" :src="item.coverImgUrl"></el-image>
                        <common-play-btn-vue class="play_btn_vue"></common-play-btn-vue>
                        <div class="play_count">
                            <span>▷{{ item.playCount }}</span>
                        </div>
                    </div>
                    <div class="item_name">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="item_track_count">
                        <span>{{ item.trackCount }}首</span>
                    </div>
                </div>
            </div>
            <div v-show="curNavIndex == 1" class="user_create">
                <div v-for="item in userCollectList" :key="item.id" class="user_create_list">
                    <div class="list_item_pic_box">
                        <el-image class="list_item_pic" :src="item.coverImgUrl"></el-image>
                        <common-play-btn-vue class="play_btn_vue"></common-play-btn-vue>
                        <div class="play_count">
                            <span>▷{{ item.playCount }}</span>
                        </div>
                    </div>
                    <div class="item_name">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="item_track_count">
                        <span>{{ item.trackCount }}首</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import commonPlayBtnVue from '@/components/commonPlayBtn.vue';
import util from '@/tools/index'
const colorList = [
    {
        key: '#ffffff',
        value: 'rgba(255,255,255,.1)'
    },
    {
        key: '#ff5c8a',
        value: 'rgba(255,92,138,.1)'
    },
    {
        key: '#ff7a9e',
        value: 'rgba(255,122,158,.1)'
    },
    {
        key: '#717ff9',
        value: 'rgba(113,127,249,.1)'
    },
    {
        key: '#4791eb',
        value: 'rgba(71,145,235,.1)'
    },
    {
        key: '#39afea',
        value: 'rgba(57,175,234,.1)'
    },
    {
        key: '#2bb669',
        value: 'rgba(43,182,105,.1)'
    },
    {
        key: '#6acc19',
        value: 'rgba(106,204,25,.1)'
    },
    {
        key: '#e2ab12',
        value: 'rgba(226,171,18,.1)'
    },
    {
        key: '#ff8f57',
        value: 'rgba(255,143,87,.1)'
    },
    {
        key: '#fd726d',
        value: 'rgba(253,114,109,.1)'
    },
    {
        key: '#ec4141',
        value: 'rgba(236,65,65,.1)'
    }
]
const navList = [
	{
		label: '创建的歌单',
		index: 0
	},
	{
		label: '收藏的歌单',
		index: 1
	},
	{
		label: '创建的音乐专栏',
		index: 3
	}
]
export default {
    components: { commonPlayBtnVue },
    data() {
        return {
            // 用户头像
            picUrl: '',
            // 用户昵称
            nickname: '',
            // 用户等级
            level: 0,
            // 用户创建的歌单
            userCreateList: [],
            // 用户收藏的歌单
            userCollectList: [],
            // 用户关注数量
            userFollowNum: 0,
            // 用户粉丝数量
            userFunsNum: 0,
            // 用户动态数量
            dynamicNum: 0,
            // 用户累计听歌
            listenSongs: 0,
            // 用户个性签名
            signature: '',
            // 用户动态
            userDynamic: '',
            // 主题列表
            colorRGB: '',
            // 主题颜色列表
            colorList,
            // 导航列表
            navList,
            // 当前导航所在位置
            curNavIndex: 0,
            util
        }
    },
    computed: {
        ...mapGetters(['getuserId', 'gettheme'])
    },
    created() {
        // 获取用户信息
        this.getUserInfo()
        // 获取用户歌单
        this.getUserSongsList()
        // 获取主题颜色RGB格式
        this.getColorRGB()
        // 获取用户关注
        this.getUserFollows()
        // 获取用户粉丝
        this.getUserFuns()
        // 获取用户动态
        this.getUserDynamic()
    },
    watch: {
        gettheme() {
            // 获取主题颜色RGB格式
            this.getColorRGB()
        }
    },
    methods: {
        // 获取用户信息
        getUserInfo() {
            axios.get(`/user/detail?uid=${util.getUrlParam()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取用户信息')
                    // 用户头像赋值
                    this.picUrl = res.data.profile.avatarUrl
                    // 用户昵称赋值
                    this.nickname = res.data.profile.nickname
                    // 用户等级赋值
                    this.level = res.data.level
                    // 用户累计听歌赋值
                    this.listenSongs = res.data.listenSongs
                    // 用户关注数
                    this.userFollowNum = res.data.profile.follows
                    // 用户粉丝数
                    this.userFunsNum = res.data.profile.followeds
                    // 用户个性签名
                    this.signature = res.data.profile.signature
                    // 用户动态
                    this.userDynamic = res.data.profile.gender
                } else {
                    // this.$message(`获取用户信息失败，原因为：${res.data.message || '网络拥挤，请稍后再试！'}`)
                    console.log(res, '获取用户信息失败')
                }
            })
        },
        // 获取用户歌单
        getUserSongsList() {
            axios.get(`/user/playlist?uid=${util.getUrlParam()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取用户歌单')
                    res.data.playlist.forEach((item) => {
                        // 如果歌单创建者id与该用户id一致则为用户创建的歌单
                        if (item.creator.userId == util.getUrlParam()) {
                            this.userCreateList.push(item)
                            // 如果歌单创建者id与该用户id不一致则为用户收藏的歌单
                        } else {
                            this.userCollectList.push(item)
                        }
                    })
                } else {
                    this.$message(`获取用户歌单失败，原因为：${res.data.message || '网络拥挤，请稍后再试！'}`)
                }
            })
        },
        // 获取用户关注数
        getUserFollows() {
            axios.get(`/user/follows?uid=${util.getUrlParam()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取用户关注')
                    this.userFollowNum = res.data.follow.length
                } else {
                    this.$message(`获取用户关注数失败，原因为：${res.data.message || '网络拥挤，请稍后再试！'}`)
                }
            })
        },
        // 获取用户粉丝数
        getUserFuns() {
            axios.get(`/user/followeds?uid=${util.getUrlParam()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取用户粉丝数')
                    this.userFunsNum = res.data.size
                } else {
                    this.$message(`获取用户粉丝数失败，原因为：${res.data.message || '网络拥挤，请稍后再试！'}`)
                }
            })
        },
        // 获取用户动态
        getUserDynamic() {
            axios.get(`/user/event?uid=${util.getUrlParam()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取用户动态')
                    this.dynamicNum = res.data.size
                } else {
                    this.$message(`获取用户动态失败，原因为：${res.data.message || '网络拥挤，请稍后再试！'}`)
                }
            })
        },
        // 点击导航栏
        navChange(index) {
            this.curNavIndex = index
        },
        // 获取主题颜色RGB格式
        getColorRGB() {
            this.colorList.forEach(item => {
                if (this.gettheme == item.key) {
                    this.colorRGB = item.value
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
.box {
    padding: 20px;
    .top_area {
        display: flex;
        .top_left_area {
            .user_pic {
                width: 180px;
                height: 180px;
                border-radius: 50%;
            }
        }
        .top_right_area {
            flex: 1;
            padding-left: 20px;
            .user_nickname {
                font-size: 20px;
                font-weight: bold;
                padding-bottom: 10px;
            }
            .user_info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #D9D9D9;
                padding-bottom: 10px;
                .user_level {
                    span {
                        font-size: 12px;
                        background: rgb(240, 240, 240);
                        border-radius: 24px;
                        padding: 1px 8px;
                    }
                }
                .btn_group {
                    display: flex;
                    .btn {
                        border-radius: 24px;
                        border: 1px solid #D9D9D9;
                        padding: 4px 12px;
                        font-size: 14px;
                        cursor: pointer;
                        margin-right: 5px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        span {
                            margin-left: 5px;
                        }
                    }
                    .btn:hover {
                        background: rgb(242, 242, 242);
                    }
                    .round_btn {
                        padding: 0 8px;
                        display: flex;
                        align-items: baseline;
                        justify-content: center;
                        border-radius: 50%;
                        font-size: 14px;
                        border: 1px solid #D9D9D9;
                        cursor: pointer;
                    }
                    .round_btn:hover {
                        background: rgb(242, 242, 242);
                    }
                }
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
            .user_sign {
                font-size: 12px;
                color: rgb(103, 103, 103);
            }
            .user_sign>span {
                font-size: 14px;
                color: rgb(55, 55 ,55);
            }
        }
    }
    .bottom_area {
        padding-top: 20px;
        .nav {
            display: flex;
            padding: 20px 0;
            align-items: center;
            justify-content: space-between;

            .nav_box {
                display: flex;
                align-items: baseline;

                .nav_item {
                    margin-right: 20px;
                    padding-bottom: 5px;
                    color: rgb(55, 55, 55);
                    cursor: pointer;
                    font-size: 16px;
                }

                .nav_item:hover {
                    color: #000;
                }

            }

            .total {
                font-size: 12px;
                color: rgb(159, 159, 159);
            }
        }
        .user_create {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .user_create_list {
                padding: 0 20px 20px 0;
                .list_item_pic_box {
                    position: relative;
                    cursor: pointer;
                    .list_item_pic {
                        width: 260px;
                        height: 260px;
                        border-radius: 4px;
                    }
                    .play_btn_vue {
                        display: none;
                        position: absolute;
                        bottom: 20px;
                        right: 20px;
                        padding: 0;
                        width: 40px;
                        height: 40px;
                    }
                    .play_count {
                        position: absolute;
                        top: 5px;
                        right: 5px;
                        color: #fff;
                        font-size: 12px;
                    }

                }
                .list_item_pic_box:hover .play_btn_vue {
                    display: block;
                }
                .item_name {
                    margin: 5px 0;
                    font-size: 14px;
                    color: rgb(55, 55, 55);
                    cursor: pointer;
                    width: 260px;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1; /* 这里是超出几行省略 */
                    overflow: hidden;
                }
                .item_name:hover {
                    color: #000;
                }
                .item_track_count {
                    font-size: 12px;
                    color: rgb(159, 159, 159);
                }
            }
        }
    }
}
</style>