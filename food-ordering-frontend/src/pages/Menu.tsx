import { useEffect, useState } from "react";
import api from "@/services/api";
import FoodCard from "@/components/FoodCard";
import { FoodItem } from "@/context/CartContext";

const Menu = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);

  useEffect(() => {
    api.get("/foods/")
      .then(res => {
        const formatted = res.data.map((item: any) => ({
          ...item,
          price: Number(item.price),     // IMPORTANT
          rating: 4.5,                   // temporary frontend rating
        }));
        setFoods(formatted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {foods.map(food => (
        <FoodCard key={food.id} item={food} />
      ))}
    </div>
  );
};

export default Menu;
