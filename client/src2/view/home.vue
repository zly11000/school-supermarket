<template>
    <div class="wrap">
        <nav>
            <ul>
                <li>起点金福</li>
                <li>
                   <span v-for="(item,index) in arr" :key="index">
                      {{item.name}}
                   </span>
                </li>
                <li>
                    <span>登录</span>
                    <span>注册</span>
                </li>
            </ul>
        </nav>
        <div class="banner">
            <div class="swiper-container" id="banner">
                <div class="swiper-wrapper">
                    <div class="swiper-silde">
                         <img src="../public/bg1.jpg"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="left">
                <p class="tit">您的企业现金增长状况健康吗？</p>
                <p>
                   企业现金增长包括企业营收、融资、贷款及存量资金的持续保值增值。奇点金服通过对不同行业、规模的数千家客户的研究，归纳出四种企业现金增长模型。利用奇点现金增长方法论，客户可较为精准的洞察自身发展情况，并在实践层面做到以现金增长赋能自身企业发展。
                    著作权归公司所有。
                    商业转载请联系公司获得授权，非商业转载请注明出处。
                </p>
            </div>
            <div class="right">

            </div>
           
        </div>
    </div>
</template>
<script>
import Swiper from "swiper";

export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            arr:[
                {
                  name:"首页"
                },
                {
                    name:"现金增长"
                },
                {
                    name:"气垫产品"
                },
                {
                    name:"企点服务"
                },
                {
                    name:"起点团队"
                },
                {
                    name:"联系我们"
                }
            ]

        }
    },
    computed:{

    },
    methods:{

    },
    created(){
        this.$nextTick(()=>{
              this.swiper = new Swiper("#banner",{
                  autoplay:true,
                  loop:true
           })
        })
    },
    mounted(){

    },
    updated(){
         this.$nextTick(()=>{
              this.swiper = new Swiper("#banner",{
                  autoplay:true,
                  loop:true
           })
        })
    }
}
</script>
<style scoped lang="scss">
    .wrap{
        width:100%;
        height:100%;
        position: relative;
        nav{
            width: 100%;
            height:100px;
            position:fixed;
            top:0;
            left:0;
            z-index:999;
            background: rgba(0,0,0,.7);
            ul{
                width:100%;
                height:100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                color:#fff;
                span{
                    padding:0 10px;
                }
            }
        }
        .banner{
           width:100%;
           height:654px;
           #banner{
               height:100%; 
               .swiper-wrapper{
                 height:100%;
               }
                .swiper-silde{
                    width:100%;
                    height:100%;
                    img{
                        width:100%;
                        height:100%;
                    }

           }
           }
          
        }
        .box{
            width:100%;
            min-height:200px;
            background: #ccc;
            padding:10px 20px;
            display: flex;
            .left{
                flex:6;
                 .tit{
                font-size: 30px;
            }
            }
            .right{
                flex:4;
            }
           
        }
    }
</style>