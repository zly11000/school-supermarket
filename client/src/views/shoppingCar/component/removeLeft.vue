<template>
    <div class="bigBox" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div class="removeBox" :style="{
            transform:`translateX(${remove.movex}px)`
        }">
               <slot>
               </slot>
        </div>
        <span class="dele" @click.stop="deletes(ind)" :style="{
            right:`${-100-remove.movex}px`
        }">删除</span>
        <my-alert :show="show" :title="tit"></my-alert>
    </div>
</template>
<script>
import list from "@/api/home/index"
import { setInterval } from 'timers';
export default {
    props:{
        ind:{
            type:Number
        },
        item:{
            type:Object
        },
        arr:{
            type:Array
        }
    },
    components:{

    },
    data(){
        return {
            show:false,
            tit:"",
            timer:null,
            remove:{
                startx:0,
                starty:0,
                curx:0,
                cury:0,
                movex:0,
                movey:0,
                
            }
        }
    },
    computed:{

    },
    methods:{
        brforePosition(){
              document.querySelectorAll(".bigBox").forEach(item=>{
                     item.querySelector(".removeBox").style.transform= `translateX(0px)`;
                     item.querySelector(".dele").style.right = `-100px`
                 })
                this.$set(this.remove,"movex",-100)
        },
        //开始按下
        touchstart(e){
            // console.log(e.touches[0])
           let {clientX,clientY} = e.touches[0];
           this.startx = clientX;
           this.starty = clientY;
        },
        //开始移动
        touchmove(e){
             let {clientX,clientY} = e.touches[0];
             this.curx = clientX;
             this.cury = clientY
        }, 
        //结束
        touchend(e){
              let removex = this.curx - this.startx //判断滑动的方向
             let removey = this.cury  - this.starty;
             if(Math.abs(removey) > 10){ 
                 return;
             }
             if(removex > 10){
                 this.remove.movex  = 0
             }
             if(removex < -10){
                 //滑动时让删除盒子回到原来的位置
                 
                 this.brforePosition()
                //  console.log(this.remove.movex)
             }
        },
        //点击删除
        deletes(ind){
            this.show=true,
            this.timer = setInterval(()=>{
                this.show = false
            },2000)
            list.removeShop({
                 user_id:JSON.parse(window.localStorage.token).userid,
                 shop_id:this.item.shopdata.id
            }).then(data=>{
                if(data.code){
                    this.tit = "删除成功"
                     this.$emit("delete",this.brforePosition,this.item)
                }
            })
        }
    },
      destroyed() {
            //清除定时器
            clearInterval(this.timer);
    }
   
}
</script>
<style scoped lang="scss">
  .bigBox{
      width:100%;
      height:150px;
      overflow: hidden;
      position: relative;
       z-index:9999;
      .removeBox{
          width: 100%;
          height:100%;
      }
      .dele{
          width:100px;
          height:100%;
          display: block;
          background: red;
          line-height: 150px;
          color:#fff;
          text-align: center;
          position:absolute;
          top:0;
          right:-90px;
          font-size: 20px;
        //   z-index:999;
      }
  }

</style>