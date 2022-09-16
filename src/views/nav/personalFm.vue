<template>
    <div class="box">
        <!-- 内容区域 -->
        <div class="contains">
            <!-- 顶部播放器 -->
            <div class="player">
                <!-- 左侧封面图 -->
                <div class="fm_pic_box" v-if="$store.state.cloudMusic.playList[0]">
                    <div class="fm_pic_contain">
                        <el-image :src="$store.state.cloudMusic.playList[0].pic" class="fm_pic">
                            <div slot="placeholder">
                                <el-image :src="require('../../assets/loading.gif')" class="fm_pic" fit="cover"></el-image>
                            </div>
                        </el-image>
                        <div class="btn_group">
                            <div class="group_item">
                                <svg t="1661252199884" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3013" width="20" height="20"><path d="M908.8 214.4c-9.6-12.8-19.2-22.4-28.8-32-112-115.2-230.4-105.6-342.4-16-9.6 6.4-19.2 16-28.8 25.6-9.6-9.6-19.2-16-28.8-25.6-112-86.4-230.4-99.2-342.4 16-9.6 9.6-19.2 19.2-25.6 32-134.4 195.2-60.8 387.2 137.6 560 44.8 38.4 89.6 73.6 137.6 102.4 16 9.6 32 19.2 44.8 28.8 9.6 6.4 12.8 9.6 19.2 9.6 3.2 3.2 6.4 3.2 12.8 6.4 3.2 3.2 9.6 3.2 16 6.4 25.6 6.4 64 3.2 89.6-12.8 3.2 0 9.6-3.2 16-9.6 12.8-6.4 28.8-16 44.8-28.8 48-28.8 92.8-64 137.6-102.4C969.6 598.4 1043.2 406.4 908.8 214.4zM736 732.8c-41.6 35.2-86.4 70.4-131.2 99.2-16 9.6-28.8 19.2-44.8 25.6-6.4 3.2-12.8 6.4-16 9.6-6.4 3.2-16 6.4-25.6 9.6-3.2 0-6.4 0-9.6 0-6.4 0-12.8 0-16 0-3.2 0-3.2 0-3.2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0-3.2 0-3.2-3.2-3.2 0-6.4-3.2-9.6-3.2-3.2-3.2-9.6-6.4-16-9.6-12.8-6.4-28.8-16-44.8-25.6-44.8-28.8-89.6-60.8-131.2-99.2-179.2-160-243.2-323.2-131.2-489.6 6.4-9.6 16-16 22.4-25.6 89.6-96 182.4-86.4 275.2-12.8 9.6 6.4 16 12.8 22.4 19.2 0 0 0 0 0 0l28.8 32c3.2 3.2 3.2 3.2 6.4 6.4 0 0 0 0 0 0l0 0c3.2-3.2 9.6-9.6 16-16 12.8-12.8 25.6-25.6 41.6-38.4 92.8-73.6 185.6-83.2 275.2 12.8 6.4 9.6 16 16 22.4 25.6C982.4 406.4 918.4 572.8 736 732.8z" p-id="3014"></path></svg>
                                <svg v-if="false" t="1661252468499" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3234" width="20" height="20"><path d="M892.543016 224.150106c-9.284457-11.914354-17.804505-21.814842-26.454512-30.930453C759.437485 80.827887 642.682341 92.003414 536.033369 176.799682c-9.493212 7.547907-18.453281 15.383362-26.88737 23.346731-8.43409-7.963369-17.395182-15.798824-26.888394-23.346731C375.608633 92.003414 258.853489 80.827887 152.202471 193.21863c-8.650007 9.115612-17.170055 19.016099-25.559119 29.714765C-2.680039 410.134984 68.411089 595.897805 259.728416 764.030084c42.320874 37.192064 87.560218 70.64906 132.799562 99.905384 15.841803 10.245342 30.570249 19.244296 43.816948 26.932396 8.024767 4.657067 13.827937 7.872295 17.044188 9.578146 4.869914 2.916423 9.728572 5.142114 14.530948 6.771217 3.470031 1.619894 7.516184 3.091408 12.218276 4.387937 25.377994 6.998391 62.97938 1.908466 85.839017-11.764951 2.14178-1.101077 7.944949-4.315282 15.969717-8.972349 13.246699-7.688099 27.974122-16.687054 43.816948-26.932396 45.239344-29.256324 90.478687-62.71332 132.799562-99.905384C949.879885 595.897805 1020.971014 410.134984 892.543016 224.150106z" p-id="3235"></path></svg>
                            </div>
                            <div class="group_item">
                                <svg t="1661252547455" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4258" width="20" height="20"><path d="M896 256v576a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V256H64V192h192V128a64 64 0 0 1 64-64h384a64 64 0 0 1 64 64v64h192v64h-64z m-192-128H320v64h384V128z m128 128H192v576a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V256zM576 384h64v384H576V384zM384 384h64v384H384V384z" p-id="4259"></path></svg>
                            </div>
                            <div class="group_item" @click="playNext">
                                <svg t="1661252627791" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5064" width="20" height="20"><path d="M832 160.128c0-17.664-14.336-32-32-32S768 142.464 768 160.128l0 282.88L214.592 134.592c-18.176-10.112-39.936-10.048-58.112 0C138.24 144.768 127.424 162.88 127.424 183.168l0 656.64c0 20.224 10.816 38.464 29.056 48.576C165.568 893.44 175.488 896 185.472 896s19.968-2.56 29.056-7.616L768 579.968l0 284.096c0 17.664 14.336 32 32 32s32-14.336 32-32L832 160.128zM191.808 829.248 188.672 192l573.312 319.488L191.808 829.248z" p-id="5065"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右侧歌曲信息 -->
                <div class="fm_player_box">
                    <div class="top_area" v-if="$store.state.cloudMusic.playList[0]">
                        <!-- 歌曲名称 -->
                        <div class="fm_name">
                            <span>{{ $store.state.cloudMusic.playList[0].name }}</span>
                        </div>
                        <div class="fm_info">
                            <!-- 专辑 -->
                            <div class="fm_al">专辑：
                                <span>
                                    {{ $store.state.cloudMusic.playList[0].al.name }}
                                </span>
                            </div>
                            <!-- 歌手 -->
                            <div class="fm_ar">歌手：
                                <span class="fm_ar_item" v-for="(item, index) in $store.state.cloudMusic.playList[0].authors" :key="item.id">
                                    {{ item.name }}{{ index === $store.state.cloudMusic.playList[0].authors.length - 1 ? '' : '/' }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- 歌词器 -->
                    <div class="bottom_area" ref="lyrbox2">
                        <div :class="['lyric_row', { 'is_active_lry': $store.state.cloudMusic.currentTime > filterTime(lyrics[index].time) && $store.state.cloudMusic.currentTime < filterTime(lyrics[index + 1].time) }]"
                            v-for="(item, index) in lyrics" :key="index">{{ item.lyric }}</div>
                    </div>
                </div>
            </div>
            <!-- 输入评论区域 -->
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
                <div class="bottom_box">
                    <div class="comment_box">
                    <h5>全部评论（{{ totalNum }}）</h5>
                    <div v-for="item in hotComments" :key="item.commentId" class="each_comment">
                        <img :src="item.user.avatarUrl || ''" class="user_pic">
                        <div class="user_info">
                            <div>
                                <span class="user_info_color">{{ item.user.nickname }}：</span>
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
                                <span class="user_info_time">{{ filterSeconds(item.time) }}</span>
                                <div class="liked">
                                    <span class="report">举报</span>
                                    <span class="liked_margin">|</span>
                                    <svg t="1658554485792" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2265" width="14" height="14">
                                        <path
                                            d="M890.908 429.534c-20.66-26.05-51.585-40.99-84.84-40.99l-189.34 0c10.34-28.83 17.18-60.165 19.615-90.48 3.785-47.147-3.465-89.02-20.955-121.095-21.53-39.46-58.18-64.072-105.997-71.177-21.662-3.22-40.292 0.945-55.377 12.372-30.495 23.102-36.092 67.065-42.575 117.97-5.182 40.692-11.055 86.817-30.79 119.877-13.172 22.065-38.807 51.397-109.092 51.397l-73.345 0c-48.842 0-88.58 39.722-88.58 88.545l0 334.754c0 48.82 39.737 88.545 88.58 88.545l534.336 0c24.33 0 48.22-8.325 67.275-23.43 19.06-15.11 32.605-36.475 38.145-60.155l73.52-314.264C919.058 489.054 911.553 455.569 890.908 429.534zM168.672 830.708 168.672 495.956c0-16.27 13.252-29.505 29.537-29.505l62.232 0 0 393.762-62.232 0C181.925 860.213 168.672 846.978 168.672 830.708zM853.998 507.956l-73.52 314.272c-5.23 22.36-24.94 37.985-47.93 37.985L319.484 860.213 319.484 462.169c49.877-9.52 87.4-34.92 111.86-75.895 26.05-43.64 32.75-96.257 38.662-142.68 2.67-20.977 5.193-40.79 9.2-55.99 4.297-16.302 8.745-21.08 10.457-22.377 1.96-1.485 5.677-1.835 11.05-1.035 29.615 4.4 50.175 17.83 62.84 41.052 25.99 47.642 14.505 128.052-10.265 182.86-5.93 13.127-4.83 28.167 2.96 40.232 7.78 12.052 21.01 19.247 35.395 19.247l214.424 0c15.125 0 29.185 6.792 38.58 18.637C854.028 478.049 857.438 493.261 853.998 507.956z"
                                            p-id="2266" fill="#707070"></path>
                                    </svg>
                                    <span>{{ item.likedCount }}</span>
                                    <span class="liked_margin">|</span>
                                    <svg t="1658554856163" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="3251" width="14" height="14">
                                        <path
                                            d="M512 939.804444c-57.612929 0-113.570909-11.274343-166.322424-33.616161-50.889697-21.514343-96.504242-52.337778-135.809293-91.539394C170.666667 775.447273 139.843232 729.729293 118.328889 678.839596 96.193939 626.191515 84.816162 570.233535 84.816162 512.620606s11.274343-113.570909 33.616161-166.322424c21.514343-50.889697 52.337778-96.504242 91.539394-135.809293 39.201616-39.201616 84.919596-70.025051 135.809293-91.539394 52.648081-22.238384 108.606061-33.616162 166.322424-33.616162h1.034344l-0.103435 57.923233h-0.930909c-98.676364 0-191.353535 38.374141-261.068282 108.192323-69.818182 69.818182-108.295758 162.495354-108.295758 261.171717s38.374141 191.353535 108.192323 261.068283c69.714747 69.818182 162.495354 108.192323 261.068283 108.192323 98.572929 0 191.250101-38.374141 261.068283-108.088889C842.78303 704.077576 881.260606 611.400404 881.260606 512.827475h57.923232c0 57.612929-11.377778 113.570909-33.616161 166.21899-21.514343 50.889697-52.337778 96.504242-91.539394 135.705858s-84.919596 69.921616-135.705859 91.43596c-52.751515 22.341818-108.606061 33.616162-166.322424 33.616161zM938.149495 352.711111h-57.923232V145.73899H672.530101v-57.923232H938.149495V352.711111z m0 0"
                                            p-id="3252" fill="#707070"></path>
                                        <path
                                            d="M888.371717 96.012929l40.96 40.96L560.484848 505.806869l-40.96-40.96L888.371717 96.012929z m0 0"
                                            p-id="3253" fill="#707070"></path>
                                    </svg>
                                    <span class="liked_margin">|</span>
                                    <svg t="1658554967236" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="7706" width="14" height="14">
                                        <path
                                            d="M512.146827 268.510985c-250.902034 0-454.505322 157.57406-454.505322 359.095851 0 77.452531 32.639121 168.259723 83.298552 213.54786C166.24668 863.780505 88.131465 990.268512 109.075322 1018.193654c23.957624 31.943141 164.908706-79.128039 205.700895-61.760749C355.568406 973.800196 441.499439 987.04638 512.146827 987.04638c250.902034 0 447.742067-158.01764 454.089667-359.439545C972.069626 442.506103 768.001278 268.510985 512.146827 268.510985zM511.997535 950.528886C447.362645 950.528886 362.014817 933.770578 323.347087 920.455656c-38.351961-13.206444-179.982913 66.085924-179.982913 66.085924s52.530415-136.615167 29.151701-161.97227c-42.140114-45.708088-76.209862-124.513914-76.209862-195.375037 0-184.372531 186.277885-324.240977 415.827925-324.240977s415.35105 154.807323 415.447714 324.240977C927.690131 821.643613 741.54865 950.528886 511.997535 950.528886zM311.488568 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM504.000204 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM696.511839 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0Z"
                                            p-id="7707" fill="#707070"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment_box">
                    <h5>最新评论（{{ totalNum }}）</h5>
                    <div v-for="item in comments" :key="item.commentId" class="each_comment">
                        <img :src="item.user.avatarUrl || ''" class="user_pic">
                        <div class="user_info">
                            <div>
                                <span class="user_info_color">{{ item.user.nickname }}：</span>
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
                                <span class="user_info_time">{{ filterSeconds(item.time) }}</span>
                                <div class="liked">
                                    <span class="report">举报</span>
                                    <span class="liked_margin">|</span>
                                    <svg t="1658554485792" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2265" width="14" height="14">
                                        <path
                                            d="M890.908 429.534c-20.66-26.05-51.585-40.99-84.84-40.99l-189.34 0c10.34-28.83 17.18-60.165 19.615-90.48 3.785-47.147-3.465-89.02-20.955-121.095-21.53-39.46-58.18-64.072-105.997-71.177-21.662-3.22-40.292 0.945-55.377 12.372-30.495 23.102-36.092 67.065-42.575 117.97-5.182 40.692-11.055 86.817-30.79 119.877-13.172 22.065-38.807 51.397-109.092 51.397l-73.345 0c-48.842 0-88.58 39.722-88.58 88.545l0 334.754c0 48.82 39.737 88.545 88.58 88.545l534.336 0c24.33 0 48.22-8.325 67.275-23.43 19.06-15.11 32.605-36.475 38.145-60.155l73.52-314.264C919.058 489.054 911.553 455.569 890.908 429.534zM168.672 830.708 168.672 495.956c0-16.27 13.252-29.505 29.537-29.505l62.232 0 0 393.762-62.232 0C181.925 860.213 168.672 846.978 168.672 830.708zM853.998 507.956l-73.52 314.272c-5.23 22.36-24.94 37.985-47.93 37.985L319.484 860.213 319.484 462.169c49.877-9.52 87.4-34.92 111.86-75.895 26.05-43.64 32.75-96.257 38.662-142.68 2.67-20.977 5.193-40.79 9.2-55.99 4.297-16.302 8.745-21.08 10.457-22.377 1.96-1.485 5.677-1.835 11.05-1.035 29.615 4.4 50.175 17.83 62.84 41.052 25.99 47.642 14.505 128.052-10.265 182.86-5.93 13.127-4.83 28.167 2.96 40.232 7.78 12.052 21.01 19.247 35.395 19.247l214.424 0c15.125 0 29.185 6.792 38.58 18.637C854.028 478.049 857.438 493.261 853.998 507.956z"
                                            p-id="2266" fill="#707070"></path>
                                    </svg>
                                    <span>{{ item.likedCount }}</span>
                                    <span class="liked_margin">|</span>
                                    <svg t="1658554856163" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="3251" width="14" height="14">
                                        <path
                                            d="M512 939.804444c-57.612929 0-113.570909-11.274343-166.322424-33.616161-50.889697-21.514343-96.504242-52.337778-135.809293-91.539394C170.666667 775.447273 139.843232 729.729293 118.328889 678.839596 96.193939 626.191515 84.816162 570.233535 84.816162 512.620606s11.274343-113.570909 33.616161-166.322424c21.514343-50.889697 52.337778-96.504242 91.539394-135.809293 39.201616-39.201616 84.919596-70.025051 135.809293-91.539394 52.648081-22.238384 108.606061-33.616162 166.322424-33.616162h1.034344l-0.103435 57.923233h-0.930909c-98.676364 0-191.353535 38.374141-261.068282 108.192323-69.818182 69.818182-108.295758 162.495354-108.295758 261.171717s38.374141 191.353535 108.192323 261.068283c69.714747 69.818182 162.495354 108.192323 261.068283 108.192323 98.572929 0 191.250101-38.374141 261.068283-108.088889C842.78303 704.077576 881.260606 611.400404 881.260606 512.827475h57.923232c0 57.612929-11.377778 113.570909-33.616161 166.21899-21.514343 50.889697-52.337778 96.504242-91.539394 135.705858s-84.919596 69.921616-135.705859 91.43596c-52.751515 22.341818-108.606061 33.616162-166.322424 33.616161zM938.149495 352.711111h-57.923232V145.73899H672.530101v-57.923232H938.149495V352.711111z m0 0"
                                            p-id="3252" fill="#707070"></path>
                                        <path
                                            d="M888.371717 96.012929l40.96 40.96L560.484848 505.806869l-40.96-40.96L888.371717 96.012929z m0 0"
                                            p-id="3253" fill="#707070"></path>
                                    </svg>
                                    <span class="liked_margin">|</span>
                                    <svg t="1658554967236" class="icon liked_icons" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="7706" width="14" height="14">
                                        <path
                                            d="M512.146827 268.510985c-250.902034 0-454.505322 157.57406-454.505322 359.095851 0 77.452531 32.639121 168.259723 83.298552 213.54786C166.24668 863.780505 88.131465 990.268512 109.075322 1018.193654c23.957624 31.943141 164.908706-79.128039 205.700895-61.760749C355.568406 973.800196 441.499439 987.04638 512.146827 987.04638c250.902034 0 447.742067-158.01764 454.089667-359.439545C972.069626 442.506103 768.001278 268.510985 512.146827 268.510985zM511.997535 950.528886C447.362645 950.528886 362.014817 933.770578 323.347087 920.455656c-38.351961-13.206444-179.982913 66.085924-179.982913 66.085924s52.530415-136.615167 29.151701-161.97227c-42.140114-45.708088-76.209862-124.513914-76.209862-195.375037 0-184.372531 186.277885-324.240977 415.827925-324.240977s415.35105 154.807323 415.447714 324.240977C927.690131 821.643613 741.54865 950.528886 511.997535 950.528886zM311.488568 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM504.000204 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM696.511839 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0Z"
                                            p-id="7707" fill="#707070"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="colloctor_pagination">
                        <el-pagination background layout="prev, pager, next" :total="totalNum"
                            :page-size="20" @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            fmList: [], // 私人FM
            lyrics: [], // 歌词
            times: 0,
            hotComments: [], // 热评
            comments: [], // 全部评论
            totalNum: 0
        }
    },
    created() {
        // 获取私人FM
        this.getPersonalFM()
    },
    watch: {
        fmList() {
            this.playAll()
        },
        '$store.state.cloudMusic.playList': function () {
            // 获取歌词
            this.getLyric()
            // 获取评论
            this.getComments()
        },
        '$store.state.cloudMusic.currentTime': function () {
            if (document.getElementsByClassName('is_active_lry')[0] && document.getElementsByClassName('is_active_lry')[0].offsetTop > 300) {
                let interval = setInterval(() => {
                    this.times += 1
                    if (this.times == 5) {
                        clearInterval(interval)
                        this.times = 0
                    }
                    let offsetop = document.getElementsByClassName('is_active_lry')[0]
                    if (typeof offsetop !== 'undefined') {
                        this.$refs.lyrbox2.scrollTop += ((offsetop.offsetTop - 300) - (this.$refs.lyrbox2.scrollTop)) / 5
                    }
                }, 200)
            }
        },
    },
    methods: {
        // 获取私人FM
        getPersonalFM() {
            axios.get(`/personal_fm`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.fmList = res.data.data
                    console.log(this.fmList)
                } else {
                    this.$message(`获取私人FM失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 自动播放全部
        playAll() {
            for (let i = this.fmList.length - 1; i >= 0; i--) {
                const audio = {
                    id: this.fmList[i].id,
                    dt: this.fmList[i].duration,
                    pic: this.fmList[i].album.picUrl,
                    name: this.fmList[i].name,
                    authors: this.fmList[i].artists,
                    isvip: this.fmList[i].fee == 1 || this.fmList[i].fee == 4,
                    al: this.fmList[i].album
                }
                this.$store.commit('unshiftPlayList', audio)
            }
        },
        // 获取歌词
        getLyric() {
            axios.get(`/lyric?id=${this.$store.state.cloudMusic.playList[0].id}`).then(res => {
                if (res.data && res.data.code == 200) {
                    let data = res.data.lrc.lyric.split('\n')
                    this.lyrics = []
                    data.forEach((item, index) => {
                        this.lyrics.push({
                            time: item.substring(1, item.indexOf(']')),
                            lyric: item.substring(item.indexOf(']') + 1),
                            index: index
                        })
                    })
                } else {
                    this.$message(`获取歌词失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 获取评论
        getComments() {
            // 调用接口获取评论
            axios.get(`/comment/music?id=${this.$store.state.cloudMusic.playList[0].id}`).then(res => {
                this.totalNum = res.data.total
                this.hotComments = []
                this.comments = []
                res.data.hotComments.forEach((item) => {
                    this.hotComments.push(item)
                })
                res.data.comments.forEach((item) => {
                    this.comments.push(item)
                })
            })
        },
        // 点击下一首
        playNext() {
            this.$store.commit('playNext')
        },
        filterTime(time) {
            let m = time.split(':')[0]
            let s = time.split(':')[1]
            return Number(m * 60) + Number(s)
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
    display: flex;
    align-items: center;
    justify-content: center;
    .contains {
        width: 760px;
        padding-top: 40px;
        .player {
            display: flex;
            align-items: center;
            .fm_pic_box {
                .fm_pic_contain {
                    .fm_pic {
                        width: 300px;
                        height: 300px;
                        border-radius: 4px;
                    }
                }
                .btn_group {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    padding-top: 40px;
                    .group_item {
                        cursor: pointer;
                        width: 20px;
                        height: 20px;
                        border: 1px solid #999;
                        border-radius: 50%;
                        padding: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .group_item:hover {
                        background: rgb(245, 245, 245);
                    }
                }
            }
            .fm_player_box {
                padding-left: 40px;
                .top_area {
                    .fm_name {
                        font-size: 22px;
                        padding-bottom: 20px;
                    }
                    .fm_info {
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .fm_al {
                            color: rgb(102, 102, 102);
                            span {
                                cursor: pointer;
                            }
                        }
                        .fm_ar {
                            color: rgb(102, 102, 102);
                        }
                        .fm_ar_item {
                            color: rgb(80, 125, 175);
                            cursor: pointer;
                        }
                        .fm_ar_item:hover {
                            color: rgb(11, 88, 176);
                        }
                    }
                }
                .bottom_area {
                    overflow: hidden;
                    height: 300px;
                    display: flex;
                    flex-direction: column;
                    margin-top: 20px;

                    .lyric_row {
                        font-size: 14px;
                        color: #999;
                        margin: 10px 0;
                    }

                    .is_active_lry {
                        color: #000;
                        font-size: 18px;
                        font-weight: 600;
                    }
                }
            }
        }
        .comment {
            padding-top: 40px;
            .input_comment {
                .input {
                    /deep/.el-textarea__inner {
                        border-color: rgb(229, 229, 229);
                    }
                }

                .tools {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
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
            .bottom_box {
        height: 35%;
        background: #fff;
        .colloctor_pagination {
            padding: 20px;
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }
        .comment_box {
            padding-top: 60px;
        }
        .each_comment {
                display: flex;
                border-bottom: 1px solid #f2f2f2;
                padding: 20px 0;

                .user_pic {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
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
    }
}
</style>