
import api from "./axiosInstance"


const toggleWatchlist = async (movieId) => {

    try {

        const result = await api.post("/watchlist/", { movie_id: movieId })
        const parsedWatchlist = JSON.parse(localStorage.getItem("watchlist"))

        if (result.data.watchlisted) {

            localStorage.setItem("watchlist", JSON.stringify(parsedWatchlist.concat(movieId)))

        } else {
          
            localStorage.setItem("watchlist",JSON.stringify(parsedWatchlist.filter(id => id !== movieId)))

        }

        console.log(result)
        return result.data

    } catch (error) {

        console.log(error)
    }

}

export default { toggleWatchlist }