from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Movie,Genre
from .serializers import MovieSerializer
import requests
import environ


env = environ.Env()
environ.Env.read_env(env_file="../backend/.env")
API_KEY = env('TMDB_API_KEY')
BASE_URL= "https://api.themoviedb.org"
@api_view(['GET'])
def get_trending_movies(request):

    query = request.GET.get("query","")

    if not query :
        query = "week"

    tmdb_url = f"{BASE_URL}/3/trending/movie/{query}?api_key={API_KEY}"

    response = requests.get(tmdb_url)

    if response.status_code != 200:
        return Response({"error": response},status=status.HTTP_502_BAD_GATEWAY)
    
    data = response.json().get('results',[])

    return Response(data,status=status.HTTP_200_OK)




@api_view(['GET'])
def search_movies(request):

    query = request.GET.get("query", "")

    if not query :

        return Response({"error": "Query parameter is required"},status=status.HTTP_400_BAD_REQUEST)
    
    tmdb_url = f"{BASE_URL}/3/search/movie?api_key={API_KEY}&query={query}"

    response = requests.get(tmdb_url)

    if response.status_code != 200:
        return Response({"error": "TMDB request failed"},status=status.HTTP_502_BAD_GATEWAY)
    
    data = response.json().get('results',[])


    return Response([movie for movie in data if movie["popularity"] > 1 and movie['vote_count'] > 1],status=status.HTTP_200_OK)


    

@api_view(["GET"])
def get_genres(request):

    tmdb_url = f"https://api.themoviedb.org/3/genre/movie/list?api_key={API_KEY}"

    response = requests.get(tmdb_url)

    if response.status_code != 200:
        return Response({"error": "TMDB request failed"},status=response.status_code)
    
    data = response.json().get("genres",[])

    return Response(data,status=status.HTTP_200_OK)



@api_view(["GET"])
def get_movie_by_id(request):


    id = request.GET.get("query")

    tmdb_url = f"{BASE_URL}/3/movie/{id}?api_key={API_KEY}"

    response = requests.get(tmdb_url)

    if response.status_code != 200:
        return Response({"error": "TMDB request failed"},status=response.status_code)
    
    data = response.json()

    return Response(data,status=status.HTTP_200_OK)


    

    






