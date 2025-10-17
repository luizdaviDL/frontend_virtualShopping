"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { useProducts } from "@/data/products"
import { useStore } from "@/contexts/store-context"
import { useToast } from "@/hooks/use-toast"

export default function ProductsPage() {
  const products = useProducts(); 
  const { addToCart } = useStore()
  const { toast } = useToast()

  const [filters, setFilters] = useState({
    category: "todos",
    priceRange: [0, 300],
    sortBy: "name",
  })

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (filters.category !== "todos") {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Sort products
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  }, [filters])

  const handleAddToCart = (product) => {
    addToCart(product)
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header 
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Nossa <span className="text-accent">Coleção</span>
          </h1>
        
        </div>*/}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredAndSortedProducts.length} produto{filteredAndSortedProducts.length !== 1 ? "s" : ""} encontrado
                {filteredAndSortedProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Tente ajustar os filtros para encontrar o que você procura.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
