<template>
  <div id="app">
    <common-header></common-header>
    <common-footer></common-footer>
    <el-container>
        <common-aside></common-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import commonHeader from '@/components/commonHeader.vue'
import commonFooter from '@/components/commonFooter.vue'
import commonAside from './components/commonAside.vue';
export default {
  name: 'App',
  components: { commonHeader, commonFooter, commonAside }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: PingFang SC;
}

.el-container {
    height: calc(100vh - 140px);
    margin-top: 60px;
}

  .el-main {
    color: #333;
    padding: 0 !important;
    overflow: unset;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  
/*滚动条样式*/
::-webkit-scrollbar {
  width: 4px;
  /*height: 4px;*/
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);

}
</style>