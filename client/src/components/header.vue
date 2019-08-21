<template>
    <div class="header">
        <h3>{{title}}</h3>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:"校园超市"
        }
    },
    components:{

    },
    data(){
        return {

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
   .header{
       width:100%;
       height:45px;
       display: flex;
       align-items: center;
       justify-content: center;
   }
</style>