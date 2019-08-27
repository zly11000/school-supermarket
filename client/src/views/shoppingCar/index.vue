<template>
     <div class="wrap">
      <my-header></my-header>
      <main class="mained" v-if="goLogin">亲！您未登录,请前往<router-link to="/login">登录</router-link></main>
      <main class="main" v-else>
        <my-remove  v-for="(item,index) in arr" :key="index" :item="item" :ind="index" :arr="arr" @delete="deleteList">
           <my-item :item="item.shopdata" :ite="item" :index="index" :open="false" :brr="brr" :allInputs="allInputs" v-if="brr">
               <template slot="input">
                    <input type="checkbox" class="inputs"  ref="ipt" @change.stop="ipts(index)" v-model="brr[index].flag" slot="input"/>
                </template>
                <template slot="count">
                    <my-count :item="item" :index="index" :brr="brr" :allInputs="allInputs" @count="countPrice"></my-count>
                </template>
             <!--  -->
           </my-item>
        </my-remove>
      </main> 
      
      <div class="bottom" :class="{active:goLogin === true}">
           <div class="left">
                   <span>
                       <input type="checkbox" class="all" v-model="allInputs"  ref="allInput"  @change="all"/>
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
import myRemove from "./component/removeLeft";
import myCount from "./component/count"
import {mapState,mapActions} from "vuex";
export default {
    name:"shoppingCar",
    props:{

    },
    components:{
       myItem,
       myRemove,
       myCount
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
            allInputs:false,
            goLogin:true,
           
        }
    },
    computed:{
      ...mapState("list",["arrList"])       
    },
    methods:{
      ...mapActions("list",["shoppings"]),
        deleteList(brforePosition,item){
                 let index = this.arr.findIndex(item=>item.shopdata.id === item.shopdata.id);
                //  console.log(index)
                   this.arr.splice(index,1)
                   brforePosition()
        },
        countPrice(count,index){
            this.brr[index].count = count;
        },
        ipts(ind){//点击每一个
            this.$refs.allInput.checked = this.$refs.ipt.every(item=>{
                return item.checked
            })
        },
        all(){
            // console.log(1)
            //点击总的
            this.$refs.ipt.map(item=>{
                   item.checked  = this.$refs.allInput.checked
            })
               this.brr.forEach(item=>{
                    item.flag = this.allInputs
                })
        },
        async listAll(){
                await this.shoppings({
              user_id:window.localStorage.token && JSON.parse(window.localStorage.token).userid 
            })
          this.arr = this.arrList;
          this.arrList && this.arrList.forEach(item=>{
               this.brr.push({
                   flag:false,
                  price:item.shopdata.price,
                   count:item.count
               })
            })
        }
    },
   async created(){
        if(window.localStorage.token){
            this.goLogin = false;
            await this.listAll()
        }
    },
  async activated(){
       if(window.localStorage.token){
            this.goLogin = false;
            await this.listAll()
        }
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
       .mained{
           flex:1;
           overflow: auto;
           text-align: center;
           line-height: 500px;
       }
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
            //    input{
            //        display: inline-block;
            //        width: 20px;
            //        height:20px;
            //    }
           }
           .right{
               flex:3;
               background: red;
               display: flex;
               align-items: center;
               justify-content: center;
           }

       }
       .active{
           opacity:0;
       }
       .inputs{
           width: 20px;
           height:20px;
           position:absolute;
           top:65px;
           left:3px;
       }
       .all{
           width: 20px;
           height:20px;
       }
   }

</style>