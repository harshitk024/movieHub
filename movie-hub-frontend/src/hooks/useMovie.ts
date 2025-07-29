import { Movie } from "@/types/movie"
import { useEffect, useState } from "react"
import MovieService from "@/services/movies"


export const useMovie = (id: string) => {


    const [movie, setMovie] = useState<Movie>()
    const [loading, setLoading] = useState(true)
    const [currRating, setCurrRating] = useState(null)
    const ratings = JSON.parse(localStorage.getItem("ratings"));
    const [action, setAction] = useState({
       watchlist: JSON.parse(localStorage.getItem("watchlist")),
       fav: JSON.parse(localStorage.getItem("fav"))
});
  

    const [actionDone,setActionDone] = useState({
        watchlisted: false,
        fav: false
    })
    





    useEffect(() => {


        const getMovie = async () => {

            const result = await MovieService.getMovie(id)
            setMovie(result)
            setLoading(false)
        }

        getMovie()
    }, [])


    useEffect(() => {


        if (!loading) {

            const rating = ratings.some((item) => item.tmdb_id === movie.id)
                ? ratings.find((item) => item.tmdb_id === movie.id).rating
                : null

            setCurrRating(rating)
            console.log(rating)

        }


    }, [loading])


    return {
        movie,
        loading,
        currRating,
        setCurrRating,
        action,
        setAction,
        actionDone,
        setActionDone
    
    }
}

