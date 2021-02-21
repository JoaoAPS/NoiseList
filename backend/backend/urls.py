from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('musics.urls')),
    path('api/', include('artists.urls')),
    path('api/', include('languages.urls')),
    path('api/', include('styles.urls')),
    path('api/', include('tags.urls')),
    path('api/', include('instruments.urls')),
    path(
        'api/check_password', views.check_password_view, name='check_password'
    ),
    path('api/check_token', views.check_token_view, name='check_token'),
]
