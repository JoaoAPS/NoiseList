from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('musics.urls')),
    path('api/', include('artists.urls')),
    path('api/', include('languages.urls')),
    path('api/', include('styles.urls')),
    path('api/', include('tags.urls')),
    path('api/', include('instruments.urls')),
    path('api/generate-token/', views.obtain_auth_token)
]