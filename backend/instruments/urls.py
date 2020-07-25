from rest_framework import routers
from .views import InstrumentViewSet

router = routers.DefaultRouter()
router.register('instruments', InstrumentViewSet)

urlpatterns = router.urls