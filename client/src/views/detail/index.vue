<template>
    <div class="wraps">
        <my-header :title="title"></my-header>
        <main class="mains">
            <div class="banners">
                 <swiper :options="swiperOption" v-if="item.pictures">
            <!-- slides -->
                 <swiper-slide v-for="(item,index) in JSON.parse(item.pictures)" :key="index">
                    <img :src="item"/>
                </swiper-slide>
              </swiper>
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
                <span>首页</span>
            </div>
             <div class="item">
                <span>购物车</span>
            </div>
             <div class="item">
                <span>加入购物车</span>
            </div>
             <div class="item">
                <span>直接购买</span>
            </div>
        </footer>
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
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
               swiperOption: {
        loop: true,
        // autoplay: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
      },

        }
    },
    computed:{
        ...mapState("list",["res"])

    },
    methods:{
        ...mapActions("list",["getList"]),
        
    },
    async created(){
        console.log(1)
        let {id,typeId} = this.$route.params;
     await this.getList({
           type_id:typeId
        })
        this.item = this.res.find(item=>item.id === id*1);
        this.$refs.detailBottom.innerHTML = this.item.detail;
        
        console.log(this.item)
    },
    mounted(){
        
    },
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