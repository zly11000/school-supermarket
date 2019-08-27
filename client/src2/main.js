import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import "../src/public/style/_minix.scss";
import "../src/public/style/common.scss"
import "../node_modules/swiper/dist/css/swiper.min.css"
import "../node_modules/swiper/src/swiper.js"
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
