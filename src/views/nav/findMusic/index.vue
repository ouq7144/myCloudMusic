<template>
	<div>
		<div class="main_container">
			<!-- 菜单 -->
			<div class="nav">
				<div class="nav_box">
					<div v-for="item in navList" :key="item.index" class="nav_item"
						:style="{ borderBottom: 0 == item.index ? `2px solid ${gettheme}` : '0', fontWeight: 0 == item.index ? 'bold' : 'unset', fontSize: 0 == item.index ? '20px' : '16px' }"
						@click="navChange(item.index)">{{  item.label  }}</div>
				</div>
			</div>
			<div class="contains">
				<div>
					<!-- 轮播图 -->
					<div class="banner_box">
						<div class="banner">
							<el-carousel :interval="4000" type="card" height="200px">
								<el-carousel-item v-for="item in banner" :key="item.imageUrl">
									<div class="each_banner">
										<img :src="item.imageUrl" alt="" class="banner_img">
										<div class="img_title" :style="{ background: item.titleCol }">{{  item.typeTitle 
											}}
										</div>
									</div>
								</el-carousel-item>
							</el-carousel>
						</div>
					</div>
					<!-- 推荐歌单 -->
					<div class="list_title">
						<h3 class="router_title">推荐歌单</h3>
					</div>
					<div class="recommond_box">
						<div class="recommond_list">
							<div class="each_songslist">
								<div class="songslist_name" style="cursor: pointer;" @click="gotoDayRecommondPage">
									<img src="@/assets/dayRecommond.png" alt="" class="songlist_pic">
									<p class="cur_date">{{  curDate  }}</p>
									<span class="play_count">每日歌曲推荐</span>
								</div>
							</div>
							<div v-for="item in recommondList" :key="item.id" class="each_songslist"
								@click="gotoSongsListPage(item.id)">
								<div class="each_songslist_box">
									<!-- <img :src="item.picUrl" alt="" class="songlist_pic"> -->
									<el-image :src="item.picUrl" class="songlist_pic" fit="cover">
										<div slot="placeholder" class="songlist_pic">
											<el-image :src="require('@/assets/loading.gif')"></el-image>
										</div>
									</el-image>
									<span class="play_count">▷ {{  item.tempCount  }}</span>
								</div>
								<div class="songslist_name">
									<span>{{  item.name  }}</span>
								</div>
							</div>
						</div>
					</div>
					<!-- 热门播客
					<div class="list_title box_padding">
						<h3 class="router_title">热门播客</h3>
					</div>
					<div class="hot_box">
						<div class="hot_players">
							<div v-for="item in playerList" :key="item.id" class="each_player">
								<img :src="item.picUrl" width="80" class="player_pic">
								<div class="player_info">
									<span class="player_name">{{ item.lastUpdateProgramName }}</span>
									<div>
										<el-tag class="player_tag">{{ item.category }}</el-tag>
									</div>
									<span class="player_author">{{ item.name }}</span>
								</div>
							</div>
						</div>
					</div> -->
					<!-- 独家放送 -->
					<div class="list_title box_padding">
						<h3 class="router_title">独家放送</h3>
					</div>
					<div class="hot_box">
						<div class="broadcast">
							<div v-for="item in broadcast" :key="item.id">
								<div class="each_broadcast">
									<div>
										<el-image class="broadcast_pic" :src="item.sPicUrl"
											@click="gotoMvPage(item.id)">
										</el-image>
									</div>
									<common-play-btn class="play_btn"></common-play-btn>
									<span class="broadcast_name" @click="gotoMvPage(item.id)">{{  item.name  }}</span>
								</div>
							</div>
						</div>
					</div>
					<!-- 最新音乐 -->
					<div class="list_title box_padding">
						<h3 class="router_title">最新音乐</h3>
					</div>
					<div class="new_box">
						<div class="new_music">
							<div class="each_new" v-for="item in newMusicList" :key="item.id"
								@dblclick="playNewSong(item)">
								<div>
									<el-image class="new_pic" :src="item.picUrl" lazy @click="playNewSong(item)">
									</el-image>
								</div>
								<common-play-btn class="play_btn"></common-play-btn>
								<div class="new_info">
									<div>
										<span class="info_name">{{  item.song.name  }}</span>
									</div>
									<div>
										<span @click="gotoArtistPage(jtem.id)" class="info_author"
											v-for="(jtem, index) in item.song.artists" :key="jtem.id">{{  jtem.name  }} {{
											 index === item.song.artists.length - 1 ?
											 '' : '/'


											}} </span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 推荐MV-->
					<div class="list_title box_padding">
						<h3 class="router_title">推荐MV</h3>
					</div>
					<div class="mv_box">
						<div class="mv_list">
							<div class="each_mv" v-for="item in mvList" :key="item.id">
								<span class="mv_play_count">▷ {{  item.playCount  }}</span>
								<el-image :src="item.picUrl" lazy class="mv_pic" @click="gotoMvPage(item.id)">
								</el-image>
								<div>
									<span class="mv_name" @click="gotoMvPage(item.id)">{{  item.name  }}</span>
								</div>
								<div>
									<span class="mv_author" v-for="(jtem, index) in item.artists" :key="jtem.id">{{
										 jtem.name 
										}} {{
										 index === item.artists.length - 1 ?
										 '' : '/'


										}} </span>
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
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			navList,
			banner: [], // 轮播图
			recommondList: [], // 推荐歌单
			playerList: [], // 热门播客
			curDate: new Date().getDate(), // 当前是几号(用于显示每日推荐图片上的日期)
			broadcast: [], // 独家放送
			newMusicList: [], // 最新音乐列表
			mvList: [], // 推荐MV
		}
	},
	created() {
		// 获取轮播图
		this.getBanner()
		// 获取推荐歌单
		this.getRecommondList()
		// 获取热门播客
		this.getHotPlayer()
		// 获取独家放送
		this.getBroadcast()
		// 获取最新音乐
		this.getNewMusic()
		// 获取推荐MV
		this.getMv()
	},
	computed: {
		...mapGetters(['gettheme'])
	},
	methods: {
		// 点击导航栏
		navChange(index) {
			this.$router.push({ path: this.navList[index].path })
		},
		// 获取推荐MV
		getMv() {
			axios.get(`/personalized/mv`).then(res => {
				if (res.data && res.data.code == 200) {
					this.mvList = res.data.result
				} else {
					this.$message(res.message || '网络拥挤，请稍后再试')
				}
			})
		},
		// 获取最新音乐
		getNewMusic() {
			axios.get(`/personalized/newsong?limit=12`).then(res => {
				if (res.data && res.data.code == 200) {
					this.newMusicList = res.data.result
				} else {
					this.$message(res.message || '网络拥挤，请稍后再试')
				}
			})
		},
		// 获取独家放送
		getBroadcast() {
			axios.get(`/personalized/privatecontent`).then(res => {
				if (res.data && res.data.code == 200) {
					this.broadcast = res.data.result
				}
			})
		},
		// 获取热门播客
		getHotPlayer() {
			axios.get(`/dj/personalize/recommend`).then(res => {
				if (res.data && res.data.code == 200) {
					this.playerList = res.data.data
				} else {
					this.$message(res.message || '网络拥挤，请稍后再试')
				}
			})
		},
		// 获取轮播图
		getBanner() {
			axios.get('/banner?type=0').then(res => {
				if (res.data && res.data.code == 200) {
					for (let i = 0; i < res.data.banners.length; i++) {
						const { imageUrl, titleColor, typeTitle, url } = res.data.banners[i]
						let titleCol = ''
						if (titleColor === 'red') {
							titleCol = '#ec4141'
						} else if (titleColor === 'blue') {
							titleCol = '#4a79cc'
						} else {
							titleCol = '#4a79cc'
						}
						this.banner.push({
							imageUrl,
							titleCol,
							typeTitle,
							url
						})
					}
				} else {
					this.$message(res.message || '网络拥挤，请稍后再试')
				}
			})
		},
		// 获取推荐歌单
		getRecommondList() {
			axios.get('/personalized?limit=9').then(res => {
				if (res.data && res.data.code == 200) {
					for (let i = 0; i < res.data.result.length; i++) {
						const { id, name, picUrl, playCount, trackCount, trackNumberUpdateTime } = res.data.result[i]
						if (playCount > 10000) {
							let result = playCount / 10000;
							result = Math.floor(result * 100) / 100;
							var tempCount = result.toString(); //将数字转换为字符串
							var pos_decimal = tempCount.indexOf('.'); //小数点的索引值
							// 当整数时，pos_decimal=-1 自动补0
							if (pos_decimal < 0) {
								pos_decimal = tempCount.length;
								tempCount += '.';
							}
							// 当数字的长度< 小数点索引+2时，补0
							while (tempCount.length <= pos_decimal + 2) {
								tempCount += '0';
							}
							tempCount += '万';
						} else {
							tempCount = playCount;
						}
						this.recommondList.push({
							id,
							name,
							picUrl,
							tempCount,
							trackCount,
							trackNumberUpdateTime
						})
					}
				} else {
					this.$message(res.message || '网络拥挤，请稍后再试')
				}
			})
		},
		// 播放新歌曲
		playNewSong(item) {
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
		// 打开独家放送
		gotoMvPage(id) {
			this.$router.push({ path: `mvPage?id=${id}` })
		},
		// 打开每日推荐歌单
		gotoDayRecommondPage() {
			this.$router.push({ path: 'dayRecommondPage' })
		},
		// 前往歌单页面
		gotoSongsListPage(id) {
			// 跳转页面
			this.$router.push({ path: `songsListPage?id=${id}` })
		},
		// 前往歌手页面
		gotoArtistPage(id) {
			// 跳转页面
			this.$router.push({ path: `artistPage?id=${id}` })
		}
	}
}
</script>

