import Vue from "vue";
import Router from 'vue-router'
Vue.use(Router);
let router =  new Router({
    mode: 'history',
    routes:[
        {
            path:"/",
            redirect:"/home"
        },
        {
          path:"/home",
          component:()=>import("../views/home/index.vue")
        },
        {
            path:"/login",
            component:()=>import("../views/login/index.vue")
        },
        {
            path:"/classify",
            component:()=>import("../views/classify/index.vue")
        },
        {
            path:"/shoppingCar",
            meta:{
               isLogin:true
            },
            component:()=>import("../views/shoppingCar/index.vue")
        },
        {
            path:"/my",
            component:()=>import("../views/my/index.vue")
        },
        {
            path:"/search",
            component:()=>import("../views/search/index.vue")
        },
        {
            path:"/searchList",
            component:()=>import("../views/search/searchList.vue")
        },
        {
            path:"/detail/:id/:typeId",
            component:()=>import("../views/detail/index.vue")
        }
    ]
})
//进入购物车
// router.beforeEach((to,from,next)=>{
//     if(to.meta.isLogin){
//         if(window.localStorage.token){
//             next()
//         }else{
//             next("/login")
//         }
//     }else{
//         next()
//     }
// })
export default router;