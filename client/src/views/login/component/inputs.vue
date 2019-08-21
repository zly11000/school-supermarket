<template>
  <div>
            <div class="center">
                <span v-for="(item,index) in brr" :key="index">
                    <input type="text" v-model="item.value" :class="{active:index === ind }" @keyup="change($event,index)" ref="inputs" max="9" min="0"/>
                </span>
            </div>
    </div>
</template>
<script>
export default {
    props:{
        open:{
            type:Boolean
        },
        valued:{
            type:String
        }
    },
    components:{

    },
    data(){
        return {
            ind:0,
            brr:[
                {
                    value:""
                },
                {
                    value:""
                },
                {
                    value:""
                },
                {
                    value:""
                },
                {
                    value:""
                },
                {
                    value:""
                }
            ]
        }
    },
    computed:{
    },
    methods:{
        change(el,ind){
             if(this.brr[ind].value.trim() === "" && this.brr[ind].value.length!==1 && this.brr.length>=6){
                return;
            }
            //  if(el.keyCode === 8){
            //      this.ind -= 1;
            //     if(ind <(this.brr.length-1)){
            //         this.brr[this.ind+1].value = "";
            //         inputs[ind+1].focus()
            //     }else{
            //         inputs[ind-1].blur()
            //     }
            //     return;
            // }
            this.ind = ind;
            let inputs = this.$refs.inputs;
            let currentInput = inputs[ind];
            let nextInput = inputs[ind+1];
            let prevInput = inputs[ind-1]
            if(ind <(this.brr.length-1)){
                nextInput.focus()
            }else{
                currentInput.blur()
            }
             let str=""
             this.brr.forEach(item=>{
               str +=item.value;
            })
            this.$emit("data",str)
        },
      
    },
    created(){
        
    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
.mark{
    width:100%;
    height:100%;
    position:fixed;
    top:45px;
    left:0;
    background: rgba(0,0,0,.3);
   
}
.mark-box{
  width:80%;
  padding:20px 10px 0 10px;
  min-height:200px;
  background: #fff;
  border-radius: 10px;
  position:absolute;
  left:50%;
  top:50%;
   overflow: hidden;
  transform: translateX(-50%) translateY(-50%);
  .first{
      font-size:20px;
  }
  p:nth-child(2){
      font-size: 12px;
      padding:10px 0;
  }
  .center{
      width: 100%;
      min-height:70px;
  }
   .center{
      width: 100%;
      min-height:40px;
      display: flex;
      flex-wrap: wrap;
      span{
          width:16.5%;
          border:1px solid #ccc;
          input{
              width:100%;
              height:100%;
              text-align:center;
          }
      }
      .active{
          color:red;
      }
  }
  .last{
      width: 90%;
      height:35px;
      text-align:center;
      line-height: 35px;
      color:#fff;
      margin:20px auto;
      background:orange;
      border-radius: 50px;
  }
 
 }

</style>