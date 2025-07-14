import { Movie } from "@/types/movie"
import { useEffect, useState } from "react"
import MovieService from "@/services/movies"


export const useMovie = (id: string) => {


    const [movie,setMovie] = useState<Movie>()
    const [loading,setLoading] = useState(true)



    useEffect(() => {


        const getMovie = async () => {

            const result = await MovieService.getMovie(id)
            setMovie(result)
            setLoading(false)
        }

        getMovie()
    },[])


    return {
        movie,
        loading
    }
}

