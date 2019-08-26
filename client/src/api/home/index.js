import request from "@/untils/index";
const homeBanner = ()=>request.get("/api/home/banner") //获取首页轮播图
const homeShop = (data)=>request.get("/api/home/shop",{params:data}) //获取首页商品数据
const shopType = ()=>request.get("/api/shop/shopType") //获取分类数据  //获取二级导航
const selectType = (data)=>request.get("/api/shop/selectType",data) //获取右侧列表的数据
const searchList = (data)=>request.get("/api/search",data); //搜索接口
const addCar = (data)=>request.post("/api/car/addCar",data);//添加购物车接口
const shopping = (data) =>request.get("/api/car/getCar",data)//购物车数据
const removeCar = (data)=>request.post("/api/car/removeCar",data)//删除购物车
const removeShop = (data)=>request.post("/api/car/removeShop",data) 
export default {
    homeBanner,
    homeShop,
    shopType,
    selectType,
    searchList,
    addCar,
    shopping,
    removeCar,
    removeShop
}