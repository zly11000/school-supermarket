import components from "@/components/index";
function componentName(name){
    return name.replace(/[A-Z]/g,(reg)=>{
        return "_"+reg.toLowerCase();
    })
}
export default {
    install(Vue){
       Object.keys(components).forEach(name=>{
           Vue.component(componentName(name),components[name])
       })
    }
}