from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import get_trending_movies,search_movies,get_genres,get_movie_by_id


urlpatterns = [
    path("movies/",get_trending_movies,name="trending-movies"),
    path("movies/search-movies/",search_movies,name="search-movies"),
    path("movies/genres/",get_genres,name="genres"),
    path("movies/movie/",get_movie_by_id,name="movie")
]