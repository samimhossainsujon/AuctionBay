import { ArrowLeft, Heart, Share2, Clock, Eye, Star, MessageCircle, Shield, Truck, ArrowRight, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import AuctionDetailsClient from './AuctionDetailsClient';

// Generate static params for static export
export async function generateStaticParams() {
  // Return an array of possible auction IDs
  // In a real app, this would fetch from your database
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
  ];
}

export default function AuctionDetails({ params }: { params: { id: string } }) {
  return <AuctionDetailsClient auctionId={params.id} />;
}