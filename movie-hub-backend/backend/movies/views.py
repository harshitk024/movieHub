from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Movie,Genre
from .serializers import MovieSerializer
import requests

API_KEY="7a33e1786754d93b478eacaa3c6435a3"

@api_view(['GET'])
def get_movies(request):

    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def search_movies(request):

    query = request.GET.get("query", "")

    if not query :

        return Response({"error": "Query parameter is required"},status=status.HTTP_400_BAD_REQUEST)
    
    tmdb_url = f"https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={query}"

    response = requests.get(tmdb_url)

    if response.status_code != 200:
        return Response({"error": "TMDB request failed"},status=status.HTTP_502_BAD_GATEWAY)
    
    data = response.json().get('results',[])


    genre_map = {}

    genres = Genre.objects.all()

    for g in genres:

        genre_map[g.id] = g.name

    formatted_results = []

    for movie in data:

        formatted_results.append({
            'id': movie['id'],
            'adult': movie.get('adult',False),
            'backdrop_path': movie.get('backdrop_path'),
            'title': movie.get('title', ''),
            'overview': movie.get('overview', ''),
            'original_language': movie.get('original_language'),
            'poster_path': movie.get('poster_path'),
            'genres': [{'id': g_id, 'name': genre_map.get(g_id, '')} for g_id in movie.get('genre_ids',[])],
            'popularity': movie.get('popularity', 0.0),
            'release_date': movie.get("release_date"),
            'vote_average': movie.get('vote_average', 0.0),
            'vote_count': movie.get('vote_count', 0),
        })
    
    return Response(formatted_results)

