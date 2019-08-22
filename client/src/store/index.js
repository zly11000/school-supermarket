import Vue from "vue";
import Vuex from "vuex";
import list from "@/store/modules/shopping.js";
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        list
    }
})