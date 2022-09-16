<template>
    <div class="box" ref="box">
        <div class="container">
            <h3>搜索<span class="keywords">{{  keyWords  }}</span></h3>
            <!-- 导航栏 -->
            <div class="nav">
                <div class="nav_box">
                    <div v-for="item in navList" :key="item.index" class="nav_item"
                        :style="{ borderBottom: curNavIndex == item.index ? `2px solid ${gettheme}` : '0', fontWeight: curNavIndex == item.index ? 'bold' : 'unset' }"
                        @click="navChange(item.index)">{{  item.label  }}</div>
                </div>
                <div class="total" v-show="curNavIndex == 0">找到{{  totalNum  }}首单曲</div>
                <div class="total" v-show="curNavIndex == 1">找到{{  artistsNum  }}位歌手</div>
                <div class="total" v-show="curNavIndex == 2">找到{{  albumNum  }}张专辑</div>
                <div class="total" v-show="curNavIndex == 3">找到{{  vedioNum  }}个视频</div>
                <div class="total" v-show="curNavIndex == 4">找到{{  playlistCount  }}个歌单</div>
                <div class="total" v-show="curNavIndex == 5">找到{{  lyricNum  }}首歌词</div>
                <div class="total" v-show="curNavIndex == 6">找到{{  radioNum  }}个播客</div>
                <div class="total" v-show="curNavIndex == 7">找到{{  userNum  }}个用户</div>
            </div>
            <!-- 单曲 -->
            <div v-show="curNavIndex == 0" class="single">
                <el-button v-if="tableData.length > 0" round class="play_all_btn" @click="playAll"
                    :style="{ borderColor: `${gettheme}`, backgroundColor: `${gettheme}` }">
                    ▶ 播放全部</el-button>
                <!-- 结果列表 -->
                <el-table :data="tableData" stripe style="width: 100%" v-loading="isLoading"
                    element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-custom-class="loading"
                    @row-dblclick="playMusic" :row-class-name="tableRowClassName">
                    <!-- 序号 -->
                    <el-table-column width="60" type="index" class-name="playtime">
                        <template slot-scope='scope'>
                            <span
                                v-show="!($store.state.cloudMusic.playList[0] && $store.state.cloudMusic.playList[0].id == scope.row.id)">{{
                                 util.computedIndex(tableData.length, scope.row.index)  }}</span>
                            <svg v-show="$store.state.cloudMusic.playList[0] && $store.state.cloudMusic.playList[0].id == scope.row.id"
                                t="1661514845013" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2446" width="20" height="20">
                                <path
                                    d="M525.541411 131.503033l-230.494605 148.031475h-114.988917c-63.895239 0-115.679649 51.14996-115.679649 115.219161v230.898811c0 63.664995 51.150984 115.219161 115.679649 115.219161h114.988917l230.494605 147.915841c32.582069 14.128789 57.840336-0.980327 57.840336-33.04358V164.54559c0-32.120558-25.892717-46.825468-57.840336-33.042557z m194.223516 186.033997c-10.841929-11.649318-29.122271-12.283768-40.712237-1.384533-11.649318 10.899234-12.226462 29.122271-1.384533 40.770565 5.363148 5.76633 14.531971 18.511609 23.989367 37.772279 16.146749 32.870642 25.892717 71.449285 25.892717 115.507733 0 44.058448-9.745968 82.694397-25.892717 115.507734-9.457396 19.259646-18.626219 32.004925-23.989367 37.772278-10.899234 11.648294-10.264784 29.871331 1.384533 40.770566 11.648294 10.899234 29.871331 10.264784 40.770566-1.384533 9.054213-9.68764 21.509896-26.987654 33.620725-51.727105 19.895119-40.483017 31.774681-87.654362 31.774681-140.996245 0-53.341882-11.879562-100.514251-31.774681-140.996244-12.169157-24.62484-24.625864-41.983183-33.679054-51.612495z m176.806845-35.69599c-23.297612-39.444361-46.825468-66.778916-63.318094-81.483826-11.880585-10.609639-30.102598-9.572006-40.714284 2.36486-10.609639 11.936867-9.573029 30.101575 2.364861 40.712238 2.709715 2.421142 8.131191 7.842619 15.396665 16.261358 12.455683 14.416338 24.911366 31.601742 36.619012 51.439556 33.504068 56.860009 53.630455 123.349329 53.630455 199.066825s-20.126386 142.206816-53.68776 199.125153c-11.706623 19.836791-24.220634 37.022195-36.619012 51.438533-7.265474 8.41874-12.68695 13.840216-15.397689 16.261359-11.879562 10.610662-12.916171 28.833699-2.363837 40.714283 10.553357 11.879562 28.833699 12.916171 40.713261 2.363838 16.493649-14.70491 40.021505-41.98216 63.319117-81.483826 38.522362-65.336054 61.646012-141.745305 61.646012-228.41934 0.058328-86.614683-23.066345-163.023934-61.588707-228.361011z"
                                    :fill="gettheme" p-id="2447"></path>
                            </svg>
                        </template>
                    </el-table-column>
                    <!-- 收藏 -->
                    <el-table-column width="40" class-name="playtime">
                        <template slot-scope='scope'>
                            <svg t="1658489150980" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="6115" width="20" height="20">
                                <path
                                    d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z"
                                    p-id="6116" fill="#707070"></path>
                            </svg>
                        </template>
                    </el-table-column>
                    <!-- 下载 -->
                    <el-table-column width="40" class-name="playtime">
                        <template slot-scope='scope'>
                            <svg t="1658489442655" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="7625" width="20" height="20">
                                <path
                                    d="M828.975746 894.125047 190.189132 894.125047c-70.550823 0-127.753639-57.18542-127.753639-127.752616L62.435493 606.674243c0-17.634636 14.308891-31.933293 31.93227-31.933293l63.889099 0c17.634636 0 31.93227 14.298658 31.93227 31.933293l0 95.821369c0 35.282574 28.596292 63.877843 63.87682 63.877843L765.098927 766.373455c35.281551 0 63.87682-28.595268 63.87682-63.877843l0-95.821369c0-17.634636 14.298658-31.933293 31.943526-31.933293l63.877843 0c17.634636 0 31.933293 14.298658 31.933293 31.933293l0 159.699212C956.729385 836.939627 899.538849 894.125047 828.975746 894.125047L828.975746 894.125047zM249.938957 267.509636c12.921287-12.919241 33.884738-12.919241 46.807049 0l148.97087 148.971893L445.716876 94.89323c0-17.634636 14.300704-31.94762 31.933293-31.94762l63.875796 0c17.637706 0 31.945573 14.312984 31.945573 31.94762l0 321.588299 148.97087-148.971893c12.921287-12.919241 33.875528-12.919241 46.796816 0l46.814212 46.818305c12.921287 12.922311 12.921287 33.874505 0 46.807049L552.261471 624.930025c-1.140986 1.137916-21.664416 13.68365-42.315758 13.69286-20.87647 0.010233-41.878806-12.541641-43.020816-13.69286L203.121676 361.13499c-12.922311-12.933567-12.922311-33.884738 0-46.807049L249.938957 267.509636 249.938957 267.509636z"
                                    p-id="7626" fill="#999999"></path>
                            </svg>
                        </template>
                    </el-table-column>
                    <!-- 音乐标题 -->
                    <el-table-column label="音乐标题">
                        <div slot-scope='scope' style="display: flex;align-items: center; width: 100%; word-break: break-all; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
                            <span>{{  scope.row.name  }}</span>
                            <el-tag class="tags"
                                v-if="tableData[scope.$index].fee === 1 || tableData[scope.$index].fee === 4">VIP
                            </el-tag>
                            <el-tag class="tags"
                                v-if="tableData[scope.$index].fee === 1 || tableData[scope.$index].fee === 4"
                                :style="{ borderColor: gettheme, color: gettheme }">
                                试听</el-tag>
                            <el-tag class="tags" v-if="tableData[scope.$index].privilege.downloadMaxBrLevel == 'hires'"
                                :style="{ borderColor: gettheme, color: gettheme }">
                                Hi-Res
                            </el-tag>
                            <el-tag class="tags" v-if="tableData[scope.$index].sq"
                                :style="{ borderColor: gettheme, color: gettheme }">
                                SQ</el-tag>
                            <el-tag class="tags mvtag" @click="playMv(scope.row.mv)"
                                v-if="tableData[scope.$index].mv !== 0"
                                :style="{ borderColor: gettheme, color: gettheme }">
                                MV</el-tag>
                        </div>
                    </el-table-column>
                    <!-- 歌手 -->
                    <el-table-column label="歌手" width="260" :show-overflow-tooltip="true">
                        <template slot-scope='scope'>
                            <div class="artist_box">
                                <span class="artist" v-for="(item, index) in scope.row.ar" :key="item.id"
                                    @click="gotoArtistPage(item.id)">{{  item.name 
                                    }} {{
                                     index === scope.row.ar.length - 1 ?
                                     '' : '/'

                                    }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- 专辑 -->
                    <el-table-column label="专辑">
                        <template slot-scope='scope'>
                            <span class="album" @click="gotoAlbumPageFromSingle(scope.row)">{{  scope.row.al.name  }}</span>
                        </template>
                    </el-table-column>
                    <!-- 时长 -->
                    <el-table-column label="时长" width="180">
                        <template slot-scope='scope'>
                            <span class="playtime">{{  filterTime(scope.row.dt)  }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination" v-show="tableData.length > 0">
                    <el-pagination v-show="tableData" :background="gettheme"
                        layout="prev, pager, next" :total="totalNum" :page-size="100"
                        @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <!-- 歌手 -->
            <div v-show="curNavIndex == 1" class="artists">
                <div v-for="item in artistsData" :key="item.id" class="artist_item" @click="clickArtists(item)">
                    <div class="item_left">
                        <img :src="item.img1v1Url" class="artist_pic">
                        <span class="artist_name" v-for="(jtem, index) in item.name.length" :key="index"
                            :style="{ color: $store.state.cloudMusic.keyWords.indexOf(item.name.split('')[index]) !== -1 ? '#507daf' : '#999' }">{{
                             item.name.split('')[index]
                            }}</span>
                    </div>
                    <div class="item_right">
                        <img src="@/assets/userImg_noLogin.png" class="right_pic">
                    </div>
                </div>
            </div>
            <!-- 专辑 -->
            <div v-show="curNavIndex == 2" class="album">
                <div v-for="item in albumData" :key="item.id" class="album_item" @click="gotoAlbumPage(item)">
                    <div class="album_left">
                        <el-image :src="item.blurPicUrl" lazy class="album_pic">
                            <div slot="placeholder" class="songlist_pic">
                                <el-image :src="require('../../assets/loading.gif')"></el-image>
                            </div>
                        </el-image>
                        <span class="album_name">{{  item.name  }}</span>
                        <span v-if="item.alias.length > 0" class="album_alias">({{  item.alias[0]  }})</span>
                    </div>
                    <div>
                        <span class="album_author" v-for="(jtem, index) in item.artist.name.length" :key="index"
                            :style="{ color: $store.state.cloudMusic.keyWords.indexOf(item.artist.name.split('')[index]) !== -1 ? '#507daf' : '#999' }">{{
                             item.artist.name.split('')[index] 
                            }}</span>
                    </div>
                </div>
                <!-- 分页 -->
                <div class="pagination" v-show="albumData.length > 0">
                    <el-pagination v-show="albumData" :background="gettheme"
                        layout="prev, pager, next" :total="albumNum" :page-size="20"
                        @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <!-- 视频 -->
            <div v-show="curNavIndex == 3" class="vedio">
                <div v-for="item in vedioData" :key="item.vid" class="vedio_item" @click="playMv(item.vid)">
                    <el-image :src="item.coverUrl" lazy class="vedio_pic" fit="cover">
                        <div slot="placeholder" class="songlist_pic">
                            <el-image :src="require('../../assets/loading.gif')"></el-image>
                        </div>
                    </el-image>
                    <span class="vedio_playtime">▷{{  filterPlayCount(item.playTime)  }}</span>
                    <span class="vedio_dt">{{  filterSeconds(item.durationms)  }}</span>
                    <div class="vedio_name">
                        <span>{{  item.title  }}</span>
                    </div>
                    <div class="vedio_author">
                        <span class="artist" v-for="(jtem, index) in item.creator" :key="item.id">{{  jtem.userName  }} {{
                             index === item.creator.length - 1 ?
                             '' : '/'

                            }}</span>
                    </div>
                </div>
                <!-- 分页 -->
                <div class="pagination" v-show="vedioData.length > 0">
                    <el-pagination v-show="albumData" :background="gettheme"
                        layout="prev, pager, next" :total="vedioNum" :page-size="24"
                        @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <!-- 歌单 -->
            <div v-show="curNavIndex == 4" class="songslists">
                <div v-for="item in playlists" :key="item.id" class="songslists_item" @click="gotoSongsListPage(item)">
                    <el-image :src="item.coverImgUrl" class="songslist_pic" lazy>
                        <div slot="placeholder" class="songslist_pic">
                            <el-image :src="require('../../assets/loading.gif')"></el-image>
                        </div>
                    </el-image>
                    <div class="songslist_name">
                        <span v-for="(jtem, index) in item.name.length" :key="index"
                            :style="{ color: $store.state.cloudMusic.keyWords.indexOf(item.name.split('')[index]) !== -1 ? '#507daf' : '#999' }">{{
                             item.name.split('')[index] 
                            }}</span>
                    </div>
                    <div class="track_count">
                        <span>{{  item.trackCount  }}首</span>
                    </div>
                    <div class="creator">
                        <span class="by">by</span>
                        <span v-for="(jtem, index) in item.creator.nickname.length" :key="index" class="creator_name"
                            :style="{ color: $store.state.cloudMusic.keyWords.indexOf(item.creator.nickname.split('')[index]) !== -1 ? '#507daf' : '#999' }">{{
                             item.creator.nickname.split('')[index] 
                            }}</span>
                    </div>
                    <div class="songslist_playcount">
                        <span>▷{{  filterPlayCount(item.playCount)  }}</span>
                    </div>
                </div>
                <!-- 分页 -->
                <div class="pagination" v-show="playlists.length > 0">
                    <el-pagination :background="gettheme" layout="prev, pager, next"
                        :total="playlistCount" :page-size="20" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <!-- 歌词 -->
            <div v-show="curNavIndex == 5" class="lyric">
                <el-table :data="lyricData" stripe style="width: 100%" v-loading="isLoading"
                    element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-custom-class="loading"
                    @row-dblclick="playMusic">
                    <!-- 序号 -->
                    <el-table-column width="60" type="index" class-name="playtime">
                    </el-table-column>
                    <!-- 收藏 -->
                    <el-table-column width="40" class-name="playtime">
                        <template slot-scope='scope'>
                            <svg t="1658489150980" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="6115" width="20" height="20">
                                <path
                                    d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z"
                                    p-id="6116" fill="#707070"></path>
                            </svg>
                        </template>
                    </el-table-column>
                    <!-- 下载 -->
                    <el-table-column width="40" class-name="playtime">
                        <template slot-scope='scope'>
                            <svg t="1658489442655" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="7625" width="20" height="20">
                                <path
                                    d="M828.975746 894.125047 190.189132 894.125047c-70.550823 0-127.753639-57.18542-127.753639-127.752616L62.435493 606.674243c0-17.634636 14.308891-31.933293 31.93227-31.933293l63.889099 0c17.634636 0 31.93227 14.298658 31.93227 31.933293l0 95.821369c0 35.282574 28.596292 63.877843 63.87682 63.877843L765.098927 766.373455c35.281551 0 63.87682-28.595268 63.87682-63.877843l0-95.821369c0-17.634636 14.298658-31.933293 31.943526-31.933293l63.877843 0c17.634636 0 31.933293 14.298658 31.933293 31.933293l0 159.699212C956.729385 836.939627 899.538849 894.125047 828.975746 894.125047L828.975746 894.125047zM249.938957 267.509636c12.921287-12.919241 33.884738-12.919241 46.807049 0l148.97087 148.971893L445.716876 94.89323c0-17.634636 14.300704-31.94762 31.933293-31.94762l63.875796 0c17.637706 0 31.945573 14.312984 31.945573 31.94762l0 321.588299 148.97087-148.971893c12.921287-12.919241 33.875528-12.919241 46.796816 0l46.814212 46.818305c12.921287 12.922311 12.921287 33.874505 0 46.807049L552.261471 624.930025c-1.140986 1.137916-21.664416 13.68365-42.315758 13.69286-20.87647 0.010233-41.878806-12.541641-43.020816-13.69286L203.121676 361.13499c-12.922311-12.933567-12.922311-33.884738 0-46.807049L249.938957 267.509636 249.938957 267.509636z"
                                    p-id="7626" fill="#999999"></path>
                            </svg>
                        </template>
                    </el-table-column>
                    <!-- 音乐标题 -->
                    <el-table-column label="音乐标题">
                        <div slot-scope='scope' style="display: flex;flex-direction:column; align-items: flex-start;">
                            <div style="display: flex;align-items: center;justify-content: center;">
                                <span>{{  scope.row.name  }}</span>
                                <el-tag class="tags"
                                    v-if="lyricData[scope.$index].fee === 1 || lyricData[scope.$index].fee === 4">VIP
                                </el-tag>
                                <el-tag class="tags"
                                    v-if="lyricData[scope.$index].fee === 1 || lyricData[scope.$index].fee === 4"
                                    :style="{ borderColor: gettheme, color: gettheme }">
                                    试听</el-tag>
                                <el-tag class="tags"
                                    v-if="lyricData[scope.$index].privilege.downloadMaxBrLevel == 'hires'"
                                    :style="{ borderColor: gettheme, color: gettheme }">
                                    Hi-Res
                                </el-tag>
                                <el-tag class="tags" v-if="lyricData[scope.$index].sq"
                                    :style="{ borderColor: gettheme, color: gettheme }">
                                    SQ</el-tag>
                                <el-tag class="tags mvtag" @click="playMv(scope.row.mv)"
                                    v-if="lyricData[scope.$index].mv !== 0"
                                    :style="{ borderColor: gettheme, color: gettheme }">
                                    MV</el-tag>
                            </div>
                            <div v-for="(jtem, index) in lyricData[scope.$index].lyrics" :key="index">
                                <span v-show="index < 4">{{  jtem.replace(/&ltb&gt/g, '').replace(/&lt\/b&gt/g, '') 
                                    }}</span>
                            </div>
                        </div>
                    </el-table-column>
                    <!-- 歌手 -->
                    <el-table-column label="歌手" width="260" :show-overflow-tooltip="true">
                        <template slot-scope='scope'>
                            <div class="artist_box">
                                <span class="artist" v-for="(item, index) in scope.row.ar" :key="item.id">{{  item.name 
                                    }} {{
                                     index === scope.row.ar.length - 1 ?
                                     '' : '/'

                                    }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- 专辑 -->
                    <el-table-column label="专辑">
                        <template slot-scope='scope'>
                            <span class="artist">{{  scope.row.al.name  }}</span>
                        </template>
                    </el-table-column>
                    <!-- 时长 -->
                    <el-table-column label="时长" width="180">
                        <div slot-scope='scope' style="display: flex; flex-direction: column; align-items: center;">
                            <div>
                                <span class="playtime">{{  filterTime(scope.row.dt)  }}</span>
                            </div>
                            <div style="display: flex; margin-top: 10px;">
                                <el-button size="mini" round class="btn_group">展开歌词</el-button>
                                <el-button size="mini" round class="btn_group">复制歌词</el-button>
                            </div>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 播客 -->
            <div v-show="curNavIndex == 6" class="radio_station">
                <div v-for="item in radioData" :key="item.id" class="radio_item">
                    <el-image :src="item.picUrl" class="radio_pic">
                        <div slot="placeholder" class="radio_pic">
                            <el-image :src="require('../../assets/loading.gif')"></el-image>
                        </div>
                    </el-image>
                    <span v-for="(jtem, index) in item.name.length" :key="index"
                        :style="{ color: $store.state.cloudMusic.keyWords.indexOf(item.name.split('')[index]) !== -1 ? '#507daf' : '#000' }">{{
                         item.name.split('')[index] 
                        }}</span>
                    <span class="play_count">▷&nbsp;{{  filterPlayCount(item.playCount)  }}</span>
                    <div class="user_name">
                        <span class="user_by">by&nbsp;</span>
                        <span>{{  item.dj.nickname  }}</span>
                    </div>
                </div>
            </div>
            <!-- 用户 -->
            <div v-show="curNavIndex == 7" class="user">
                <div v-for="item in userData" :key="item.userId" class="user_item"
                    @click="gotoPersonalHomePage(item.userId)">
                    <div class="left_box">
                        <el-image :src="item.avatarUrl" fit="cover" lazy class="user_pic">
                            <div slot="placeholder" class="radio_pic">
                                <el-image :src="require('../../assets/loading.gif')"></el-image>
                            </div>
                        </el-image>
                        <span v-for="(jtem, index) in item.nickname.length" :key="index"
                            :style="{ color: $store.state.cloudMusic.keyWords.indexOf(item.nickname.split('')[index]) !== -1 ? '#507daf' : '#000' }">{{
                             item.nickname.split('')[index] 
                            }}</span>
                    </div>
                    <span class="user_des">{{  userDes(item)  }}</span>
                </div>
                <!-- 分页 -->
                <div class="pagination" v-show="userData.length > 0">
                    <el-pagination :background="gettheme" layout="prev, pager, next"
                        :total="userNum" :page-size="20" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const navList = [
    {
        label: '单曲',
        index: 0
    },
    {
        label: '歌手',
        index: 1
    },
    {
        label: '专辑',
        index: 2
    },
    {
        label: '视频',
        index: 3
    },
    {
        label: '歌单',
        index: 4
    },
    {
        label: '歌词',
        index: 5
    },
    {
        label: '播客',
        index: 6
    },
    {
        label: '用户',
        index: 7
    }
]
import axios from 'axios'
import util from '@/tools/index'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            navList, // 导航栏
            curNavIndex: 0, // 默认导航栏所在位置
            tableData: [], // 表格数据
            totalNum: 0, // 歌曲总数量
            isLoading: false, // 加载
            mvid: 0, // mvid
            artistsData: [], // 歌手数据
            artistsNum: 0, // 歌手数量
            artistId: 0, // 歌手id
            albumData: [], // 专辑数据
            albumNum: 0, // 专辑数量
            vedioData: [], // 视频数据
            vedioNum: 0, // 视频数量
            playlistCount: 0, // 歌单数量
            playlists: [], // 歌单数据
            lyricData: [], // 歌词数据
            lyricNum: 0, // 歌词数量
            radioData: [], // 电台数据
            radioNum: 0, // 电台数量
            userData: [], // 声音数据
            userNum: 0, // 声音数量
            util
        }
    },
    watch: {
        $route() {
            this.getSearchInfo()
        },
        getsearchKeywords() {
            // 获取信息
            if (this.curNavIndex == 0) {
                // 查找单曲
                this.getSearchInfo()
                this.refresh()
            }
            if (this.curNavIndex == 1) {
                // 查找歌手
                this.searchArtistsByKeyWords()
                this.refresh()
            }
            if (this.curNavIndex == 2) {
                // 查找专辑
                this.searchAlbumByKeyWords()
                this.refresh()
            }
            if (this.curNavIndex == 3) {
                // 查找视频
                this.searchVedio()
                this.refresh()
            }
            if (this.curNavIndex == 4) {
                // 查找歌单
                this.searchSongsList()
                this.refresh()
            }
            if (this.curNavIndex == 5) {
                // 查找歌词
                this.searchLyric()
                this.refresh()
            }
            if (this.curNavIndex == 6) {
                // 查找电台
                this.searchRadio()
                this.refresh()
            }
            if (this.curNavIndex == 7) {
                // 查找用户
                this.searchUser()
                this.refresh()
            }
        }
    },
    computed: {
        ...mapGetters(['gettheme'])
    },
    created() {
        // 获取信息
        this.getSearchInfo()
    },
    methods: {
        gotoSongsListPage(item) {
            this.$router.push({ path: `/songsListPage?id=${item.id}` })
        },
        gotoAlbumPageFromSingle(row) {
            this.$router.push({ path: `/albumPage?id=${row.al.id}` })
        },
        // 前往歌手页面
        gotoArtistPage(id) {
            this.$router.push({ path: `/artistPage?id=${id}` })
        },
        // 前往个人主页
        gotoPersonalHomePage(userId) {
            // 跳转页面
            this.$router.push({ path: 'personalHomePage' })
        },
        // 获取信息
        getSearchInfo(offset) {
            // 参数缺省
            offset = typeof offset !== 'undefined' ? offset : 0
            // 开启加载
            this.isLoading = true
            // 调用搜索接口
            axios.get(`/cloudsearch?keywords=${util.getUrlParam()}&limit=100&offset=${offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    // 为总数量赋值
                    this.totalNum = res.data.result.songCount
                    // 为表格数据赋值
                    this.tableData = res.data.result.songs
                    // 刷新页面
                    this.refresh()
                    // 关闭加载
                    this.isLoading = false
                } else {
                    // 关闭加载
                    this.isLoading = false
                    // 弹窗提示错误
                    this.$message('获取单曲失败，请稍后再试')
                }
            })
        },
        // 刷新页面
        refresh() {
            this.$forceUpdate()
            this.$refs.box.scrollTop = 0
        },
        // 点击导航栏
        navChange(index) {
            this.curNavIndex = index
            if (index == 0 && this.tableData.length == 0) {
                // 查找单曲
                this.getSearchInfo()
            }
            if (index == 1 && this.artistsData.length == 0) {
                // 查找歌手
                this.searchArtistsByKeyWords()
            }
            if (index == 2 && this.albumData.length == 0) {
                // 查找专辑
                this.searchAlbumByKeyWords()
            }
            if (index == 3 && this.vedioData.length == 0) {
                // 查找视频
                this.searchVedio()
            }
            if (index == 4 && this.playlists.length == 0) {
                // 查找歌单
                this.searchSongsList()
            }
            if (index == 5 && this.lyricData.length == 0) {
                // 查找歌词
                this.searchLyric()
            }
            if (index == 6 && this.radioData.length == 0) {
                // 查找电台
                this.searchRadio()
            }
            if (index == 7 && this.userData.length == 0) {
                // 查找用户
                this.searchUser()
            }
        },
        // 查找歌手
        searchArtistsByKeyWords() {
            axios.get(`/cloudsearch?keywords=${util.getUrlParam()}&limit=20&type=100`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.artistsData = res.data.result.artists
                    this.artistsNum = res.data.result.artistCount
                } else {
                    this.$message('获取歌手失败，请稍后再试')
                }
            })
        },
        // 查找专辑
        searchAlbumByKeyWords(offset) {
            // 参数缺省
            offset = typeof offset !== 'undefined' ? offset : 0
            axios.get(`/cloudsearch?keywords=${util.getUrlParam()}&type=10&limit=20&offset=${offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.albumData = res.data.result.albums
                    this.albumNum = res.data.result.albumCount
                } else {
                    this.$message('获取专辑失败，请稍后再试')
                }
            })
        },
        // 查找视频
        searchVedio(offset) {
            // 参数缺省
            offset = typeof offset !== 'undefined' ? offset : 0
            axios.get(`/cloudsearch?keywords=${util.getUrlParam()}&type=1014&limit=24&offset=${offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.vedioNum = res.data.result.videoCount
                    this.vedioData = res.data.result.videos
                } else {
                    this.$message('获取视频失败，请稍后再试')
                }
            })
        },
        // 查找歌单
        searchSongsList(offset) {
            // 参数缺省
            offset = typeof offset !== 'undefined' ? offset : 0
            axios.get(`/cloudsearch?keywords=${util.getUrlParam()}&type=1000&limit=20&offset=${offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.playlists = res.data.result.playlists
                    this.playlistCount = res.data.result.playlistCount
                } else {
                    this.$message('获取歌单失败，请稍后再试')
                }
            })
        },
        // 查找歌词
        searchLyric(offset) {
            // 参数缺省
            offset = typeof offset !== 'undefined' ? offset : 0
            axios.get(`/cloudsearch?keywords=${util.getUrlParam()}&type=1006&limit=20&offset=${offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.lyricData = res.data.result.songs
                    this.lyricNum = res.data.result.songCount
                } else {
                    this.$message('获取歌词失败，请稍后再试')
                }
            })
        },
        // 查找电台
        searchRadio(offset) {
            // 参数缺省
            offset = typeof offset !== 'undefined' ? offset : 0
            axios.get(`/cloudsearch?keywords=${util.getUrlParam()}&type=1009&limit=10&offset=${offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.radioData = res.data.result.djRadios
                    this.radioNum = res.data.result.djRadiosCount
                } else {
                    this.$message('获取播客失败，请稍后再试')
                }
            })
        },
        // 查找用户
        searchUser(offset) {
            // 参数缺省
            offset = typeof offset !== 'undefined' ? offset : 0
            axios.get(`/cloudsearch?keywords=${util.getUrlParam()}&type=1002&limit=20&offset=${offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '查找用户')
                    this.userData = res.data.result.userprofiles
                    this.userNum = res.data.result.userprofileCount
                } else {
                    this.$message('获取用户失败，请稍后再试')
                }
            })
        },
        // 查看歌手详情
        clickArtists(item) {
            this.$router.push({path: `/artistPage?id=${item.id}`})
        },
        gotoAlbumPage(item) {
            this.$router.push({path: `/albumPage?id=${item.id}`})
        },
        // 翻页
        handleCurrentChange(val) {
            if (this.curNavIndex == 0) {
                this.getSearchInfo((val - 1) * 100)
            } else if (this.curNavIndex == 2) {
                this.searchAlbumByKeyWords((val - 1) * 20)
                this.refresh()
            } else if (this.curNavIndex == 3) {
                this.searchVedio((val - 1) * 24)
                this.refresh()
            } else if (this.curNavIndex == 4) {
                this.searchSongsList((val - 1) * 20)
                this.refresh()
            } else if (this.curNavIndex == 7) {
                this.searchUser((val - 1) * 20)
                this.refresh()
            }
        },
        // 播放音乐
        playMusic(row) {
            const audio = {
                id: row.id,
                dt: row.dt,
                pic: row.al.picUrl,
                name: row.name,
                authors: row.ar,
                isvip: row.fee === 1 || row.fee === 4,
                al: row.al
            }
            this.$store.commit('unshiftPlayList', audio)
        },
        // 播放MV
        playMv(mvid) {
            this.$router.push({path: `/mvPage?id=${mvid}`})
        },
        // 播放全部
        playAll() {
            for (let i = this.tableData.length - 1; i >= 0; i--) {
                const audio = {
                    id: this.tableData[i].id,
                    dt: this.tableData[i].dt,
                    pic: this.tableData[i].al.picUrl,
                    name: this.tableData[i].name,
                    authors: this.tableData[i].ar,
                    isvip: this.tableData[i].fee === 1 || this.tableData[i].fee === 4,
                    al: this.tableData[i].al
                }
                this.$store.commit('unshiftPlayList', audio)
            }
        },
        // 给每一行添加索引
        tableRowClassName({ row, rowIndex }) {
            row.index = rowIndex;
        },
        // 用户简介
        userDes(item) {
            if (item.description) {
                if (item.description.length > 20) {
                    return '网易音乐人'
                } else {
                    return item.description
                }
            } else {
                if (item.signature) {
                    if (item.signature.length > 20) {
                        return '网易音乐人'
                    } else {
                        return item.signature
                    }
                } else {
                    return '网易音乐人'
                }
            }
        },
        // 毫秒转分:秒
        filterTime(timestamp) {
            let minutes = parseInt((timestamp % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = parseInt((timestamp % (1000 * 60)) / 1000);
            return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        },
        // 播放次数格式化
        filterPlayCount(playCount) {
            if (playCount < 10000) {
                return playCount
            } else if (playCount >= 10000 && playCount < 100000000) {
                return (Math.floor(playCount / 1000) / 10) + '万'
            } else if (playCount >= 100000000) {
                return (Math.floor(playCount / 10000) / 10000) + '亿'
            }
        },
        // 时间戳转时分
        filterSeconds(timestamp) {
            let date = new Date(timestamp);
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
            return h + m
        },
    }
}
</script>

<style lang="less" scoped>
.box {
    .container {
        padding: 20px;

        .keywords {
            padding-left: 10px;
        }

        .nav {
            display: flex;
            padding: 20px 0;
            width: 100%;
            align-items: center;
            justify-content: space-between;

            .nav_box {
                display: flex;

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

        // 单曲
        .single {
            .play_all_btn {
                color: #fff;
            }

            .playtime {
                color: #999;
            }

            .tags {
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

            .mvtag {
                cursor: pointer;
            }

            .artist_box {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                .artist {
                    color: rgb(101, 101, 101);
                    cursor: pointer;
                    margin-right: 5px;
                }

                .artist:hover {
                    color: #000;
                }
            }

            .album {
                color: rgb(101, 101, 101);
                cursor: pointer;
            }

            .album:hover {
                color: #000;
            }
        }

        // 歌手
        .artists {
            .artist_item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                cursor: pointer;

                .item_left {
                    display: flex;
                    align-items: center;

                    .artist_pic {
                        width: 60px;
                        height: 60px;
                        border-radius: 4px;
                        margin-right: 10px;
                    }

                    .artist_name {
                        font-size: 12px;
                    }
                }

                .item_right {
                    .right_pic {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                    }
                }
            }

            .artist_item:hover {
                background-color: rgb(241, 242, 243);
            }

            .artist_item:nth-child(2n) {
                background-color: rgb(250, 250, 250);
            }
        }

        // 专辑
        .album {
            .album_item {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                cursor: pointer;

                .album_left {
                    display: flex;
                    align-items: center;

                    .album_pic {
                        width: 60px;
                        height: 60px;
                        border-radius: 4px;
                    }

                    .album_name {
                        font-size: 12px;
                        color: rgb(55, 55, 55);
                        margin-left: 10px;
                    }

                    .album_alias {
                        font-size: 12px;
                        color: rgb(159, 159, 159);
                        margin-left: 5px;
                    }
                }

                .album_author {
                    font-size: 12px;
                    color: #507daf;
                }
            }

            .album_item:hover {
                background-color: rgb(241, 242, 243);
            }

            .album_item:nth-child(2n) {
                background-color: rgb(250, 250, 250);
            }
        }

        // 视频
        .vedio {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .vedio_item {
                padding: 10px;
                display: flex;
                flex-direction: column;
                font-size: 12px;
                position: relative;
                cursor: pointer;

                .vedio_pic {
                    width: 380px;
                    height: 213px;
                    border-radius: 4px;
                }

                .vedio_playtime {
                    position: absolute;
                    right: 15px;
                    top: 15px;
                    color: #fff;
                }

                .vedio_dt {
                    position: absolute;
                    right: 15px;
                    top: 202px;
                    color: #fff;
                }

                .vedio_name {
                    padding: 10px 0 5px 0;
                }

                .vedio_author {
                    color: #507daf;
                }
            }
        }

        // 歌单
        .songslists {
            .songslists_item {
                display: flex;
                align-items: center;
                padding: 10px;
                cursor: pointer;
                position: relative;
                .songslist_pic {
                    width: 60px;
                    height: 60px;
                    border-radius: 4px;
                }

                .songslist_name {
                    font-size: 12px;
                    margin-left: 10px;
                }

                .track_count {
                    position: absolute;
                    font-size: 12px;
                    left: 50%;
                    color: #999;
                }

                .creator {
                    font-size: 12px;
                    position: absolute;
                    left: 60%;

                    .by {
                        color: #999;
                        margin-right: 5px;
                    }

                    .creator:hover {
                        color: #000;
                    }
                }

                .songslist_playcount {
                    position: absolute;
                    font-size: 12px;
                    color: #999;
                    left: 90%;
                }
            }

            .songslists_item:hover {
                background-color: rgb(241, 242, 243);
            }

            .songslists_item:nth-child(2n) {
                background-color: rgb(250, 250, 250);
            }
        }

        // 歌词
        .lyric {
            .tags {
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

            .mvtag {
                cursor: pointer;
            }

            .artist_box {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                .artist {
                    color: #999;
                    cursor: pointer;
                    margin-right: 5px;
                }

                .artist:hover {
                    color: #000;
                }
            }

            .btn_group {
                color: #000;
                border-color: #999;
            }

            .btn_group:hover {
                background-color: rgb(228, 229, 230);
                color: #000;
                border-color: #999;
            }
        }

        // 电台
        .radio_station {
            .radio_item {
                display: flex;
                align-items: center;
                font-size: 12px;
                cursor: pointer;

                .radio_pic {
                    width: 60px;
                    height: 60px;
                    border-radius: 4px;
                    margin: 10px 10px 10px 0;
                }

                .play_count {
                    position: absolute;
                    color: rgb(159, 159, 159);
                    left: 60%;
                }

                .user_name {
                    position: absolute;
                    left: 80%;

                    .user_by {
                        color: rgb(159, 159, 159);
                    }
                }
            }

            .radio_item:hover {
                background-color: rgb(241, 242, 243);
            }

            .radio_item:nth-child(2n) {
                background-color: rgb(250, 250, 250);
            }
        }

        // 用户
        .user {
            .user_item {
                display: flex;
                align-items: center;
                font-size: 12px;
                cursor: pointer;
                justify-content: space-between;

                .left_box {
                    display: flex;
                    align-items: center;

                    .user_pic {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin: 10px 10px 10px 0;
                    }
                }

                .user_des {
                    color: rgb(159, 159, 159);
                }
            }

            .user_item:hover {
                background-color: rgb(241, 242, 243);
            }

            .user_item:nth-child(2n) {
                background-color: rgb(250, 250, 250);
            }
        }
    }
}

.mvbox {
    left: 0;
    position: fixed;
}


.pagination {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
}
</style>

<style>
.el-loading-spinner {
    top: 330px !important;
}
</style>