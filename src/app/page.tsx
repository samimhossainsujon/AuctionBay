"use client";

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Gavel, Clock, Eye, Heart, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data for demonstration
const featuredAuctions = [
  {
    id: 1,
    title: "Vintage Rolex Submariner Watch",
    currentBid: 15750,
    buyNowPrice: 22500,
    timeLeft: "2d 14h 32m",
    bids: 47,
    watchers: 156,
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400",
    seller: "luxurywatches_pro",
    condition: "Used - Excellent",
    category: "jewelry-watches"
  },
  {
    id: 2,
    title: "MacBook Pro 16-inch M3 Max",
    currentBid: 2850,
    buyNowPrice: 3200,
    timeLeft: "1d 8h 15m",
    bids: 23,
    watchers: 89,
    image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=400",
    seller: "tech_deals_central",
    condition: "New",
    category: "electronics"
  },
  {
    id: 3,
    title: "1965 Ford Mustang Fastback",
    currentBid: 45000,
    buyNowPrice: 68000,
    timeLeft: "6d 22h 45m",
    bids: 12,
    watchers: 234,
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400",
    seller: "classic_cars_collector",
    condition: "Used - Good",
    category: "motors"
  },
  {
    id: 4,
    title: "Gibson Les Paul Standard Guitar",
    currentBid: 1250,
    buyNowPrice: 1850,
    timeLeft: "3d 5h 12m",
    bids: 18,
    watchers: 67,
    image: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400",
    seller: "music_instruments_hub",
    condition: "Used - Very Good",
    category: "music"
  }
];

const categories = [
  { 
    name: "Electronics", 
    icon: "📱", 
    count: "2.3M", 
    slug: "electronics",
    trending: true,
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  { 
    name: "Motors", 
    icon: "🚗", 
    count: "890K", 
    slug: "motors",
    trending: false,
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  { 
    name: "Fashion", 
    icon: "👗", 
    count: "1.8M", 
    slug: "fashion",
    trending: true,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  { 
    name: "Home & Garden", 
    icon: "🏠", 
    count: "1.2M", 
    slug: "home-garden",
    trending: false,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  { 
    name: "Sports", 
    icon: "⚽", 
    count: "750K", 
    slug: "sports",
    trending: false,
    image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  { 
    name: "Collectibles", 
    icon: "🎨", 
    count: "980K", 
    slug: "collectibles",
    trending: true,
    image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Gavel className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">AuctionBay</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">Categories</Link>
                <Link href="/sell" className="text-gray-700 hover:text-blue-600 transition-colors">Sell</Link>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Help</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button variant="outline" size="sm">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Deals
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bid on millions of items or find exactly what you're looking for with our advanced search
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto relative">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
              <Input
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 text-lg px-6 py-4 focus:ring-0"
              />
              <Button className="px-8 py-4 bg-blue-600 hover:bg-blue-700">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <Link href="/categories">
              <Button variant="outline" className="group">
                View All Categories
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={`/categories/${category.slug}`}>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div 
                    className="h-32 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${category.image})` }}
                  >
                    {category.trending && (
                      <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Auctions */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Auctions</h2>
            <Button variant="outline">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAuctions.map((auction) => (
              <Link key={auction.id} href={`/auction/${auction.id}`}>
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={auction.image} 
                        alt={auction.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-500 hover:bg-green-600">
                          {auction.condition}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {auction.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">by {auction.seller}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Current bid</span>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(auction.currentBid)}
                        </span>
                      </div>
                      
                      {auction.buyNowPrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Buy it now</span>
                          <span className="text-sm font-semibold text-blue-600">
                            {formatCurrency(auction.buyNowPrice)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {auction.timeLeft}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span>{auction.bids} bids</span>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {auction.watchers}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex w-full space-x-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Place Bid
                      </Button>
                      {auction.buyNowPrice && (
                        <Button variant="outline" className="flex-1">
                          Buy Now
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust & Safety */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose AuctionBay?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Gavel className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Bidding</h3>
              <p className="text-gray-600">Advanced security measures protect every transaction</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Discovery</h3>
              <p className="text-gray-600">Find exactly what you want with powerful search tools</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Trusted Community</h3>
              <p className="text-gray-600">Buy and sell with confidence in our verified community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gavel className="h-6 w-6" />
                <span className="text-xl font-bold">AuctionBay</span>
              </div>
              <p className="text-gray-400">
                The world's largest online auction marketplace
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Buy</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How to Bid</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Buyer Protection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payment Methods</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sell</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Start Selling</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seller Fees</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seller Protection</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Center</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AuctionBay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}