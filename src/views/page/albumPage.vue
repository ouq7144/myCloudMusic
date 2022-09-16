<template>
    <div class="box" ref="albumBox">
        <div class="con">
            <div class="top_area">
                <div class="top_left_area">
                    <el-image :src="picUrl" cover="fit" class="album_pic">
                        <div slot="placeholder" class="artist_pic">
                            <el-image :src="require('../../assets/loading.gif')" class="album_pic"></el-image>
                        </div>
                    </el-image>
                </div>
                <div class="top_right_area">
                    <div class="info_row">
                        <span class="tag_text" :style="{borderColor: gettheme, color: gettheme}">{{ type }}</span>
                        <span class=album_name>{{ name }}</span>
                    </div>
                    <div class="info_row">
                        <div class="playbtn" :style="{background: gettheme}" @click="playAll">
                            <span>▷&nbsp播放全部</span>
                        </div>
                        <div class="btn">
                            <span>＋收藏</span>
                        </div>
                        <div class="btn">
                            <span>↓&nbspVIP下载</span>
                        </div>
                        <div class="btn">
                            <span>◎分享</span>
                        </div>
                    </div>
                    <div class="info_row">
                        <span>歌手：</span>
                        <span v-for="item in artists" :key="item" class="album_creator">
                            {{ item.name }}
                        </span>
                    </div>
                    <div class="info_row">
                        <span>时间：</span>
                        <span>{{ util.filterDay(publishTime) }}</span>
                    </div>
                </div>
            </div>
            <div class="bottom_area">
                <div class="nav_box">
                    <div v-for="item in navList" :key="item.index" class="nav_item"
                        :style="{ borderBottom: curNavIndex == item.index ? `2px solid ${gettheme}` : '0', fontWeight: curNavIndex == item.index ? 'bold' : 'unset', fontSize: curNavIndex == item.index ? '20px' : '16px' }"
                        @click="navChange(item.index)">{{ item.label }}</div>
                </div>
                <!-- 歌曲列表 -->
                <div class="contains" v-if="curNavIndex == 0">
                    <el-table :data="tableData" style="width: 100%" @row-dblclick="playMusic" stripe :row-class-name="tableRowClassName">
                        <el-table-column width="60" type="index" class-name="playtime">
                            <template slot-scope='scope'>
                                <div style="display: flex; align-items: center;">
                                    <span v-show="!($store.state.cloudMusic.playList[0] && $store.state.cloudMusic.playList[0].id == scope.row.id)">{{ computedIndex(scope.row.index) }}</span>
                                    <svg v-show="$store.state.cloudMusic.playList[0] && $store.state.cloudMusic.playList[0].id == scope.row.id" t="1661514845013" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2446" width="20" height="20"><path d="M525.541411 131.503033l-230.494605 148.031475h-114.988917c-63.895239 0-115.679649 51.14996-115.679649 115.219161v230.898811c0 63.664995 51.150984 115.219161 115.679649 115.219161h114.988917l230.494605 147.915841c32.582069 14.128789 57.840336-0.980327 57.840336-33.04358V164.54559c0-32.120558-25.892717-46.825468-57.840336-33.042557z m194.223516 186.033997c-10.841929-11.649318-29.122271-12.283768-40.712237-1.384533-11.649318 10.899234-12.226462 29.122271-1.384533 40.770565 5.363148 5.76633 14.531971 18.511609 23.989367 37.772279 16.146749 32.870642 25.892717 71.449285 25.892717 115.507733 0 44.058448-9.745968 82.694397-25.892717 115.507734-9.457396 19.259646-18.626219 32.004925-23.989367 37.772278-10.899234 11.648294-10.264784 29.871331 1.384533 40.770566 11.648294 10.899234 29.871331 10.264784 40.770566-1.384533 9.054213-9.68764 21.509896-26.987654 33.620725-51.727105 19.895119-40.483017 31.774681-87.654362 31.774681-140.996245 0-53.341882-11.879562-100.514251-31.774681-140.996244-12.169157-24.62484-24.625864-41.983183-33.679054-51.612495z m176.806845-35.69599c-23.297612-39.444361-46.825468-66.778916-63.318094-81.483826-11.880585-10.609639-30.102598-9.572006-40.714284 2.36486-10.609639 11.936867-9.573029 30.101575 2.364861 40.712238 2.709715 2.421142 8.131191 7.842619 15.396665 16.261358 12.455683 14.416338 24.911366 31.601742 36.619012 51.439556 33.504068 56.860009 53.630455 123.349329 53.630455 199.066825s-20.126386 142.206816-53.68776 199.125153c-11.706623 19.836791-24.220634 37.022195-36.619012 51.438533-7.265474 8.41874-12.68695 13.840216-15.397689 16.261359-11.879562 10.610662-12.916171 28.833699-2.363837 40.714283 10.553357 11.879562 28.833699 12.916171 40.713261 2.363838 16.493649-14.70491 40.021505-41.98216 63.319117-81.483826 38.522362-65.336054 61.646012-141.745305 61.646012-228.41934 0.058328-86.614683-23.066345-163.023934-61.588707-228.361011z" :fill="gettheme" p-id="2447"></path></svg>
                                </div>
                            </template>
                        </el-table-column>
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
                        <el-table-column label="标题">
                            <div slot-scope='scope'>
                                <span>{{ scope.row.name }}</span>    
                                <el-tag class="tags" v-if="tableData[scope.$index].fee == 1 || tableData[scope.$index].fee == 4">VIP</el-tag>
                                <el-tag class="tags" v-if="tableData[scope.$index].fee == 1 || tableData[scope.$index].fee == 4" :style="{borderColor: gettheme, color: gettheme}">试听</el-tag>
                                <el-tag class="tags mvtag" @click="playMv(scope.row)" v-if="tableData[scope.$index].mv !== 0" :style="{borderColor: gettheme, color: gettheme}">MV</el-tag>
                                <el-tag class="tags" v-if="tableData[scope.$index].sq" :style="{borderColor: gettheme, color: gettheme}">SQ</el-tag>
                            </div>
                        </el-table-column>
                        <el-table-column label="歌手" width="260" :show-overflow-tooltip="true">
                            <template slot-scope='scope'>
                                <span class="artist" v-for="(item, index) in scope.row.ar" :key="item.id" @click="gotoArtistPage(item.id)">{{ item.name }} {{
                                        index === scope.row.ar.length - 1 ?
                                            '' : '/'
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="专辑">
                            <template slot-scope='scope'>
                                <span class="artist" @click="gotoAlbumPage(scope.row.al.id)">{{ scope.row.al.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="时长" width="180">
                            <template slot-scope='scope'>
                                <span class="playtime">{{ util.filterTime(scope.row.dt) }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 评论 -->
                <div class="contains_comment" v-if="curNavIndex == 1">
                    <div class="comment">
                        <div class="input_comment">
                            <el-input class="input" type="textarea" :rows="3" placeholder="请输入评论" v-model="yourComment"
                                resize="none" maxlength="140" :show-word-limit="true">
                            </el-input>
                            <div class="tools">
                                <div>
                                    <svg t="1658519360638" class="icon icons" viewBox="0 0 1026 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2342" width="20" height="20">
                                        <path
                                            d="M495.465 830.665c-187.138 0-264.948-168.222-268.193-175.401l62.966-28.307c2.486 5.49 62.207 134.667 205.194 134.667 153.067-1.795 211.302-129.213 213.685-134.633l63.103 27.996c-3.141 7.077-79.054 173.364-273.13 175.643l-3.625 0.034zM500.16 991.221c-256.974 0-466.034-209.060-466.034-466.034s209.060-466.034 466.034-466.034 466.034 209.060 466.034 466.034-209.060 466.034-466.034 466.034zM500.16 128.196c-218.897 0-396.991 178.094-396.991 396.991s178.094 396.991 396.991 396.991 396.991-178.094 396.991-396.991-178.059-396.991-396.991-396.991zM311.088 444.27c0 29.689 24.062 53.818 53.818 53.818s53.818-24.096 53.818-53.818-24.062-53.818-53.818-53.818-53.818 24.096-53.818 53.818zM580.765 444.27c0 29.689 24.062 53.818 53.818 53.818s53.818-24.096 53.818-53.818-24.062-53.818-53.818-53.818-53.818 24.096-53.818 53.818z"
                                            p-id="2343"></path>
                                    </svg>
                                    <svg t="1658519439106" class="icon icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2899" width="20" height="20">
                                        <path
                                            d="M513.221155 1023.997336a511.99667 511.99667 0 0 1 0-1023.993339 521.099819 521.099819 0 0 1 375.67145 157.861939 478.692463 478.692463 0 0 1 133.216827 355.24487v2.664337c-27.531477 175.846211-139.877668 263.32526-234.461615 259.328755-73.047226-3.108393-123.669621-56.839179-129.220321-136.769275a22.202804 22.202804 0 0 1 20.648608-23.090916 22.202804 22.202804 0 0 1 23.757001 20.648608c3.774477 56.617151 37.078683 93.251779 86.812965 95.472059 75.933591 2.664337 164.522781-71.49303 188.279781-222.028044a434.952938 434.952938 0 0 0-121.227312-321.27458A476.916239 476.916239 0 0 0 513.221155 44.409605a467.591061 467.591061 0 0 0 0 935.182122 480.912743 480.912743 0 0 0 365.680189-166.076977 22.202804 22.202804 0 0 1 31.305954-2.664337 22.202804 22.202804 0 0 1 2.664336 31.305955 526.428492 526.428492 0 0 1-399.650479 181.840968z"
                                            fill="#666666" p-id="2900"></path>
                                        <path
                                            d="M488.354014 773.549702a212.924894 212.924894 0 0 1-133.216826-49.95631c-112.568218-88.811218-121.44934-215.145175-24.423085-346.363749 86.590937-117.008779 238.680147-151.423126 339.258851-77.265759s116.786751 229.799026 32.860151 343.477384c-54.840927 73.713311-122.115424 119.451088-189.61195 128.33221a197.382931 197.382931 0 0 1-24.867141 1.776224z m-121.227312-369.898721c-58.171348 78.3759-102.354928 191.388174 16.208047 285.084008a164.300753 164.300753 0 0 0 124.779761 39.076936c55.507011-7.326925 112.124162-46.847917 159.638164-111.014022 69.494778-93.917863 58.837432-220.029792-23.757001-281.309532s-204.931885-29.307702-276.868971 67.940582z"
                                            fill="#666666" p-id="2901"></path>
                                    </svg>
                                    <svg t="1658519477875" class="icon icons" viewBox="0 0 1219 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="3074" width="20" height="20">
                                        <path
                                            d="M1194.381437 280.314011h-108.713086a24.375131 24.375131 0 0 1 0-48.750263H1194.381437a24.375131 24.375131 0 0 1 0 48.750263zM955.261398 280.314011H73.125394a24.375131 24.375131 0 0 1 0-48.750263h882.136004a24.375131 24.375131 0 0 1 0 48.750263zM1145.631174 799.991811H390.002102a24.375131 24.375131 0 0 1 0-48.750262h755.629072a24.375131 24.375131 0 1 1 0 48.750262zM250.332599 799.991811H24.375131a24.375131 24.375131 0 0 1 0-48.750262h225.957468a24.375131 24.375131 0 1 1 0 48.750262z"
                                            fill="#666666" p-id="3075"></path>
                                        <path
                                            d="M167.700904 1023.999269a20.231359 20.231359 0 0 1-8.287545-1.706259 24.375131 24.375131 0 0 1-14.625079-31.200169L499.690193 16.087587a24.399506 24.399506 0 0 1 45.825247 16.81884l-354.901913 975.005255a24.375131 24.375131 0 0 1-22.912623 16.087587zM684.69744 1023.999269a20.231359 20.231359 0 0 1-8.287545-1.706259 24.375131 24.375131 0 0 1-14.625078-31.200169l354.901912-975.005254a24.399506 24.399506 0 0 1 45.825247 16.81884l-354.901912 975.005255a24.375131 24.375131 0 0 1-22.912624 16.087587z"
                                            fill="#666666" p-id="3076"></path>
                                    </svg>
                                </div>
                                <div>
                                    <el-button class="send_comment_btn" round>评论</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comment_list">
                        <h5 class="hot_comments" v-show="curPage == 0 && commentData.hotComments.length > 0">精彩评论</h5>
                        <div v-for="item in commentData.hotComments" :key="item.commentId" class="each_comment" v-show="curPage == 0">
                            <el-image :src="item.user.avatarUrl || ''" class="user_pic" lazy @click="gotoPersonalPage(item.user.userId)"></el-image>
                            <div class="user_info">
                                <div>
                                    <span class="user_info_color" @click="gotoPersonalPage(item.user.userId)">{{ item.user.nickname }}：</span>
                                    <span>{{ item.content }}</span>
                                </div>
                                <div>
                                    <div v-for="jtem in item.beReplied">
                                        <div class="replied_comment">
                                            <span class="user_info_color">@{{ jtem.user.nickname }}：</span>
                                            <span>{{ jtem.content }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span class="user_info_time">{{ item.timeStr }}</span>
                                    <span class="user_info_time">{{ util.filterSeconds(item.time) }}</span>
                                    <div class="liked">
                                        <span class="report">举报</span>
                                        <span class="liked_margin">|</span>
                                        <svg t="1658554485792" class="icon liked_icons" viewBox="0 0 1024 1024"
                                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2265" width="14"
                                            height="14">
                                            <path
                                                d="M890.908 429.534c-20.66-26.05-51.585-40.99-84.84-40.99l-189.34 0c10.34-28.83 17.18-60.165 19.615-90.48 3.785-47.147-3.465-89.02-20.955-121.095-21.53-39.46-58.18-64.072-105.997-71.177-21.662-3.22-40.292 0.945-55.377 12.372-30.495 23.102-36.092 67.065-42.575 117.97-5.182 40.692-11.055 86.817-30.79 119.877-13.172 22.065-38.807 51.397-109.092 51.397l-73.345 0c-48.842 0-88.58 39.722-88.58 88.545l0 334.754c0 48.82 39.737 88.545 88.58 88.545l534.336 0c24.33 0 48.22-8.325 67.275-23.43 19.06-15.11 32.605-36.475 38.145-60.155l73.52-314.264C919.058 489.054 911.553 455.569 890.908 429.534zM168.672 830.708 168.672 495.956c0-16.27 13.252-29.505 29.537-29.505l62.232 0 0 393.762-62.232 0C181.925 860.213 168.672 846.978 168.672 830.708zM853.998 507.956l-73.52 314.272c-5.23 22.36-24.94 37.985-47.93 37.985L319.484 860.213 319.484 462.169c49.877-9.52 87.4-34.92 111.86-75.895 26.05-43.64 32.75-96.257 38.662-142.68 2.67-20.977 5.193-40.79 9.2-55.99 4.297-16.302 8.745-21.08 10.457-22.377 1.96-1.485 5.677-1.835 11.05-1.035 29.615 4.4 50.175 17.83 62.84 41.052 25.99 47.642 14.505 128.052-10.265 182.86-5.93 13.127-4.83 28.167 2.96 40.232 7.78 12.052 21.01 19.247 35.395 19.247l214.424 0c15.125 0 29.185 6.792 38.58 18.637C854.028 478.049 857.438 493.261 853.998 507.956z"
                                                p-id="2266" fill="#707070"></path>
                                        </svg>
                                        <span>{{ item.likedCount }}</span>
                                        <span class="liked_margin">|</span>
                                        <svg t="1658554856163" class="icon liked_icons" viewBox="0 0 1024 1024"
                                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3251" width="14"
                                            height="14">
                                            <path
                                                d="M512 939.804444c-57.612929 0-113.570909-11.274343-166.322424-33.616161-50.889697-21.514343-96.504242-52.337778-135.809293-91.539394C170.666667 775.447273 139.843232 729.729293 118.328889 678.839596 96.193939 626.191515 84.816162 570.233535 84.816162 512.620606s11.274343-113.570909 33.616161-166.322424c21.514343-50.889697 52.337778-96.504242 91.539394-135.809293 39.201616-39.201616 84.919596-70.025051 135.809293-91.539394 52.648081-22.238384 108.606061-33.616162 166.322424-33.616162h1.034344l-0.103435 57.923233h-0.930909c-98.676364 0-191.353535 38.374141-261.068282 108.192323-69.818182 69.818182-108.295758 162.495354-108.295758 261.171717s38.374141 191.353535 108.192323 261.068283c69.714747 69.818182 162.495354 108.192323 261.068283 108.192323 98.572929 0 191.250101-38.374141 261.068283-108.088889C842.78303 704.077576 881.260606 611.400404 881.260606 512.827475h57.923232c0 57.612929-11.377778 113.570909-33.616161 166.21899-21.514343 50.889697-52.337778 96.504242-91.539394 135.705858s-84.919596 69.921616-135.705859 91.43596c-52.751515 22.341818-108.606061 33.616162-166.322424 33.616161zM938.149495 352.711111h-57.923232V145.73899H672.530101v-57.923232H938.149495V352.711111z m0 0"
                                                p-id="3252" fill="#707070"></path>
                                            <path
                                                d="M888.371717 96.012929l40.96 40.96L560.484848 505.806869l-40.96-40.96L888.371717 96.012929z m0 0"
                                                p-id="3253" fill="#707070"></path>
                                        </svg>
                                        <span class="liked_margin">|</span>
                                        <svg t="1658554967236" class="icon liked_icons" viewBox="0 0 1024 1024"
                                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7706" width="14"
                                            height="14">
                                            <path
                                                d="M512.146827 268.510985c-250.902034 0-454.505322 157.57406-454.505322 359.095851 0 77.452531 32.639121 168.259723 83.298552 213.54786C166.24668 863.780505 88.131465 990.268512 109.075322 1018.193654c23.957624 31.943141 164.908706-79.128039 205.700895-61.760749C355.568406 973.800196 441.499439 987.04638 512.146827 987.04638c250.902034 0 447.742067-158.01764 454.089667-359.439545C972.069626 442.506103 768.001278 268.510985 512.146827 268.510985zM511.997535 950.528886C447.362645 950.528886 362.014817 933.770578 323.347087 920.455656c-38.351961-13.206444-179.982913 66.085924-179.982913 66.085924s52.530415-136.615167 29.151701-161.97227c-42.140114-45.708088-76.209862-124.513914-76.209862-195.375037 0-184.372531 186.277885-324.240977 415.827925-324.240977s415.35105 154.807323 415.447714 324.240977C927.690131 821.643613 741.54865 950.528886 511.997535 950.528886zM311.488568 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM504.000204 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM696.511839 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0Z"
                                                p-id="7707" fill="#707070"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h5 class="hot_comments" v-show="commentData.comments.length > 0">最新评论（{{ commentData.total }}）</h5>
                        <div v-for="item in commentData.comments" :key="item.commentId" class="each_comment">
                            <img :src="item.user.avatarUrl || ''" class="user_pic" @click="gotoPersonalPage(item.user.userId)">
                            <div class="user_info">
                                <div>
                                    <span class="user_info_color" @click="gotoPersonalPage(item.user.userId)">{{ item.user.nickname }}：</span>
                                    <span>{{ item.content }}</span>
                                </div>
                                <div>
                                    <div v-for="jtem in item.beReplied">
                                        <div class="replied_comment">
                                            <span class="user_info_color">@{{ jtem.user.nickname }}：</span>
                                            <span>{{ jtem.content }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span class="user_info_time">{{ item.timeStr }}</span>
                                    <span class="user_info_time">{{ util.filterSeconds(item.time) }}</span>
                                    <div class="liked">
                                        <span class="report">举报</span>
                                        <span class="liked_margin">|</span>
                                        <svg t="1658554485792" class="icon liked_icons" viewBox="0 0 1024 1024"
                                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2265" width="14"
                                            height="14">
                                            <path
                                                d="M890.908 429.534c-20.66-26.05-51.585-40.99-84.84-40.99l-189.34 0c10.34-28.83 17.18-60.165 19.615-90.48 3.785-47.147-3.465-89.02-20.955-121.095-21.53-39.46-58.18-64.072-105.997-71.177-21.662-3.22-40.292 0.945-55.377 12.372-30.495 23.102-36.092 67.065-42.575 117.97-5.182 40.692-11.055 86.817-30.79 119.877-13.172 22.065-38.807 51.397-109.092 51.397l-73.345 0c-48.842 0-88.58 39.722-88.58 88.545l0 334.754c0 48.82 39.737 88.545 88.58 88.545l534.336 0c24.33 0 48.22-8.325 67.275-23.43 19.06-15.11 32.605-36.475 38.145-60.155l73.52-314.264C919.058 489.054 911.553 455.569 890.908 429.534zM168.672 830.708 168.672 495.956c0-16.27 13.252-29.505 29.537-29.505l62.232 0 0 393.762-62.232 0C181.925 860.213 168.672 846.978 168.672 830.708zM853.998 507.956l-73.52 314.272c-5.23 22.36-24.94 37.985-47.93 37.985L319.484 860.213 319.484 462.169c49.877-9.52 87.4-34.92 111.86-75.895 26.05-43.64 32.75-96.257 38.662-142.68 2.67-20.977 5.193-40.79 9.2-55.99 4.297-16.302 8.745-21.08 10.457-22.377 1.96-1.485 5.677-1.835 11.05-1.035 29.615 4.4 50.175 17.83 62.84 41.052 25.99 47.642 14.505 128.052-10.265 182.86-5.93 13.127-4.83 28.167 2.96 40.232 7.78 12.052 21.01 19.247 35.395 19.247l214.424 0c15.125 0 29.185 6.792 38.58 18.637C854.028 478.049 857.438 493.261 853.998 507.956z"
                                                p-id="2266" fill="#707070"></path>
                                        </svg>
                                        <span>{{ item.likedCount }}</span>
                                        <span class="liked_margin">|</span>
                                        <svg t="1658554856163" class="icon liked_icons" viewBox="0 0 1024 1024"
                                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3251" width="14"
                                            height="14">
                                            <path
                                                d="M512 939.804444c-57.612929 0-113.570909-11.274343-166.322424-33.616161-50.889697-21.514343-96.504242-52.337778-135.809293-91.539394C170.666667 775.447273 139.843232 729.729293 118.328889 678.839596 96.193939 626.191515 84.816162 570.233535 84.816162 512.620606s11.274343-113.570909 33.616161-166.322424c21.514343-50.889697 52.337778-96.504242 91.539394-135.809293 39.201616-39.201616 84.919596-70.025051 135.809293-91.539394 52.648081-22.238384 108.606061-33.616162 166.322424-33.616162h1.034344l-0.103435 57.923233h-0.930909c-98.676364 0-191.353535 38.374141-261.068282 108.192323-69.818182 69.818182-108.295758 162.495354-108.295758 261.171717s38.374141 191.353535 108.192323 261.068283c69.714747 69.818182 162.495354 108.192323 261.068283 108.192323 98.572929 0 191.250101-38.374141 261.068283-108.088889C842.78303 704.077576 881.260606 611.400404 881.260606 512.827475h57.923232c0 57.612929-11.377778 113.570909-33.616161 166.21899-21.514343 50.889697-52.337778 96.504242-91.539394 135.705858s-84.919596 69.921616-135.705859 91.43596c-52.751515 22.341818-108.606061 33.616162-166.322424 33.616161zM938.149495 352.711111h-57.923232V145.73899H672.530101v-57.923232H938.149495V352.711111z m0 0"
                                                p-id="3252" fill="#707070"></path>
                                            <path
                                                d="M888.371717 96.012929l40.96 40.96L560.484848 505.806869l-40.96-40.96L888.371717 96.012929z m0 0"
                                                p-id="3253" fill="#707070"></path>
                                        </svg>
                                        <span class="liked_margin">|</span>
                                        <svg t="1658554967236" class="icon liked_icons" viewBox="0 0 1024 1024"
                                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7706" width="14"
                                            height="14">
                                            <path
                                                d="M512.146827 268.510985c-250.902034 0-454.505322 157.57406-454.505322 359.095851 0 77.452531 32.639121 168.259723 83.298552 213.54786C166.24668 863.780505 88.131465 990.268512 109.075322 1018.193654c23.957624 31.943141 164.908706-79.128039 205.700895-61.760749C355.568406 973.800196 441.499439 987.04638 512.146827 987.04638c250.902034 0 447.742067-158.01764 454.089667-359.439545C972.069626 442.506103 768.001278 268.510985 512.146827 268.510985zM511.997535 950.528886C447.362645 950.528886 362.014817 933.770578 323.347087 920.455656c-38.351961-13.206444-179.982913 66.085924-179.982913 66.085924s52.530415-136.615167 29.151701-161.97227c-42.140114-45.708088-76.209862-124.513914-76.209862-195.375037 0-184.372531 186.277885-324.240977 415.827925-324.240977s415.35105 154.807323 415.447714 324.240977C927.690131 821.643613 741.54865 950.528886 511.997535 950.528886zM311.488568 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM504.000204 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM696.511839 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0Z"
                                                p-id="7707" fill="#707070"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination" v-show="commentData.comments.length > 0">
                        <el-pagination background
                            layout="prev, pager, next" :total="commentData.total" :page-size="60"
                            @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                </div>
                <!-- 专辑详情 -->
                <div class=contains_description v-if="curNavIndex == 2">
                    <div class="des_title">
                        <span>专辑介绍</span>
                    </div>
                    <div class="des_box">
                        {{ description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import util from '@/tools/index'
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
const navList = [
	{
		label: '歌曲列表',
		index: 0
	},
	{
		label: '评论',
		index: 1
	},
	{
		label: '专辑详情',
		index: 2
	}
]
export default {
    data() {
        return {
            picUrl: '', // 专辑封面图
            name: '', // 专辑名称
            artists: [], // 专辑作者
            publishTime: '', // 专辑发布时间
            description: '', // 专辑详情
            type: '', // 专辑类型
            navList, // 菜单
            curNavIndex: 0, // 当前所处位置
            commentData: [], // 专辑评论
            curPage: 0, // 当前评论处于第几页
            util
        }
    },
    computed: {
        ...mapGetters(['getalbumId', 'gettheme'])  
    },
    mounted() {
        this.getAlbumInfo()
        this.getAlbumComments()
    },
    watch: {
        $route() {
            location.reload()
        }
    },
    methods: {
        // 播放全部
        playAll() {
            for(let i = this.tableData.length - 1; i >= 0; i--) {
                if (this.tableData[i].success) {
                    const audio = {
                        id: this.tableData[i].id,
                        dt: this.tableData[i].dt,
                        pic: this.tableData[i].picUrl,
                        name: this.tableData[i].name,
                        authors: this.tableData[i].ar,
                        isvip: this.tableData[i].fee === 1 || this.tableData[i].fee === 4,
                        al: this.tableData[i].al
                    }
                    this.$store.commit('unshiftPlayList', audio)
                }
            }
        },
        // 歌曲列表的index补零
        computedIndex(index) {
            // 获取数组总数量的位数 （例如：共有100个数据，则len = 3）
            let len = this.tableData.length.toString().length
            let temp = ''
            for (let i = (index + 1).toString().length; i < len; i++) {
                temp += '0'
            }
            return `${temp}${index + 1}`
        },
        // 给每一行添加索引
        tableRowClassName({ row, rowIndex }) {
            row.index = rowIndex;
        },
        // 获取专辑信息
        getAlbumInfo() {
            axios.get(`/album?id=${util.getUrlParam()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取专辑信息')
                    this.picUrl = res.data.album.picUrl
                    this.name = res.data.album.name
                    this.artists = res.data.album.artists
                    this.publishTime = res.data.album.publishTime
                    this.type = res.data.album.type
                    this.description = res.data.album.description
                    let tempData = res.data.songs
                    // 检查每首歌曲是否有版权
                    for (let i = 0; i < tempData.length; i++) {
                        axios.get(`/check/music?id=${tempData[i].id}`).then(res => {
                            tempData[i].success = res.data.success
                        })
                    }
                    this.tableData = tempData
                } else {
                }
            })
        },
        // 获取专辑评论
        getAlbumComments(offset) {
            offset = typeof offset !== 'undefined' ? offset : 0
            axios.get(`/comment/album?id=${util.getUrlParam()}&limit=60&offset=${offset}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取专辑评论')
                    this.commentData = res.data
                } else {
                    
                }
            })
        },
        // 翻页
        handleCurrentChange(val) {
            this.curPage = val
            this.getAlbumComments((val - 1) * 60)
            this.$refs.albumBox.scrollTo(0, 0)
        },
        // 菜单切换
        navChange(index) {
            this.curNavIndex = index
        },
        // 播放单曲
        playMusic(row) {
            if (!row.success) {
                return this.$message('亲，暂无版权~')
            }
            const audio = {
                id: row.id, // 歌曲id
                dt: row.dt, // 歌曲时长
                pic: row.al.picUrl, // 歌曲封面
                name: row.name, // 歌曲名称
                authors: row.ar, // 作者(可能有多个)
                isvip: row.fee == 1 || row.fee == 4, // 是否需要VIP
                al: row.al // 音乐所在专辑
            }
            this.$store.commit('unshiftPlayList', audio)
            console.log(this.$store.state.cloudMusic.playList[0], '12')
        },
        // 点击歌手
        gotoArtistPage(id) {
            // 跳转页面
            this.$router.push({path: `artistPage?id=${id}`})
        },
        // 点击专辑
        gotoAlbumPage(id) {
            this.$router.push({path: `albumPage?id=${id}`})
        },
        // 前往个人主页
        gotoPersonalPage(id) {
            this.$router.push({path: `personalHomePage?id=${id}`})
        }
    }
}
</script>

<style lang="less" scoped>
.box {
    overflow: auto;
    .con {
        padding: 20px;
        .top_area {
            display: flex;
            .top_left_area {
                .album_pic {
                    width: 180px;
                    height: 180px;
                    border-radius: 4px;
                }
            }
            .top_right_area {
                padding-left: 20px;
                .info_row {
                    padding-bottom: 10px;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    .tag_text {
                        padding: 1px 3px;
                        border: 1px solid #000;
                        font-size: 12px;
                        border-radius: 4px;
                    }
                    .album_name {
                        font-size: 22px;
                        font-weight: bold;
                        margin-left: 10px;
                    }
                    .btn {
                        border-radius: 24px;
                        border: 1px solid #D9D9D9;
                        padding: 3px 10px;
                        cursor: pointer;
                        margin-right: 10px;
                    }
                    .btn:hover {
                        background: rgb(242, 242, 242);
                    }
                    .playbtn {
                        color: #fff;
                        border-radius: 24px;
                        border: 1px solid #D9D9D9;
                        padding: 3px 10px;
                        cursor: pointer;
                        margin-right: 10px;
                    }
                    .playbtn:hover {
                        opacity: .8;
                    }
                    .album_creator {
                        color: rgb(80, 125, 175);
                        cursor: pointer;
                    }
                    .album_creator:hover {
                        color: rgb(11, 88, 176);
                    }
                }
            }
        }
        .bottom_area {
            margin-top: 20px;
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
                opacity: .8;
                cursor: pointer;
            }
            .artist {
                color: rgb(101, 101, 101);
                cursor: pointer;
                margin-right: 5px;
            }
            .artist:hover {
                color: #000;
            }
            .contains_comment {
                padding: 20px;
                .comment {
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
                                background-color: #fff;
                                border-color: rgb(229, 229, 229);
                                color: #000;
                            }

                            .send_comment_btn:hover {
                                background-color: rgb(245, 245, 245);
                            }
                        }
                    }
                }

                .comment_list {
                    .hot_comments {
                        margin: 20px 0;
                    }

                    .each_comment {
                        display: flex;
                        border-bottom: 1px solid #f2f2f2;
                        padding: 20px 0;

                        .user_pic {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            cursor: pointer;
                        }

                        .replied_comment {
                            padding: 10px;
                            background-color: rgb(245, 245, 245);
                        }

                        .user_info {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            margin-left: 10px;
                            font-size: 12px;
                            width: 100%;

                            .user_info_color {
                                color: rgb(80, 125, 175);
                                cursor: pointer;
                            }

                            .user_info_color:hover {
                                color: rgb(11, 88, 176);
                            }

                            .user_info_time {
                                color: rgb(159, 159, 159);
                                padding-right: 10px;
                            }

                            .liked {
                                float: right;
                                display: flex;
                                align-items: center;
                                color: rgb(112, 112, 112);

                                .liked_margin {
                                    margin: 0 10px;
                                }

                                .liked_icons:hover {
                                    -webkit-filter: drop-shadow(0px 0px 0px #000);
                                    cursor: pointer;
                                }

                                .report {
                                    cursor: pointer;
                                    color: #707070;
                                }

                                .report:hover {
                                    color: #000;
                                }
                            }
                        }
                    }
                }
                .pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .contains_description {
                padding: 20px 0;
                .des_title {
                    font-size: 14px;
                    font-weight: bold;
                }
                .des_box {
                    padding-top: 20px;
                    white-space: pre-line;
                    font-size: 14px;
                    color: rgb(103, 103, 103);
                }
            }
        }
    }
}
</style>