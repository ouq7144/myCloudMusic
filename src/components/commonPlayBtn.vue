<template>
    <div class="box">
        <svg t="1659343516031" class="icon icons" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2267" width="14" height="14"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" :fill="$store.state.cloudMusic.theme" p-id="2268"></path></svg>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
 .box {
    width: 24px;
    height: 24px;
    background: #fff;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    .icons {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-45%, -50%);
    }
 }
</style>
