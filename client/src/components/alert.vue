<template>
    <van-popup v-model="show" :overlay="false" :duration="0.3">{{title}}</van-popup>
</template>
<script>
export default {
    props:{
        title:{
            type:String
        },
        show:{
            type:Boolean
        }
    },
    components:{
    },
    data(){
        return {
            timer:null
            
        }
    },
    computed:{

    },
    methods:{

    },
    created(){
        
    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
.van-popup{
    color:#fff;
    background: rgba(0,0,0,.4);
    padding:5px 10px;
}
</style>