import { useAuth } from "@/context/authContext"
import { UserState } from "@/types/movie"
import { parse } from "path"
// import { parse } from "path"
import { useEffect, useState } from "react"


export const useUser = () => {

    // const [user,setUser] = useState<UserState>()

    const { state, dispatch } = useAuth()
    const [isUserLoading, setIsUserLoading] = useState(true)


    useEffect(() => {

        const addedUser = localStorage.getItem("user")

        if (addedUser) {
            const parsedUser = JSON.parse(addedUser)
            dispatch({type: "LOGIN", payload: {...parsedUser, isAuthenticated: true}})
        }
        setIsUserLoading(false)

    }, [])

    return {
        state,
        dispatch,
        isUserLoading
    }
}

