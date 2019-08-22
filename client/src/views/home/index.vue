<template>
  <div class="wrap">
    <my-header></my-header>
    <div class="input">
      <p @click="searched">
          <i class="iconfont icon-dingwei"></i>
      </p>
      <p>搜索</p>
    </div>
    <main class="main" id="main" ref="main">
      <div>
        <div class="banner">
          <swiper :options="swiperOption" v-if="bannerList">
            <!-- slides -->
            <swiper-slide v-for="item in bannerList" :key="item.id">
              <a :href="item.url">
                <img :src="item.image" />
              </a>
            </swiper-slide>
          </swiper>
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
import arr from "../../mock/mock";
import myItem from "../home/component/index";
import scrolled from "@/minxin/scroll.js";
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
      swiperOption: {
        loop: true,
        autoplay: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      bannerStart: "",
      bannerEnd: "",
      bannerList: [],
      shopList: [],
      page: 0,
      address: "",
      scrollTop:0,
      maxSize:1,
      sizeOpen:false
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
          console.log(data)
          this.shopList = this.shopList.concat(data.data);
        })
        }
    },
    searched() {
      this.$router.push("/search");
    }
  },
  activated(){
      this.$refs.main.scrollTop = this.scrollTop
  },
  created() {
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
  }
  .banner {
    width: 100%;
    height: 100px;
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