<style lang="less" scoped>
.main_container {
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

	.contains {
		display: flex;
		align-items: center;
		flex-direction: column;

		.songsList {
			width: 1080px;
		}
	}

	.box_padding {
		margin-top: 40px;
	}

	.hot_box {
		display: flex;
		justify-content: center;

		// 热门播客
		.hot_players {
			width: 1080px;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			.each_player {
				width: 520px;
				padding: 10px;
				display: flex;

				.player_pic {
					border-radius: 4px;
				}

				.player_info {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding-left: 10px;
					width: 100%;

					.player_name {
						font-size: 14px;
					}

					.player_tag {
						height: unset;
						line-height: unset;
						padding: 2px;
						border-color: rgb(152, 152, 152);
						background-color: #fff;
						color: rgb(152, 152, 152);
						font-size: 12px;
					}

					.player_author {
						font-size: 12px;
						color: rgb(152, 152, 152);
					}

					.player_author:hover {
						color: #000;
						cursor: pointer;
					}
				}

				.player_info:hover {
					background-color: rgb(235, 235, 235);
				}
			}
		}

		// 独家放送
		.broadcast {
			padding-top: 10px;
			width: 1080px;
			display: flex;
			justify-content: space-between;

			.each_broadcast {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 330px;
				position: relative;

				.play_btn {
					position: absolute;
					top: 5px;
					left: 5px;
				}

				.broadcast_pic {
					width: 100%;
					margin-bottom: 5px;
					cursor: pointer;
				}

				.broadcast_name {
					cursor: pointer;
					font-size: 14px;
					color: rgb(55, 55, 55);
				}

				.broadcast_name:hover {
					color: #000;
				}
			}
		}
	}

	.new_box {
		display: flex;
		justify-content: center;

		.new_music {
			width: 1080px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.each_new {
				width: 330px;
				height: 50px;
				margin: 10px;
				display: flex;
				position: relative;
				overflow: hidden;

				.play_btn {
					position: absolute;
					top: 50%;
					left: 25px;
					transform: translate(-50%, -50%);
				}

				.new_pic {
					width: 50px;
					height: 50px;
					border-radius: 4px;
					cursor: pointer;
				}

				.new_info {
					display: flex;
					flex-direction: column;
					padding-left: 10px;
					width: 280px;

					.info_name {
						font-size: 12px;
					}

					.info_author {
						font-size: 12px;
						color: rgb(159, 159, 159);
						cursor: pointer;
					}

					.info_author:hover {
						color: #000;
					}
				}

				.new_info:hover {
					background-color: rgb(235, 235, 235);
				}
			}
		}
	}

	.mv_box {
		display: flex;
		justify-content: center;

		.mv_list {
			width: 1080px;
			display: flex;
			justify-content: space-between;

			.each_mv {
				margin: 10px;
				display: flex;
				flex-direction: column;
				position: relative;
				cursor: pointer;

				.mv_play_count {
					position: absolute;
					top: 5px;
					right: 5px;
					z-index: 2;
					color: #fff;
					font-size: 12px;
				}

				.mv_pic {
					width: 240px;
					height: 135px;
					border-radius: 4px;
					margin-bottom: 5px;
				}

				.mv_name {
					font-size: 12px;
					color: rgb(55, 55, 55);
					cursor: pointer;
				}

				.mv_name:hover {
					color: #000;
				}

				.mv_author {
					font-size: 12px;
					color: rgb(103, 103, 103);
					cursor: pointer;
				}

				.mv_author:hover {
					color: #000;
				}
			}
		}
	}
}

