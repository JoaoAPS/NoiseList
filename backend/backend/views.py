from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['POST'])
def check_password_view(request):
    password = request.data.get('password')

    if password is None or password != settings.SITE_PASSWORD:
        return Response({'correct': 0})
    return Response({'correct': 1, 'token': settings.SITE_TOKEN})


@api_view(['POST'])
def check_token_view(request):
    token = request.data.get('token')

    if token is None or token != settings.SITE_TOKEN:
        return Response({'correct': 0})
    return Response({'correct': 1})
