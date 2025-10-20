"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function ProductOptions({ colors, sizes, onSelectionChange, selectedOptions }) {
  const [selectedColor, setSelectedColor] = useState(selectedOptions?.color || "")
  const [selectedSize, setSelectedSize] = useState(selectedOptions?.size || "")

  const handleColorChange = (color) => {
    setSelectedColor(color)
    onSelectionChange({
      color,
      size: selectedSize,
    })
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size)
    onSelectionChange({
      color: selectedColor,
      size,
    })
  }
  
    // Remove duplicadas
  const uniqueColors = colors?.filter(
    (color, index, self) =>
      index === self.findIndex((c) => c.name === color.name && c.value === color.value)
  )

  return (
    <div className="space-y-6">
      {/* Color Selection */}
     {uniqueColors && uniqueColors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3">
            Cor: {selectedColor && <span style={{ color: 'rgba(61, 60, 60, 0.87)' }}>{selectedColor}</span>}
          </h3>
          <div className="flex flex-wrap gap-3">
            {uniqueColors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorChange(color.name)}
                className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor === color.name
                    ? "border-primary shadow-lg scale-110"
                    : "border-border hover:border-primary/50"
                }`}
                style={{ backgroundColor: color.value }}
                aria-label={`Selecionar cor ${color.name}`}
              >
                {selectedColor === color.name && (
                  <div className="absolute inset-0 rounded-full border-2 border-white shadow-inner" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes && sizes.length > 0 && (
        <div>
         <h3 className="text-sm font-medium mb-3">
          Tamanho: {selectedSize && <span style={{ color: 'rgba(61, 60, 60, 0.87)' }}>{selectedSize}</span>}
        </h3>


          {/* For clothing sizes (P, M, G, GG) - use buttons */}
          {sizes.every((size) => ["P", "M", "G", "GG", "PP", "XG"].includes(size)) ? (
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSizeChange(size)}
                  className="min-w-[3rem]"
                >
                  {size}
                </Button>
              ))}
            </div>
          ) : (
            /* For numeric sizes (shoes, etc.) - use select */
            <Select value={selectedSize} onValueChange={handleSizeChange}>
              <SelectTrigger className="w-full max-w-[200px]">
                <SelectValue placeholder="Selecione o tamanho" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      {/* Selection Status */}
      <div className="flex flex-wrap gap-2">
        {selectedColor && <Badge variant="secondary">Cor: {selectedColor}</Badge>}
        {selectedSize && <Badge variant="secondary">Tamanho: {selectedSize}</Badge>}
      </div>
    </div>
  )
}
