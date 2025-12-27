import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FoodItem } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface FoodCardProps {
  item: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      description: `$${item.price.toFixed(2)}`,
    });
  };

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
  src={item.image}
  alt={item.name}
  className="w-full h-48 object-cover rounded-xl"
/>

        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-card/90 backdrop-blur-sm rounded-full shadow-soft">
          <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-xs font-semibold text-foreground">{item.rating}</span>
        </div>

        {/* Quick Add Button */}
        <Button
          onClick={handleAddToCart}
          size="icon"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-elevated"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-1">
            {item.name}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gradient">
            ${Number(item.price).toFixed(2)}
          </span>
          <Button
            onClick={handleAddToCart}
            variant="outline"
            size="sm"
            className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
