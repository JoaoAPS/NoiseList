from rest_framework import serializers
from .models import Music
from artists.models import Artist
from languages.models import Language
from styles.models import Style
from tags.models import Tag
from instruments.models import Instrument

class MusicSerializer(serializers.ModelSerializer):
    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())
    artist_name = serializers.CharField(source='getArtistName', max_length=120, read_only=True)
    language = serializers.PrimaryKeyRelatedField(queryset=Language.objects.all())
    style = serializers.PrimaryKeyRelatedField(queryset=Style.objects.all())
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
    instruments = serializers.PrimaryKeyRelatedField(many=True, queryset=Instrument.objects.all())
    
    class Meta:
        model = Music
        fields = '__all__'
        depth = 1
