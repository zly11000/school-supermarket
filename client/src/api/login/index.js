import request from "@/untils/index";
const user = (data) =>request.post("/api/user/login",data); //登陆接口
const code = (data)=>request.post("/api/user/checkCode",data) //获取验证码
export default { 
    user,
    code
}
