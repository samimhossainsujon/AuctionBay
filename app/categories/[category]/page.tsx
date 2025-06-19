"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Search, Filter, Grid, List, SortAsc, Heart, Eye, Clock, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock category data
const categoryData = {
  electronics: {
    name: "Electronics",
    icon: "📱",
    description: "Discover the latest in technology and electronics",
    totalItems: "2.3M",
    subcategories: [
      "Smartphones", "Laptops & Computers", "Gaming Consoles", 
      "Audio & Headphones", "Cameras & Photography", "Smart Home"
    ],
    products: [
      {
        id: 1,
        title: "iPhone 15 Pro Max 256GB - Natural Titanium",
        currentBid: 950,
        buyNowPrice: 1199,
        timeLeft: "2d 14h 32m",
        bids: 47,
        watchers: 156,
        image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
        seller: "tech_deals_pro",
        condition: "New",
        shipping: "Free",
        rating: 4.9
      },
      {
        id: 2,
        title: "MacBook Pro 16-inch M3 Max - Space Black",
        currentBid: 2850,
        buyNowPrice: 3200,
        timeLeft: "1d 8h 15m",
        bids: 23,
        watchers: 89,
        image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=400",
        seller: "apple_certified",
        condition: "New",
        shipping: "Free",
        rating: 4.8
      },
      {
        id: 3,
        title: "Sony PlayStation 5 Console + Extra Controller",
        currentBid: 485,
        buyNowPrice: 599,
        timeLeft: "3d 5h 12m",
        bids: 18,
        watchers: 67,
        image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=400",
        seller: "gaming_central",
        condition: "New",
        shipping: "$15",
        rating: 4.7
      },
      {
        id: 4,
        title: "Canon EOS R5 Mirrorless Camera Body",
        currentBid: 2100,
        buyNowPrice: 2800,
        timeLeft: "4d 12h 45m",
        bids: 31,
        watchers: 142,
        image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400",
        seller: "camera_gear_pro",
        condition: "Used - Excellent",
        shipping: "$25",
        rating: 4.9
      },
      {
        id: 5,
        title: "Samsung 65\" QLED 4K Smart TV",
        currentBid: 1200,
        buyNowPrice: 1599,
        timeLeft: "5d 18h 23m",
        bids: 12,
        watchers: 45,
        image: "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400",
        seller: "electronics_depot",
        condition: "New",
        shipping: "Free",
        rating: 4.6
      },
      {
        id: 6,
        title: "AirPods Pro 2nd Generation with MagSafe",
        currentBid: 180,
        buyNowPrice: 249,
        timeLeft: "2d 3h 56m",
        bids: 28,
        watchers: 89,
        image: "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=400",
        seller: "audio_specialists",
        condition: "New",
        shipping: "Free",
        rating: 4.8
      }
    ]
  }
};

const conditions = [
  "New",
  "Used - Like New", 
  "Used - Excellent",
  "Used - Very Good",
  "Used - Good",
  "Used - Acceptable"
];

const brands = [
  "Apple", "Samsung", "Sony", "Canon", "Nintendo", "Microsoft", "LG", "Dell"
];

export default function CategoryPage() {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("ending-soon");
  const [activeTab, setActiveTab] = useState("all");

  const category = categoryData.electronics; // In real app, this would be dynamic based on params.category

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    if (checked) {
      setSelectedConditions([...selectedConditions, condition]);
    } else {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{category.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
                <p className="text-gray-600 mt-1">{category.description}</p>
                <p className="text-sm text-gray-500 mt-1">{category.totalItems} items available</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-white rounded-lg border shadow-sm overflow-hidden">
                <Input
                  placeholder={`Search in ${category.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 border-0 focus:ring-0"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Subcategories */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-6 overflow-x-auto">
            <Button variant="ghost" className="whitespace-nowrap">All {category.name}</Button>
            {category.subcategories.map((sub, index) => (
              <Button key={index} variant="ghost" className="whitespace-nowrap text-gray-600 hover:text-blue-600">
                {sub}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  step={50}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatCurrency(priceRange[0])}</span>
                  <span>{formatCurrency(priceRange[1])}</span>
                </div>
              </div>

              {/* Condition */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Condition</h3>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={selectedConditions.includes(condition)}
                        onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                      />
                      <label htmlFor={condition} className="text-sm text-gray-700 cursor-pointer">
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                      />
                      <label htmlFor={brand} className="text-sm text-gray-700 cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{category.products.length} results</span>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <SortAsc className="h-4 w-4 text-gray-500" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ending-soon">Ending Soon</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newly Listed</SelectItem>
                    <SelectItem value="most-bids">Most Bids</SelectItem>
                    <SelectItem value="best-match">Best Match</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="auction">Auction</TabsTrigger>
                <TabsTrigger value="buy-now">Buy It Now</TabsTrigger>
                <TabsTrigger value="new">New Arrivals</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Results Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {category.products.map((item) => (
                <Card key={item.id} className={`cursor-pointer hover:shadow-xl transition-all duration-300 group overflow-hidden ${
                  viewMode === "list" ? "flex" : ""
                }`}>
                  <CardHeader className={`p-0 ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "w-full h-48" : "w-full h-48"
                        }`}
                      />
                      <div className="absolute top-3 right-3">
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-500 hover:bg-green-600">
                          {item.condition}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-500">by {item.seller}</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-500 ml-1">{item.rating}</span>
                      </div>
                    </div>
                    
                    <div className={`space-y-2 ${viewMode === "list" ? "flex justify-between items-center" : ""}`}>
                      <div className={viewMode === "list" ? "space-y-1" : ""}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Current bid</span>
                          <span className="text-lg font-bold text-green-600">
                            {formatCurrency(item.currentBid)}
                          </span>
                        </div>
                        
                        {item.buyNowPrice && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Buy it now</span>
                            <span className="text-sm font-semibold text-blue-600">
                              {formatCurrency(item.buyNowPrice)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className={`text-sm text-gray-500 ${viewMode === "list" ? "text-right" : "flex items-center justify-between"}`}>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {item.timeLeft}
                        </div>
                        <div className={`flex items-center space-x-3 ${viewMode === "list" ? "mt-1" : ""}`}>
                          <span>{item.bids} bids</span>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {item.watchers}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className={`p-4 pt-0 ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    <div className="flex w-full space-x-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Place Bid
                      </Button>
                      {item.buyNowPrice && (
                        <Button variant="outline" className="flex-1">
                          Buy Now
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}