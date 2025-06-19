"use client";

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Gavel, DollarSign, ShoppingCart, TrendingUp, TrendingDown, AlertTriangle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Mock data for charts
const salesData = [
  { month: 'Jan', sales: 45000, auctions: 1200 },
  { month: 'Feb', sales: 52000, auctions: 1400 },
  { month: 'Mar', sales: 48000, auctions: 1300 },
  { month: 'Apr', sales: 61000, auctions: 1600 },
  { month: 'May', sales: 58000, auctions: 1550 },
  { month: 'Jun', sales: 67000, auctions: 1800 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#3B82F6' },
  { name: 'Motors', value: 25, color: '#10B981' },
  { name: 'Fashion', value: 20, color: '#F59E0B' },
  { name: 'Collectibles', value: 12, color: '#EF4444' },
  { name: 'Other', value: 8, color: '#8B5CF6' },
];

const recentAuctions = [
  { id: 1, title: "Vintage Rolex Submariner Watch", seller: "luxurywatches_pro", currentBid: 15750, status: "active", timeLeft: "2d 14h" },
  { id: 2, title: "MacBook Pro 16-inch M3 Max", seller: "tech_deals_central", currentBid: 2850, status: "active", timeLeft: "1d 8h" },
  { id: 3, title: "1965 Ford Mustang Fastback", seller: "classic_cars_collector", currentBid: 45000, status: "active", timeLeft: "6d 22h" },
  { id: 4, title: "Gibson Les Paul Standard Guitar", seller: "music_instruments_hub", currentBid: 1250, status: "ended", timeLeft: "Ended" },
  { id: 5, title: "Rare Pokemon Card Collection", seller: "cardcollector_pro", currentBid: 890, status: "pending", timeLeft: "Pending approval" },
];

const flaggedItems = [
  { id: 1, title: "Suspicious Electronics Listing", reason: "Duplicate images", priority: "high" },
  { id: 2, title: "Fake Designer Handbag", reason: "Counterfeit product", priority: "high" },
  { id: 3, title: "Misleading Description", reason: "User complaint", priority: "medium" },
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {change}
            </div>
          </div>
          <div className="bg-blue-50 rounded-full p-3">
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and manage your auction platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                3 Alerts
              </Button>
              <Button>View Site</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="auctions">Auctions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={formatCurrency(342850)}
                change="+12.5% from last month"
                icon={DollarSign}
                trend="up"
              />
              <StatCard
                title="Active Auctions"
                value="1,247"
                change="+8.2% from last month"
                icon={Gavel}
                trend="up"
              />
              <StatCard
                title="Total Users"
                value="28,456"
                change="+5.7% from last month"
                icon={Users}
                trend="up"
              />
              <StatCard
                title="Orders"
                value="3,842"
                change="-2.1% from last month"
                icon={ShoppingCart}
                trend="down"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Auctions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAuctions.slice(0, 5).map((auction) => (
                    <div key={auction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{auction.title}</h4>
                        <p className="text-sm text-gray-600">by {auction.seller}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{formatCurrency(auction.currentBid)}</div>
                          <div className="text-sm text-gray-500">{auction.timeLeft}</div>
                        </div>
                        <Badge variant={auction.status === 'active' ? 'default' : auction.status === 'ended' ? 'secondary' : 'outline'}>
                          {auction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auctions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Auction Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAuctions.map((auction) => (
                    <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{auction.title}</h4>
                        <p className="text-sm text-gray-600">Seller: {auction.seller}</p>
                        <p className="text-sm text-gray-500">Current bid: {formatCurrency(auction.currentBid)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={auction.status === 'active' ? 'default' : auction.status === 'ended' ? 'secondary' : 'outline'}>
                          {auction.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">28,456</h3>
                    <p className="text-gray-600">Total Users</p>
                    <Progress value={85} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">2,847</h3>
                    <p className="text-gray-600">Active Sellers</p>
                    <Progress value={65} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
                    <p className="text-gray-600">New This Month</p>
                    <Progress value={45} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">Reason: {item.reason}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                          {item.priority} priority
                        </Badge>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}