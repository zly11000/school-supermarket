<template>
    <div class="adds">
        <p class="subtract" @click.stop="subtracted">
            <span>-</span>
        </p>
        <p>
            <span v-if="item.count">{{item.count}}</span>
        </p>
        <p class="add" @click.stop="adds">
            <span>+</span>
        </p>
    </div>
</template>
<script>
import list from "@/api/home/index";
import debounce from "@/untils/scroll";
export default {
    props:{
        item:{
            type:Object
        },
        brr:{
            type:Array
        },
        allInputs:{
            type:Boolean
        },
        index:{
            type:Number
        }
    },
    components:{

    },
    data(){
        return { 
            arr:[],
            flag:true
        }
    },
    computed:{


    },
    methods:{
        adds(){
            //点击加
            if(this.flag){
                this.flag = false
                 list.addCar({
                user_id: JSON.parse(window.localStorage.token).userid,
                shop_id:this.item.shopdata.id
            }).then(data=>{
                if(data.code){
                    this.flag = true
                    this.$emit('count',this.item.count+=1,this.index)
                    // this.$emit('count',this.index,true)

                }
            })
            }
        },
        //点击减
        subtracted(){
            if(this.flag){
                this.flag = false
                     if(this.item.count > 1){
             list.removeCar({
                  user_id: window.localStorage.token ? JSON.parse(window.localStorage.token).userid :'',
                  shop_id:this.item.shopdata.id
            }).then(data=>{
                if(data.code){
                     this.flag = true
                    this.$emit('count',this.item.count-=1,this.index)
                    //  this.$emit('count',this.index,false)
                 }
             })
             }
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