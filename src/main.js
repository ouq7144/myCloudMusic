import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from '@/router/index.js'
import store from '@/store/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-audios/dist/vue-audios.css';
import VueAudios from 'vue-audios';

Vue.use(VueAudios);
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.config.silent = true;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
