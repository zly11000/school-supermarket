import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import "./public/style/_minix.scss";
import "./public/style/common.scss";
import VueAwesomeSwiper from 'vue-awesome-swiper';//轮播图差件
import Header from "./components/header";
import Footer from "./components/footer";
import store from "./store/index"
// import base from "./components/index";
import 'swiper/dist/css/swiper.css';
Vue.component("my-header",Header) //挂载header组件
Vue.component("my-footer",Footer) //挂载footer组件
Vue.use(VueAwesomeSwiper) //挂载轮播图插件
// Vue.use(base)
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
