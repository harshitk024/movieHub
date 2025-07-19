import requests
from movies.models import Genre
import os

key = "7a33e1786754d93b478eacaa3c6435a3"


def fetch_and_store_genres():

    url= f"https://api.themoviedb.org/3/genre/movie/list?api_key={key}&language=en-US"
    response = requests.get(url)

    if(response.status_code == 200):

        data = response.json()

        for genre in data["genres"]:

            Genre.objects.update_or_create(
                id=genre["id"],
                defaults={
                    "name": genre["name"]
                }
            )
        print("Genres fetched and stored")
    else: 

        print("Failed to fetch genre",response.status_code)

    










    