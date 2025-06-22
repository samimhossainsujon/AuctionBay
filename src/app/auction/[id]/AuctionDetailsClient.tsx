"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Share2, Clock, Eye, Star, MessageCircle, Shield, Truck, ArrowRight, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface AuctionDetailsClientProps {
    auctionId: string;
}

export default function AuctionDetailsClient({ auctionId }: AuctionDetailsClientProps) {
    const [bidAmount, setBidAmount] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 32,
        seconds: 15
    });

    // Mock auction data
    const auction = {
        id: auctionId,
        title: "Vintage Rolex Submariner Watch - Rare 1970s Model",
        currentBid: 15750,
        buyNowPrice: 22500,
        minimumBid: 15800,
        totalBids: 47,
        watchers: 156,
        condition: "Used - Excellent",
        category: "Jewelry & Watches > Watches > Wristwatches",
        seller: {
            name: "luxurywatches_pro",
            rating: 4.9,
            feedbackCount: 2847,
            avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        images: [
            "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/47856/rolex-wrist-watch-clock-time-47856.jpeg?auto=compress&cs=tinysrgb&w=800"
        ],
        description: `
      Stunning vintage Rolex Submariner from the 1970s in excellent condition. 
      This timepiece has been professionally serviced and comes with original box and papers.
      
      Features:
      • Automatic movement
      • 40mm case diameter
      • Water resistant to 300m
      • Unidirectional rotating bezel
      • Luminous hands and markers
      
      Condition: Minor wear consistent with age, crystal is clear, bracelet shows minimal stretch.
    `,
        shipping: {
            cost: 25,
            domestic: "2-3 business days",
            international: "5-10 business days"
        },
        returnPolicy: "30-day returns accepted"
    };

    const bidHistory = [
        { bidder: "b***r", amount: 15750, time: "2 minutes ago" },
        { bidder: "c***t", amount: 15500, time: "15 minutes ago" },
        { bidder: "w***h", amount: 15200, time: "1 hour ago" },
        { bidder: "b***r", amount: 15000, time: "2 hours ago" },
        { bidder: "l***y", amount: 14800, time: "3 hours ago" }
    ];

    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleBid = () => {
        if (parseFloat(bidAmount) >= auction.minimumBid) {
            // Handle bid submission
            console.log('Placing bid:', bidAmount);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Search
                    </Button>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900 line-clamp-1">
                            {auction.title}
                        </h1>
                        <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                                <Heart className="h-4 w-4 mr-2" />
                                Watch
                            </Button>
                            <Button size="sm" variant="outline">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Images */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="aspect-square relative">
                                    <img
                                        src={auction.images[selectedImage]}
                                        alt={auction.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex space-x-2 overflow-x-auto">
                                        {auction.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                                                    }`}
                                            >
                                                <img src={image} alt="" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - Details */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            {/* Title and Category */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{auction.title}</h1>
                                <p className="text-gray-600">{auction.category}</p>
                                <div className="flex items-center space-x-4 mt-4">
                                    <Badge variant="secondary">{auction.condition}</Badge>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Eye className="h-4 w-4 mr-1" />
                                        {auction.watchers} watching
                                    </div>
                                </div>
                            </div>

                            {/* Time Left */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-gray-900">Time left</h3>
                                        <Clock className="h-5 w-5 text-red-500" />
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 text-center">
                                        <div className="bg-red-50 rounded-lg p-3">
                                            <div className="text-2xl font-bold text-red-600">{timeLeft.days}</div>
                                            <div className="text-xs text-gray-500">Days</div>
                                        </div>
                                        <div className="bg-red-50 rounded-lg p-3">
                                            <div className="text-2xl font-bold text-red-600">{timeLeft.hours}</div>
                                            <div className="text-xs text-gray-500">Hours</div>
                                        </div>
                                        <div className="bg-red-50 rounded-lg p-3">
                                            <div className="text-2xl font-bold text-red-600">{timeLeft.minutes}</div>
                                            <div className="text-xs text-gray-500">Minutes</div>
                                        </div>
                                        <div className="bg-red-50 rounded-lg p-3">
                                            <div className="text-2xl font-bold text-red-600">{timeLeft.seconds}</div>
                                            <div className="text-xs text-gray-500">Seconds</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Seller Info */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={auction.seller.avatar} />
                                            <AvatarFallback>{auction.seller.name[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">{auction.seller.name}</h4>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(auction.seller.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {auction.seller.rating} ({auction.seller.feedbackCount} reviews)
                                                </span>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Contact
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose max-w-none">
                                        <p className="whitespace-pre-line text-gray-700">
                                            {auction.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column - Bidding */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Current Bid */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="text-sm text-gray-500 mb-1">Current bid</div>
                                        <div className="text-4xl font-bold text-green-600">
                                            {formatCurrency(auction.currentBid)}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {auction.totalBids} bids
                                        </div>
                                    </div>

                                    {/* Place Bid */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Enter your bid (minimum: {formatCurrency(auction.minimumBid)})
                                            </label>
                                            <div className="flex space-x-2">
                                                <Input
                                                    type="number"
                                                    placeholder={auction.minimumBid.toString()}
                                                    value={bidAmount}
                                                    onChange={(e) => setBidAmount(e.target.value)}
                                                    className="flex-1"
                                                />
                                                <Button onClick={handleBid} className="bg-blue-600 hover:bg-blue-700">
                                                    Place Bid
                                                </Button>
                                            </div>
                                        </div>

                                        {auction.buyNowPrice && (
                                            <div className="border-t pt-4">
                                                <div className="text-center mb-4">
                                                    <div className="text-sm text-gray-500">Or buy it now for</div>
                                                    <div className="text-2xl font-bold text-blue-600">
                                                        {formatCurrency(auction.buyNowPrice)}
                                                    </div>
                                                </div>
                                                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                                    Buy It Now
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Shipping Info */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                        <Truck className="h-5 w-5 mr-2" />
                                        Shipping & Returns
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping cost:</span>
                                            <span className="font-medium">{formatCurrency(auction.shipping.cost)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Domestic delivery:</span>
                                            <span className="font-medium">{auction.shipping.domestic}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">International delivery:</span>
                                            <span className="font-medium">{auction.shipping.international}</span>
                                        </div>
                                        <div className="flex items-start justify-between">
                                            <span className="text-gray-600">Returns:</span>
                                            <span className="font-medium text-right">{auction.returnPolicy}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Bid History */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Bid History</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="max-h-64 overflow-y-auto">
                                        {bidHistory.map((bid, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 border-b last:border-b-0">
                                                <div>
                                                    <div className="font-medium text-gray-900">{bid.bidder}</div>
                                                    <div className="text-sm text-gray-500">{bid.time}</div>
                                                </div>
                                                <div className="font-semibold text-green-600">
                                                    {formatCurrency(bid.amount)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 