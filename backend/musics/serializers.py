from rest_framework import serializers
from .models import Music
from languages.models import Language
from tags.models import Tag
from instruments.models import Instrument

class MusicSerializer(serializers.ModelSerializer):
    language = serializers.PrimaryKeyRelatedField(queryset=Language.objects.all())
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
    instruments = serializers.PrimaryKeyRelatedField(many=True, queryset=Instrument.objects.all())
    
    class Meta:
        model = Music
        fields = '__all__'
        depth = 1
