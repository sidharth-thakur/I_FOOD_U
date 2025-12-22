import React from "react";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodItem } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface FoodCardProps {
  item: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      description: `₹${item.price.toFixed(2)}`,
    });
  };

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image || "https://via.placeholder.com/400"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-card/90 rounded-full">
          <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-xs font-semibold">
            {item.rating ?? 4.2}
          </span>
        </div>

        {/* Add Button */}
        <Button
          onClick={handleAddToCart}
          size="icon"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{item.name}</h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {item.description || "Delicious food item"}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            ₹{item.price.toFixed(2)}
          </span>

          <Button
            onClick={handleAddToCart}
            variant="outline"
            size="sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
