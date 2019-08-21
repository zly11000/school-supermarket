import Vue from "vue";
import Vuex from "vuex";
import list from "@/store/module/shoppingCar";
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        list
    }
})