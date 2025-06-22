"use client";

import { useState } from 'react';
import { Search, Filter, Grid, List, SortAsc, Heart, Eye, Clock, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryPageClientProps {
    categorySlug: string;
}

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

export default function CategoryPageClient({ categorySlug }: CategoryPageClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("ending-soon");
    const [activeTab, setActiveTab] = useState("all");

    const category = categoryData.electronics; // In real app, this would be dynamic based on categorySlug

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
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Category: {categorySlug}</h2>
                    <p className="text-gray-600">This is a client component for the {categorySlug} category.</p>
                </div>
            </div>
        </div>
    );
} 