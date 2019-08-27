import components from "@/components/index";
console.log(components)
function componentName(name){
    // console.log(name)
    return name.replace(/[A-Z]/g,(reg)=>{
        return "-"+reg.toLowerCase();
    })
}
export default {
    install(Vue){
       Object.keys(components).forEach(name=>{
           let content = componentName(name)
        //    console.log(components[name],"ddd")
           Vue.component(content,components[name])
       })
    }
}