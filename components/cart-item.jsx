"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2 } from "lucide-react"

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return

    setIsUpdating(true)
    try {
      await onUpdateQuantity(item.cartId, newQuantity)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    setIsUpdating(true)
    try {
      await onRemove(item.cartId)
    } finally {
      setIsUpdating(false)
    }
  }

  const subtotal = item.price * item.quantity

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link href={`/produto/${item.id}`} className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted">
              <img
                src={item.image || "/placeholder.svg?height=96&width=96"}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <Link href={`/produto/${item.id}`}>
                  <h3 className="font-semibold text-sm sm:text-base hover:text-accent transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex flex-wrap gap-2 mt-2">
                  {item.color && item.color !== "Padrão" && (
                    <Badge variant="secondary" className="text-xs">
                      {item.color}
                    </Badge>
                  )}
                  {item.size && item.size !== "Único" && (
                    <Badge variant="secondary" className="text-xs">
                      {item.size}
                    </Badge>
                  )}
                </div>

                <p className="text-[18px] text-black mt-2">R$ {item.price.toFixed(2).replace(".", ",")}</p>
              </div>

              {/* Actions - Desktop */}
              <div className="hidden sm:flex flex-col items-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  disabled={isUpdating}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quantity and Subtotal */}
            <div className="flex items-center justify-between mt-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1 || isUpdating}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <span className="w-12 text-center font-medium text-sm">{item.quantity}</span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={isUpdating}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Subtotal and Mobile Remove */}
              <div className="flex items-center gap-3">
                <p className="font-bold text-black">R$ {subtotal.toFixed(2).replace(".", ",")}</p>

                {/* Remove Button - Mobile */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  disabled={isUpdating}
                  className="sm:hidden text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
