from django.urls import path
from .views import register,get_users,login_user

urlpatterns = [
    path("register/", register,name="register"),
    path("users-list/",get_users,name='users' ),
    path("login/",login_user,name="login")
]