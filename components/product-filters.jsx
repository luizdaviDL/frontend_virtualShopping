"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useFetch } from "@/data/products"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ProductFilters({ onFilterChange, filters }) {
  const {data: categories, loadingCat, errorCat} = useFetch('http://localhost:8081/category/getAll')
  const [isExpanded, setIsExpanded] = useState(false)
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 300])

  const handleCategoryChange = (categoryId) => {
    onFilterChange({
      ...filters,
      category: categoryId,
    })
  }

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange)
    onFilterChange({
      ...filters,
      priceRange: newRange,
    })
  }

  const clearFilters = () => {
    setPriceRange([0, 300])
    onFilterChange({
      category: "todos",
      priceRange: [0, 300],
      sortBy: "name",
    })
  }

  return (
    <Card className="sticky top-20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filtros</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="md:hidden">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className={`space-y-6 ${isExpanded ? "block" : "hidden md:block"}`}>
          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3">Categorias</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={filters.category === category.id ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3">Faixa de Preço</h4>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={300}
                min={0}
                step={10}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>R$ {priceRange[0]}</span>
                <span>R$ {priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h4 className="font-medium mb-3">Ordenar por</h4>
            <div className="space-y-2">
              {[
                { value: "name", label: "Nome A-Z" },
                { value: "price-asc", label: "Menor Preço" },
                { value: "price-desc", label: "Maior Preço" },
                { value: "newest", label: "Mais Recentes" },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={filters.sortBy === option.value ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => onFilterChange({ ...filters, sortBy: option.value })}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
            Limpar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
