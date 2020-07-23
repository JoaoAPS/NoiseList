from rest_framework import routers
from musics import views

router = routers.DefaultRouter()
router.register('musics', views.MusicViewSet)

urlpatterns = router.urls