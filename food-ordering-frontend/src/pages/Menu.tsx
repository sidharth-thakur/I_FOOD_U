import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FoodCard from '@/components/FoodCard';
import { categories } from '@/data/foodItems';
import { useFoods } from '@/hooks/useFoods';

const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = searchParams.get('category') || 'all';

  // ✅ FETCH FOODS FROM DJANGO API
  const { foods, loading, error } = useFoods();

  // ✅ FILTER LOGIC (UNCHANGED)
  const filteredItems = useMemo(() => {
    return foods.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [foods, activeCategory, searchQuery]);

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-hero py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-slide-up">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-gradient">Menu</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Explore our delicious selection of cuisines
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="sticky top-16 lg:top-20 z-40 bg-card/95 backdrop-blur-md border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'secondary'}
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                className="flex-shrink-0"
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Food Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">

          {/* Loading */}
          {loading && (
            <p className="text-center text-muted-foreground">Loading menu...</p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-destructive">{error}</p>
          )}

          {!loading && !error && filteredItems.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                Showing {filteredItems.length}{' '}
                {filteredItems.length === 1 ? 'item' : 'items'}
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <FoodCard item={item} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            !loading && !error && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No items found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    searchParams.delete('category');
                    setSearchParams(searchParams);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
