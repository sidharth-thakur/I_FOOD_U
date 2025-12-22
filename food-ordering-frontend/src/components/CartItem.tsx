import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-card group hover:shadow-soft transition-all duration-300">
      {/* Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
        <p className="text-muted-foreground text-sm line-clamp-1">{item.description}</p>
        <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="w-8 text-center font-semibold text-foreground">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {/* Subtotal & Remove */}
      <div className="flex flex-col items-end gap-2">
        <span className="font-bold text-foreground">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-destructive hover:bg-destructive/10"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
