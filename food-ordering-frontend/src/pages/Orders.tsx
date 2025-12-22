import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

// Demo orders data
const demoOrders = [
  {
    id: '1',
    date: '2024-01-15',
    status: 'delivered',
    total: 42.97,
    items: ['Margherita Pizza', 'Double Bacon Burger', 'Chocolate Lava Cake'],
  },
  {
    id: '2',
    date: '2024-01-10',
    status: 'delivered',
    total: 28.48,
    items: ['Butter Chicken', 'Vegetable Fried Rice'],
  },
];

const Orders: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'preparing':
        return <Package className="w-5 h-5 text-primary" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Order Placed';
      case 'preparing':
        return 'Preparing';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Sign in to view orders</h1>
            <p className="text-muted-foreground mb-8">
              Please sign in to view your order history and track current orders.
            </p>
            <Link to="/auth">
              <Button variant="hero" size="lg">
                Sign In
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Your Orders</h1>

          {demoOrders.length > 0 ? (
            <div className="space-y-4">
              {demoOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-semibold text-foreground">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'preparing'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                      <span className="text-xl font-bold text-gradient">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Items:</span>{' '}
                      {order.items.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Package className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                You haven't placed any orders yet. Start exploring our menu and place your first order!
              </p>
              <Link to="/menu">
                <Button variant="hero" size="lg">
                  Browse Menu
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
