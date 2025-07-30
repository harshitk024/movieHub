import axios from "axios"
import { Genre, Movie } from "@/types/movie"

const baseLocalUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/movies`


const getMovies = async ():Promise<Movie[]> => {

     
    try {

        const result = await axios.get<Movie[]>(`${baseLocalUrl}/`)
        return result.data

    } catch (error) {

        console.log(error)
    }

}

const getGenres = async () => {
    
    console.log("Getting genres")
    const result = await axios.get<Genre[]>(`${baseLocalUrl}/genres/`)
    console.log(result)
    return result.data
}

const searchMovies = async (movie: string): Promise<Movie[]> => {

    try {

        const result = await axios.get<Movie[]>(`${baseLocalUrl}/search-movies/?query=${movie}`)
        return result.data

    } catch (error) {
        console.log(error)
    }


}

const getMovie = async (id: string) => {

    const result = await axios.get<Movie>(`${baseLocalUrl}/movie/?query=${id}`)
    return result.data

}



export default { getMovies, searchMovies, getMovie,getGenres }