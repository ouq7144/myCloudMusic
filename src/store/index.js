import Vue from 'vue'
import Vuex from 'vuex'
import cloudMusic from './cloudMusic'
import dataWarehouse from './dataWarehouse'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        cloudMusic,
        dataWarehouse
    }
})