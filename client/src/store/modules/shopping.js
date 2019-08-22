import api from "../../api/home/index"
const state = {
     res:[]
}
const mutations = {
    getListed(state,arr){
        state.res=arr
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
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    getters,
    actions
}