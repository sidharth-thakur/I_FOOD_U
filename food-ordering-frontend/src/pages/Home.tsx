import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Star, Clock, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FoodCard from '@/components/FoodCard';
import { categories, foodItems } from '@/data/foodItems';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop',
    alt: 'Delicious food spread',
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&h=1080&fit=crop',
    alt: 'Delicious pizza with fresh toppings',
  },
  {
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&h=1080&fit=crop',
    alt: 'Juicy gourmet burger',
  },
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop',
    alt: 'Grilled meat dishes',
  },
];

const Home: React.FC = () => {
  const featuredItems = foodItems.slice(0, 4);
  
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Background Carousel */}
      <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          <Carousel
            className="w-full h-full"
            opts={{ loop: true }}
            plugins={[autoplayPlugin.current]}
          >
            <CarouselContent className="h-full -ml-0">
              {heroImages.map((image, index) => (
                <CarouselItem key={index} className="pl-0 h-full">
                  <div className="relative w-full h-full min-h-[600px] lg:min-h-[700px]">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="max-w-2xl space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Now delivering in 30 mins</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Delicious Food{' '}
              <span className="text-gradient">Delivered</span>{' '}
              To Your Door
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Order from your favorite local restaurants and enjoy fresh, hot meals delivered right to your doorstep. Fast, reliable, and always delicious.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for food or restaurants..."
                  className="pl-12 h-14 rounded-xl text-base shadow-card bg-card/90 backdrop-blur-sm"
                />
              </div>
              <Link to="/menu">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Explore Menu
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Floating Cards */}
            <div className="hidden lg:flex gap-4 pt-4">
              <div className="bg-card/90 backdrop-blur-sm p-4 rounded-xl shadow-elevated animate-pulse-soft">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop"
                      alt="Burger"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Double Burger</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-primary fill-primary" />
                      <span className="text-sm text-muted-foreground">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card/90 backdrop-blur-sm p-4 rounded-xl shadow-elevated">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Fast Delivery</p>
                    <p className="text-sm text-muted-foreground">25-30 mins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find your favorite cuisine from our wide selection of categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category, index) => (
              <Link
                key={category.id}
                to={`/menu?category=${category.id}`}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-card rounded-2xl p-6 text-center shadow-card hover:shadow-elevated hover:-translate-y-2 transition-all duration-300 group-hover:bg-primary/5">
                  <span className="text-4xl mb-3 block">{category.icon}</span>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 lg:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Today's Special
              </h2>
              <p className="text-muted-foreground">
                Chef's recommendations just for you
              </p>
            </div>
            <Link to="/menu">
              <Button variant="outline">
                View All Menu
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, index) => (
              <div key={item.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                <FoodCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: 'Fast Delivery',
                description: 'Get your food delivered in under 30 minutes, hot and fresh.',
              },
              {
                icon: Shield,
                title: 'Safe & Secure',
                description: 'Your payments and personal data are always protected.',
              },
              {
                icon: Star,
                title: 'Best Quality',
                description: 'We partner with top-rated restaurants for the best experience.',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-primary rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden shadow-glow">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Hungry? Order Now!
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Download our app or order directly from the website. Your next delicious meal is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/menu">
                  <Button variant="glass" size="lg">
                    Browse Menu
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="glass" size="lg">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
