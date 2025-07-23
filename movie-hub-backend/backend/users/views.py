from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model,authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from movies.models import Movie,UserMovieAction
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.

User = get_user_model()

@api_view(['GET'])

def get_users(request):

    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    print(users)

    return Response(serializer.data)



    
@api_view(['POST'])

def register(request):

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password: 
        return Response({'error': 'All fields are required'},status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'},status=status.HTTP_400_BAD_REQUEST)
    

    user = User.objects.create_user(username=username,email=email,password=password)
    refresh = RefreshToken.for_user(user)

    return Response({
        'user': {
            'username': user.username,
            'email': user.email
        },
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])

def login_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if not username and not password:

        return Response({"error": "username or password is undefined"},status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username,password=password)

    if not user:

        return Response({"error": "Invalid username or password"},status=status.HTTP_400_BAD_REQUEST)
    
    refresh = RefreshToken.for_user(user)

    watchlist = UserMovieAction.objects.filter(user = user,action="watchlist")
    liked = UserMovieAction.objects.filter(user = user,action="liked")

   
    return Response({
        'user': {
            'username': user.username,
            'email': user.email,
            'watchlist': [action.movie.tmdb_id for action in watchlist],
            'liked': [action.movie.tmdb_id for action in liked]
        },
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    }, status=status.HTTP_200_OK)


# protected views 

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def watchlist_movie(request):

    user = request.user
    movie_id = request.data.get('movie_id')

    if not movie_id:
        return Response({"error": "movieId is not provided"},status=status.HTTP_400_BAD_REQUEST)
    
    movie,created = Movie.objects.get_or_create(tmdb_id=movie_id)
    
    try :
        action = UserMovieAction.objects.get(user=user,movie=movie,action="watchlist")
    except ObjectDoesNotExist: 
        action = None


    if action:

        action.delete()
        return Response({

            "message": "movie_unwatchlisted",
            "id": movie.tmdb_id,
            "watchlisted": False

        },status=status.HTTP_200_OK)
    
    UserMovieAction.objects.create(user=user,movie=movie,action="watchlist")


    return Response({
        "message": "movie_watchlisted",
        "id": movie.tmdb_id,
        "watchlisted": True
    },status=status.HTTP_200_OK)










