from django.db import models
from artists.models import Artist
from instruments.models import Instrument
from tags.models import Tag
from languages.models import Language
from styles.models import Style

class Music(models.Model):
	title = models.CharField(max_length=120)
	artist = models.ForeignKey(Artist, related_name="musics", on_delete=models.CASCADE)
	language = models.ForeignKey(Language, related_name="musics", null=True, blank=True, on_delete=models.SET_NULL)
	style = models.ForeignKey(Style, related_name="musics", null=True, blank=True, on_delete=models.SET_NULL)
	tags = models.ManyToManyField(Tag, related_name="musics", blank=True)
	instruments = models.ManyToManyField(Instrument, related_name="musics", blank=True)
	
	def __str__(self):
		return self.title
	
	def getArtistName(self):
		return self.artist.name
	