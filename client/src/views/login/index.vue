<template>
    <div class="wrap">
        <div class="mark" v-if="open"></div>
          <div class="mark-box" v-if="open">
                <p class="first">请输入验证码</p>
               <p>6位短信验证已发送至</p>
                <my-input @data="getlist"></my-input>

                 <p class="last" @click="logind">
                    <span>登陆</span>
                </p>
          </div>
        <my-header></my-header>
        <main class="main">
            <h1>手机号登陆</h1>
             <div class="input">
                 <input type="text" v-model="phoneValue" placeholder="手机号"/>
             </div>
             <div class="box" @click="number" ref="box">
                 <span>获取验证码</span>
             </div>
        </main>
    </div>
</template>
<script>
import myInput from "./component/inputs"
import userd from "@/api/login/index";
import axios from "axios";
console.log(userd)
export default {
    props:{

    },
    components:{
     myInput

    },
    data(){
        return {
            open:false,
            phoneValue:"",
            title:"",
            ind:-1,
            res:""
        }
    },
    computed:{

    },
    methods:{
        number(){
            this.$refs.box.style.backgroundColor="#ccc";
            if(this.phoneValue.trim() === ""){
                return;
            }
            userd.code({
                phone:this.phoneValue
            }).then(data=>{
                console.log(data)
                if(data.code){
                     this.open = !this.open;
                }
            }).catch(data=>{
                console.log(data)
            })
        },
        getlist(res){
            this.res = res;
            console.log(this.res)
        },
          logind(){
             userd.user({
               phone:this.phoneValue,
               checkcode:this.res
             }).then(data=>{
                 if(data.code){
                     this.$router.push("/home")
                 }
                 window.localStorage.token = JSON.stringify(data.data)
             })
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
.wrap{
    width:100%;
    height:100%;
    .main{
    padding:0 10px;
    h1{
      width:100%;
      min-height:100px;
      font-weight: 100;
      font-size:40px;
  }
  .input{
      width: 100%;
      height:50px;
      border-bottom: 1px solid #ccc;
      input{
          width:100%;
          height:100%;
          border:0;
          outline: none;
          padding-bottom:20px;
      }
  }
  .box{
      width:90%;
      height:40px;
      background:coral;
      color:#fff;
      line-height: 40px;
      text-align: center;
      margin:40px auto;
      border-radius: 50px;
  }
  .active{
      background:#ccc;
  }
}

}

  
</style>