<template>
	<div class="box">
		<!-- 菜单 -->
		<div class="nav">
			<div class="nav_box">
				<div v-for="item in navList" :key="item.index" class="nav_item"
					:style="{ borderBottom: 2 == item.index ? `2px solid ${gettheme}` : '0', fontWeight: 2 == item.index ? 'bold' : 'unset', fontSize: 2 == item.index ? '20px' : '16px' }"
					@click="navChange(item.index)">{{  item.label  }}</div>
			</div>
		</div>
		<div class="contain">
			<div class="container">
				<div>
					<h3>官方榜</h3>
				</div>
				<div class="toplist">
					<div class="list_item" v-for="(item, index) in list.slice(0, 4)" :key="item.id">
						<el-image class="list_pic" :src="item.coverImgUrl" lazy @click="gotoSongsListPage(item.id)">
							<div slot="placeholder" class="list_pic">
								<el-image :src="require('@/assets/loading.gif')"></el-image>
							</div>
						</el-image>
						<common-play-btn class="lists_play_btn"></common-play-btn>
						<span class="update_time">{{  util.filterDay(item.trackNumberUpdateTime)  }}更新</span>
						<div v-if="index == 0" class="list_info">
							<div v-for="(jtem, index) in biaoshengList" :key="jtem.id" class="info_songs"
								@dblclick="playMusic(jtem)">
								<div>
									<span class="info_index">{{  index + 1  }}</span>
									<span>{{  jtem.name  }}</span>
								</div>
								<div>
									<span class="info_creators" v-for="(ktem, index) in jtem.ar" :key="ktem.id">{{  ktem.name  }}
										{{
										 index === jtem.ar.length - 1 ?
										 '' : '/'
		
										}}</span>
								</div>
							</div>
						</div>
						<div v-if="index == 1" class="list_info">
							<div v-for="(jtem, index) in xingeList" :key="jtem.id" class="info_songs"
								@dblclick="playMusic(jtem)">
								<div>
									<span class="info_index">{{  index + 1  }}</span>
									<span>{{  jtem.name  }}</span>
								</div>
								<div>
									<span class="info_creators" v-for="(ktem, index) in jtem.ar" :key="ktem.id">{{  ktem.name  }}
										{{
										 index === jtem.ar.length - 1 ?
										 '' : '/'
		
										}}</span>
								</div>
							</div>
						</div>
						<div v-if="index == 2" class="list_info">
							<div v-for="(jtem, index) in yuanchuangList" :key="jtem.id" class="info_songs"
								@dblclick="playMusic(jtem)">
								<div>
									<span class="info_index">{{  index + 1  }}</span>
									<span>{{  jtem.name  }}</span>
								</div>
								<div>
									<span class="info_creators" v-for="(ktem, index) in jtem.ar" :key="ktem.id">{{  ktem.name  }}
										{{
										 index === jtem.ar.length - 1 ?
										 '' : '/'
		
										}}</span>
								</div>
							</div>
						</div>
						<div v-if="index == 3" class="list_info">
							<div v-for="(jtem, index) in regeList" :key="jtem.id" class="info_songs"
								@dblclick="playMusic(jtem)">
								<div>
									<span class="info_index">{{  index + 1  }}</span>
									<span>{{  jtem.name  }}</span>
								</div>
								<div>
									<span class="info_creators" v-for="(ktem, index) in jtem.ar" :key="ktem.id">{{  ktem.name  }}
										{{
										 index === jtem.ar.length - 1 ?
										 '' : '/'
		
										}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="padding-bottom: 10px;">
					<h3>全球榜</h3>
				</div>
				<div class="globallist">
					<div v-for="(item) in list.slice(4, list.length)" :key="item.id" class="global_item">
						<el-image :src="item.coverImgUrl" lazy class="global_pic" @click="gotoSongsListPage(item.id)">
							<div slot="placeholder" class="list_pic">
								<el-image :src="require('@/assets/loading.gif')"></el-image>
							</div>
						</el-image>
						<common-play-btn class="global_play_btn"></common-play-btn>
						<div class="global_name">
							<span @click="gotoSongsListPage(item.id)">{{  item.name  }}</span>
						</div>
					</div>
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
import commonPlayBtn from '@/components/commonPlayBtn.vue';
import { mapGetters } from 'vuex';
import util from '@/tools/index'
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
			list: [], // 排行榜数据
			biaoshengList: [], // 飙升榜
			xingeList: [], // 新歌榜
			yuanchuangList: [], // 原创榜
			regeList: [], // 热歌榜
			util,
			navList
		}
	},
	created() {
		this.getHotLists()
	},
	computed: {
		...mapGetters(['gettheme'])
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
		// 获取官方榜
		getHotLists() {
			axios.get(`/toplist`).then(res => {
				if (res.data && res.data.code == 200) {
					this.list = res.data.list
					for (let i = 0; i < 4; i++) {
						this.getListInfo(this.list[i].id, i)
					}
				} else {
					this.$message(`获取官方榜失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
				}
			})
		},
		// 获取歌单内容
		getListInfo(id, index) {
			axios.get(`/playlist/detail?id=${id}`).then(res => {
				if (res.data && res.data.code == 200) {
					if (index == 0) {
						this.biaoshengList = res.data.playlist.tracks.slice(0, 5)
					} else if (index == 1) {
						this.xingeList = res.data.playlist.tracks.slice(0, 5)
					} else if (index == 2) {
						this.yuanchuangList = res.data.playlist.tracks.slice(0, 5)
					} else if (index == 3) {
						this.regeList = res.data.playlist.tracks.slice(0, 5)
					}
				} else {
					this.$message(`获取歌单内容失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
				}
			})
		},
		// 双击播放音乐
		playMusic(jtem) {
			const audio = {
				id: jtem.id,
				dt: jtem.dt,
				pic: jtem.al.picUrl,
				name: jtem.name,
				authors: jtem.ar,
				isvip: jtem.fee == 1 || jtem.fee == 4,
				al: jtem.al
			}
			this.$store.commit('unshiftPlayList', audio)
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
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.container {
			width: 1080px;

			.toplist {
				display: flex;
				flex-direction: column;

				.list_item {
					padding: 20px 0;
					position: relative;
					display: flex;

					.list_pic {
						width: 160px;
						height: 160px;
						border-radius: 4px;
						cursor: pointer;
					}

					.list_pic:hover+.lists_play_btn {
						display: block;
					}

					.lists_play_btn {
						position: absolute;
						top: 90px;
						left: 70px;
						display: none;
					}

					.update_time {
						color: #fff;
						position: absolute;
						top: 120px;
						left: 35px;
						font-size: 12px;
					}

					.list_info {
						padding-left: 20px;
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;
						font-size: 12px;

						.info_index {
							padding-right: 10px;
						}

						.info_songs {
							padding: 5px 0;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.info_creators {
								padding-left: 5px;
								color: rgb(156, 156, 156);
								cursor: pointer;
							}

							.info_creators:hover {
								color: #000;
							}
						}

						.info_songs:nth-child(2n + 1) {
							background: rgb(250, 250, 250);
						}

						.info_songs:hover {
							background: rgb(245, 245, 245);
						}
					}
				}
			}

			.globallist {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.global_item {
					padding: 10px;
					position: relative;

					.global_pic {
						width: 180px;
						height: 180px;
						border-radius: 4px;
						cursor: pointer;
					}

					.global_pic:hover+.global_play_btn {
						display: block;
					}

					.global_play_btn {
						position: absolute;
						top: 90px;
						left: 90px;
						display: none;
					}

					.global_name {
						font-size: 14px;
						width: 180px;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						/* 这里是超出几行省略 */
						overflow: hidden;
						color: rgb(55, 55, 55);
						cursor: pointer;
					}

					.global_name:hover {
						color: #000;
					}
				}

				.empty_box {
					width: 180px;
					height: 0;
					padding: 10px;
				}
			}
		}
	}
}
</style>