import { useAuth } from "@/context/authContext"
import { useEffect, useState } from "react"
import AuthorizedServices from "@/services/authorized_reqs"



export const useUser = () => {

    // const [user,setUser] = useState<UserState>()

    const { state, dispatch } = useAuth()
    const [isUserLoading, setIsUserLoading] = useState(true)


    useEffect(() => {

        const addedUser = localStorage.getItem("user")

        if (addedUser) {
            const parsedUser = JSON.parse(addedUser)
            dispatch({ type: "LOGIN", payload: { ...parsedUser, isAuthenticated: true } })
        }
        setIsUserLoading(false)

    }, [])

    return {
        state,
        dispatch,
        isUserLoading
    }
}

