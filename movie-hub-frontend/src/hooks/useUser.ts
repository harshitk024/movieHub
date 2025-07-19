import { UserState } from "@/types/movie"
import { useEffect, useState } from "react"


export const useUser = () => {

    const [user,setUser] = useState<UserState>()
    const [isUserLoading,setIsUserLoading] = useState(true)


    useEffect(() => {

        const addedUser = localStorage.getItem("user")

        if(addedUser){

            const parsedUser = JSON.parse(addedUser)
            setUser(parsedUser)
        }
        setIsUserLoading(false)

    },[])

    return {
        user,
        setUser,
        isUserLoading
    }
}

