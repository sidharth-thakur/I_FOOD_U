from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem
from foods.serializers import FoodItemSerializer

class CartItemSerializer(serializers.ModelSerializer):
    """
    Serializer for cart items
    """
    food_item = FoodItemSerializer(read_only=True)
    food_item_id = serializers.IntegerField(write_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = CartItem
        fields = ('id', 'food_item', 'food_item_id', 'quantity', 'subtotal', 'added_at')
        read_only_fields = ('id', 'added_at')

class CartSerializer(serializers.ModelSerializer):
    """
    Serializer for shopping cart
    """
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_items = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Cart
        fields = ('id', 'user', 'items', 'total_price', 'total_items', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')

class OrderItemSerializer(serializers.ModelSerializer):
    """
    Serializer for order items
    """
    class Meta:
        model = OrderItem
        fields = ('id', 'food_name', 'food_price', 'quantity', 'subtotal')

class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for orders
    """
    items = OrderItemSerializer(many=True, read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Order
        fields = ('id', 'user', 'user_email', 'status', 'total_amount', 
                  'delivery_address', 'phone', 'notes', 'items', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'total_amount', 'created_at', 'updated_at')

class PlaceOrderSerializer(serializers.Serializer):
    """
    Serializer for placing an order
    """
    delivery_address = serializers.CharField()
    phone = serializers.CharField(max_length=15)
    notes = serializers.CharField(required=False, allow_blank=True)