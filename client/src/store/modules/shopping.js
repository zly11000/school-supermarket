import api from "../../api/home/index"
// import { async } from "q";
const state = {
     res:[],
     obj:null,
     arrList:[]
}
const mutations = {
    getListed(state,arr){
        state.res=arr   
    },
    addCars(state,brr){
        state.obj =brr
    },
    carList(state,brr){
        state.arrList = brr
    }
}
const getters = {
}
const actions = {
    async getList({commit},{type_id}){
      let data =  await api.selectType({
            params:{
                type_id
            }
        })
         commit("getListed",data.data)
    },
    async addCared({commit},{user_id,shop_id}){ //添加购物车
        let res = await api.addCar({
                user_id,
                shop_id
        })
        console.log(res)
        commit("addCars",res.msg)
    },
    async shoppings({commit},{user_id}){ //获取购物车数据
        let data = await api.shopping({
            params:{
                user_id
            }
        })
       console.log(data)
        commit("carList",data.data)
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    getters,
    actions
}