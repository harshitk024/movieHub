from django.db import models
from users.models import User
# Create your models here.


class Genre(models.Model):

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__ (self):
        return self.name



class Movie(models.Model):
    
    tmdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255, blank=True)


    def __str__(self):
        
        return self.title
    

class UserMovieAction(models.Model):

    ACTION_CHOICES = (
        ('like','Like'),
        ('watchlist',"Watchlist")
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie,on_delete=models.CASCADE)
    action = models.CharField(max_length=10,choices=ACTION_CHOICES)

    class Meta: 

        unique_together = ("user","movie","action")
