from django.core.management.base import BaseCommand
from movies.scripts.fetch_genres import fetch_and_store_genres
from movies.scripts.fetch_movies import fetch_and_store_movies

class Command(BaseCommand):

    help = 'Fetches genres & movies from TMDB and store in DB'

    def handle(self,*args,**kwargs):

        fetch_and_store_genres()
        self.stdout.write(self.style.SUCCESS("Genres fetched succesfully"))
        fetch_and_store_movies()
        self.stdout.write(self.style.SUCCESS("Movies fetched successfully"))