import React from 'react';
import CategoryPageClient from './CategoryPageClient';

// Generate static params for static export
export async function generateStaticParams() {
  // Return an array of possible category slugs
  // In a real app, this would fetch from your database
  return [
    { category: 'electronics' },
    { category: 'fashion' },
    { category: 'home-garden' },
    { category: 'sports' },
    { category: 'books' },
    { category: 'collectibles' },
    { category: 'automotive' },
    { category: 'jewelry-watches' },
  ];
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <CategoryPageClient categorySlug={params.category} />;
}