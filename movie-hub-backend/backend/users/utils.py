from movies.models import UserMovieRating,UserMovieAction
import requests

API_KEY="7a33e1786754d93b478eacaa3c6435a3"
BASE_URL = 'https://api.themoviedb.org/3/movie/'

def getUserRatedAndFavMovies(userId):

    ratedMovies = UserMovieRating.objects.filter(user_id = userId)
    favMovies = UserMovieAction.objects.filter(user_id =userId,action="fav")

    resultFavMovies= []
    resultRatedMovies = []

    for movie in ratedMovies:

        url = f"{BASE_URL}{movie.movie.tmdb_id}"

        params = {
            'api_key': API_KEY
        }

        response = requests.get(url,params=params)

        if(response.status_code == 200):
            data = response.json()
            title =  data.get('title')
            rating = movie.ratings

            resultRatedMovies.append({"title": title, "rating": rating})
        else:

            print(f"Failed to fetch movie ID {movie.movie_id}: status code {response.status_code}")

    for movie in favMovies:

        url = f"{BASE_URL}{movie.movie.tmdb_id}"

        params = {
            'api_key': API_KEY
        }

        response = requests.get(url,params=params)

        if(response.status_code == 200):
            data = response.json()
            title =  data.get('title')
            resultFavMovies.append(title)
        else:

            print(f"Failed to fetch movie ID {movie.movie_id}: status code {response.status_code}")


    return resultRatedMovies,resultFavMovies






