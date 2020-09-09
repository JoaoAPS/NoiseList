from rest_framework import routers
from .views import StyleViewSet

router = routers.DefaultRouter()
router.register('styles', StyleViewSet)

urlpatterns = router.urls