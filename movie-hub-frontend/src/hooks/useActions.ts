import { useEffect, useState } from "react"
import { Movie } from "@/types/movie"
import MovieService from "@/services/movies"

export const useActions = () => {


    const [watchList, setWatchList] = useState<Array<Movie>>()
    const [isWatchListLoading, setIsWatchListLoading] = useState(true)

    const [fav,setFav] = useState<Array<Movie>>()
    const [isFavLoading,setIsFavLoading] = useState(true)




    useEffect(() => {

        const fetchWatchlistedMovies = async () => {

            const watchlist = JSON.parse(localStorage.getItem("watchlist"))
            const moviePromise = watchlist.map((movieId) => MovieService.getMovie(movieId))
            const movies = await Promise.all(moviePromise)
            console.log(movies)
            setWatchList(movies)
            setIsWatchListLoading(false)

        }

        const fetchFavMovies = async () => {

            const fav = JSON.parse(localStorage.getItem("fav"))
            const favMoviePromise = fav.map((movieId) => MovieService.getMovie(movieId))
            const movies = await Promise.all(favMoviePromise)
            console.log(movies)
            setFav(movies)
            setIsFavLoading(false)
        }

        fetchWatchlistedMovies()
        fetchFavMovies()

    }, [])

    return {

        watchList,
        isWatchListLoading,
        fav,
        isFavLoading
    }


}

