import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge, ShoppingCart, Star } from 'lucide-react';
import React from 'react'

function CourseCard({
  imageSrc,
  title,
  price,
  rating,
  description,
  onBuy,
}) {
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-lg overflow-hidden">
    
    <div className="relative h-48 w-full">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>

    {/* Lower part: price / rating / description */}
    <CardContent className="p-4 pt-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-lg font-extrabold">{price}</span>
          <Badge className="mt-2">Best Seller</Badge>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center -ml-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(rating)
                  ? "text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium ml-2">
          {Number(rating).toFixed(1)}
        </span>

        <span className="text-sm text-muted-foreground ml-2">
          (120+ reviews)
        </span>
        <Button
          variant="secondary"
          onClick={onBuy}
          className="flex items-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Buy now
        </Button>
      </div>
    </CardContent>

    
  </Card>
  )
}

CourseCard.defaultProps = {
  imageSrc:
    "https://www.shutterstock.com/image-photo/elearning-education-internet-lessons-online-600nw-2158034833.jpg",
  title: "Comfortable Mountain Jacket",
  price: "$89",
  rating: 4.3,
  description:
    "A warm, lightweight jacket perfect for the unpredictable mountain weather. Breathable fabric and water-resistant finish.",
  onBuy: () => alert("Buy clicked"),
};

export default CourseCard