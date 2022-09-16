<template>
    <div>
        <div class="songs_list">
            <div class="header_box">
                <div class="header">
                    <div class="songs_list_pic">
                        <img :src="songsGatherDetails.coverImgUrl" class="songs_list_pic">
                    </div>
                    <div class="songs_list_info">
                        <div class="info_row">
                            <el-tag size="mini" class="info_tag" :style="{ borderColor: gettheme, color: gettheme }">歌单
                            </el-tag>
                            <span class="list_name">{{ songsGatherDetails.name }}</span>
                        </div>
                        <div class="info_row" v-if="songsGatherDetails.creator !== undefined">
                            <el-image :src="songsGatherDetails.creator.avatarUrl" class="author_pic">
                                <div slot="placeholder" class="author_pic">
                                    <el-image :src="require('../../assets/loading.gif')"></el-image>
                                </div>
                            </el-image>
                            <span class="author_name"
                                @click="gotoPersonalHomePage(songsGatherDetails.creator.userId)">{{
                                songsGatherDetails.creator.nickname }}</span>
                            <span class="create_time">{{ util.filterDay(songsGatherDetails.createTime) }}创建</span>
                        </div>
                        <div class="info_row">
                            <el-button round class="play_all_btn" @click="playAll"
                                :style="{ borderColor: gettheme, backgroundColor: gettheme }">▶ 播放全部</el-button>
                            <el-button round class="save_btn" icon="el-icon-plus" @click="handleCollect">
                                {{collectTitle}}({{
                                util.filterPlayCount(songsGatherDetails.subscribedCount)
                                }})</el-button>
                            <el-button round class="save_btn" icon="el-icon-share">分享({{
                            util.filterPlayCount(songsGatherDetails.shareCount)
                            }})</el-button>
                            <el-button round class="save_btn" icon="el-icon-download">下载全部</el-button>
                        </div>
                        <div class="info_row">
                            <span class="list_tag">标签：</span>
                            <span class="list_tag_type" v-for="(item, index) in songsGatherDetails.tags" :key="index">{{
                            item
                            }} {{ index === songsGatherDetails.tags.length - 1 ? '' : '/' }}</span>
                        </div>
                        <div class="info_row">
                            <span class="list_tag">歌曲：</span>
                            <span class="list_tag" v-if="tableData.songs !== undefined">{{ tableData.songs.length
                            }}</span>
                            <span class="list_tag" style="margin-left:15px;">播放：</span>
                            <span class="list_tag">{{ util.filterPlayCount(songsGatherDetails.playCount) }}</span>
                        </div>
                        <div class="info_row">
                            <span class="list_tag">简介：</span>
                            <span class="list_tag list_description">{{ songsGatherDetails.description }}</span>
                        </div>
                    </div>
                </div>
                <div class="component_list">
                    <!-- 菜单 -->
                    <div class="nav">
                        <div class="nav_box">
                            <div v-for="item in navList" :key="item.index" class="nav_item"
                                :style="{ borderBottom: curIndex == item.index + 1 ? `2px solid ${gettheme}` : '0', fontWeight: curIndex == item.index + 1 ? 'bold' : 'unset', fontSize: curIndex == item.index + 1 ? '20px' : '16px' }"
                                @click="navChange(item.index)">{{ item.label }}</div>
                        </div>
                    </div>
                    <div v-if="curIndex === 1">
                        <el-input class="search_input" v-model="searchKeywords">
                            <i slot="suffix" v-show="searchKeywords == ''" class="el-input__icon el-icon-search"
                                @click="search"></i>
                            <i slot="suffix" v-show="searchKeywords !== ''" class="el-input__icon el-icon-close"
                                @click="clearSearchInput"></i>
                        </el-input>
                    </div>
                </div>
            </div>
            <div v-if="curIndex === 1">
                <el-table :data="tableData.songs" style="width: 100%" @row-dblclick="playMusic" stripe
                    :row-class-name="tableRowClassName">
                    <el-table-column width="60" type="index" class-name="playtime">
                        <template slot-scope='scope'>
                            <div style="display: flex; align-items: center;">
                                <span class="playtime"
                                    v-show="!($store.state.cloudMusic.playList[0] && $store.state.cloudMusic.playList[0].id == scope.row.id)">{{
                                    util.computedIndex(tableData.songs.length, scope.row.index) }}</span>
                                <svg v-show="$store.state.cloudMusic.playList[0] && $store.state.cloudMusic.playList[0].id == scope.row.id"
                                    t="1661514845013" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2446" width="20" height="20">
                                    <path
                                        d="M525.541411 131.503033l-230.494605 148.031475h-114.988917c-63.895239 0-115.679649 51.14996-115.679649 115.219161v230.898811c0 63.664995 51.150984 115.219161 115.679649 115.219161h114.988917l230.494605 147.915841c32.582069 14.128789 57.840336-0.980327 57.840336-33.04358V164.54559c0-32.120558-25.892717-46.825468-57.840336-33.042557z m194.223516 186.033997c-10.841929-11.649318-29.122271-12.283768-40.712237-1.384533-11.649318 10.899234-12.226462 29.122271-1.384533 40.770565 5.363148 5.76633 14.531971 18.511609 23.989367 37.772279 16.146749 32.870642 25.892717 71.449285 25.892717 115.507733 0 44.058448-9.745968 82.694397-25.892717 115.507734-9.457396 19.259646-18.626219 32.004925-23.989367 37.772278-10.899234 11.648294-10.264784 29.871331 1.384533 40.770566 11.648294 10.899234 29.871331 10.264784 40.770566-1.384533 9.054213-9.68764 21.509896-26.987654 33.620725-51.727105 19.895119-40.483017 31.774681-87.654362 31.774681-140.996245 0-53.341882-11.879562-100.514251-31.774681-140.996244-12.169157-24.62484-24.625864-41.983183-33.679054-51.612495z m176.806845-35.69599c-23.297612-39.444361-46.825468-66.778916-63.318094-81.483826-11.880585-10.609639-30.102598-9.572006-40.714284 2.36486-10.609639 11.936867-9.573029 30.101575 2.364861 40.712238 2.709715 2.421142 8.131191 7.842619 15.396665 16.261358 12.455683 14.416338 24.911366 31.601742 36.619012 51.439556 33.504068 56.860009 53.630455 123.349329 53.630455 199.066825s-20.126386 142.206816-53.68776 199.125153c-11.706623 19.836791-24.220634 37.022195-36.619012 51.438533-7.265474 8.41874-12.68695 13.840216-15.397689 16.261359-11.879562 10.610662-12.916171 28.833699-2.363837 40.714283 10.553357 11.879562 28.833699 12.916171 40.713261 2.363838 16.493649-14.70491 40.021505-41.98216 63.319117-81.483826 38.522362-65.336054 61.646012-141.745305 61.646012-228.41934 0.058328-86.614683-23.066345-163.023934-61.588707-228.361011z"
                                        :fill="gettheme" p-id="2447"></path>
                                </svg>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column width="40" class-name="playtime">
                        <template slot-scope='scope'>
                            <svg v-show="!tableData.songs[scope.$index].islove" t="1662282634308" class="icon icons"
                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2353"
                                width="20" height="20">
                                <path
                                    d="M780.1856 91.3408C691.4048 73.728 578.9696 112.128 511.7952 232.7552c-60.416-109.7728-161.3824-165.9904-266.4448-145.1008-93.4912 18.5344-202.6496 109.568-202.6496 305.152 0 251.2896 439.808 529.1008 458.5472 540.8768l11.3664 7.168 11.3664-7.168c18.6368-11.776 457.5232-291.2256 457.5232-542.72C981.4016 198.9632 872.96 109.568 780.1856 91.3408zM512.4096 890.0608C443.4944 844.8 85.2992 599.6544 85.2992 392.704c0-169.6768 90.624-247.9104 168.2432-263.2704 11.4688-2.2528 22.9376-3.3792 34.304-3.3792 83.968 0 161.6896 61.2352 204.1856 164.0448l19.7632 47.9232 19.6608-48.0256C585.1136 159.5392 690.8928 117.3504 771.8912 133.12c101.2736 19.968 166.7072 121.0368 166.7072 257.6384C938.7008 597.9136 581.2224 844.5952 512.4096 890.0608z"
                                    p-id="2354"></path>
                            </svg>
                            <svg v-show="tableData.songs[scope.$index].islove" t="1662282713321" class="icon icons"
                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2639"
                                width="20" height="20">
                                <path
                                    d="M780.1856 91.3408C691.4048 73.728 578.9696 112.128 511.7952 232.7552c-60.416-109.7728-161.3824-165.9904-266.4448-145.1008-93.4912 18.5344-202.6496 109.568-202.6496 305.152 0 251.2896 439.808 529.1008 458.5472 540.8768l11.3664 7.168 11.3664-7.168c18.6368-11.776 457.5232-291.2256 457.5232-542.72C981.4016 198.9632 872.96 109.568 780.1856 91.3408z"
                                    p-id="2640" fill="#EC4141"></path>
                            </svg>
                        </template>
                    </el-table-column>
                    <el-table-column width="40" class-name="playtime">
                        <template slot-scope='scope'>
                            <svg @click="downLoad(scope.row)" t="1658489442655" class="icon icons" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="7625" width="20" height="20">
                                <path
                                    d="M828.975746 894.125047 190.189132 894.125047c-70.550823 0-127.753639-57.18542-127.753639-127.752616L62.435493 606.674243c0-17.634636 14.308891-31.933293 31.93227-31.933293l63.889099 0c17.634636 0 31.93227 14.298658 31.93227 31.933293l0 95.821369c0 35.282574 28.596292 63.877843 63.87682 63.877843L765.098927 766.373455c35.281551 0 63.87682-28.595268 63.87682-63.877843l0-95.821369c0-17.634636 14.298658-31.933293 31.943526-31.933293l63.877843 0c17.634636 0 31.933293 14.298658 31.933293 31.933293l0 159.699212C956.729385 836.939627 899.538849 894.125047 828.975746 894.125047L828.975746 894.125047zM249.938957 267.509636c12.921287-12.919241 33.884738-12.919241 46.807049 0l148.97087 148.971893L445.716876 94.89323c0-17.634636 14.300704-31.94762 31.933293-31.94762l63.875796 0c17.637706 0 31.945573 14.312984 31.945573 31.94762l0 321.588299 148.97087-148.971893c12.921287-12.919241 33.875528-12.919241 46.796816 0l46.814212 46.818305c12.921287 12.922311 12.921287 33.874505 0 46.807049L552.261471 624.930025c-1.140986 1.137916-21.664416 13.68365-42.315758 13.69286-20.87647 0.010233-41.878806-12.541641-43.020816-13.69286L203.121676 361.13499c-12.922311-12.933567-12.922311-33.884738 0-46.807049L249.938957 267.509636 249.938957 267.509636z"
                                    p-id="7626" fill="#999999"></path>
                            </svg>

                        </template>
                    </el-table-column>
                    <el-table-column label="标题">
                        <div slot-scope='scope'
                            style="width: 100%; word-break: break-all; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
                            <span>{{ scope.row.name }}</span>
                            <el-tag class="tags"
                                v-if="tableData.songs[scope.$index].fee == 1 || tableData.songs[scope.$index].fee == 4">
                                VIP</el-tag>
                            <el-tag class="tags"
                                v-if="tableData.songs[scope.$index].fee == 1 || tableData.songs[scope.$index].fee == 4"
                                :style="{borderColor: gettheme, color: gettheme}">试听</el-tag>
                            <el-tag class="tags mvtag" @click="playMv(scope.row)"
                                v-if="tableData.songs[scope.$index].mv !== 0"
                                :style="{borderColor: gettheme, color: gettheme}">MV</el-tag>
                            <el-tag class="tags" v-if="tableData.songs[scope.$index].sq"
                                :style="{borderColor: gettheme, color: gettheme}">SQ</el-tag>
                        </div>
                    </el-table-column>
                    <el-table-column label="歌手" width="260" :show-overflow-tooltip="true">
                        <template slot-scope='scope'>
                            <span class="artist" v-for="(item, index) in scope.row.ar" :key="item.id"
                                @click="gotoArtistPage(item.id)">{{ item.name }} {{
                                index === scope.row.ar.length - 1 ?
                                '' : '/'
                                }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="专辑">
                        <div slot-scope='scope'
                            style="width: 100%; word-break: break-all; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
                            <span class="artist" @click="gotoAlbumPage(scope.row.al.id)">{{ scope.row.al.name }}</span>
                        </div>
                    </el-table-column>
                    <el-table-column label="时长" width="180">
                        <template slot-scope='scope'>
                            <span class="playtime">{{ util.filterTime(scope.row.dt) }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="comment_box" v-if="curIndex === 2">
                <div class="comment">
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
                                <el-button class="send_comment_btn" round @click="sendComment(yourComment)">评论
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment_list">
                    <div class="no_comment" v-show="commentData.comments && commentData.comments.length == 0">
                        还没有评论，快来抢沙发~</div>
                    <h5 class="hot_comments" v-show="commentData.hotComments && commentData.hotComments.length > 0">精彩评论
                    </h5>
                    <div v-for="item in commentData.hotComments" :key="item.commentId" class="each_comment">
                        <el-image :src="item.user.avatarUrl || ''" class="user_pic" lazy
                            @click="gotoPersonalHomePage(item.user.userId)"></el-image>
                        <div class="user_info">
                            <div>
                                <span class="user_info_color" @click="gotoPersonalHomePage(item.user.userId)">{{
                                item.user.nickname }}：</span>
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
                                    <svg t="1658554485792" v-show="!item.liked" @click="like(item, 1)"
                                        class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2265" width="14" height="14">
                                        <path
                                            d="M890.908 429.534c-20.66-26.05-51.585-40.99-84.84-40.99l-189.34 0c10.34-28.83 17.18-60.165 19.615-90.48 3.785-47.147-3.465-89.02-20.955-121.095-21.53-39.46-58.18-64.072-105.997-71.177-21.662-3.22-40.292 0.945-55.377 12.372-30.495 23.102-36.092 67.065-42.575 117.97-5.182 40.692-11.055 86.817-30.79 119.877-13.172 22.065-38.807 51.397-109.092 51.397l-73.345 0c-48.842 0-88.58 39.722-88.58 88.545l0 334.754c0 48.82 39.737 88.545 88.58 88.545l534.336 0c24.33 0 48.22-8.325 67.275-23.43 19.06-15.11 32.605-36.475 38.145-60.155l73.52-314.264C919.058 489.054 911.553 455.569 890.908 429.534zM168.672 830.708 168.672 495.956c0-16.27 13.252-29.505 29.537-29.505l62.232 0 0 393.762-62.232 0C181.925 860.213 168.672 846.978 168.672 830.708zM853.998 507.956l-73.52 314.272c-5.23 22.36-24.94 37.985-47.93 37.985L319.484 860.213 319.484 462.169c49.877-9.52 87.4-34.92 111.86-75.895 26.05-43.64 32.75-96.257 38.662-142.68 2.67-20.977 5.193-40.79 9.2-55.99 4.297-16.302 8.745-21.08 10.457-22.377 1.96-1.485 5.677-1.835 11.05-1.035 29.615 4.4 50.175 17.83 62.84 41.052 25.99 47.642 14.505 128.052-10.265 182.86-5.93 13.127-4.83 28.167 2.96 40.232 7.78 12.052 21.01 19.247 35.395 19.247l214.424 0c15.125 0 29.185 6.792 38.58 18.637C854.028 478.049 857.438 493.261 853.998 507.956z"
                                            p-id="2266" fill="#707070"></path>
                                    </svg>
                                    <svg v-show="item.liked" @click="like(item, 0)" t="1662356660260"
                                        class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2406" width="14" height="14">
                                        <path
                                            d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
                                            p-id="2407" fill="#EC4141"></path>
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
                                    <svg @click="reply(item)" t="1658554967236" class="icon liked_icons" viewBox="0 0 1024 1024"
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
                    <h5 class="hot_comments" v-show="commentData.comments && commentData.comments.length > 0">最新评论（{{
                    commentData.total }}）</h5>
                    <div v-for="item in commentData.comments" :key="item.commentId" class="each_comment">
                        <el-image :src="item.user.avatarUrl || ''" class="user_pic" lazy
                            @click="gotoPersonalHomePage(item.user.userId)"></el-image>
                        <div class="user_info">
                            <div>
                                <span class="user_info_color" @click="gotoPersonalHomePage(item.user.userId)">{{
                                item.user.nickname }}：</span>
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
                                    <svg v-show="!item.liked" @click="like(item, 1)" t="1658554485792"
                                        class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2265" width="14" height="14">
                                        <path
                                            d="M890.908 429.534c-20.66-26.05-51.585-40.99-84.84-40.99l-189.34 0c10.34-28.83 17.18-60.165 19.615-90.48 3.785-47.147-3.465-89.02-20.955-121.095-21.53-39.46-58.18-64.072-105.997-71.177-21.662-3.22-40.292 0.945-55.377 12.372-30.495 23.102-36.092 67.065-42.575 117.97-5.182 40.692-11.055 86.817-30.79 119.877-13.172 22.065-38.807 51.397-109.092 51.397l-73.345 0c-48.842 0-88.58 39.722-88.58 88.545l0 334.754c0 48.82 39.737 88.545 88.58 88.545l534.336 0c24.33 0 48.22-8.325 67.275-23.43 19.06-15.11 32.605-36.475 38.145-60.155l73.52-314.264C919.058 489.054 911.553 455.569 890.908 429.534zM168.672 830.708 168.672 495.956c0-16.27 13.252-29.505 29.537-29.505l62.232 0 0 393.762-62.232 0C181.925 860.213 168.672 846.978 168.672 830.708zM853.998 507.956l-73.52 314.272c-5.23 22.36-24.94 37.985-47.93 37.985L319.484 860.213 319.484 462.169c49.877-9.52 87.4-34.92 111.86-75.895 26.05-43.64 32.75-96.257 38.662-142.68 2.67-20.977 5.193-40.79 9.2-55.99 4.297-16.302 8.745-21.08 10.457-22.377 1.96-1.485 5.677-1.835 11.05-1.035 29.615 4.4 50.175 17.83 62.84 41.052 25.99 47.642 14.505 128.052-10.265 182.86-5.93 13.127-4.83 28.167 2.96 40.232 7.78 12.052 21.01 19.247 35.395 19.247l214.424 0c15.125 0 29.185 6.792 38.58 18.637C854.028 478.049 857.438 493.261 853.998 507.956z"
                                            p-id="2266" fill="#707070"></path>
                                    </svg>
                                    <svg v-show="item.liked" @click="like(item, 0)" t="1662356660260"
                                        class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2406" width="14" height="14">
                                        <path
                                            d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
                                            p-id="2407" fill="#EC4141"></path>
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
                                    <svg @click="reply(item)" t="1658554967236" class="icon liked_icons" viewBox="0 0 1024 1024"
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
            </div>
            <div class="collector_box" v-if="curIndex === 3">
                <div class="collectors">
                    <div v-for="item in collectorData" :key="item.userId" class="each_collector">
                        <div>
                            <el-image :src="item.avatarUrl || ''" class="collector_pic" lazy fit="cover"
                                @click="gotoPersonalHomePage(item.userId)"></el-image>
                        </div>
                        <div class="collector_info">
                            <div class="first_row">
                                <span class="collector_name" @click="gotoPersonalHomePage(item.userId)">{{ item.nickname
                                }}</span>
                                <div class="collector_sex">
                                    <svg v-if="item.gender === 1" t="1658561151426" class="icon" viewBox="0 0 1024 1024"
                                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8954" width="18"
                                        height="18">
                                        <path
                                            d="M511.843434 512m-446.708971 0a446.708971 446.708971 0 1 0 893.417942 0 446.708971 446.708971 0 1 0-893.417942 0Z"
                                            fill="#FFFFFF" p-id="8955"></path>
                                        <path
                                            d="M424.111301 818.825061c-59.328223 0-115.140367-23.107277-157.101038-65.081251-86.620823-86.620823-86.620823-227.581252 0-314.215378 41.960671-41.973974 97.771791-65.081251 157.101038-65.081251 59.355853 0 115.140367 23.12058 157.101037 65.081251 41.960671 41.973974 65.081251 97.771791 65.081251 157.11434s-23.12058 115.140367-65.081251 157.101038-97.745185 65.081251-157.101037 65.081251z m0-360.620268c-36.97103 0-71.733765 14.409175-97.881285 40.543392-53.957913 53.984518-53.957913 141.804656 0 195.775872 26.14752 26.14752 60.910255 40.543392 97.881285 40.543391s71.733765-14.395872 97.881284-40.543391c26.14752-26.14752 40.543392-60.910255 40.543392-97.881285s-14.395872-71.733765-40.543392-97.894587c-26.146497-26.14752-60.909232-40.543392-97.881284-40.543392z"
                                            fill="#75B9EB" p-id="8956"></path>
                                        <path
                                            d="M551.602973 511.016603c-10.715039 0-21.430078-4.090155-29.609365-12.269442-16.358573-16.358573-16.358573-42.874483 0-59.219753L672.577209 288.943808h-42.833551c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878806h143.958716c16.931624 0 32.200376 10.210549 38.689161 25.847691 6.488785 15.650445 2.889817 33.67189-9.078773 45.641503L581.212338 498.747161c-8.179286 8.179286-18.894326 12.269441-29.609365 12.269442z"
                                            fill="#75B9EB" p-id="8957"></path>
                                        <path
                                            d="M773.703397 288.943808h-143.958716c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878806h143.958716c23.12058 0 41.878806 18.744923 41.878806 41.878806s-18.758226 41.878806-41.878806 41.878806z"
                                            fill="#75B9EB" p-id="8958"></path>
                                        <path
                                            d="M779.864724 439.050548c-23.12058 0-41.878806-18.744923-41.878806-41.878806V253.226329c0-23.133883 18.758226-41.878806 41.878806-41.878807s41.878806 18.744923 41.878806 41.878807v143.945413c0 23.133883-18.758226 41.878806-41.878806 41.878806z"
                                            fill="#75B9EB" p-id="8959"></path>
                                        <path
                                            d="M779.864724 439.050548c-23.12058 0-41.878806-18.744923-41.878806-41.878806V253.226329c0-23.133883 18.758226-41.878806 41.878806-41.878807s41.878806 18.744923 41.878806 41.878807v143.945413c0 23.133883-18.758226 41.878806-41.878806 41.878806z"
                                            fill="#75B9EB" p-id="8960"></path>
                                    </svg>
                                    <svg v-if="item.gender === 2" t="1658561390732" class="icon" viewBox="0 0 1024 1024"
                                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1798" width="18"
                                        height="18">
                                        <path
                                            d="M510.887666 512m-446.708971 0a446.708971 446.708971 0 1 0 893.417942 0 446.708971 446.708971 0 1 0-893.417942 0Z"
                                            fill="#FFFFFF" p-id="1799"></path>
                                        <path
                                            d="M510.87948 578.902736c-123.673717 0-224.282113-100.607372-224.282113-224.282113s100.607372-224.282113 224.282113-224.282113 224.282113 100.607372 224.282112 224.282113-100.608396 224.282113-224.282112 224.282113z m0-364.80559c-77.486792 0-140.523477 63.036685-140.523477 140.523477s63.036685 140.523477 140.523477 140.523477 140.523477-63.036685 140.523477-140.523477-63.036685-140.523477-140.523477-140.523477z"
                                            fill="#FF3EC9" p-id="1800"></path>
                                        <path
                                            d="M510.87948 896.635217c-23.12058 0-41.878806-18.744923-41.878806-41.878806V537.02393c0-23.133883 18.758226-41.878806 41.878806-41.878806s41.878806 18.744923 41.878806 41.878806v317.732481c0 23.133883-18.758226 41.878806-41.878806 41.878806z"
                                            fill="#FF3EC9" p-id="1801"></path>
                                        <path
                                            d="M669.752884 737.762837H352.033705c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878807h317.719179c23.12058 0 41.878806 18.744923 41.878806 41.878807s-18.758226 41.878806-41.878806 41.878806z"
                                            fill="#FF3EC9" p-id="1802"></path>
                                    </svg>
                                </div>
                            </div>
                            <div v-if="item && item.signature">
                                <span class="collector_style">{{ item.signature }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="colloctor_pagination">
                    <el-pagination background layout="prev, pager, next" :total="collectorPageData.totalNum"
                        :page-size="collectorPageData.limit" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        label: '收藏者',
        index: 2
    }
]
import axios from 'axios'
import util from '@/tools/index'
import { emojiList } from '@/tools/lists'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            emojiList,
            tableData: [], // 歌曲列表
            searchKeywords: '', // 搜索关键字
            songsGatherDetails: [], // 歌单详情
            yourComment: '', // 你的评论区域
            commentData: [], // 评论
            curIndex: 1, // 当前模块 1.歌曲列表 2.评论 3.收藏者
            collectorData: [], // 收藏者
            collectorPageData: {
                totalNum: 0,
                limit: 60,
                currentPage: 0
            },
            util,
            navList,
            loves: [], // 用户收藏
            collectList: [], // 收藏的歌单列表
            isCollect: 0, // 用于接口传参
            collectTitle: '', // 收藏文本
            topicList: [], // 热门话题
            followList: [], // 最近联系人
            replyCommentId: 0, // 回复的评论id
            replyText: ''
        }
    },
    computed: {
        ...mapGetters(['gettheme']),
    },
    watch: {
        $route() {
            // 获取歌单内容
            this.getListInfo()
            // 获取歌单详情
            this.getListDsc()
            this.curIndex = 1
        }
    },
    created() {
        // 获取热门话题
        this.getHotTopic()
        // 获取最近联系人
        this.getContacts()
        // 获取歌单内容
        this.getListInfo()
        // 获取歌单详情
        this.getListDsc()
    },
    methods: {
        ...mapMutations(['setdataFlag']),
        // 回复评论
        reply(item) {
            console.log(item)
            this.yourComment = `回复${item.user.nickname}:` + '\xa0'
            this.replyText = `回复${item.user.nickname}:` + '\xa0'
            this.replyCommentId = item.commentId
            document.getElementsByClassName('el-main')[0].scrollTop = 0
        },
        // 获取歌单详情
        getListDsc() {
            axios.get(`/playlist/detail?id=${util.getUrlParam()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, 'xq')
                    this.songsGatherDetails = res.data.playlist
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 获取歌单内容
        getListInfo() {
            axios.get(`/playlist/track/all?id=${util.getUrlParam()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res)
                    this.tableData = res.data
                    if (localStorage.getItem('profile')) {
                        axios.get(`/user/playlist?uid=${JSON.parse(localStorage.getItem('profile')).userId}&timerstamp=${Date.now()}`).then(res => {
                            if (res.data && res.data.code == 200) {
                                console.log(res, '获取用户歌单')
                                res.data.playlist.forEach((item) => {
                                    // 如果歌单创建者id与该用户id一致则为用户创建的歌单
                                    if (item.creator.userId == JSON.parse(localStorage.getItem('profile')).userId) {
                                        if (item.name == `${JSON.parse(localStorage.getItem('profile')).nickname}喜欢的音乐`) {
                                            axios.get(`/playlist/track/all?id=${item.id}`).then(res => {
                                                if (res.data && res.data.code == 200) {
                                                    this.loves = res.data.songs
                                                    this.tableData.songs.forEach(ktem => {
                                                        this.loves.some(jtem => {
                                                            if (ktem.id == jtem.id) {
                                                                this.$set(ktem, 'islove', true)
                                                            }
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    } else {
                                        this.collectList.push(item)
                                            let flag = false
                                            for(let i = 0; i < this.collectList.length; i++) {
                                                if (this.collectList[i].id == this.songsGatherDetails.id) {
                                                    flag = true
                                                    break
                                                }
                                            }
                                            if (flag) {
                                                this.isCollect = 2
                                                this.collectTitle = '已收藏'
                                            } else {
                                                this.isCollect = 1
                                                this.collectTitle = '收藏'
                                            }
                                        }
                                })
                            } else {
                                this.$message(`获取用户歌单失败，原因为：${res.data.message || '网络拥挤，请稍后再试！'}`)
                            }
                        })
                    }
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
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
        // 发送评论
        sendComment(comment) {
            if (localStorage.getItem('profile')) {
                if (this.replyCommentId !== 0) {
                    axios.get(`/comment?t=2&type=2&commentId=${this.replyCommentId}&id=${this.songsGatherDetails.id}&content=${comment.slice(this.replyText.length)}&timerstamp=${Date.now()}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.openComment()
                            this.$forceUpdate()
                        }
                    })
                } else {
                    axios.get(`/comment?t=1&type=2&id=${this.songsGatherDetails.id}&content=${comment}&timerstamp=${Date.now()}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            let addtimeStr = res.data.comment
                            addtimeStr.timeStr = '刚刚'
                            addtimeStr.likedCount = 0
                            this.commentData.comments = [addtimeStr, ...this.commentData.comments]
                        }
                    })
                }
            } else {
                this.$message('请先登录')
            }
            this.yourComment = ''
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
        // 获取热门话题
        getHotTopic() {
            axios.get(`/hot/topic`).then(res => {
                    this.topicList = res.data.hot.splice(0, 8)
                })
        },
        // 给评论点赞
        like(item, type) {
            axios.get(`/comment/like?id=${this.songsGatherDetails.id}&cid=${item.commentId}&t=${type}&type=2&timerstamp=${Date.now()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res)
                    if (type == 1) {
                        this.$set(item, 'liked', true)
                        this.$set(item, 'likedCount', ++item.likedCount)
                    } else if (type == 0) {
                        this.$set(item, 'liked', false)
                        this.$set(item, 'likedCount', --item.likedCount)
                    }
                } else {
                    this.$message('点赞/取消点赞失败')
                }
            })
        },
        // 收藏歌单
        handleCollect() {
            console.log(localStorage.getItem('profile'))
            if (localStorage.getItem('profile')) {
                axios.get(`/playlist/subscribe?t=${this.isCollect}&id=${this.songsGatherDetails.id}&timerstamp=${Date.now()}`).then(res => {
                    if (res.data && res.data.code == 200) {
                        console.log(res)
                        if (this.isCollect == 1) {
                            this.collectTitle = '已收藏'
                            this.isCollect = 2
                            this.$message({
                                message: '收藏成功',
                                type: 'success'
                            })
                        } else if (this.isCollect == 2) {
                            this.collectTitle = '收藏'
                            this.isCollect = 1
                            this.$message({
                                message: '取消收藏成功',
                                type: 'success'
                            })
                        }
                        // location.reload()
                        this.setdataFlag()
                    }
                })
            } else {
                this.$message('请先登录！')
            }
        },
        // 点击导航栏
		navChange(index) {
			this.curIndex = index + 1
            if (index == 1) {
                this.openComment()
            } else if (index == 2) {
                this.openCollector()
            }
		},
        // 前往用户个人主页
        gotoPersonalHomePage(userId) {
            // 跳转页面
            this.$router.push({path: `personalHomePage?id=${userId}`})
        },
        // 前往歌手页面
        gotoArtistPage(id) {
            // 跳转页面
            this.$router.push({path: `artistPage?id=${id}`})
        },
        // 前往专辑页面
        gotoAlbumPage(id) {
            // 跳转页面
            this.$router.push({path: `albumPage?id=${id}`})
        },
        // 播放MV
        playMv(row) {
            this.$router.push({path: `/mvPage?id=${row.mv}`})
        },
        // 播放音乐
        playMusic(row) {
            const audio = {
                id: row.id, // 歌曲id
                dt: row.dt, // 歌曲时长
                pic: row.al.picUrl, // 歌曲封面
                name: row.name, // 歌曲名称
                authors: row.ar, // 作者(可能有多个)
                isvip: this.tableData.privileges[row.index].flLevel === 'none', // 是否需要VIP
                al: row.al // 音乐所在专辑
            }
            this.$store.commit('unshiftPlayList', audio)
        },
        // 播放全部
        playAll() {
            for(let i = this.tableData.songs.length - 1; i >= 0; i--) {
                const audio = {
                    id: this.tableData.songs[i].id,
                    dt: this.tableData.songs[i].dt,
                    pic: this.tableData.songs[i].al.picUrl,
                    name: this.tableData.songs[i].name,
                    authors: this.tableData.songs[i].ar,
                    isvip: this.tableData.privileges[i].flLevel === 'none',
                    al: this.tableData.songs[i].al
                }
                this.$store.commit('unshiftPlayList', audio)
            }
        },
        // 给每一行添加索引
        tableRowClassName({ row, rowIndex }) {
            row.index = rowIndex;
        },
        // 打开评论区
        openComment() {
            axios.get(`/comment/playlist?id=${util.getUrlParam()}&timerstamp=${Date.now()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    console.log(res, '获取评论')
                    this.commentData = res.data
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 打开收藏者
        openCollector() {
            axios.get(`/playlist/subscribers?id=${util.getUrlParam()}&limit=60&offset=0`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.collectorPageData.totalNum = res.data.total
                    this.collectorData = res.data.subscribers
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 翻页
        handleCurrentChange(val) {
            axios.get(`/playlist/subscribers?id=${util.getUrlParam()}&limit=60&offset=${(val - 1) * 60}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.collectorData = res.data.subscribers
                    //回到顶部方法 点击按钮调用
                    document.getElementsByClassName('songs_list')[0].scrollTop = 0
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 搜索歌单中的歌曲
        search() {
        },
        // 清空搜索框
        clearSearchInput() {
            this.searchKeywords = ''
        }
    }
}
</script>

<style lang="less" scoped>
.songs_list {
    overflow: auto;

    .header_box {
        .header {
            display: flex;
            padding: 30px 30px 0 30px;

            .songs_list_pic {
                width: 200px;
                height: 200px;
            }

            .songs_list_info {
                padding-left: 20px;
                display: flex;
                flex-direction: column;

                .info_row {
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                }

                .author_pic {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    cursor: pointer;
                }

                .author_name {
                    font-size: 12px;
                    color: rgb(80, 125, 175);
                    margin-left: 5px;
                    cursor: pointer;
                }

                .author_name:hover {
                    color: rgb(11, 88, 176);
                }

                .create_time {
                    font-size: 12px;
                    color: rgb(103, 103, 103);
                    margin-left: 5px;
                }

                .info_tag {
                    background-color: #fff;
                }

                .list_name {
                    padding-left: 10px;
                    font-size: 20px;
                    font-weight: bold;
                }

                .play_all_btn {
                    color: #fff;
                }

                .play_all_btn:hover {
                    opacity: .8;
                }

                .save_btn {
                    background-color: #fff;
                    color: #000;
                    border-color: rgb(216, 216, 216);
                }

                .save_btn:hover {
                    background-color: rgb(242, 242, 242);
                }

                .list_tag {
                    font-size: 12px;
                }

                .list_description {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 300px;
                }

                .list_tag_type {
                    font-size: 12px;
                    color: rgb(80, 125, 175);
                    cursor: pointer;
                    margin-right: 5px;
                }

                .list_tag_type:hover {
                    color: rgb(11, 88, 176);
                }
            }
        }

        .component_list {
            padding: 0 30px;
            display: flex;
            justify-content: space-between;

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

            .search_input {
                width: 150px;

                /deep/.el-input__inner {
                    border-radius: 24px;
                    height: 30px;
                    background-color: rgba(0, 0, 0, 0.1);
                    border: none;
                    color: #000;
                }

                /deep/.el-input__icon {
                    line-height: 30px;
                    color: #000;
                    cursor: pointer;
                }
            }

            .el-menu.el-menu--horizontal {
                border-bottom: unset;
            }

            .el-menu--horizontal>.el-menu-item.is-active {
                font-size: 18px;
                border-bottom: 2px solid #ec4141;
                font-weight: bold;
            }
        }
    }

    .comment_box {
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
            .no_comment {
                font-size: 12px;
                color: rgb(159, 159, 159);
                text-align: center;
            }

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
    }

    .collector_box {
        padding: 20px;

        .collectors {
            display: flex;
            flex-wrap: wrap;

            .each_collector {
                display: flex;
                padding: 20px;
                width: 350px;

                .collector_pic {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    cursor: pointer;
                }

                .collector_info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding-left: 10px;

                    .first_row {
                        display: flex;

                        .collector_name {
                            font-size: 13px;
                            color: rgb(51, 51, 51);
                            cursor: pointer;
                        }

                        .collector_name:hover {
                            color: #000;
                        }

                        .collector_sex {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            margin-left: 10px;
                        }
                    }

                    .collector_style {
                        font-size: 12px;
                    }
                }
            }
        }

        .colloctor_pagination {
            padding: 20px;
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }
    }

    .artist {
        color: rgb(101, 101, 101);
        cursor: pointer;
        margin-right: 5px;
    }

    .artist:hover {
        color: #000;
    }

    .playtime {
        color: rgb(156, 156, 187);
    }
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

.mvtag:hover {
    opacity: 1;
}

.icons {
    cursor: pointer;
}
</style>

<style>
.playtime {
    color: #999;
}

.cell {
    display: flex;
}

.el-menu-item.is-active {
    border-bottom-color: #ec4141;
}

.theme_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.toplic_item {
    cursor: pointer;
    font-size: 12px;
    padding-left: 20px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: flex-start;
}

.emoji_box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.emoji_item {
    padding: 5px;
    cursor: pointer;
    border: 1px solid transparent;
}

.emoji_item:hover {
    border-color: #3D91EC;
}

.toplic_item:hover {
    background-color: #f3f3f3;
}
</style>

