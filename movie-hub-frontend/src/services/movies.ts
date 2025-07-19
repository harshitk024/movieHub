import axios from "axios"
import { Genre, Movie } from "@/types/movie"

const baseUrl = "https://api.themoviedb.org"
const key: string = import.meta.env.VITE_TMDB_API_KEY

interface MoviesResponseInterface {
    page: number,
    results: Array<Movie>
}



interface GenreResponseInterface {

    genres: Genre[]
}

const getMovies = async () => {


    try {

        const result = await axios.get<MoviesResponseInterface>(`${baseUrl}/3/trending/movie/week?api_key=${key}`)
        const { results } = await result.data
        return results

    } catch (error) {

        console.log(error)
    }

}

const getGenres = async () => {

    const result = await axios.get<GenreResponseInterface>(`${baseUrl}/3/genre/movie/list?api_key=${key}`)
    const { genres } = await result.data

    return genres
}

const searchMovies = async (movie: string) => {

    try {

        const result = await axios.get<MoviesResponseInterface>(`${baseUrl}/3/search/movie?api_key=${key}&query=${movie}`)
        const { results } = await result.data
        return results

    } catch (error) {
        console.log(error)
    }


}

const getMovie = async (id: string) => {

    const result = await axios.get<Movie>(`${baseUrl}/3/movie/${id}?api_key=${key}`)
    return result.data

}

export default { getMovies, getGenres, searchMovies, getMovie }