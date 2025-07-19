from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import get_movies,search_movies


urlpatterns = [
    path("movies/",get_movies),
    path("movies/search-movies/",search_movies)
]