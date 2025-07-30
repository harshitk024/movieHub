import axios from "axios"
const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/user`


const create_user = async (user: { name: string, username: string, email: string, password: string }) => {


    try {

        const result = await axios.post(`${baseUrl}/register/`, user)
        const { data } = await result
        console.log(data)
        localStorage.setItem("user", JSON.stringify(data))
        return data

    } catch (error) {

        console.log(error)
    }


}

const login_user = async (user: { username: string, password: string }) => {

    try{

    const result = await axios.post(`${baseUrl}/login/`, user)
    const { data } = await result

    console.log(data)
    localStorage.setItem("user", JSON.stringify(data))
    localStorage.setItem("watchlist",JSON.stringify(data.user.watchlist))
    localStorage.setItem("ratings", JSON.stringify(data.user.ratings))
    localStorage.setItem("fav",JSON.stringify(data.user.fav))
    console.log(result)

    return data

    } catch (error) {

        console.log(error)
    }
}


export default { create_user, login_user }