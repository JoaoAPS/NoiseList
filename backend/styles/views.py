from rest_framework import viewsets
from .serializers import StyleSerializer
from .models import Style

class StyleViewSet(viewsets.ModelViewSet):
    queryset = Style.objects.all()
    serializer_class = StyleSerializer