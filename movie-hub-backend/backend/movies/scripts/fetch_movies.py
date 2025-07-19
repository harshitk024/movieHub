import requests
from movies.models import Movie,Genre
import datetime

API_KEY="7a33e1786754d93b478eacaa3c6435a3"

def fetch_and_store_movies():

    url = f"https://api.themoviedb.org/3/trending/movie/week?api_key={API_KEY}"
    response = requests.get(url)

    if(response.status_code == 200) : 

        data = response.json()

        for item in data["results"]:

            


            movie, created = Movie.objects.update_or_create(
                id=item['id'],
                defaults={
                    'adult': item.get('adult',False),
                    'backdrop_path': item.get('backdrop_path'),
                    'title': item.get('title', ''),
                    'overview': item.get('overview', ''),
                    'original_language': item.get('original_language'),
                    'poster_path': item.get('poster_path'),
                    'popularity': item.get('popularity', 0.0),
                    'release_date': item.get("release_date"),
                    'vote_average': item.get('vote_average', 0.0),
                    'vote_count': item.get('vote_count', 0),
                }

            )

            movie.genres.clear()
            genre_ids = item.get('genre_ids',[])

            for genre_id in genre_ids:

                try:

                    genre = Genre.objects.get(id=genre_id)
                    movie.genres.add(genre)

                except Genre.DoesNotExist:

                    pass


          

            



