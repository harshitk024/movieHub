from django.db import models

# Create your models here.


class Genre(models.Model):

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__ (self):
        return self.name



class Movie(models.Model):
    
    adult = models.BooleanField()
    backdrop_path = models.CharField(max_length=500, blank=True, null=True)
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=255)
    overview = models.TextField(blank=True, null=True)
    original_language = models.CharField(max_length=20)
    poster_path = models.CharField(max_length=500, blank=True, null=True)
    genres = models.ManyToManyField('movies.Genre')
    popularity = models.FloatField()
    release_date = models.DateField(blank=True, null=True)
    vote_average = models.FloatField()
    vote_count = models.IntegerField()


    def __str__(self):
        
        return self.title
    
    def poster_url(self):

        return f"https://image.tmdb.org/t/p/w500/{self.poster_path}" if self.poster_path else ""
