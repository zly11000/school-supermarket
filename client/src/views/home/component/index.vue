<template>
<div class="biged">
  <slot name="input"></slot>
  <dl @click="detail">
    <dt>
      <img :src="item.cover"/>
    </dt>
    <dd>
      <p class="child">{{item.name}}</p>
      <p>累计{{item.volume}}份/已拼{{item.stock}}份</p>
      <p>
        <span v-if="open">自营</span>
      </p>
      <p class="last">
        <span>
          ￥
          <b>{{item.price}}</b>
        </span>
        <span v-if="open" @click.stop="goCar(index,item.id)" :style="{background:'red'}">
            <i class="iconfont icon-gouwuche"></i>
        </span>
        <span v-else-if="open">
          <slot name="count"></slot>
           <!-- <my-count :item="ite" :brr="brr" :allInputs="allInputs"></my-count> -->
        </span>
         <span v-else>
           <slot name="count"></slot>
        </span>
      </p>
    </dd>
  </dl>
  </div>
</template>
<script>
import list from "@/api/home/index";
import myCount from "../../shoppingCar/component/count";
export default {
  props:{
    item:{
      type:Object
    },
    index:{
      type:Number
    },
    open:{
      type:Boolean,
      default:true
    },
    ite:{
      type:Object
    },
    brr:{
      type:Array
    },
    allInputs:{
      type:Boolean
    }
  },
  components: {
      myCount
  },
  data() {
    return {
      shopingList: []
    };
  },
  computed: {},
  methods: {
    detail(){
      this.$router.push("/detail/"+ this.item.id + "/" + this.item.type_id)
    },
    goCar(ind, id) {
         list.addCar({
          user_id: JSON.parse(window.localStorage.token).userid,
          shop_id: id
        }).then(data =>{
           alert(data.msg);
        });
    }
   
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.biged{
  width:100%;
  height:100%;
  display: flex;
}
dl {
  flex:9;
  width: 100%;
  min-height: 150px;
  border-bottom: 1px solid #ccc;
  display: flex;
  input{
      display: block;
      width: 20px;
      height:20px;
      background: #ccc;
      margin-top:60px;
      margin-left:2px;
      border:1px solid #ccc;
  }
  dt {
    flex: 2;
    img {
      width: 100%;
      height: 100%;
    }
  }
  dd {
    flex: 8;
  }
}
dl {
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 0px 10px;
  dt {
    flex: 4;
    padding: 10px 5px;
    img {
      width: 100%;
      height: 100%;
      padding: 10px 10px;
    }
  }
  dd {
    flex: 6;
    padding-left: 2%;
    .child{
        margin-top:15px;
    }
    p {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    p:nth-child(1) {
      display: block;
      font-weight: 900;
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p:nth-child(2) {
      font-size: 12px;
      color: #ccc;
    }
    .last {
      color: orange;
      height: 20px;
      padding-right: 10px;
      span:nth-child(2){
          display:block;
          min-width:30px;
          min-height:30px;
            // background: red;
            border-radius: 50%;
              display: flex;
                align-items: center;
                justify-content: center;
            i{
                font-size: 20px;
                color:#fff;
                // opacity:0;
            }
    }
      }
      
  }
 
}
</style>