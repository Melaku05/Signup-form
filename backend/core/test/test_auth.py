import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from unittest import mock

User = get_user_model()


@pytest.mark.django_db
def test_user_singup(api_client, user_data):
    register_url = "/auth/users/"
    with mock.patch("djoser.email.ActivationEmail.send") as mock_send:
        response = api_client.post(register_url, user_data)
        assert response.status_code == 201
        mock_send.assert_called_once()


@pytest.mark.django_db
def test_jwt_create_behavior(api_client, user_data):

    User.objects.create_user(**user_data)
    login_url = reverse("jwt-create")

    response = api_client.post(login_url, user_data, format="json")

    assert response.status_code == status.HTTP_200_OK

    assert "access" in response.data
    assert "refresh" in response.data
