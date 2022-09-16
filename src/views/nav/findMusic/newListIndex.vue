<template>
    <div class="box">
		<!-- 菜单 -->
		<div class="nav">
			<div class="nav_box">
				<div v-for="item in navList" :key="item.index" class="nav_item"
					:style="{ borderBottom: 4 == item.index ? `2px solid ${gettheme}` : '0', fontWeight: 4 == item.index ? 'bold' : 'unset', fontSize: 4 == item.index ? '20px' : '16px' }"
					@click="navChange(item.index)">{{  item.label  }}</div>
			</div>
		</div>
		<div class="contain">
			<div class="container">
				<div class="single_box">
					<div class="single">
						<div class="single_item" :style="{backgroundColor: curType == 0 ? '#bbbbbb' : 'unset', color: curType == 0 ? '#fff' : '#000'}" @click="curTypeChange(0)">
							<span>新歌速递</span>
						</div>
						<div class="single_item" :style="{backgroundColor: curType == 1 ? '#bbbbbb' : 'unset', color: curType == 1 ? '#fff' : '#000'}" @click="curTypeChange(1)">
							<span>新碟上架</span>
						</div>
					</div>
				</div>
				<div class="tag_box">
					<div class="tag_list">
						<div
							v-for="(item, index) in yuzhongList"
							:key="item.val" class="tag_item"
							:style="{color: index == curTag ? gettheme : '#676767', backgroundColor: index == curTag ? colorRGB : 'unset'}"
							@click="curTagChange(index)"
						>
							<span>{{ item.label }}</span>
						</div>
					</div>
					<div class="btn_group">
						<el-button v-show="curType == 0" round size="mini" @click="playAll" class="play_btn" :style="{background: gettheme}">播放全部</el-button>
						<el-button v-show="curType == 0" round size="mini" class="resolve_btn">收藏全部</el-button>
						<div v-show="curType == 1" class="tag_item" :style="{color: !isAll ? $store.state.cloudMusic.theme : '#676767', backgroundColor: !isAll ? colorRGB : 'unset'}">推荐</div>
						<div v-show="curType == 1" class="tag_item" :style="{color: isAll ? $store.state.cloudMusic.theme : '#676767', backgroundColor: isAll ? colorRGB : 'unset'}">全部</div>
					</div>
				</div>
				<div class="new_songs_list" v-if="curType == 0">
					<div v-for="(item, index) in newSongsList" :key="item.id" class="new_item" @dblclick="playMusic(item)">
						<div class="new_index">
							<span>{{ index + 1 < 10 ? `0${index + 1}` : `${index + 1}` }}</span>
						</div>
						<el-image :src="item.album.picUrl" lazy fit="cover" class="new_pic">
							<div slot="placeholder" class="new_pic">
								<el-image :src="require('@/assets/loading.gif')" class="new_pic"></el-image>
							</div>
						</el-image>
						<div class="new_name">
							<span @click="gotoArtistPage(item)">{{ item.name }}</span>
							<span class="new_alias" v-if="item.alias[0]">（{{ item.alias[0] }}）</span>
							<el-tag class="new_mv" @click="playMv(item.mvid)" v-if="item.mvid !== 0" :style="{borderColor: $store.state.cloudMusic.theme, color: $store.state.cloudMusic.theme}">MV</el-tag>
						</div>
						<div class="new_creator">
							<span v-for="(jtem, index) in item.artists" :key="jtem.id" class="creator_item" @click="gotoArtistPage(jtem.id)">{{ jtem.name }} {{index === item.artists.length - 1 ? '' : '/'}}</span>
						</div>
						<div class="new_album">
							<span @click="gotoAlbumPage(item.album.id)">{{ item.album.name }}</span>
						</div>
						<div class="new_dt">
							<span>{{ filterTime(item.duration) }}</span>
						</div>
					</div>
				</div>
				<div class="new_album_list" v-if="curType == 1" v-infinite-scroll="load">
					<div class="album_publish_time" :style="{top: timeTop + 'px'}">
						<div class="mounth">本周</div>
						<div class="year">新碟</div>
					</div>
					<div v-for="item in newAlbumsList" :key="item.id" class="album_item">
						<el-image :src="item.picUrl" class="album_pic" @click="gotoAlbumPage(item.id)">
							<div slot="placeholder">
								<el-image :src="require('@/assets/loading.gif')" class="album_pic"></el-image>
							</div>
						</el-image>
						<common-play-btn class="album_play_btn"></common-play-btn>
						<div class="album_name">
							<span>{{ item.name }}</span>
						</div>
						<div class="album_creator">
							<span @click="gotoArtistPage(item.artists[0].id)">{{ item.artists[0].name}}</span>
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
import axios from 'axios'
import commonPlayBtn from '@/components/commonPlayBtn.vue'
import { mapGetters } from 'vuex'
const yuzhongList = [
    {
        label: '全部',
        val: 0,
        key: 'ALL'
    },
    {
        label: '华语',
        val: 7,
        key: 'ZH'
    },
    {
        label: '欧美',
        val: 96,
        key: 'EA'
    },
    {
        label: '日本',
        val: 8,
        key: 'JP'
    },
    {
        label: '韩国',
        val: 16,
        key: 'KR'
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
export default {
    components: { commonPlayBtn },
    data() {
        return {
			navList,
            curType: 0, // 0.新歌速递 1.新碟上架
            curTag: 0, // 当前语种
            isAll: false, // 推荐/全部
            yuzhongList, // 语种列表
            colorList, // 颜色主题列表
            colorRGB: '', // 当前主题颜色
            newSongsList: [], // 新歌速递列表
            newAlbumsList: [],// 新碟上架列表
            timeTop: 15,
            offset: 0,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        }
    },
    created() {
        // 获取主题颜色RGB格式
        this.getColorRGB()
        // 获取新歌速递
        this.getNewSongs()
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
        gotoArtistPage(id) {
            // 跳转页面
            this.$router.push({path: `/artistPage?id=${id}`})
        },
        gotoAlbumPage(id) {
            // 跳转页面
            this.$router.push({path: `/albumPage?id=${id}`})
        },
        // 获取新歌速递
        getNewSongs() {
            axios.get(`/top/song?type=${this.yuzhongList[this.curTag].val}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.newSongsList = res.data.data
                } else {
                    this.$message(`获取新歌速递失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 获取新碟上架
        getNewAlbums() {
            axios.get(`/top/album?offset=0&limit=30`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.newAlbumsList = res.data.weekData
                } else {
                    this.$message(`获取新碟上架失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 获取筛选后的新碟
        getTargetAlbums() {
            axios.get(`/top/album?year=${this.year}&month=${this.month}&area=${this.yuzhongList[this.curTag].key}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.newAlbumsList = res.data.monthData
                } else {
                    this.$message(`获取新碟上架失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 新歌速递/新碟上架切换
        curTypeChange(val) {
            this.curType = val
            this.curTag = 0
            if (val == 1 && this.newAlbumsList.length == 0) {
                // 获取新碟上架
                this.getNewAlbums()
            }
        },
        // 播放音乐
        playMusic(item) {
            const audio = {
                id: item.id, // 歌曲id
                dt: item.duration, // 歌曲时长
                pic: item.album.picUrl, // 歌曲封面
                name: item.name, // 歌曲名称
                authors: item.artists, // 作者(可能有多个)
                isvip: item.fee == 1 || item.fee == 4, // 是否需要VIP
                al: item.album // 音乐所在专辑
            }
            this.$store.commit('unshiftPlayList', audio)
        },
        // 播放全部
        playAll() {
            for(let i = this.newSongsList.length - 1; i >= 0; i--) {
                const audio = {
                    id: this.newSongsList[i].id,
                    dt: this.newSongsList[i].duration,
                    pic: this.newSongsList[i].album.picUrl,
                    name: this.newSongsList[i].name,
                    authors: this.newSongsList[i].artists,
                    isvip: this.newSongsList[i].fee === 1 || this.newSongsList[i].fee === 4,
                    al: this.newSongsList[i].album
                }
                this.$store.commit('unshiftPlayList', audio)
            }
        },
        // 播放MV
        playMv(id) {
            this.$emit('playMv', id)
        },
        // 切换语种
        curTagChange(val) {
            this.curTag = val
            if (this.curType == 0) {
                this.getNewSongs()
            } else {
                this.getTargetAlbums()
            }
        },
        // 滑动到底部时
        load() {
            // axios.get(`/top/album?offset=0&limit=30&year=2019&month=6`)
        },
        // 毫秒转分:秒
        filterTime(timestamp) {
            let minutes = parseInt((timestamp % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = parseInt((timestamp % (1000 * 60)) / 1000);
            return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        },
        // 获取主题颜色RGB格式
        getColorRGB() {
            this.colorList.forEach(item => {
                if (this.gettheme == item.key) {
                    this.colorRGB = item.value
                }
            })
        }
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
			.single_box {
				display: flex;
				align-items: center;
				justify-content: center;
				.single {
					width: 220px;
					display: flex;
					border-radius: 24px;
					border: 1px solid #bbbbbb;
					.single_item {
						width: 110px;
						display: flex;
						justify-content: center;
						border-radius: 24px;
						// border: 1px solid #bbbbbb;
						padding: 6px 10px;
						font-size: 14px;
					}
				}
			}
			.tag_box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.tag_list {
					display: flex;
					align-items: center;
					font-size: 12px;
					.tag_item {
						color: rgb(103, 103, 103);
						cursor: pointer;
						padding: 3px 15px;
						border-radius: 24px;
					}
					.tag_item:hover {
						color: #000;
					}
				}
				.btn_group {
					display: flex;
					align-items: center;
					.play_btn {
						color: #fff;
					}
					.resolve_btn:hover {
						color: unset;
						border-color: #DCDFE6;
						background-color: rgb(242, 242, 242);
					}
					.resolve_btn:active {
						color: unset;
						border-color: #DCDFE6;
					}
					.resolve_btn:focus {
						color: unset;
					}
					.tag_item {
						color: rgb(103, 103, 103);
						cursor: pointer;
						padding: 3px 15px;
						border-radius: 24px;
						font-size: 12px;
					}
					.tag_item:hover {
						color: #000;
					}
				}
			}
			.new_songs_list {
				padding-top: 20px;
				.new_item {
					display: flex;
					align-items: center;
					padding: 10px 0;
					position: relative;
					font-size: 12px;
					.new_index {
						padding-left: 30px;
						width: 30px;
						color: rgb(207, 207, 207);
					}
					.new_pic {
						width: 60px;
						height: 60px;
						border-radius: 4px;
					}
					.new_name {
						padding-left: 10px;
						.new_alias {
							color: rgb(159, 159, 159);
						}
						.new_mv {
							cursor: pointer;
							height: 16px;
							line-height: 16px;
							font-size: 12px;
							transform: scale(0.833333);
							margin-left: 5px;
							border-color: rgb(254, 103, 46);
							color: rgb(254, 103, 46);
							background-color: unset;
							padding: 0 5px;
							opacity: .8;
						}
					}
					.new_creator {
						color: rgb(103, 103, 103);
						position: absolute;
						left: 45%;
						max-width: 150px;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1; /* 这里是超出几行省略 */
						overflow: hidden;
						.creator_item {
							padding-left: 5px;
							cursor: pointer;
						}
						.creator_item:hover {
							color: #000;
						}
					}
					.new_album {
						color: rgb(103, 103, 103);
						position:absolute;
						left: 65%;
						cursor: pointer;
					}
					.new_album:hover {
						color: #000;
					}
					.new_dt { 
						position: absolute;
						left: 95%;
					}
				}
				.new_item:nth-child(2n + 1) {
					background: rgb(250, 250, 250);
				}
				.new_item:hover {
					background: rgb(241, 242, 243);
				}
			}
			.new_album_list {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-evenly;
				position: relative;
				.album_publish_time {
					position: absolute;
					left: -15px;
				}
				.album_item {
					padding: 15px;
					position: relative;
					.album_pic {
						width: 160px;
						height: 160px;
						border-radius: 4px;
						cursor: pointer;
					}
					.album_pic:hover + .album_play_btn {
						display: block;
					}
					.album_play_btn {
						position: absolute;
						top: 80px;
						left: 80px;
						display: none;
					}
					.album_name {
						font-size: 12px;
						width: 160px;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1; /* 这里是超出几行省略 */
						overflow: hidden;
						padding-top: 5px;
					}
					.album_creator {
						font-size: 12px;
						color: rgb(159, 159, 159);
						width: 160px;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1; /* 这里是超出几行省略 */
						overflow: hidden;
						padding-top: 5px;
						span {
							cursor: pointer;
						}
					}
					.album_creator:hover {
						color: #000;
					}
				}
				.empty_box {
					width: 160px;
					height: 0;
					padding: 15px;
				}
			}
		}
	}
}
</style>