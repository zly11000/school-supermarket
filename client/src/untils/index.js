import axios from 'axios'
const httpAxios = axios.create({
    timeout: 2000
})

httpAxios.interceptors.request.use((config) => {
    return {
        ...config,
        headers:{
            authorization:window.localStorage.getItem("token") ? JSON.parse(window.localStorage.getItem("token")).token : ''
        }
    }
}, (error) => {
    return Promise.reject(error);
})
httpAxios.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    alert(error.response.data.msg)
    return error.response.data
})

export default httpAxios;