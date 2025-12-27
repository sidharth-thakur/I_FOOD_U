from rest_framework import serializers
from .models import Food

class FoodSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Food
        fields = [
            'id',
            'name',
            'description',
            'price',
            'image',
            'category',
            'rating',
            'available',
        ]

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
