import { useEffect, useState } from "react"
import { Movie } from "@/types/movie"
import MovieService from "@/services/movies"

export const useRatings = () => {


    const [ratings, setRatings] = useState<Array<Movie>>()
    const [isRatingsLoading, setIsRatingsLoading] = useState(true)



    useEffect(() => {

        const fetchRatedMoviesList = async () => {

            const ratings = JSON.parse(localStorage.getItem("ratings"))
            console.log(ratings)
            const moviePromise = ratings.map((rating) => MovieService.getMovie(rating.tmdb_id))
            const movies = await Promise.all(moviePromise)

            const updatedMovies = movies.map((movie) => {
               const ratedMovie =  ratings.find(rating => rating.tmdb_id === movie.id)
               return {...movie,user_rating: ratedMovie.rating}
            })
            console.log(updatedMovies)
            setRatings(updatedMovies)
            setIsRatingsLoading(false)

        }


        fetchRatedMoviesList()

    }, [])

    return {

        ratings,
        isRatingsLoading,
    }


}

