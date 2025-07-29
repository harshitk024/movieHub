from django.urls import path
from .views import register,get_users,login_user,movie_action,like_movie,generate_user_profile

urlpatterns = [
    path("register/", register,name="register"),
    path("users-list/",get_users,name='users' ),
    path("login/",login_user,name="login"),
    path("action/",movie_action,name="action"),
    path("like/",like_movie,name="like"),
    path("user-profile/",generate_user_profile,name="user-profile")
]