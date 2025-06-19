"use client";

import { useState } from 'react';
import { Upload, Camera, DollarSign, Calendar, Package, ArrowLeft, Plus, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const categories = [
  "Electronics",
  "Motors", 
  "Fashion",
  "Home & Garden",
  "Sports & Recreation",
  "Collectibles & Art",
  "Jewelry & Watches",
  "Books & Movies",
  "Music Instruments",
  "Other"
];

const conditions = [
  "New",
  "Used - Like New",
  "Used - Excellent", 
  "Used - Very Good",
  "Used - Good",
  "Used - Acceptable"
];

export default function SellPage() {
  const [activeTab, setActiveTab] = useState("details");
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    description: "",
    startingBid: "",
    buyNowPrice: "",
    auctionDuration: "7",
    shippingCost: "",
    returnPolicy: "",
    paymentMethods: [] as string[]
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you'd upload these to a server
      // For demo purposes, we'll use placeholder URLs
      const newImages = Array.from(files).map((_, index) => 
        `https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&t=${Date.now()}-${index}`
      );
      setImages([...images, ...newImages].slice(0, 10)); // Max 10 images
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Listing submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create Your Listing</h1>
              <p className="text-gray-600 mt-1">Sell your items to millions of buyers worldwide</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Save Draft</Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                <Package className="h-4 w-4 mr-2" />
                List Item
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Item Details</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tell us about your item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="What are you selling?"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Include keywords that buyers would search for
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="condition">Condition *</Label>
                      <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map((condition) => (
                            <SelectItem key={condition} value={condition.toLowerCase().replace(/\s+/g, '-')}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={6}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Include details about condition, features, and any flaws
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Add Photos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Upload your photos
                        </h3>
                        <p className="text-gray-500">
                          Drag and drop or click to browse
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Add up to 10 photos. First photo will be your main image.
                        </p>
                      </label>
                    </div>

                    {images.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">
                          Your Photos ({images.length}/10)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <button
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                              {index === 0 && (
                                <Badge className="absolute bottom-2 left-2 bg-blue-500">
                                  Main
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-900">Photo Tips</h4>
                          <ul className="text-sm text-blue-700 mt-2 space-y-1">
                            <li>• Use natural lighting when possible</li>
                            <li>• Show the item from multiple angles</li>
                            <li>• Include close-ups of any flaws or damage</li>
                            <li>• Keep backgrounds clean and uncluttered</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Set Your Price
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="startingBid">Starting Bid *</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="startingBid"
                          type="number"
                          placeholder="0.99"
                          value={formData.startingBid}
                          onChange={(e) => setFormData({...formData, startingBid: e.target.value})}
                          className="pl-8"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Set a low starting bid to attract more bidders
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="buyNowPrice">Buy It Now Price (Optional)</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="buyNowPrice"
                          type="number"
                          placeholder="99.99"
                          value={formData.buyNowPrice}
                          onChange={(e) => setFormData({...formData, buyNowPrice: e.target.value})}
                          className="pl-8"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Allow buyers to purchase immediately
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="auctionDuration">Auction Duration</Label>
                    <Select value={formData.auctionDuration} onValueChange={(value) => setFormData({...formData, auctionDuration: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Day</SelectItem>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="5">5 Days</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="10">10 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Pricing Strategy</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Research similar items to set competitive prices</li>
                      <li>• Consider starting with a low bid to generate interest</li>
                      <li>• Add a Buy It Now price for quick sales</li>
                      <li>• Factor in your costs and desired profit margin</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping & Returns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="shippingCost">Shipping Cost</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="shippingCost"
                        type="number"
                        placeholder="0.00"
                        value={formData.shippingCost}
                        onChange={(e) => setFormData({...formData, shippingCost: e.target.value})}
                        className="pl-8"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Enter 0 for free shipping (recommended)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="returnPolicy">Return Policy</Label>
                    <Select value={formData.returnPolicy} onValueChange={(value) => setFormData({...formData, returnPolicy: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select return policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-returns">No Returns</SelectItem>
                        <SelectItem value="14-days">14 Days Returns</SelectItem>
                        <SelectItem value="30-days">30 Days Returns</SelectItem>
                        <SelectItem value="60-days">60 Days Returns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Payment Methods</Label>
                    <div className="mt-3 space-y-3">
                      {['PayPal', 'Credit Card', 'Bank Transfer', 'Cash on Delivery'].map((method) => (
                        <div key={method} className="flex items-center space-x-2">
                          <Checkbox
                            id={method}
                            checked={formData.paymentMethods.includes(method)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({
                                  ...formData,
                                  paymentMethods: [...formData.paymentMethods, method]
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  paymentMethods: formData.paymentMethods.filter(m => m !== method)
                                });
                              }
                            }}
                          />
                          <label htmlFor={method} className="text-sm font-medium cursor-pointer">
                            {method}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Shipping Tips</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Offer free shipping to attract more buyers</li>
                      <li>• Use calculated shipping for heavy items</li>
                      <li>• Package items securely to prevent damage</li>
                      <li>• Provide tracking information to buyers</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Summary Card */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Listing Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Listing Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Title:</span> {formData.title || 'Not set'}</p>
                    <p><span className="font-medium">Category:</span> {formData.category || 'Not selected'}</p>
                    <p><span className="font-medium">Condition:</span> {formData.condition || 'Not selected'}</p>
                    <p><span className="font-medium">Photos:</span> {images.length} uploaded</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Pricing & Duration</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Starting Bid:</span> ${formData.startingBid || '0.00'}</p>
                    <p><span className="font-medium">Buy It Now:</span> ${formData.buyNowPrice || 'Not set'}</p>
                    <p><span className="font-medium">Duration:</span> {formData.auctionDuration} days</p>
                    <p><span className="font-medium">Shipping:</span> ${formData.shippingCost || '0.00'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}