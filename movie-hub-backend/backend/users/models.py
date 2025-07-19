from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.


class User(AbstractUser):

    email = models.EmailField(unique=True)
    watchlist = models.ManyToManyField('movies.movie',blank=True,related_name='watchlisted_by')    
    liked_movies = models.ManyToManyField('movies.movie',blank=True,related_name='liked_by')

    def __str__(self):

        return self.username

