from rest_framework import serializers
from .models import Artist
from languages.models import Language

class ArtistSerializer(serializers.ModelSerializer):
    defaultLanguage = serializers.PrimaryKeyRelatedField(queryset=Language.objects.all())
    
    class Meta:
        model = Artist
        fields = '__all__'