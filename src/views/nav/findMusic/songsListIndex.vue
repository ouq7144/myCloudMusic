<template>
	<div class="contain">
		<!-- 菜单 -->
		<div class="nav">
				<div class="nav_box">
					<div v-for="item in navList" :key="item.index" class="nav_item"
						:style="{ borderBottom: 1 == item.index ? `2px solid ${gettheme}` : '0', fontWeight: 1 == item.index ? 'bold' : 'unset', fontSize: 1 == item.index ? '20px' : '16px' }"
						@click="navChange(item.index)">{{  item.label  }}</div>
				</div>
			</div>
		<div class="contains">
			<div class="container_box">
				<!-- 菜单 -->
				<div class="box" v-show="curContent == 0">
					<!-- 顶部歌单 -->
					<div class="top_box" v-show="curTag !== 7" @click="curContentChange(1)">
						<el-image v-if="songsList[0] !== undefined" :src="songsList[0].coverImgUrl" class="top_pic">
							<div slot="placeholder" class="top_pic">
								<el-image :src="require('@/assets/loading.gif')" class="top_pic"></el-image>
							</div>
						</el-image>
						<div class="info">
							<div class="tag">
								<svg t="1660554028096" class="icon icons" viewBox="0 0 1024 1024" version="1.1"
									xmlns="http://www.w3.org/2000/svg" p-id="2022" width="14" height="14">
									<path
										d="M899.6 276.5L705 396.4 518.4 147.5c-3.2-4.3-9.6-4.3-12.9 0L319 396.4 124.3 276.5c-5.7-3.5-13.1 1.2-12.2 7.9L188.5 865c1.1 7.9 7.9 14 16 14h615.1c8 0 14.9-6 15.9-14l76.4-580.6c0.8-6.7-6.5-11.4-12.3-7.9z m-126 534.1H250.3l-53.8-409.4 139.8 86.1L512 252.9l175.7 234.4 139.8-86.1-53.9 409.4zM512 509c-62.1 0-112.6 50.5-112.6 112.6S449.9 734.2 512 734.2s112.6-50.5 112.6-112.6S574.1 509 512 509z m0 160.9c-26.6 0-48.2-21.6-48.2-48.3 0-26.6 21.6-48.3 48.2-48.3s48.2 21.6 48.2 48.3c0 26.6-21.6 48.3-48.2 48.3z"
										p-id="2023" fill="#e7aa5a"></path>
								</svg>
								<span>精品歌单</span>
							</div>
							<div class="name">
								<span v-if="songsList[0] !== undefined">{{  songsList[0].name  }}</span>
							</div>
						</div>
					</div>
					<!-- 歌单分类 -->
					<div class="list_type">
						<div v-for="(item, index) in listTags" :key="index" class="type_item"
							:style="{ color: index == curTag ? gettheme : '#676767', backgroundColor: index == curTag ? colorRGB : 'unset' }"
							@click="typeChange(index)">
							<span class="type_item_text">{{  item  }}</span>
						</div>
					</div>
					<!-- 网友精选碟 -->
					<div class="lists">
						<div v-for="item in lists" :key="item.id" class="lists_item" @click="gotoSongsListPage(item.id)">
							<el-image :src="item.coverImgUrl" lazy class="lists_pic">
								<div slot="placeholder" class="lists_pic">
									<el-image :src="require('@/assets/loading.gif')" class="lists_pic"></el-image>
								</div>
							</el-image>
							<common-play-btn class="lists_play_btn"></common-play-btn>
							<div class="lists_info">
								<span class="lists_name">{{  item.name  }}</span>
							</div>
							<div class="lists_play_count">
								<span>▷{{  util.filterPlayCount(item.playCount)  }}</span>
							</div>
							<div class="lists_creator">
								<svg t="1660563375701" class="icon" viewBox="0 0 1024 1024" version="1.1"
									xmlns="http://www.w3.org/2000/svg" p-id="3029" width="12" height="12">
									<path
										d="M508.8 141.21c119.85 0 217.36 97.51 217.36 217.36S628.65 575.93 508.8 575.93s-217.36-97.51-217.36-217.36 97.51-217.36 217.36-217.36m0-76.71c-162.41 0-294.07 131.66-294.07 294.07S346.39 652.64 508.8 652.64s294.07-131.66 294.07-294.07S671.21 64.5 508.8 64.5z"
										p-id="3030" fill="#ffffff"></path>
									<path
										d="M106.1 959.5c-2.21 0-4.46-0.19-6.71-0.59-20.86-3.68-34.79-23.58-31.11-44.44 38.81-219.89 255.93-338.54 440.52-338.54 21.18 0 38.36 17.17 38.36 38.36s-17.17 38.36-38.36 38.36c-122.34 0-329.6 74.7-364.97 275.17-3.28 18.59-19.47 31.68-37.73 31.68z"
										p-id="3031" fill="#ffffff"></path>
									<path
										d="M917.9 959.5c-18.27 0-34.45-13.09-37.73-31.7-35.38-200.46-242.64-275.16-364.97-275.16-21.18 0-38.36-17.17-38.36-38.36s17.17-38.36 38.36-38.36c184.59 0 401.72 118.65 440.52 338.54 3.68 20.86-10.25 40.76-31.11 44.44-2.25 0.41-4.5 0.6-6.71 0.6z"
										p-id="3032" fill="#ffffff"></path>
								</svg>
								<span>{{  item.creator.nickname  }}</span>
							</div>
						</div>
					</div>
					<!-- 分页 -->
					<div class="pagination" v-if="lists.length > 0">
						<el-pagination background layout="prev, pager, next" :total="listsTotal" :page-size="100"
							:current-page.sync="currentPage" @current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</div>
				<div class="boutique" v-show="curContent == 1">
					<div class="boutique_title" @click="curContentChange(0)">
						<h3>返回歌单</h3>
					</div>
					<div class="boutique_box">
						<div v-for="item in songsList" :key="item.id" class="boutique_item">
							<el-image :src="item.coverImgUrl" class="boutique_pic" fit="cover"
								@click="gotoSongsListPage(item.id)">
								<div slot="placeholder" class="boutique_pic">
									<el-image :src="require('@/assets/loading.gif')" class="boutique_pic"></el-image>
								</div>
							</el-image>
							<common-play-btn class="boutique_play_btn"></common-play-btn>
							<div class="boutique_playcount">
								<span>▷{{  util.filterPlayCount(item.playCount)  }}</span>
							</div>
							<div class="boutique_info">
								<span class="boutique_name" @click="gotoSongsListPage(item.id)">{{  item.name  }}</span>
								<div class="boutique_creator">
									<span>by</span>
									<span class="boutique_creator_name">{{  item.creator.nickname  }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import commonPlayBtn from '@/components/commonPlayBtn.vue';
import util from '@/tools/index';
import { mapGetters } from 'vuex';
const listTags = [
	'华语',
	'流行',
	'摇滚',
	'民谣',
	'电子',
	'另类/独立',
	'轻音乐',
	'综艺',
	'影视原声',
	'ACG'
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
	components: { commonPlayBtn },
	data() {
		return {
			listTags, // 歌单菜单
			colorList, // 主题列表
			songsList: [], // 歌单列表
			curTag: 0, // 当前选中的标签
			colorRGB: '', // 主题颜色
			lists: [], // 网友精选碟
			listsTotal: 0, // 歌单数量
			tempTag: '华语', // 当前标签
			currentPage: 1, // 分页组件当前页码
			curContent: 0, // 当前页面(0: 网友精选碟 1.精品歌单)
			util,
			navList
		}
	},
	created() {
		// 获取歌单信息
		this.getSongsListInfo()
		// 获取主题颜色RGB格式
		this.getColorRGB()
		// 获取网友精选碟
		this.getTypeList()
	},
	computed: {
		...mapGetters(['gettheme'])
	},
	watch: {
		gettheme: function () {
			// 获取主题颜色RGB格式
			this.getColorRGB()
		}
	},
	methods: {
		// 点击导航栏
		navChange(index) {
			this.$router.push({path: this.navList[index].path})
		},
		// 前往歌单页面
		gotoSongsListPage(id) {
			// 跳转页面
			this.$router.push({ path: `/songsListPage?id=${id}` })
		},
		// 获取歌单信息
		getSongsListInfo(tag) {
			tag = typeof tag !== 'undefined' ? tag : '华语'
			axios.get(`/top/playlist/highquality?cat="${tag}"&limit=72`).then(res => {
				if (res.data && res.data.code == 200) {
					this.songsList = res.data.playlists
				} else {
					this.$message(`获取歌单信息失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
				}
			})
		},
		// 获取网友精选碟
		getTypeList(offset, tag) {
			if (typeof tag !== 'undefined') {
				this.tempTag = tag
				this.currentPage = 1
			}
			offset = typeof offset !== 'undefined' ? offset : 0
			tag = typeof tag !== 'undefined' ? tag : this.tempTag
			axios.get(`/top/playlist?cat=${tag}&limit=100&offset=${offset}`).then(res => {
				if (res.data && res.data.code == 200) {
					this.lists = res.data.playlists
					this.listsTotal = res.data.total
				} else {
					this.$message(`获取网友精选碟失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
				}
			})
		},
		// 点击歌单分类
		typeChange(index) {
			this.curTag = index
			this.getTypeList(0, this.listTags[index])
			this.getSongsListInfo(this.listTags[index])
		},
		// 翻页
		handleCurrentChange(val) {
			this.getTypeList((val - 1) * 100)
			this.refresh()
		},
		// 刷新页面
		refresh() {
			document.getElementsByClassName('el-main')[0].scrollTop = 0
			this.$forceUpdate()
		},
		// 获取主题颜色RGB格式
		getColorRGB() {
			this.colorList.forEach(item => {
				if (this.gettheme == item.key) {
					this.colorRGB = item.value
				}
			})
		},
		// 切换网友精选碟/精品歌单
		curContentChange(val) {
			this.curContent = val
		},
	}
}
</script>

<style lang="less" scoped>
.contain {
	.contains {
		display: flex;
		justify-content: center;
	}
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
	.container_box {
		width: 1080px;

		.box {

			// 顶部歌单
			.top_box {
				border-radius: 8px;
				background: #000;
				display: flex;
				cursor: pointer;

				// 歌单封面
				.top_pic {
					width: 140px;
					height: 140px;
					border-radius: 4px;
					padding: 20px;
				}

				// 歌单信息
				.info {
					padding: 20px 0;

					// 精品歌单标签
					.tag {
						margin-top: 20px;
						border-radius: 24px;
						border: 1px solid rgb(231, 170, 90);
						color: rgb(231, 170, 90);
						padding: 5px 10px;
						font-size: 14px;
						display: flex;
						align-items: center;
						width: 80px;

						// 标签内icon
						.icons {
							padding-right: 5px;
						}
					}

					// 顶部歌单名称
					.name {
						color: #fff;
						margin-top: 20px;
					}
				}
			}

			// 歌单分类
			.list_type {
				display: flex;
				padding: 20px 0;
				justify-content: flex-end;

				.type_item {
					font-size: 12px;
					color: rgb(103, 103, 103);
					cursor: pointer;
					padding: 3px 10px;
					border-radius: 24px;
				}

				.type_item:hover {
					color: #000;
				}
			}

			// 歌单列表
			.lists {
				display: flex;
				flex-wrap: wrap;

				.lists_item {
					padding: 0 8px 15px 8px;
					position: relative;

					.lists_pic {
						width: 200px;
						height: 200px;
						border-radius: 4px;
						cursor: pointer;
					}

					.lists_pic:hover+.lists_play_btn {
						display: block;
					}

					.lists_play_btn {
						position: absolute;
						right: 20px;
						top: 160px;
						display: none;
					}

					.lists_info {
						width: 200px;
						overflow: hidden;
						font-size: 14px;
						padding-top: 5px;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						/* 这里是超出几行省略 */
						overflow: hidden;
						color: rgb(55, 55, 55);

						.lists_name {
							cursor: pointer;
						}

						.lists_name:hover {
							color: #000;
						}
					}

					.lists_play_count {
						color: #fff;
						position: absolute;
						top: 5px;
						right: 12px;
						font-size: 12px;
					}

					.lists_creator {
						display: flex;
						align-items: center;
						color: #fff;
						position: absolute;
						left: 12px;
						top: 180px;
						font-size: 12px;

						span {
							margin-left: 5px;
						}
					}
				}
			}

			.pagination {
				width: 100%;
				display: flex;
				justify-content: center;
				padding: 20px 0;
			}
		}

		.boutique {
			.boutique_title {
				padding-bottom: 20px;
				cursor: pointer;
			}

			.boutique_box {
				display: flex;
				flex-wrap: wrap;

				.boutique_item {
					display: flex;
					width: 50%;
					margin-bottom: 20px;
					position: relative;

					.boutique_pic {
						width: 140px;
						height: 140px;
						border-radius: 4px;
						cursor: pointer;
					}

					.boutique_pic:hover+.boutique_play_btn {
						display: block;
					}

					.boutique_play_btn {
						position: absolute;
						top: 110px;
						left: 110px;
						display: none;
					}

					.boutique_playcount {
						position: absolute;
						top: 5px;
						left: 80px;
						font-size: 12px;
						color: #fff;
					}

					.boutique_info {
						display: flex;
						flex-direction: column;
						font-size: 12px;
						color: rgb(159, 159, 159);
						margin-left: 10px;

						.boutique_name {
							font-size: 14px;
							color: rgb(55, 55, 55);
							cursor: pointer;
							margin-top: 30px;
							margin-bottom: 15px;
						}

						.boutique_name:hover {
							color: #000;
						}

						.boutique_creator {
							cursor: pointer;

							.boutique_creator_name {
								margin-left: 10px;
							}
						}

						.boutique_creator:hover {
							color: rgb(103, 103, 103);
						}
					}
				}
			}
		}
	}
}
</style>