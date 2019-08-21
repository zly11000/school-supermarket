<template>
    <div class="footer">
         <div class="item" v-for="(item,index) in footerDate" :key="index">
             <router-link :to="item.link">{{item.title}}</router-link>
         </div>
    </div>
</template>
<script>
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            footerDate:[
                {
                     title:"首页",
                     link:"/home"
                },
                {
                    title:"分类",
                    link:"/classify"
                },
                {
                    title:"购物车",
                    link:"/shoppingCar"
                },
                {
                    title:"我的",
                    link:"/my"
                }
            ]

        }
    },
    computed:{

    },
    methods:{

    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
   .footer{
       width:100%;
       height:40px;
       display: flex;
       justify-content: space-around;
       align-items: center;
       a{
           color:#888;
          
       }
        .router-link-exact-active{
               color:pink;
           }
   }

</style>