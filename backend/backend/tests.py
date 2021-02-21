from django.test import Client, TestCase
from django.conf import settings
from django.urls import reverse


class TestCoreViews(TestCase):
    """Test the views of the base app"""

    def setUp(self):
        self.check_password_url = reverse('check_password')
        self.check_token_url = reverse('check_token')
        self.client = Client()

    def test_check_password_view_correct_password(self):
        """Test check_password returns correct=1 for a correct password"""
        res = self.client.post(
            self.check_password_url, {'password': settings.SITE_PASSWORD}
        )
        self.assertEquals(res.status_code, 200)
        self.assertEquals(res.content, bytes(
            '{"correct":1,"token":"' + settings.SITE_TOKEN + '"}', 'utf-8'
        ))

    def test_check_password_view_wrong_password(self):
        """Test check_password returns correct=0 for a wrong password"""
        res = self.client.post(
            self.check_password_url, {'password': 'not the site password'}
        )
        self.assertEquals(res.status_code, 200)
        self.assertEquals(res.content, b'{"correct":0}')

    def test_check_token_view_correct_token(self):
        """Test check_token returns correct=1 for a correct token"""
        res = self.client.post(
            self.check_token_url, {'token': settings.SITE_TOKEN}
        )
        self.assertEquals(res.status_code, 200)
        self.assertEquals(res.content, b'{"correct":1}')

    def test_check_token_view_wrong_token(self):
        """Test check_token returns correct=0 for a wrong token"""
        res = self.client.post(
            self.check_token_url, {'token': 'not the site token'}
        )
        self.assertEquals(res.status_code, 200)
        self.assertEquals(res.content, b'{"correct":0}')
