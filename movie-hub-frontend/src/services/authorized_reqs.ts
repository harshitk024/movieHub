
import api from "./axiosInstance"


const toggleWatchlist = async (movieId:string) => {

    try {

        const result = await api.post("/action/", { movie_id: movieId, action: "watchlist" })
        const parsedWatchlist = JSON.parse(localStorage.getItem("watchlist"))

        if (result.data.watchlisted) {

            localStorage.setItem("watchlist", JSON.stringify(parsedWatchlist.concat(movieId)))

        } else {

            localStorage.setItem("watchlist", JSON.stringify(parsedWatchlist.filter(id => id !== movieId)))

        }

        console.log(result)
        return result.data

    } catch (error) {

        console.log(error)
    }

}

const toggleRating = async ({ movie_id, rating }) => {

    const parsedRatings = JSON.parse(localStorage.getItem("ratings"))

    try {

        const result = await api.post("/like/", { movie_id: movie_id, rating: Number(rating) })

        if (parsedRatings.some(item => item.tmdb_id === movie_id)) {

            const updatedRating = {
                tmdb_id: movie_id,
                rating: result.data.rating
            }

            const ratings = parsedRatings.filter((item) => item.tmdb_id !== movie_id).concat(updatedRating)
            localStorage.setItem("ratings", JSON.stringify(ratings))

        } else {

            localStorage.setItem("ratings", JSON.stringify(parsedRatings.concat({ tmdb_id: result.data.tmdb_id, rating: result.data.rating })))
            console.log(result.data.tmdb_id)

        }
        console.log(result)
    } catch (error) {
        console.log(error)
    }

}

const toggleFav = async (movieId) => {

    try {

        const result = await api.post("/action/", { movie_id: movieId, action: "fav" })
        const parsedFav = JSON.parse(localStorage.getItem("fav"))

        if (result.data.fav) {

            localStorage.setItem("fav", JSON.stringify(parsedFav.concat(movieId)))

        } else {

            localStorage.setItem("fav", JSON.stringify(parsedFav.filter(id => id !== movieId)))

        }

        console.log(result)
        return result.data

    } catch (error) {

        console.log(error)
    }

}

const getUserProfile = async () => {

    try {
        const result = await api.get("/user-profile/")
        localStorage.setItem("profile-summary", JSON.stringify(result.data.message))
        return result.data

    } catch (error) {

        console.log(error)

    }

}

export default { toggleWatchlist, toggleRating, toggleFav, getUserProfile }