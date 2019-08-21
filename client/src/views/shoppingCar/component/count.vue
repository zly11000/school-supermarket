<template>
    <div class="adds">
        <p class="subtract" @click="subtracted">
            <span>-</span>
        </p>
        <p>
            <span v-if="item.count">{{item.count}}</span>
        </p>
        <p class="add" @click="adds"  :disabled="open">
            <span>+</span>
        </p>
    </div>
</template>
<script>
import list from "@/api/home/index";
import debounce from "@/untils/scroll"
export default {
    props:{
        item:{
            type:Object
        }
    },
    components:{

    },
    data(){
        return { 
            open:false
        }
    },
    computed:{


    },
    methods:{
        adds(){
            //点击加
            this.open = true
                 list.addCar({
                user_id: JSON.parse(window.localStorage.token).userid,
                shop_id:this.item.shopdata.id
            }).then(data=>{
                this.open = false;
                if(data.code){
                    this.item.count+=1
                }
            })
        setTimeout(() => {
          this.open = false
        },7000)
            
        },
        //点击减
        subtracted(){
            if(this.item.count > 1){
             list.removeCar({
                  user_id: JSON.parse(window.localStorage.token).userid,
                  shop_id:this.item.shopdata.id
            }).then(data=>{
                if(data.code){
                    this.item.count -= 1; 
                 }
             })
             }
        }
    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
.adds{
    display: flex;
    align-items: center;
    justify-content: center;
}
p{
    margin:0 5px;
}
.subtract,.add{
    width: 20px;
    height:20px;
    border:1px solid #ccc;
    line-height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>