"""
Cart and Order views
"""
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Order, OrderItem
from foods.models import FoodItem
from .serializers import (
    CartSerializer, CartItemSerializer, 
    OrderSerializer, PlaceOrderSerializer
)

class CartView(generics.RetrieveAPIView):
    """
    GET /api/cart/ - Get user's cart
    
    Response:
    {
        "id": 1,
        "items": [
            {
                "id": 1,
                "food_item": {...},
                "quantity": 2,
                "subtotal": "25.98"
            }
        ],
        "total_price": "25.98",
        "total_items": 2
    }
    """
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

class AddToCartView(APIView):
    """
    POST /api/cart/add/
    
    Request:
    {
        "food_item_id": 1,
        "quantity": 2
    }
    
    Response:
    {
        "message": "Item added to cart",
        "cart": {...}
    }
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        food_item_id = request.data.get('food_item_id')
        quantity = request.data.get('quantity', 1)
        
        if not food_item_id:
            return Response(
                {'error': 'food_item_id is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get or create cart
        cart, created = Cart.objects.get_or_create(user=request.user)
        
        # Get food item
        food_item = get_object_or_404(FoodItem, id=food_item_id)
        
        if not food_item.is_available:
            return Response(
                {'error': 'This item is not available'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Add or update cart item
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            food_item=food_item,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += int(quantity)
            cart_item.save()
        
        return Response({
            'message': 'Item added to cart successfully',
            'cart': CartSerializer(cart).data
        }, status=status.HTTP_200_OK)

class RemoveFromCartView(APIView):
    """
    POST /api/cart/remove/
    
    Request:
    {
        "cart_item_id": 1
    }
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        cart_item_id = request.data.get('cart_item_id')
        
        if not cart_item_id:
            return Response(
                {'error': 'cart_item_id is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = get_object_or_404(CartItem, id=cart_item_id, cart=cart)
        cart_item.delete()
        
        return Response({
            'message': 'Item removed from cart',
            'cart': CartSerializer(cart).data
        }, status=status.HTTP_200_OK)

class PlaceOrderView(APIView):
    """
    POST /api/orders/place/
    
    Request:
    {
        "delivery_address": "123 Main St",
        "phone": "+1234567890",
        "notes": "Ring doorbell"
    }
    
    Response:
    {
        "message": "Order placed successfully",
        "order": {...}
    }
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = PlaceOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Get user's cart
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response(
                {'error': 'Cart is empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not cart.items.exists():
            return Response(
                {'error': 'Cart is empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create order
        order = Order.objects.create(
            user=request.user,
            total_amount=cart.total_price,
            delivery_address=serializer.validated_data['delivery_address'],
            phone=serializer.validated_data['phone'],
            notes=serializer.validated_data.get('notes', '')
        )
        
        # Create order items from cart
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                food_name=cart_item.food_item.name,
                food_price=cart_item.food_item.price,
                quantity=cart_item.quantity,
                subtotal=cart_item.subtotal
            )
        
        # Clear cart
        cart.items.all().delete()
        
        return Response({
            'message': 'Order placed successfully',
            'order': OrderSerializer(order).data
        }, status=status.HTTP_201_CREATED)

class UserOrderListView(generics.ListAPIView):
    """
    GET /api/orders/user/ - Get user's order history
    """
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

class AdminOrderListView(generics.ListAPIView):
    """
    GET /api/orders/admin/ - Get all orders (admin only)
    """
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()
    
    def get_queryset(self):
        if self.request.user.role != 'admin':
            return Order.objects.none()
        return Order.objects.all()

class OrderDetailView(generics.RetrieveUpdateAPIView):
    """
    GET /api/orders/{id}/ - Get order details
    PUT /api/orders/{id}/ - Update order status (admin only)
    """
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)