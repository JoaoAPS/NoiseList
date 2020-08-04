from django.db import models
from artists.models import Artist
from instruments.models import Instrument
from tags.models import Tag
from languages.models import Language

class Music(models.Model):
	title = models.CharField(max_length=120)
	artist = models.ForeignKey(Artist, related_name="musics", on_delete=models.CASCADE)
	instruments = models.ManyToManyField(Instrument, related_name="musics", blank=True)
	language = models.ForeignKey(Language, related_name="musics", null=True, blank=True, on_delete=models.SET_NULL)
	tags = models.ManyToManyField(Tag, related_name="musics", blank=True)
	
	def __str__(self):
		return self.title
	
	def getArtistName(self):
		return self.artist.name
	