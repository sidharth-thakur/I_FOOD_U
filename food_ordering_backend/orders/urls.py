from django.urls import path
from .views import (
    CartView, 
    AddToCartView, 
    RemoveFromCartView,
    PlaceOrderView, 
    UserOrderListView, 
    AdminOrderListView,
    OrderDetailView
)

urlpatterns = [
    # Cart endpoints
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/', AddToCartView.as_view(), name='cart-add'),
    path('cart/remove/', RemoveFromCartView.as_view(), name='cart-remove'),
    
    # Order endpoints
    path('orders/place/', PlaceOrderView.as_view(), name='order-place'),
    path('orders/user/', UserOrderListView.as_view(), name='order-user-list'),
    path('orders/admin/', AdminOrderListView.as_view(), name='order-admin-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
]