from django.db import models
from languages.models import Language

class Artist(models.Model):
    name = models.CharField(max_length=120)
    defaultLanguage = models.ForeignKey(Language, null=True, on_delete=models.SET_NULL)
    
    def __str__(self):
        return self.name
