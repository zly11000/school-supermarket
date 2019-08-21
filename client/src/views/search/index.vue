<template>
    <div class="wrap">
        <my-header></my-header>
        <div class="main">
            <!-- <div id="container"></div> -->
            <div class="top">
                <div class="cont">
                    <span>北京</span>
                    <span>></span>
                </div>
                <div class="input">
                    <input type="text" ref="input" v-model.lazy="values" id="valued"/>
                </div>
            </div>
            <div class="bottom" ref="list">
                <ul>
                    <li v-for="(item,index) in data" :key="index" @click="itemed(item)">
                        <span>{{item.name}}</span>
                        <span>{{item.district}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {plugins} from "@/untils/map"
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            values:"",
            search:null,
            data:[]

        }
    },
    computed:{

    },
    methods:{
        itemed(item){
            console.log(item)
            window.localStorage.item = JSON.stringify(item);
            console.log(window.localStorage.item)
            this.$router.push("/home")
        }

    },
    created(){

    },
   async mounted(){
       this.search = await plugins("AMap.Autocomplete",{
           city:"北京"
       })
    },
    watch:{
        values(values){
            console.log(this.search.search)
            this.search.search(values,(status,result)=>{
                switch(status){
                    case "no_data" :
                        alert("暂无该地址")
                    break;
                    case "complete" :
                    console.log(result)
                        this.data = result.tips;
                }

            })
        }
    }
}
</script>
<style scoped lang="scss">
   .wrap{
       width: 100%;
       height:100%;
       display: flex;
       flex-direction: column;
       background: #f5f5f5;
       .main{
           flex:1;
           display: flex;
           flex-direction: column;
           .top{
               width: 100%;
               height:70px;
               background: #fff;
               display:flex;
               padding:0 5px;
               .cont{
                   width:50px;
                   height:100%;
                   display: flex;
                   justify-content: center;
                   align-items: center;
               }
               .input{
                   flex:1;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   input{
                       width:100%;
                       height:60%;
                       outline: none;
                       border:0;
                       background: #f5f5f5;
                       border-radius: 50px;
                       padding-left:10px;
                   }
               }
           }
           .bottom{
               flex:1;
               padding:0 10px;
               overflow:auto;
               ul{
                   width: 100%;
                   height:100%;
                   li{
                       width: 100%;
                       min-height:100px;
                       border-bottom: 1px solid #ccc;;
                       span{
                           display: block;
                           line-height:50px;
                       }
                   }
               }
           }
       }
   }
</style>