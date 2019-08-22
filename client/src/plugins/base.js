import components from "@/components/index";
function componentName(name){
    return name.replace(/[A-Z]/g,(reg)=>{
        return "-"+reg.toLowerCase();
    })
}
export default {
    install(Vue){
       Object.keys(components).forEach(name=>{
           Vue.component(componentName(name),components[name])
       })
    }
}