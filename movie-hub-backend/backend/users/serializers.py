from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.models import UserMovieAction
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    watchlist = serializers.SerializerMethodField()

    class Meta: 
        model = User
        fields = ['username','id','watchlist']

    def get_watchlist(self,user):

        watchlist_actions = UserMovieAction.objects.filter(user=user,action="watchlist")
        return [action.movie.tmdb_id for action in watchlist_actions]
