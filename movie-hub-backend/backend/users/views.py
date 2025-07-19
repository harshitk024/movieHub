from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model,authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer

# Create your views here.

User = get_user_model()

@api_view(['GET'])

def get_users(request):

    users = User.objects.all()

    serializer = UserSerializer(users,many=True)

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

   
    return Response({
        'user': {
            'username': user.username,
            'email': user.email
        },
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    }, status=status.HTTP_200_OK)



