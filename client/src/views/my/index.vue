<template>
     <div class="wrap">
      <my-header></my-header>
       <main class="mained" v-if="goLogin">亲！您未登录,请前往<router-link to="/login">登录</router-link></main>
      <main class="main" v-else-if="!goLogin">
          <div class="big">
              <div class="left" v-if="name">
                  <p>我的昵称</p>
                  <p>{{name}}</p>
              </div>
              <div class="right" v-if="img">
                  <img :src="img"/>
              </div>
              <div class="right" v-else @click="myLogin">
                  <span>未登录</span>
              </div>
          </div>
          <div class="order">
              <div class="top">
                  <p>我的订单</p>
                  <p>
                      <span>查看全部</span>
                       <span>></span>
                  </p>
              </div>
              <div class="bottom">
                  <div class="item" v-for="(item,index) in data" :key="index">
                      <i :class="item.icon"></i>
                      <span>{{item.title}}</span>
                  </div>
              </div>
          </div>
          <div class="list">
              <div class="item">
                <p>
                  <span><i>我的有九件</i></span>
                 </p>
                 <p>8张伟使用</p>
              </div>
              <div class="item">
                <p>
                  <span><i>资质规则</i></span>
                 </p>
              </div>
              <div class="item">
                <p>
                  <span><i>联系客服</i></span>
                 </p>
                 <p>400</p>
              </div>
          </div>
      </main>
      <my-footer></my-footer>
    </div>
</template>
<script>
import "../../public/font/iconfont.css"
export default {
    props:{

    },
    components:{
    },
    data(){
        return {
            goLogin:true,
            data:[
                {
                    title:"待付款",
                    icon:"iconfont icon-tian"
                },
                {
                    title:"待配送",
                    icon:"iconfont icon-tongjitu111"
                },
                {
                    title:"已发货",
                    icon:"iconfont icon-youxiang"
                },
                {
                    title:"退款/售后",
                    icon:"iconfont icon-line"
                }
            ],
            img:"",
            name:""

        }
    },
    computed:{

    },
    methods:{
        myLogin(){
            this.$router.push("/login")
        }
    },
    created(){
        this.img =  window.localStorage.token ? "http://localhost:7002" +JSON.parse(window.localStorage.token).avatar :"";
        this.name =  window.localStorage.token ? JSON.parse(window.localStorage.token).nickname : "";
         if( window.localStorage.token){
            this.goLogin = false
        }
    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
.wrap{
       width:100%;
       height:100%;
       display:flex;
       flex-direction: column;
        .mained{
           flex:1;
           overflow: auto;
           text-align: center;
           line-height: 500px;
       }
       .main{
           flex:1;
           overflow: auto;
           background:#f5f5f5;
       }
       .big{
           width:100%;
           height:150px;
           background:red;
           display:flex;
            justify-content: space-between;
            padding:0 20px;
            .left,.right{
                // margin-top:30px;
                color:#fff;
            }
            .right{
                width:50px;
                height:50px;
                margin-top:30px;
                span{
                    position:absolute;
                    right:10px;
                    margin-top:15px;
                    margin-right:10px;
                }
                img{
                    width:100%;
                    height:100%;
                }
            }
            .left{
                margin-top:30px;
                p:nth-child(1){
                    font-size: 20px;
                }
            }
       }
       .order{
           width:90%;
           height:150px;
           margin-left:5%;
           background:#fff;
           border-radius:12px;
           display:flex;
           padding:3px 5px;
            display:flex;
           flex-direction: column;
           margin-top:-20px;
           box-shadow:0px 33px 20px -20px rgba(0,0,0,0.11),0px 0px 17px -3px rgba(0,0,0,0.06);
           
           .top{
               width:100%;
               height:50px;
               display:flex;
               justify-content: space-between;
               align-items:center;
               padding:0 10px;
           }
           .bottom{
               flex:1;
               display:flex;
               flex-wrap:wrap;
               i{
                   font-size: 20px;
                   display:flex;
                   justify-content: center;
                   align-items: center;
               }
               .item{
                   width:25%;
                   height:100%;
                   flex-direction: column;
                    display:flex;
                   justify-content:center;
                   align-items:center;
                   i{
                       width:100%;
                       height:100%;
                       flex:7;
                   }
                   span{
                       flex:3;

                   }
               }
           }
       }
       .list{
           width:90%;
           height:200px;
           margin-top:20px;
           background:#fff;
           border-radius:12px;
           display:flex;
             margin-left:5%;
            flex-direction: column;
            padding:0 10px;
           .item{
               width:100%;
               min-height:66px;
               display:flex;
               justify-content: space-between;
               align-items:center;
            }
       }
   }

</style>