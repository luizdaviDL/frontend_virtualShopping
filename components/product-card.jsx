"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"

export function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (product.images.length > 1) {
      setCurrentImageIndex(1)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setCurrentImageIndex(0)
  }

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Add to cart with default options (first color, first size)
    const defaultProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: product.colors[0]?.name || "Padrão",
      size: product.sizes[0] || "Único",
      quantity: 1,
    }

    onAddToCart(defaultProduct)
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card">
      <Link href={`/produto/${product.id}`}>
        <div
          className="relative aspect-[3/3] overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={product.images[currentImageIndex] || "/placeholder.svg?height=400&width=300"}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />

          {/* Overlay with quick add button */}
          <div
            className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-4 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <Button
              onClick={handleQuickAdd}
              size="sm"
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-primary/90 hover:bg-primary text-primary-foreground"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>

          {/* Color indicators */}
          {product.colors && product.colors.length > 1 && (
            <div className="absolute bottom-2 left-2 flex gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-white/50 shadow-sm"
                  style={{ backgroundColor: color.value }}
                />
              ))}
              {product.colors.length > 3 && (
                <div className="w-3 h-3 rounded-full bg-muted border border-white/50 shadow-sm flex items-center justify-center">
                  <span className="text-[8px] text-muted-foreground">+</span>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 text-balance hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <p className="text-[18px] text-black">R$ {product.price.toFixed(2).replace(".", ",")}</p>

          {/* Size indicators */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="text-xs text-muted-foreground">
              {product.sizes.slice(0, 3).join(", ")}
              {product.sizes.length > 3 && "..."}
            </div>
          )}
        </div>

        <Button asChild className="w-full mt-3 bg-transparent" variant="outline">
          <Link href={`/produto/${product.id}`}>Ver Detalhes</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