.menu {
	padding-left: 20px;
	border: unset;
}

.el-menu--horizontal>.el-menu-item.is-active {
	font-size: 18px;
	border-bottom: 2px solid #ec4141;
	font-weight: bold;
}

.banner_box {
	display: flex;
	justify-content: center;

	/deep/.el-carousel__button {
		height: 5px;
		width: 5px;
		border-radius: 50%;
	}

	.el-carousel__item--card {
		border-radius: 8px;
	}

	.banner {
		margin-top: 10px;
		width: 1080px;

		.each_banner {
			position: relative;

			.banner_img {
				width: 100%;
				height: 100%;
				border-radius: 8px;
			}

			.img_title {
				height: 25px;
				width: 60px;
				position: absolute;
				top: 180px;
				right: 0px;
				border-top-left-radius: 8px;
				border-bottom-right-radius: 8px;
				color: #fff;
				font-size: 12px;
				text-align: center;
			}
		}
	}
}

.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 200px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}

.list_title {
	display: flex;
	justify-content: center;

	.router_title {
		width: 1080px;
		text-align: left;
		padding-left: 10px;
		margin-bottom: 5px;
	}
}

.recommond_box {
	display: flex;
	justify-content: center;

	.recommond_list {
		width: 1080px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		.each_songslist {
			width: 200px;
			height: 240px;
			margin: 5px 8px;
			border-radius: 4px;
			display: flex;
			flex-direction: column;

			.songlist_pic {
				width: 200px;
				border-radius: 4px;
				cursor: pointer;
			}

			.songslist_name {
				text-align: left;
				color: #375261;
				font-size: 14px;
				position: relative;

			}

			.songslist_name>span {
				cursor: pointer;
			}

			.songslist_name>span:hover {
				color: #000;
			}

			.each_songslist_box {
				position: relative;
				cursor: pointer;

				.play_count {
					color: #fff;
					font-size: 12px;
					position: absolute;
					top: 5px;
					right: 5px;
				}
			}
		}
	}

	.cur_date {
		position: absolute;
		top: 50%;
		left: 50%;
		color: #fff;
		font-size: 24px;
		transform: translate(-50%, -80%);
	}
}
</style>