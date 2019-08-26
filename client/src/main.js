import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import "./public/style/_minix.scss";
import "./public/style/common.scss";
import "./plugins/vant"
import VueAwesomeSwiper from 'vue-awesome-swiper';//轮播图差件
import store from "./store/index"
import base from "./plugins/base";
import 'swiper/dist/css/swiper.css';
import 'vant/lib/index.css';
Vue.use(VueAwesomeSwiper) //挂载轮播图插件
Vue.use(base)
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
