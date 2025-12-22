"""
User authentication views
"""
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer, UserSerializer

User = get_user_model()

class UserRegistrationView(generics.CreateAPIView):
    """
    API endpoint for user registration
    POST /api/auth/register/
    
    Request Body:
    {
        "username": "johndoe",
        "email": "john@example.com",
        "password": "SecurePass123",
        "password2": "SecurePass123",
        "role": "customer",
        "phone": "+1234567890",
        "address": "123 Main St"
    }
    
    Response:
    {
        "user": {
            "id": 1,
            "username": "johndoe",
            "email": "john@example.com",
            "role": "customer"
        },
        "tokens": {
            "access": "eyJ0eXAiOiJKV1QiLCJh...",
            "refresh": "eyJ0eXAiOiJKV1QiLCJh..."
        }
    }
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)

class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    API endpoint to get/update user profile
    GET /api/auth/profile/
    PUT /api/auth/profile/
    """
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user