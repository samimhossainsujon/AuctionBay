"use client";

import { useState } from 'react';
import { Search, Grid, List, TrendingUp, Star, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mainCategories = [
  {
    id: 1,
    name: "Electronics",
    icon: "📱",
    itemCount: "2.3M",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
    trending: true,
    subcategories: [
      { name: "Smartphones", count: "450K" },
      { name: "Laptops & Computers", count: "320K" },
      { name: "Gaming Consoles", count: "180K" },
      { name: "Audio & Headphones", count: "290K" },
      { name: "Cameras & Photography", count: "150K" },
      { name: "Smart Home", count: "120K" }
    ]
  },
  {
    id: 2,
    name: "Motors",
    icon: "🚗",
    itemCount: "890K",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400",
    trending: false,
    subcategories: [
      { name: "Cars & Trucks", count: "340K" },
      { name: "Motorcycles", count: "85K" },
      { name: "Parts & Accessories", count: "280K" },
      { name: "Boats", count: "45K" },
      { name: "RVs & Campers", count: "25K" },
      { name: "Classic Cars", count: "115K" }
    ]
  },
  {
    id: 3,
    name: "Fashion",
    icon: "👗",
    itemCount: "1.8M",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
    trending: true,
    subcategories: [
      { name: "Women's Clothing", count: "650K" },
      { name: "Men's Clothing", count: "420K" },
      { name: "Shoes", count: "380K" },
      { name: "Handbags & Accessories", count: "290K" },
      { name: "Jewelry & Watches", count: "180K" },
      { name: "Designer Items", count: "95K" }
    ]
  },
  {
    id: 4,
    name: "Home & Garden",
    icon: "🏠",
    itemCount: "1.2M",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400",
    trending: false,
    subcategories: [
      { name: "Furniture", count: "280K" },
      { name: "Home Decor", count: "320K" },
      { name: "Kitchen & Dining", count: "190K" },
      { name: "Garden & Outdoor", count: "150K" },
      { name: "Tools & Hardware", count: "180K" },
      { name: "Appliances", count: "120K" }
    ]
  },
  {
    id: 5,
    name: "Sports & Recreation",
    icon: "⚽",
    itemCount: "750K",
    image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400",
    trending: false,
    subcategories: [
      { name: "Exercise Equipment", count: "120K" },
      { name: "Outdoor Sports", count: "180K" },
      { name: "Team Sports", count: "95K" },
      { name: "Water Sports", count: "85K" },
      { name: "Winter Sports", count: "65K" },
      { name: "Cycling", count: "140K" }
    ]
  },
  {
    id: 6,
    name: "Collectibles & Art",
    icon: "🎨",
    itemCount: "980K",
    image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400",
    trending: true,
    subcategories: [
      { name: "Antiques", count: "180K" },
      { name: "Art", count: "150K" },
      { name: "Coins & Currency", count: "95K" },
      { name: "Trading Cards", count: "220K" },
      { name: "Vintage Items", count: "160K" },
      { name: "Memorabilia", count: "175K" }
    ]
  },
  {
    id: 7,
    name: "Books & Media",
    icon: "📚",
    itemCount: "650K",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    trending: false,
    subcategories: [
      { name: "Books", count: "280K" },
      { name: "Movies & TV", count: "120K" },
      { name: "Music", count: "95K" },
      { name: "Video Games", count: "110K" },
      { name: "Magazines", count: "25K" },
      { name: "Educational", count: "45K" }
    ]
  },
  {
    id: 8,
    name: "Health & Beauty",
    icon: "💄",
    itemCount: "420K",
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400",
    trending: true,
    subcategories: [
      { name: "Skincare", count: "120K" },
      { name: "Makeup", count: "95K" },
      { name: "Fragrances", count: "65K" },
      { name: "Hair Care", count: "75K" },
      { name: "Health Supplements", count: "45K" },
      { name: "Personal Care", count: "85K" }
    ]
  }
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shop by Category</h1>
              <p className="text-gray-600 mt-1">Discover millions of items across all categories</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-white rounded-lg border shadow-sm overflow-hidden">
                <Input
                  placeholder="Search categories..."
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

      <div className="container mx-auto px-4 py-8">
        {/* Category Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Categories</p>
                  <p className="text-3xl font-bold">{mainCategories.length}</p>
                </div>
                <Grid className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Items</p>
                  <p className="text-3xl font-bold">8.9M+</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Trending Categories</p>
                  <p className="text-3xl font-bold">{mainCategories.filter(c => c.trending).length}</p>
                </div>
                <Star className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">New This Week</p>
                  <p className="text-3xl font-bold">12.5K</p>
                </div>
                <Clock className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainCategories.map((category) => (
            <Card 
              key={category.id} 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 group overflow-hidden"
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-4 left-4">
                    {category.trending && (
                      <Badge className="bg-red-500 hover:bg-red-600 text-white">
                        🔥 Trending
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.itemCount} items</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Popular Subcategories</h4>
                <div className="space-y-2">
                  {category.subcategories.slice(0, 3).map((sub, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 hover:text-blue-600 cursor-pointer">
                        {sub.name}
                      </span>
                      <span className="text-gray-500">{sub.count}</span>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-blue-600">
                    View All Subcategories
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainCategories.filter(c => c.trending).map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{category.name}</h3>
                      <p className="text-gray-600">{category.itemCount} items</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {category.subcategories.slice(0, 4).map((sub, index) => (
                      <div key={index} className="text-sm">
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {sub.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Access Categories */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {mainCategories.map((category) => (
              <div 
                key={category.id}
                className="text-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
                <p className="text-xs text-gray-500">{category.itemCount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}