from rest_framework import serializers
from .models import Music
from languages.models import Language

class MusicSerializer(serializers.ModelSerializer):
    language = serializers.PrimaryKeyRelatedField(queryset=Language.objects.all())
    
    class Meta:
        model = Music
        fields = '__all__'
        depth = 1
