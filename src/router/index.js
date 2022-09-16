import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/findMusic',
        name: '发现音乐',
        component: () => import('../views/nav/findMusic/index.vue')
    },
    {
        path: '/vedioAndMv',
        name: '视频',
        component: () => import('../views/nav/vedioAndMv/index.vue')
    },
    {
        path: '/pod',
        name: '播客',
        component: () => import('../views/nav/podCast.vue')
    },
    {
        path: '/fm',
        name: '私人FM',
        component: () => import('../views/nav/personalFm.vue')
    },
    {
        path: '/findMusic/artist',
        name: '发现音乐-歌手',
        component: () => import('@/views/nav/findMusic/artistIndex.vue')
    },
    {
        path: '/findMusic/newList',
        name: '发现音乐-最新音乐',
        component: () => import('@/views/nav/findMusic/newListIndex.vue')
    },
    {
        path: '/findMusic/songsList',
        name: '发现音乐-歌单',
        component: () => import('@/views/nav/findMusic/songsListIndex.vue')
    },
    {
        path: '/findMusic/topList',
        name: '发现音乐-排行榜',
        component: () => import('@/views/nav/findMusic/topListIndex.vue')
    },
    {
        path: '/vedioAndMv/mv',
        name: '视频-MV',
        component: () => import('@/views/nav/vedioAndMv/mvIndex.vue')
    },
    {
        path: '/dayRecommondPage',
        name: '每日推荐',
        component: () => import('@/views/page/dayRecommondPage.vue')
    },
    {
        path: '/personalHomePage',
        name: '个人主页',
        component: () => import('../views/page/personalHomePage.vue')
    },
    {
        path: '/searchPage',
        name: '搜索',
        component: () => import('@/views/page/searchPage.vue')
    },
    {
        path: '/songsListPage',
        name: '歌单',
        component: () => import('@/views/page/songsListPage.vue')
    },
    {
        path: '/artistPage',
        name: '歌手',
        component: () => import('@/views/page/artistPage.vue')
    },
    {
        path: '/albumPage',
        name: '专辑',
        component: () => import('@/views/page/albumPage.vue')
    },
    {
        path: '/mvPage',
        name: 'mv',
        component: () => import('@/views/page/mvPage.vue')
    },
    {
        path: '/',
        redirect: '/findMusic'
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
