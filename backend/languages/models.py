from django.db import models

class Language(models.Model):
    name = models.CharField(max_length=50)
    imageFileName = models.CharField(max_length=50, null=True, blank=True)
    
    def __str__(self):
        return self.name
