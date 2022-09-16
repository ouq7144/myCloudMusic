<template>
    <div class="box">
        <!-- 菜单 -->
        <div class="nav">
            <div
                v-for="item in navList"
                :key="item.index"
                class="nav_item"
                :style="{ borderBottom: curNavIndex == item.index ? `2px solid ${$store.state.cloudMusic.theme}` : '0', fontWeight: curNavIndex == item.index ? 'bold' : 'unset', fontSize: curNavIndex == item.index ? '20px' : '16px' }"
                @click="clickNav(item.index)"
            >
                {{ item.label }}
            </div>
        </div>
        <!-- 内容区域 -->
        <div class="contains">
            <vedio-vue v-if="curNavIndex == 0" class="content" @playMv="playMv"></vedio-vue>
            <mv-vue v-if="curNavIndex == 1" class="content" @playMv="playMv" @openMvList="openMvList"></mv-vue>
        </div>
        <!-- 该页面涉及到的通用组件 -->
        <common-mv-vue v-if="$store.state.cloudMusic.mvVisible" :id="mvid"></common-mv-vue>
        <common-mv-list-vue style="height: calc(100vh - 140px); width: calc(100vw - 200px);" v-if="$store.state.cloudMusic.mvListVisible" @playMv="playMv"></common-mv-list-vue>
    </div>
</template>

<script>
import vedioVue from '@/components/vedioAndMv/vedio.vue'
import mvVue from '@/components/vedioAndMv/mv.vue'
import commonMvVue from '@/components/commonMv.vue'
import commonMvListVue from '@/components/commonMvList.vue'
const navList = [
    {
        label: '视频',
        index: 0
    },
    {
        label: 'MV',
        index: 1
    }
]
export default {
    components: { vedioVue, mvVue, commonMvVue, commonMvListVue },
    data() {
        return {
            navList,
            curNavIndex: 0,
            mvid: 0
        }
    },
    methods: {
        clickNav(index) {
            this.curNavIndex = index
        },
        playMv(id) {
            this.mvid = id
            this.$store.commit('setMvVisible', true)
        },
        openMvList() {
            this.$store.commit('setMvListVisible', true)
        }
    }
}
</script>

<style lang="less" scoped>
.box {
    .nav {
        display: flex;
        align-items: baseline;
        padding: 20px;
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
    .contains {
        display: flex;
        align-items: center;
        flex-direction: column;
        .content {
            width: 1180px;
        }
    }
}
</style>