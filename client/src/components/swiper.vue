<template>
     <swiper :options="swiperOption">
         <slot></slot>
     </swiper>
</template>
<script>
export default {
    props:{
    },
    components:{

    },
    data(){
        return {
             swiperOption: {
                loop: true,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                autoplay: {
                delay: 2500,
                disableOnInteraction: false
        }
      },
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
<style scoped lang="">

</style>