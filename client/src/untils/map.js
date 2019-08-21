// let map = new AMap.Map();
export const plugins = (names,options)=>{
    // console.log(names,options)
    return new Promise((resolve,reject)=>{
        AMap.plugin(names,()=>{
            const late = new AMap[names.split(".")[1]]({
                ...options
            })
            resolve(late)
        })
    })
}