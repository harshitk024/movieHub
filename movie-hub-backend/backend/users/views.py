from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model,authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from movies.models import Movie,UserMovieAction,UserMovieRating
from users.utils import getUserRatedAndFavMovies
from django.core.exceptions import ObjectDoesNotExist
import requests
import environ

env = environ.Env()
environ.Env.read_env(env_file="../backend/.env")
OPEN_ROUTER_API_KEY = env('OPENROUTER_API_KEY')
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
            'email': user.email,
            'watchlist': [],
            'fav': [],
            'ratings': []
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
    fav = UserMovieAction.objects.filter(user = user,action="fav")
    rating = UserMovieRating.objects.filter(user=user)


   
    return Response({
        'user': {
            'username': user.username,
            'email': user.email,
            'watchlist': [action.movie.tmdb_id for action in watchlist],
            'fav': [action.movie.tmdb_id for action in fav],
            "ratings": [{"tmdb_id": action.movie.tmdb_id,"rating": action.ratings} for action in rating]
        },
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    }, status=status.HTTP_200_OK)


# protected views 

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def movie_action(request):

    user = request.user
    movie_id = request.data.get('movie_id')
    action = request.data.get('action')

    if not movie_id or not action:
        return Response({"error": "movieId or action is not provided"},status=status.HTTP_400_BAD_REQUEST)
    
    movie,created = Movie.objects.get_or_create(tmdb_id=movie_id)
    
    try :
        actionObject = UserMovieAction.objects.get(user=user,movie=movie,action=action)
    except ObjectDoesNotExist: 
        actionObject = None


    if actionObject:

        actionObject.delete()

        if action == "fav":

            return Response({
                "message": "movie_unfav",
                "id": movie.tmdb_id,
                "fav": False,
            },status=status.HTTP_200_OK)


        return Response({

            "message": "movie_unwatchlisted",
            "id": movie.tmdb_id,
            "watchlisted": False

        },status=status.HTTP_200_OK)
    

    UserMovieAction.objects.create(user=user,movie=movie,action=action)


    if action == "fav":

        return Response({
            "message": "movie_fav",
            "id": movie.tmdb_id,
            "fav": True
        },status=status.HTTP_200_OK)



    return Response({
        "message": "movie_watchlisted",
        "id": movie.tmdb_id,
        "watchlisted": True
    },status=status.HTTP_200_OK)





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_movie(request):

    user = request.user
    movie_id = request.data.get('movie_id')
    rating = request.data.get('rating')

    print(movie_id,rating)

    if not movie_id or not rating:

        return Response({"error": "movie_id or rating is not provided"},status=status.HTTP_400_BAD_REQUEST)
    

    try:
        rating =float(rating)

        if not (0 <= rating <=5):

            return Response({
                "error": "rating must be between 0 and 5"
            },status=status.HTTP_400_BAD_REQUEST)
        
    except ValueError:

        return Response({
            "error": "rating must be a number",
        },status=status.HTTP_400_BAD_REQUEST)
    
    movie,movie_created = Movie.objects.get_or_create(tmdb_id = movie_id)

    action,action_created =  UserMovieRating.objects.update_or_create(user=user,movie=movie,defaults={'ratings': rating})

    return Response({"message": "rated succesfully","created": action_created, "rating": rating,"tmdb_id": movie.tmdb_id},status=status.HTTP_200_OK)





@api_view(["GET"])
@permission_classes([IsAuthenticated])
def generate_user_profile(request):

    user = request.user
    ratedMovies,favMovies = getUserRatedAndFavMovies(user.id)

    ratings_str = "\n".join([f"{movie}: {rating}/5" for movie, rating in ratedMovies])

    prompt = f"""
    Generate a short, fun, and friendly personality summary based on this user's preferences. 
    Keep it under 6 sentences and use a conversational tone with some emojis. Focus on personality insights and avoid repeating titles too much.
    Include:
    - What kind of person they might be (personality traits)
    - Their taste in movies (genres, themes, etc.)
    - Any fun guesses about what they might do on weekends or how they'd act in a movie-themed game night
    - Keep it lighthearted, relatable, and insightful.

    The user has the following favorite movies: {', '.join(favMovies)}.

    They have rated movies as follows:
    {ratings_str}
    """

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPEN_ROUTER_API_KEY}",
        "Content-Type": "application/json",
    }
    json_data = {
        "model": "meta-llama/llama-3-8b-instruct",
        "messages": [{"role": "user", "content": prompt}],
    }

    try:
        response = requests.post(url, headers=headers, json=json_data)
        response.raise_for_status()  
    except requests.exceptions.HTTPError as e:
        return Response(
            {"error": f"OpenRouter API error: {response.text}"},
            status=response.status_code,
        )
    except Exception as e:
        return Response(
            {"error": f"Unexpected error: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    data = response.json()
    return Response({"message": data["choices"][0]["message"]["content"]}, status=status.HTTP_200_OK)










