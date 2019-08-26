import debounce from "@/untils/scroll.js"
export default {
    methods:{
        scrollTo(main){
            let h = main.getBoundingClientRect().height;
            // console.log(main)
            main.addEventListener("scroll",debounce(()=>{
                let top = main.scrollTop;
                this.scrollTop = main.scrollTop
                let currentBox  = main.children[0].offsetHeight;
                if(Math.floor(top+h) >= currentBox){
                    this.scrollList()
                }
            },300))
        }
    }
   
}