from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('musics.urls')),
    path('api/', include('instruments.urls')),
    path('api/', include('languages.urls')),
    path('api/', include('tags.urls')),
]
