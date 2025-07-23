import { useAuth } from "@/context/authContext"
import { useEffect, useState } from "react"
import { Movie } from "@/types/movie"
import MovieService from "@/services/movies"

export const useWatchList = () => {


    const {state} = useAuth()
    const [watchList,setWatchList] = useState<Array<Movie>>()
    const [isLoading,setIsLoading] = useState(true)



    useEffect(() => {

        const fetchMovies = async () => {
            
            const watchlist = JSON.parse(localStorage.getItem("watchlist"))
            const moviePromise = watchlist.map((movieId) => MovieService.getMovie(movieId))
            const movies = await Promise.all(moviePromise)
            console.log(movies)
            setWatchList(movies)
            setIsLoading(false)

        }

        fetchMovies()

    },[])

    return {

        watchList,
        isLoading
    }


}

