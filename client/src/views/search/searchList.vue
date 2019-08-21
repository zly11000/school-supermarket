<template>
    <div class="wrap">
        <my-header></my-header>
        <main class="main">
            <div class="input">
                <div class="box">
                   <input type="text" v-model="values"/>
                </div>
                <span @click="searchs">搜索</span>
            </div>
            <div class="bottom">
               <my-List v-for="(item,index) in arr" :item="item" :index="index" :open="true"></my-List>
            </div>
        </main>
    </div>
</template>
<script>
import list from "../../api/home/index";
import myList from "../home/component/index"
export default {
    props:{

    },
    components:{
       myList
    },
    data(){
        return {
            values:"",
            arr:[],
            searchOpen:false
        }
    },
    computed:{

    },
    methods:{
        searchs(){
                list.searchList({
                params:{
                    search_key:this.values
                }
            }).then(data=>{
                this.arr = data.data
            })
            this.values=""
        }
    },
    created(){
    

    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
.wrap{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    .main{
        flex:1;
         display: flex;
         flex-direction: column;
        .input{
            width: 100%;
            height:50px;
            display: flex;
            padding:0 5px;
            .box{
                flex:8;
                display: flex;
                align-items: center;
                justify-content: center;
                input{
                    width: 100%;
                    height:60%;
                    outline: none;
                    border:0;
                    border:1px solid #ccc;
                    border-radius: 50px;
                    padding-left:5px;
                }
            }
            span{
                flex:2;
                 display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            
        }
        .bottom{
            flex:1;
            overflow: auto;
        }
    }
}

</style>