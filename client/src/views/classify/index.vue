<template>
    <div class="wrap">
      <my-header></my-header>
      <main class="main">
          <div class="input">
          <input type="text" placeholder="搜索校园超市商品" @click="searched"/>
      </div>
          <div class="box">
              <div class="left">
                  <ul>
                      <li v-for="(item,index) in leftList" :key="item.id" @click="add(index,item.id)" :class="{active:index === ind}">
                          {{item.title}}
                      </li>
                  </ul>
              </div>
              <div class="right">
                  <div class="top">
                      <div>
                         <span @click="allTitle">{{title}}</span>
                         <span v-for="(item,i) in childArr" :key="i" @click="items(i,item)" :class="   {active:i === index}">
                          {{item.name}}
                      </span>
                    </div>
                  </div>
                  <div class="bottom" ref="main">
                      <div>
                     <my-item v-if="brr.length" v-for="(item,index) in brr" :key="index" :item="item" :index="index" :open="open"></my-item>
                     <my-item v-else v-for="(item,index) in child" :key="index"  :open="open" :item="item"></my-item>
                     <p v-if="openSize">到底了..</p>
                     </div>
                  </div>
              </div>
          </div>
      </main>
      <my-footer></my-footer>
    </div>
</template>
<script>
import list from "../../api/home/index";
import myItem from "../home/component/index";
// import scrolled from "@/minxin/scroll.js";
export default {
    name:"classify",
    props:{
    },
    components:{
        myItem
    },
    data(){
        return {
            leftList:[],
            ind:0,
            brr:[],
            childList:[],
            childArr:[],
            parentId :"",
            index:-1,
            child:[],
            title:"全部",
            open:true,
            page:0,
            scrollTop:0,
            maxSize:1,
            openSize:false
        }
    },
    computed:{
    },
    // mixins:[scrolled],
     activated(){
      this.$refs.main.scrollTop = this.scrollTop
     },
    methods:{
    //     scrollList() {
    //         this.page += 1;
    //         this.rightLigth();
    //         this.openSize = true
    // },
        add(id,ied){
            this.ind = id;
            this.parentId = ied
             this.rightLigth();
             this.childArr = this.childList.filter((item,index)=> item.parent_id === ied);
             this.childs()
        },
          rightLigth(){
              if(this.maxSize>=this.page){
             list.selectType({
                params:{
                    type_id:this.leftList[this.ind].id,
                    category_id:this.childArr[this.index] && this.childArr[this.index].id
                    // pageid:this.page,
                    // limit:5
                }
            }).then(data=>{
                this.brr = data.data
            })

              }
           
        },
        items(ind,ite){
            this.index = ind;
            this.child= this.brr.filter(item=>item.category_id === ite.id);
           this.rightLigth()
        },
        childs(){
               list.shopType().then(data=>{
            this.leftList = data.data;
             this.childArr = data.data.filter((item,index)=> item.id === this.leftList[this.ind].id && this.leftList[this.ind].id)[0].children
             this.rightLigth()
        })
        },
        allTitle(){
             list.selectType({
               params:{
                   type_id:this.leftList[this.ind].id
               }
            }).then(data=>{
                this.brr = data.data
            })
        },
        searched(){
            this.$router.push("/searchList")
        }
    },
    created(){
         this.childs()
    },
    mounted(){
        // this.scrollTo(this.$refs.main,this.scrollTop);

    }
}
</script>
<style scoped lang="scss">
.wrap{
       width:100%;
       height:100%;
       display:flex;
       flex-direction: column;
       .main{
           flex:1;
           display: flex;
            flex-direction: column;
       }
       .input{
           width:90%;
           margin-left:5%;
           height:40px;
           input{
               width: 100%;
               height:100%;
               background: #f5f5f5;
               border-radius: 50px;
               padding-left:5%;
               &::-webkit-input-placeholder{
                   color:#ccc;
               }
           }
       }
       .box{
           flex:1;
           margin-top:10px;
           display: flex;
           .left{
               width: 120px;
               height:100%;
               background: #f5f5f5;
               ul{
                   width: 100%;
                   height:100%;
                   display: flex;
                   flex-direction: column;
                   li{
                       flex:1;
                       border-bottom: 1px solid #ccc;
                       display: flex;
                       align-items: center;
                       justify-content: center;
                   }
               }
               .active{
                   background:pink;

               }
           }
           .right{
               flex:1;
               display: flex;
               flex-direction: column;
               .top{
                   width: 100%;
                   height:40px;
                   border-bottom: 1px solid #ccc;
                   display: flex;
                   align-items: center;
                   span{
                       padding:0 5px;
                   }
                   >div{
                       overflow: auto;
                   }

               }
               .bottom{
                   flex:1;
                   overflow:auto;
                   p{
                       text-align: center;
                   }
               }
               .active{
                   color:pink;
               }


           }
       }
   }

</style>