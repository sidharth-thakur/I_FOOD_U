from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Food
from .serializers import FoodSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def food_list(request):
    foods = Food.objects.all()
    serializer = FoodSerializer(
        foods,
        many=True,
        context={'request': request}  # 🔥 THIS LINE FIXES IMAGES
    )
    return Response(serializer.data)
