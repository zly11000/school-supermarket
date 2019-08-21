<template>
     <div class="wrap">
      <my-header></my-header>
      <main class="main">
        <my-remove v-for="(item,index) in arr" :key="index" :item="item" :ind="index" :arr="arr" @dele="deleCont">
           <my-item :item="item.shopdata" :ite="item" :index="index" :open="false">
             <input type="checkbox"  ref="ipt" @change="ipts(index)" v-model="brr[index].flag"/>
           </my-item>
        </my-remove>
      </main> 
      <div class="bottom" >
           <div class="left">
                   <span>
                       <input type="checkbox" v-model="allInputs"  ref="allInput"  @change="all"/>
                   </span>
                   <span>
                       合计<b>￥{{allPrice}}</b>
                   </span>
           </div>
           <div class="right">
               <span>
                   去结算({{this.arr.length}})
               </span>
           </div>
      </div>
      <my-footer>
      </my-footer>
    </div>
</template>
<script>
import list from "@/api/home/index";
import myItem from "../home/component/index";
import myRemove from "./component/removeLeft"
export default {
    props:{

    },
    components:{
       myItem,
       myRemove
    },
    data(){
        return {
            arr:[],
            open:false,
            inp:false,
            ind:0,
            inputs:[],
            brr:[],
            allPrice:0,
            allInputs:false
        }
    },
    computed:{
        // priceAll(){
        //      return this.arr.reduce((pev,cur)=>
        //          pev + cur.count * cur.shopdata.price,0)
        // }
    },
    methods:{
        deleCont(){
          console.log(1)
        },
        ipts(ind){//点击每一个
            this.$refs.allInput.checked = this.$refs.ipt.every(item=>{
                return item.checked
            })
          
        },
        all(){
            console.log(1)
            //点击总的
            this.$refs.ipt.map(item=>{
                   item.checked  = this.$refs.allInput.checked
            })
               this.brr.forEach(item=>{
                    item.flag = this.allInputs
                })
        }
    },
    created(){
        list.shopping({
            params:{
                user_id:JSON.parse(window.localStorage.token).userid 
            }
        }).then(data=>{
            this.arr  = data.data
            data.data.forEach(item=>{
               this.brr.push({
                   flag:false,
                   price:item.shopdata.price,
                   count:item.count
               })
            })
        })
    },
    mounted(){
    },
    watch:{
        brr:{
            deep:true,
            handler:function(brr){
                this.allPrice = brr.reduce((pev,cur)=>
                 pev +(cur.flag && cur.count * cur.price),0)
                 
            }
        }
    }
}
</script>
<style scoped lang="scss">
.wrap{
       width:100%;
       height:100%;
       display:flex;
       flex-direction: column;
       overflow: hidden;
       .main{
           flex:1;
           overflow: auto;
       }
       .bottom{
           width:100%;
           min-height:60px;
          background:#f5f5f5;
           display: flex;
           .left{
               flex:7;
               display: flex;
               justify-content: space-between;
               padding:0 5px;
               align-items: center;
               input{
                   display: inline-block;
                   width: 20px;
                   height:20px;
               }
           }
           .right{
               flex:3;
               background: red;
               display: flex;
               align-items: center;
               justify-content: center;
           }

       }
   }

</style>