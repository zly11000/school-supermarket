<template>
    <div class="wraps">
        <my-alert :title="red" :show="show"></my-alert>
        <my-header :title="title"></my-header>
        <main class="mains">
            <div class="banners" v-if="item.pictures">
                <my-swiper>
            <!-- slides -->
                 <swiper-slide v-for="(item,index) in JSON.parse(item.pictures)" :key="index">
                    <img :src="item"/>
                </swiper-slide>
              </my-swiper>
                <!-- <img :src="item.cover"/> -->
            </div>
            <div class="boxs">
                <div class="tops">
                     <p>￥<span>{{item.price}}</span></p>
                   <p>累计销售{{item.stock}}份</p>
                </div>
                  <div class="bottoms">
                      <div class="lefts">
                          <p>{{item.name}}</p>
                          <p>剩余{{item.stock}}份</p>
                      </div>
                      <div class="rights">
                          <span>分享好友</span>
                      </div>
                  </div> 
            </div>
            <div class="details">
                <div class="detailTop">
                    <span>商品详情</span>
                </div>
                <div class="detailBottom" ref="detailBottom">
                    <!-- {{item.detail}} -->
                </div>
            </div>
        </main>
        <footer class="footered">
            <div class="item">
                <span @click="goHome">首页</span>
            </div>
             <div class="item">
                <span @click="shopCar">购物车</span>
            </div>
             <div class="item">
                <span @click="addCar">加入购物车</span>
            </div>
             <div class="item">
                <span>直接购买</span>
            </div>
        </footer>
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
import list from "@/api/home/index"
import { constants } from 'crypto';
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            title:"商品详情",
             page: 0,
             item:{},
             red:"",
             show:false
        }
    },
    computed:{
        ...mapState("list",["res","obj"])

    },
    methods:{
        ...mapActions("list",["getList","addCared"]),
        goHome(){ //点击跳回首页
            this.$router.push("/home")
        },
        shopCar(){ //点击调回购物车
            this.$router.push("/shoppingCar")
        },
 
        async addCar() {      
        if(window.localStorage.token){
            let {id} = this.$route.params;
             this.show = true
             this.timer = setInterval(()=>{
             this.show = false
            },2000)
            await this.addCared({
                user_id: JSON.parse(window.localStorage.token).userid,
                shop_id: id
          })
          this.red = this.obj   
        }else{
            this.$router.push("/login")
        }
          
      }
    },
    async created(){
        // console.log(1)
        let {id,typeId} = this.$route.params;
        await this.getList({
           type_id:typeId
        })
        this.item = this.res.find(item=>item.id === id*1);
        this.$refs.detailBottom.innerHTML = this.item.detail;
        // console.log(this.item)
    },
    destroyed() {
       //清除定时器
       clearInterval(this.timer);
    }
}
</script>
<style  lang="scss">
   .wraps{
       width:100%;
       height:100%;
       display: flex;
       flex-direction: column;
       .mains{
           flex:1;
           overflow:auto;
           .banners{
               width: 100%;
               height:350px;
               .swiper-container{
                    width: 100%;
                   height:100%;
               }
               .swiper-slide{
                   width: 100%;
                   height:100%;
               }
               img{
                   width: 100%; 
                   height:100%;
               }
           }
           .boxs{
               width:100%;
               height:250px;
               background: orange;
               border-top-left-radius: 10px;
               border-top-right-radius:10px; 
               color:#fff;
               display: flex;
              flex-direction: column;
              .tops{
                  width:100%;
                  height:80px;
                   padding:10px 10px;
                   p:nth-child(1) span{
                   font-size: 30px;
               }
              }
              .bottoms{
                  flex:1;
                  background: #fff;
                  display: flex;
                  .lefts{
                      flex:7.5;
                      color:#000;
                      padding:10px 15px;
                      p{
                          padding:15px 0;
                      }
                      P:nth-child(1){
                          font-size:25px;
                      }
                      p:nth-child(2){
                          color:#ccc;
                      }
                  }
                  .rights{
                      flex:2.5;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color:red;
                      span{
                          text-align: center;
                      }
                  }

              }
              
           }
           .details{
               width: 100%;
               height:100%;
               display: flex;
               flex-direction: column;
               .detailTop{
                   width: 100%;
                   height:50px;
                   padding:0 5px;
                   line-height: 50px;
                   font-size: 20px;
               }
                .detailBottom{
                    flex:1;
                    width:100%;
                    p{
                        width:100%;
                        img{
                            width: 100%;
                            max-height:2500px;
                        }
                    }
                 }
           }
       }
       .footered{
           width: 100%;
           height:45px;
           display: flex;
             
           .item:nth-child(1){
               flex:2;
             display: flex;
               align-items: center;
               justify-content: center;
           }
           .item:nth-child(2){
               flex:2;
                display: flex;
               align-items: center;
               justify-content: center;
           }
           .item:nth-child(3){
               flex:3;
                display: flex;
               align-items: center;
               justify-content: center;
               background: orange;
               color:#fff;
           }
           .item:nth-child(4){
               flex:3;
                display: flex;
               align-items: center;
               justify-content: center;
                 background:red;
               color:#fff;

           }
          
       }
   }

</style>