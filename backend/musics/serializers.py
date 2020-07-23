from rest_framework import serializers
from .models import Music

class MusicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Music
        fields = [
        	'id',
        	'title',
        	'artist',
        ]