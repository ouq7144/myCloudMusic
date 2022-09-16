<template>
    <div class="box">
        <!-- 内容 -->
        <div class="contains">
            <!-- 顶部区域 -->
            <div class="top_area">
                <div class="top_left"></div>
                <div class="top_right">
                    <el-carousel height="165px" :autoplay="false" trigger="click">
                    <el-carousel-item v-for="item in categoryList.length % 8" :key="item">
                        <div v-for="jtem in categoryList.slice((item - 1) * 8, item * 8)" :key="item.id" class="each_item">
                            <el-image :src="jtem.pic56x56Url" class="item_pic"></el-image>
                            <div class="tag_name">
                                <span>{{ jtem.name }}</span>
                            </div>
                        </div>
                    </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <!-- 创作翻唱 -->
            <div class="contain_item" v-if="chuangzuofanchuangList.length !== 0">
                <div class="item_title">
                    <span>创作翻唱</span>
                </div>
                <div class="item_list">
                    <div v-for="item in chuangzuofanchuangList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.rcmdtext }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 电音 -->
            <div class="contain_item" v-if="dianyinList.length !== 0">
                <div class="item_title">
                    <span>电音</span>
                </div>
                <div class="item_list">
                    <div v-for="item in dianyinList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.rcmdtext }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 音乐推荐 -->
            <div class="contain_item" v-if="yinyuetuijianList.length !== 0">
                <div class="item_title">
                    <span>音乐推荐</span>
                </div>
                <div class="item_list">
                    <div v-for="item in yinyuetuijianList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.rcmdtext }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 情感 -->
            <div class="_contain_item" v-if="qingganList.length !== 0">
                <div class="item_title">
                    <span>情感</span>
                </div>
                <div class="item_list">
                    <div v-for="item in qingganList" :key="item.id" class="each_item">
                        <div class="left_area">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                            <common-play-btn-vue class="play_btn"></common-play-btn-vue>
                        </div>
                        <div class="right_area">
                            <span class="item_name">{{ item.rcmdtext }}</span>
                            <span>
                                <span class="item_tag">{{ item.secondCategory }}</span>
                            </span>
                            <span class="item_creator">{{ item.dj.nickname }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- banner -->
            <div class="banner">
                <div v-for="item in bannerData" :key="item.targetId" class="banner_item">
                    <el-image :src="item.pic" cover="fit" lazy class="banner_pic">
                        <div slot="placeholder">
                            <el-image :src="require('../../assets/loading.gif')" class="banner_pic" fit="cover"></el-image>
                        </div>
                    </el-image>
                    <div class="img_title">{{ item.typeTitle }}</div>
                </div>
            </div>
            <!-- 生活 -->
            <div class="_contain_item" v-if="shenghuoList.length !== 0">
                <div class="item_title">
                    <span>生活</span>
                </div>
                <div class="item_list">
                    <div v-for="item in shenghuoList" :key="item.id" class="each_item">
                        <div class="left_area">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                            <common-play-btn-vue class="play_btn"></common-play-btn-vue>
                        </div>
                        <div class="right_area">
                            <span class="item_name">{{ item.rcmdtext }}</span>
                            <span>
                                <span class="item_tag">{{ item.secondCategory }}</span>
                            </span>
                            <span class="item_creator">{{ item.dj.nickname }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 新闻资讯 -->
            <div class="_contain_item" v-if="xinwenzixunList.length !== 0">
                <div class="item_title">
                    <span>新闻资讯</span>
                </div>
                <div class="item_list">
                    <div v-for="item in xinwenzixunList" :key="item.id" class="each_item">
                        <div class="left_area">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                            <common-play-btn-vue class="play_btn"></common-play-btn-vue>
                        </div>
                        <div class="right_area">
                            <span class="item_name">{{ item.rcmdtext }}</span>
                            <span>
                                <span class="item_tag">{{ item.secondCategory }}</span>
                            </span>
                            <span class="item_creator">{{ item.dj.nickname }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 有声书 -->
            <div class="contain_item" v-if="youshengshuList.length !== 0">
                <div class="item_title">
                    <span>有声书</span>
                </div>
                <div class="item_list">
                    <div v-for="item in youshengshuList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 二次元 -->
            <div class="contain_item" v-if="erciyuanList.length !== 0">
                <div class="item_title">
                    <span>二次元</span>
                </div>
                <div class="item_list">
                    <div v-for="item in erciyuanList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 明星专区 -->
            <div class="contain_item" v-if="mingxingzhuanquList.length !== 0">
                <div class="item_title">
                    <span>明星专区</span>
                </div>
                <div class="item_list">
                    <div v-for="item in mingxingzhuanquList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 知识 -->
            <div class="contain_item" v-if="zhishiList.length !== 0">
                <div class="item_title">
                    <span>知识</span>
                </div>
                <div class="item_list">
                    <div v-for="item in zhishiList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 故事 -->
            <div class="_contain_item" v-if="gushiList.length !== 0">
                <div class="item_title">
                    <span>故事</span>
                </div>
                <div class="item_list">
                    <div v-for="item in gushiList" :key="item.id" class="each_item">
                        <div class="left_area">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                            <common-play-btn-vue class="play_btn"></common-play-btn-vue>
                        </div>
                        <div class="right_area">
                            <span class="item_name">{{ item.rcmdtext }}</span>
                            <span>
                                <span class="item_tag">{{ item.secondCategory }}</span>
                            </span>
                            <span class="item_creator">{{ item.dj.nickname }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 娱乐 -->
            <div class="contain_item" v-if="yuleList.length !== 0">
                <div class="item_title">
                    <span>娱乐</span>
                </div>
                <div class="item_list">
                    <div v-for="item in yuleList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 亲子 -->
            <div class="contain_item" v-if="qinziList.length !== 0">
                <div class="item_title">
                    <span>亲子</span>
                </div>
                <div class="item_list">
                    <div v-for="item in qinziList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 脱口秀 -->
            <div class="_contain_item" v-if="tuokouxiuList.length !== 0">
                <div class="item_title">
                    <span>脱口秀</span>
                </div>
                <div class="item_list">
                    <div v-for="item in tuokouxiuList" :key="item.id" class="each_item">
                        <div class="left_area">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                            <common-play-btn-vue class="play_btn"></common-play-btn-vue>
                        </div>
                        <div class="right_area">
                            <span class="item_name">{{ item.rcmdtext }}</span>
                            <span>
                                <span class="item_tag">{{ item.secondCategory }}</span>
                            </span>
                            <span class="item_creator">{{ item.dj.nickname }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 相声曲艺 -->
            <div class="contain_item" v-if="xiangshengquyiList.length !== 0">
                <div class="item_title">
                    <span>相声曲艺</span>
                </div>
                <div class="item_list">
                    <div v-for="item in xiangshengquyiList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 人文历史 -->
            <div class="contain_item" v-if="renwenlishiList.length !== 0">
                <div class="item_title">
                    <span>人文历史</span>
                </div>
                <div class="item_list">
                    <div v-for="item in renwenlishiList" :key="item.id" class="each_item">
                        <div class="item_pic_box">
                            <el-image :src="item.picUrl" fit="cover" lazy class="item_pic">
                                <div slot="placeholder">
                                    <el-image :src="require('../../assets/loading.gif')" class="item_pic" fit="cover"></el-image>
                                </div>
                            </el-image>
                        </div>
                        <div class="item_name">
                            <b class="item_category">{{ item.secondCategory }}</b>
                            <span style="padding-left: 5px;line-height: 1.8;">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import commonPlayBtnVue from '@/components/commonPlayBtn.vue';
export default {
    components: {commonPlayBtnVue},
    data() {
        return {
            cainixihuanList: [], //猜你喜欢
            categoryList: [], // 电台类型
            chuangzuofanchuangList: [], // 创作翻唱
            dianyinList: [], // 电音
            yinyuetuijianList: [], // 音乐推荐
            qingganList: [], // 情感
            shenghuoList: [], // 生活
            xinwenzixunList: [], // 新闻资讯
            youshengshuList: [], // 有声书
            erciyuanList: [], // 二次元
            mingxingzhuanquList: [], // 明星专区
            zhishiList: [], // 知识
            gushiList: [], // 故事
            yuleList: [], // 娱乐
            qinziList: [], // 亲子
            tuokouxiuList: [], // 脱口秀
            xiangshengquyiList: [], // 相声曲艺
            renwenlishiList: [], // 人文历史
            bannerData: [], // banner
        }
    },
    created() {
        // 获取电台类型
        this.getPodCastType()
        // this.getCainixihuan()
        // 获取banner数据
        this.getBannerData()
    },
    methods: {
        // 获取电台分类
        getPodCastType() {
            axios.get(`/dj/catelist`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.categoryList = res.data.categories
                    this.getChuangZuoFanChangData()
                    this.getDianYinData()
                    this.getYinYueTuiJianData()
                    this.getQingGanData()
                    this.getShengHuoData()
                    this.getXinWenZiXunData()
                    this.getYouShengShuData()
                    this.getErCiYuanData()
                    this.getMingXingZhuanQuData()
                    this.getZhiShiData()
                    this.getGuShiData()
                    this.getYuLeData()
                    this.getQinZiData()
                    this.getTuoKouXiuData()
                    this.getXiangShengQuYiData()
                    this.getRenWenLiShiData()
                } else {
                    this.$message(`获取电台类型失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 获取创作翻唱
        getChuangZuoFanChangData() {
            this.categoryList.forEach(item => {
                if (item.name == '创作翻唱') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.chuangzuofanchuangList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取创作翻唱失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取电音
        getDianYinData() {
            this.categoryList.forEach(item => {
                if (item.name == '电音') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.dianyinList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取电音失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取音乐推荐
        getYinYueTuiJianData() {
            this.categoryList.forEach(item => {
                if (item.name == '音乐推荐') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.yinyuetuijianList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取音乐推荐失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取情感
        getQingGanData() {
            this.categoryList.forEach(item => {
                if (item.name == '情感') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.qingganList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取情感失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取生活
        getShengHuoData() {
            this.categoryList.forEach(item => {
                if (item.name == '生活') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.shenghuoList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取生活失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取新闻资讯
        getXinWenZiXunData() {
            this.categoryList.forEach(item => {
                if (item.name == '新闻资讯') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.xinwenzixunList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取新闻资讯失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取有声书
        getYouShengShuData() {
            this.categoryList.forEach(item => {
                if (item.name == '有声书') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.youshengshuList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取有声书失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取二次元
        getErCiYuanData() {
            this.categoryList.forEach(item => {
                if (item.name == '二次元') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.erciyuanList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取二次元失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取明星专区
        getMingXingZhuanQuData() {
            this.categoryList.forEach(item => {
                if (item.name == '明星专区') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.mingxingzhuanquList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取明星专区失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取知识
        getZhiShiData() {
            this.categoryList.forEach(item => {
                if (item.name == '知识') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.zhishiList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取知识失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取故事
        getGuShiData() {
            this.categoryList.forEach(item => {
                if (item.name == '故事') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.gushiList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取故事失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取娱乐
        getYuLeData() {
            this.categoryList.forEach(item => {
                if (item.name == '娱乐') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.yuleList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取娱乐失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取亲子
        getQinZiData() {
            this.categoryList.forEach(item => {
                if (item.name == '亲子') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.qinziList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取亲子失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取脱口秀
        getTuoKouXiuData() {
            this.categoryList.forEach(item => {
                if (item.name == '脱口秀') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.tuokouxiuList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取脱口秀失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取相声曲艺
        getXiangShengQuYiData() {
            this.categoryList.forEach(item => {
                if (item.name == '相声曲艺') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.xiangshengquyiList = res.data.djRadios.slice(0, 6)
                        } else {
                           this.$message(`获取相声曲艺失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取人文历史
        getRenWenLiShiData() {
            this.categoryList.forEach(item => {
                if (item.name == '人文历史') {
                    axios.get(`/dj/recommend/type?type=${item.id}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.renwenlishiList = res.data.djRadios.slice(0, 6)
                        } else {
                            this.$message(`获取人文历史失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                        }
                    })
                }
            })
        },
        // 获取banner
        getBannerData() {
            axios.get(`/dj/banner`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.bannerData = res.data.data
                } else {
                    this.$message(`获取banner失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        },
        // 获取猜你喜欢部分内容
        getCainixihuan() {
            axios.get(`/dj/catelist`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.cainixihuanList = res.data.result
                } else {
                    this.$message(`获取猜你喜欢部分内容失败，原因为：${res.message || '网络拥挤，请稍后再试'}`)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.box {
    display: flex;
    justify-content: center;
    .contains {
        width: 1080px;
        .top_area {
            display: flex;
            padding-top: 40px;
            .top_left {
                width: 650px;
                height: 165px;
                border-radius: 8px;
                background-color: rgb(55, 55, 55);
            }
            .top_right {
                width: 430px;
                margin-left: 20px;
                .el-carousel__item h3 {
                    color: #475669;
                    font-size: 14px;
                    opacity: 0.75;
                    line-height: 165px;
                    margin: 0;
                }
                .el-carousel__item:nth-child(2n) {
                    background-color: rgb(255, 245, 245);
                    border-radius: 8px;
                }
                .el-carousel__item:nth-child(2n+1) {
                    background-color: rgb(255, 245, 245);
                    border-radius: 8px;
                }
                .el-carousel__item {
                    display: flex;
                    flex-wrap: wrap;
                    .each_item {
                        width: 100px;
                        height: 80px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        .item_pic {
                            width: 35px;
                            height: 35px;
                        }
                        .tag_name {
                            font-size: 12px;
                            color: rgb(55, 55, 55);
                        }
                    }
                    .each_item:hover {
                        .tag_name {
                            color: #000;
                        }
                    }
                }
            }
        }
        .contain_item {
            padding-top: 40px;
            .item_title {
                font-weight: bold;
                font-size: 18px;
                padding-bottom: 20px;
                span {
                    cursor: pointer;
                }
            }
            .item_list {
                display: flex;
                justify-content: space-between;
                .each_item {
                    .item_pic_box {
                        .item_pic {
                            width: 160px;
                            height: 160px;
                            border-radius: 4px;
                            cursor: pointer;
                        }
                    }
                    .item_name {
                        span {
                            cursor: pointer;
                        }
                        width: 160px;
                        padding-top: 10px;
                        font-size: 14px;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2; /* 这里是超出几行省略 */
                        overflow: hidden;
                        color: rgb(55, 55, 55);
                        .item_category {
                            border: 1px solid #ebebeb;
                            font-size: 12px;
                            padding: 1px 2px;
                            color: rgb(152, 152, 152);
                        }
                    }
                    .item_name span:hover {
                        color: #000;
                    }
                }
            }
        }
        ._contain_item {
            padding-top: 40px;
            .item_title {
                font-weight: bold;
                font-size: 18px;
                padding-bottom: 10px;
                span {
                    cursor: pointer;
                }
            }
            .item_list {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .each_item {
                    width: 49%;
                    display: flex;
                    margin: 10px 0;
                    .left_area {
                        position: relative;
                        width: 70px;
                        height: 70px;
                        cursor: pointer;
                        .item_pic {
                            width: 100%;
                            height: 100%;
                            border-radius: 4px;
                        }
                        .play_btn {
                            position: absolute;
                            bottom: 10px;
                            right: 10px;
                        }
                    }
                    .right_area {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;
                        padding-left: 10px;
                        .item_name {
                            font-size: 14px;
                            font-weight: normal;
                        }
                        .item_tag {
                            border: 1px solid #ebebeb;
                            font-size: 12px;
                            padding: 1px 2px;
                            color: rgb(152, 152, 152);
                            font-weight: normal;
                        }
                        .item_creator {
                            font-size: 12px;
                            color: rgb(152, 152, 152);
                            font-weight: normal;
                            cursor: pointer;
                        }
                        .item_creator:hover {
                            color: #000;
                        }
                    }
                }
                .each_item:hover {
                    background: rgba(235, 235, 235, .5);
                }
            }
        }
        .banner {
            padding-top: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .banner_item {
                position: relative;
                cursor: pointer;
                .banner_pic {
                    width: 350px;
                    border-radius: 8px;
                }
                .img_title {
                    height: 25px;
                    width: 60px;
                    position: absolute;
                    bottom: 4px;
                    right: 0;
                    border-top-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    color: #fff;
                    font-size: 12px;
                    background: rgb(204, 74, 74);
                    display: flex;
                    align-items: center;
                    justify-content: center;
			}
            }
        }
    }
}
</style>