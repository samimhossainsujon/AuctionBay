/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import { User, Star, Package, Gavel, Heart, Settings, Bell, Shield, CreditCard, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

// Mock user data
const userData = {
  name: "John Smith",
  email: "john.smith@email.com",
  username: "john_smith_collector",
  avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
  rating: 4.8,
  feedbackCount: 1247,
  memberSince: "2019",
  location: "New York, NY",
  bio: "Passionate collector of vintage items and electronics. Trusted seller with fast shipping and excellent customer service."
};

const activeListings = [
  {
    id: 1,
    title: "Vintage Camera Collection",
    currentBid: 450,
    buyNowPrice: 650,
    timeLeft: "3d 12h",
    bids: 8,
    watchers: 23,
    image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 2,
    title: "Rare Vinyl Records Set",
    currentBid: 280,
    timeLeft: "1d 8h",
    bids: 12,
    watchers: 34,
    image: "https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

const watchedItems = [
  {
    id: 1,
    title: "MacBook Pro 16-inch",
    currentBid: 2850,
    timeLeft: "2d 14h",
    image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 2,
    title: "Gibson Guitar",
    currentBid: 1250,
    timeLeft: "4d 6h",
    image: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

const bidHistory = [
  {
    id: 1,
    title: "Vintage Rolex Watch",
    finalBid: 15750,
    status: "won",
    date: "2 days ago",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 2,
    title: "Antique Furniture Set",
    finalBid: 890,
    status: "outbid",
    date: "1 week ago",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(userData);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSave = () => {
    // Handle save logic
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-gray-600 mt-1">@{userData.username}</p>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(userData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {userData.rating} ({userData.feedbackCount} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {userData.location}
                </div>
                <Badge variant="secondary">Member since {userData.memberSince}</Badge>
              </div>
            </div>
            <Button onClick={() => setEditMode(!editMode)}>
              <Settings className="h-4 w-4 mr-2" />
              {editMode ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="watching">Watching</TabsTrigger>
            <TabsTrigger value="bidding">Bid History</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Gavel className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">24</h3>
                  <p className="text-gray-600">Active Listings</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
                  <h3 className="text-2xl font-bold text-gray-900">156</h3>
                  <p className="text-gray-600">Items Watching</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">342</h3>
                  <p className="text-gray-600">Items Sold</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-gray-900">{userData.rating}</h3>
                  <p className="text-gray-600">Rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                ) : (
                  <p className="text-gray-700">{userData.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeListings.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">{formatCurrency(item.currentBid)} • {item.timeLeft}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Watching</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {watchedItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">{formatCurrency(item.currentBid)} • {item.timeLeft}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
              <Button>Create New Listing</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeListings.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Current bid:</span>
                          <span className="font-medium text-green-600">{formatCurrency(item.currentBid)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time left:</span>
                          <span>{item.timeLeft}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bids:</span>
                          <span>{item.bids}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="watching" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Items You're Watching</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchedItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Current bid:</span>
                          <span className="font-medium text-green-600">{formatCurrency(item.currentBid)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time left:</span>
                          <span>{item.timeLeft}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-3">Place Bid</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bidding" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Bid History</h2>
            <div className="space-y-4">
              {bidHistory.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">{formatCurrency(item.finalBid)}</div>
                        <Badge variant={item.status === 'won' ? 'default' : 'secondary'}>
                          {item.status === 'won' ? 'Won' : 'Outbid'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Feedback & Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-3xl font-bold text-green-600">98%</h3>
                  <p className="text-gray-600">Positive Feedback</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-3xl font-bold text-blue-600">1,247</h3>
                  <p className="text-gray-600">Total Reviews</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-3xl font-bold text-yellow-600">4.8</h3>
                  <p className="text-gray-600">Average Rating</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={userData.name} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={userData.email} />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={userData.location} />
                  </div>
                  <Button>Update Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Email notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bid alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Auction ending alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Marketing emails</span>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full">
                    Enable Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Account Data
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <span>•••• •••• •••• 1234</span>
                      <Badge>Primary</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Expires 12/26</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}