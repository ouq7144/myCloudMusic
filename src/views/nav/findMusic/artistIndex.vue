<template>
    <div class="box">
		<!-- 菜单 -->
		<div class="nav">
			<div class="nav_box">
				<div v-for="item in navList" :key="item.index" class="nav_item"
					:style="{ borderBottom: 3 == item.index ? `2px solid ${gettheme}` : '0', fontWeight: 3 == item.index ? 'bold' : 'unset', fontSize: 3 == item.index ? '20px' : '16px' }"
					@click="navChange(item.index)">{{  item.label  }}</div>
			</div>
		</div>
		<div class="contain">
			<div class="container">
				<div class="type_box">
					<div class="yuzhong_box">
						<div>
							<span>语种：</span>
						</div>
						<div
							v-for="(item, index) in yuzhongList"
							:key="index"
							class="yuzhong_item"
							:style="{color: index == curYuzhong ? gettheme : '#676767', backgroundColor: index == curYuzhong ? colorRGB : 'unset'}"
							@click="typeChange(1, index)"
						>
							<span>{{ item.label }}</span>
						</div>
					</div>
					<div class="yuzhong_box">
						<div>
							<span>分类：</span>
						</div>
						<div
							v-for="(item, index) in fenleiList"
							:key="index"
							class="yuzhong_item"
							:style="{color: index == curFenlei ? gettheme : '#676767', backgroundColor: index == curFenlei ? colorRGB : 'unset'}"
							@click="typeChange(2, index)"
						>
							<span>{{ item.label }}</span>
						</div>
					</div>
					<div class="yuzhong_box">
						<div>
							<span>筛选：</span>
						</div>
						<div
							v-for="(item, index) in shaixuanList"
							:key="index"
							class="yuzhong_item"
							:style="{color: index == curShaixuan ? gettheme : '#676767', backgroundColor: index == curShaixuan ? colorRGB : 'unset'}"
							@click="typeChange(3, index)"
						>
							<span>{{ item }}</span>
						</div>
					</div>
				</div>
				<div class="artists_list" v-infinite-scroll="load">
					<div v-for="item in artists" :key="item.id" class="artist_item">
						<el-image :src="item.img1v1Url" lazy class="artist_pic" @click="gotoArtistPage(item.id)">
							<div slot="placeholder" class="artist_pic">
								<el-image :src="require('@/assets/loading.gif')" class="artist_pic"></el-image>
							</div>
						</el-image>
						<div>
							<span class="artist_name" @click="gotoArtistPage(item.id)">{{ item.name }}</span>
						</div>
					</div>
					<div class="empty_box"></div>
					<div class="empty_box"></div>
					<div class="empty_box"></div>
					<div class="empty_box"></div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
