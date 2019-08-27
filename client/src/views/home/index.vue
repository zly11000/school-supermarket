<template>
  <div class="wrap">
    <my-header></my-header>
       
    <div class="input">
      <p @click="searched">
          <i class="iconfont icon-dingwei"></i>
          <span class="address" v-if="add">{{add}}</span>
          <span class="address" v-else>{{address}}</span>
      </p>
      <p>搜索</p>
    </div>
    <main class="main" id="main" ref="main">
      <div>
        <div class="banner" v-if="bannerList">
         <my-swiper>
            <!-- slides -->
            <swiper-slide v-for="item in bannerList" :key="item.id">
              <a :href="item.url">
                <img :src="item.image" />
              </a>
            </swiper-slide>
         </my-swiper>
        </div>
        <div class="icon">
          <div class="item" v-for="(item,index) in arr" :key="index">
            <img :src="require('../../assets/image/'+item.img) " />
            <span>{{item.title}}</span>
          </div>
        </div>
        <div class="imgs">
          <p>
            <span>每日必购</span>
            <span>大家都在买</span>
          </p>
          <div class="bottom"></div>
        </div>
        <div class="allList">
          <my-item
            v-for="(item,index) in shopList"
            :key="index"
            :item="item"
            :index="index"
            :open="open"
          ></my-item>
          <p v-if="sizeOpen">到底了..</p>
        </div>
      </div>
     
    </main>
    <my-footer></my-footer>
  </div>
</template>
<script>
import list from "@/api/home/index";
import arr from "@/mock/mock";
import myItem from "../home/component/index";
import scrolled from "@/minxin/scroll.js";
import mySwiper from "../../components/swiper"
import { setTimeout, setInterval } from 'timers';
export default {
  name:"home",
  props: {},
  components: {
    myItem
  },
  data() {
    return {
      open: true,
      arr,
      bannerStart: "",
      bannerEnd: "",
      bannerList: [],
      shopList: [],
      page: 0,
      address: "",
      scrollTop:0,
      maxSize:1,
      sizeOpen:false,
      add:"",
      show:false,
      timer:null
     
    };
  },
  computed: {},
  mixins: [scrolled],
  methods: {
    scrollList() {
      this.page += 1;
      this.homeList();
      this.sizeOpen = true
    },
    homeList() {
        if(this.maxSize >= this.page){
          list.homeShop({
          pageid: this.page,
          limit: 10
        }).then(data => {
          this.shopList = this.shopList.concat(data.data);
        })
        }
    },
    searched() {
      this.$router.push("/search");
    },
  },
  activated(){
      this.$refs.main.scrollTop = this.scrollTop;
       this.add = window.localStorage.address
  },
  created() {
    if(window.localStorage.address){
           this.add = window.localStorage.address
    }else{
        this.timer = setTimeout(()=>{
             this.$router.push("/location") 
            },3000) 
    }
    list.homeBanner().then(data => {
      let currentTime = new Date() * 1;
      data.data.forEach(item => {
        if (
          new Date(item.start_time) * 1 < currentTime &&
          currentTime < new Date(item.end_time) * 1
        ) {
          this.bannerList.push(item);
        }
      });
    });
    this.homeList();
    this.address = window.localStorage.item
      ? JSON.parse(window.localStorage.item).district
      : "";
  },
  mounted() {
    this.scrollTo(this.$refs.main,this.scrollTop);
  },
   destroyed() {
      //清除定时器
       clearTimeout(this.timer);
  }
};
</script>
<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    overflow: auto;
  }
  .input {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    .address{
       display:inline-block;
      padding-left:5px;
      width:200px;
      height:20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height:30px;
      font-size: 12px;
    }
  }
  .banner {
    width: 100%;
    height: 150px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      padding: 5px 5px;
    }
  }
  .icon {
    width: 100%;
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0px;
    .item {
      width: 20%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 2px 0px;
      img {
        width: 45px;
        height: 43px;
        display: inline-block;
        background: blue;
      }
      span:nth-child(2) {
        flex: 5;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .imgs {
    width: 100%;
    height: 200px;
    display: flex;
    margin-top: 5px;
    flex-direction: column;
    p {
      width: 100%;
      height: 35px;
      display: flex;
      align-items: center;
      padding-left: 3%;
      span:nth-child(1) {
        font-size: 20px;
        padding-right: 3%;
      }
    }
    .bottom {
      flex: 1;
      background: url("../../assets/image/首页1_02.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .allList {
    width: 100%;
    p{
        text-align: center;
    }
  }
}
</style>