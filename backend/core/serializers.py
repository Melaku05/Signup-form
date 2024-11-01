from djoser.serializers import UserCreateSerializer, UserSerializer
from .models import CustomUser


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ("id", "email", "username", "first_name", "last_name", "password")


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = ("id", "email", "username", "first_name", "last_name")

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.is_active = False
        user.save()
        return user