const yuzhongList = [
    {
        label: '全部',
        val: -1
    },
    {
        label: '华语',
        val: 7
    },
    {
        label: '欧美',
        val: 96
    },
    {
        label: '日本',
        val: 8
    },
    {
        label: '韩国',
        val: 16
    },
    {
        label: '其他',
        val: 0
    }
]
const fenleiList = [
    {
        label: '全部',
        val: -1
    },
    {
        label: '男歌手',
        val: 1
    },
    {
        label: '女歌手',
        val: 2
    },
    {
        label: '乐队组合',
        val: 3
    }
]
const shaixuanList = [
    '热门',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
]
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
		label: '个性推荐',
		index: 0,
		path: '/findMusic'
	},
	{
		label: '歌单',
		index: 1,
		path: '/findMusic/songsList'
	},
	{
		label: '排行榜',
		index: 2,
		path: '/findMusic/topList'
	},
	{
		label: '歌手',
		index: 3,
		path: '/findMusic/artist'
	},
	{
		label: '最新音乐',
		index: 4,
		path: '/findMusic/newList'
	}
]
export default {
    data() {
        return {
            yuzhongList, // 语种
            fenleiList, // 分类
            shaixuanList, // 筛选
            colorList, // 颜色列表
            curYuzhong: 0, // 当前语种
            curFenlei: 0, // 当前分类
            curShaixuan: 0, // 当前筛选
            colorRGB: '', // 当前主题颜色
            artists: [], // 歌手列表
            more: true, // 是否有更多歌手
            offset: -30, // 接口数据偏移量
            isHandle: false, // 是否手动筛选
			navList
        }
    },
    created() {
        // 获取主题颜色RGB格式
        this.getColorRGB()
    },
    computed: {
        ...mapGetters(['gettheme'])
    },
    watch: {
        gettheme:function() {
            // 获取主题颜色RGB格式
            this.getColorRGB()
        }
    },
    methods: {
		// 点击导航栏
		navChange(index) {
			this.$router.push({path: this.navList[index].path})
		},
        // 前往歌手页面
        gotoArtistPage(id) {
            // 跳转页面
            this.$router.push({path: `/artistPage?id=${id}`})
        },
        // 获取歌手信息
        getArtists() {
            axios.get(`/top/artists?offset=${this.offset}&limit=30`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取歌手信息')
                    res.data.artists.forEach(item => {
                        this.artists.push(item)
                    })
                    this.more = res.data.more
                } else {
                    this.$message(`获取歌手信息失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 筛选歌手信息
        chooseArtists() {
            axios.get(`/artist/list?limit=30&offset=${this.offset}&type=${this.fenleiList[this.curFenlei].val}&area=${this.yuzhongList[this.curYuzhong].val}&initial=${this.shaixuanList[this.curShaixuan] == '热门' ? -1 : this.shaixuanList[this.curShaixuan]}`).then(res => {
                if (res.data && res.data.code == 200) {
                    res.data.artists.forEach(item => {
                        this.artists.push(item)
                    })
                    this.more = res.data.more
                } else {
                    this.$message(`筛选歌手信息失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 滑动到最底部时
        load() {
            if (!this.isHandle) {
                // 如果还有更多
                if (this.more) {
                    // 偏移量递增
                    this.offset += 30
                    // 再次调用接口获取更多歌手信息
                    this.getArtists()
                }
            } else {
                // 如果还有更多
                if (this.more) {
                    // 偏移量递增
                    this.offset += 30
                    // 再次调用接口获取更多歌手信息
                    this.chooseArtists()
                }
            }
        },
        // 获取主题颜色RGB格式
        getColorRGB() {
            this.colorList.forEach(item => {
                if (this.gettheme == item.key) {
                    this.colorRGB = item.value
                }
            })
        },
        // 筛选歌手
        typeChange(type, index) {
            if (type == 1) {
                this.curYuzhong = index
            } else if (type == 2) {
                this.curFenlei = index
            } else if (type == 3) {
                this.curShaixuan = index
            }
            this.isHandle = true
            this.more = true
            this.offset = 0
            this.artists = []
            this.chooseArtists()
        },
    }
}
</script>

<style lang="less" scoped>
.box {
	.nav {
		display: flex;
		padding: 20px;
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
	.contain {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.container {
			width: 1080px;
			.type_box {
				.yuzhong_box {
					display: flex;
					font-size: 12px;
					align-items: center;
					padding-bottom: 15px;
					.yuzhong_item {
						color: rgb(103, 103, 103);
						cursor: pointer;
						padding: 3px 15px;
						border-radius: 24px;
					}
					.yuzhong_item:hover {
						color: #000;
					}
				}
			}
			.artists_list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-evenly;
				.artist_item {
					padding: 10px;
					display: flex;
					flex-direction: column;
					width: 160px;
					.artist_pic {
						width: 160px;
						height: 160px;
						border-radius: 4px;
						padding-bottom: 5px;
						cursor: pointer;
					}
					.artist_name {
						color: rgb(55, 55, 55);
						font-size: 14px;
						cursor: pointer;
					}
					.artist_name:hover {
						color: #000;
					}
				}
				.empty_box {
					width: 160px;
					height: 0;
					padding: 10px;
				}
			}
		}
	}
}
</style>