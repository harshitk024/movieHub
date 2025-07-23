
import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/user/"
})


api.interceptors.request.use(
    (config) => {

        const token = JSON.parse(localStorage.getItem("user")).access

        

        if(token){
            config.headers["Authorization"] = `Bearer ${token}`
            console.log("Authorization request sent")
        }



        return config

    },
    (error) => Promise.reject(error)
)


let isRefreshing = false;
let failedQueue = []


const processQueue = (error,token = null) => {

    failedQueue.forEach((prom) => {
        if(error){
            prom.reject(error)
        } else {
            prom.resolve(error)
        }
    })

}


api.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config


        if(error.response?.status === 401 && !originalRequest._retry){

            if(isRefreshing){

                return new Promise((resolve,reject) => {
                    failedQueue.push({resolve,reject})
                })
                .then((token) => {
                    originalRequest.headers["Authorization"] = 'Bearer ' + token;
                    return api(originalRequest)
                })
                .catch((err) => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true


            const refreshToken = JSON.parse(localStorage.getItem("user")).refresh

            try{
                const response = await axios.post('http://localhost:8000/api/token/refresh/', {refresh: refreshToken})
                console.log("new access token request sent")

                const newAccessToken = response.data.access

                const user = JSON.parse(localStorage.getItem("user"))
                localStorage.setItem("user",JSON.stringify({...user,access: newAccessToken}))

                api.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken
                processQueue(null,newAccessToken)

                return api(originalRequest)

            } catch (error){

                processQueue(error,null)
                window.alert("Login session expired, Please Log-in again!!!")
                localStorage.removeItem("user")
                localStorage.clear()
                window.location.href = "/login"

                return Promise.reject(error)
                
            } finally {
                isRefreshing = false;
            }


        }

        return Promise.reject(error)

    }
)

export default api;