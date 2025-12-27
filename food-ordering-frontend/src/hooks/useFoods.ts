import { useEffect, useState } from "react";
import api from "@/lib/api";
import { FoodItem } from "@/context/CartContext";

export const useFoods = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/foods/")
      .then((res) => setFoods(res.data))
      .catch(() => setError("Failed to load foods"))
      .finally(() => setLoading(false));
  }, []);

  return { foods, loading, error };
};
