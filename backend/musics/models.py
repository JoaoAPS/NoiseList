from django.db import models

class Music(models.Model):
	title = models.CharField(max_length=120)
	artist = models.CharField(max_length=120)
	
	def __str__(self):
		return self.title
	