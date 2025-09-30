"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductGallery } from "@/components/product-gallery"
import { ProductOptions } from "@/components/product-options"
import { products } from "@/data/products"
import { useStore } from "@/contexts/store-context"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useStore()
  const { toast } = useToast()

  const [product, setProduct] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const productId = Number.parseInt(params.id)
    const foundProduct = products.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
      // Set default selections
      setSelectedOptions({
        color: foundProduct.colors?.[0]?.name || "",
        size: foundProduct.sizes?.[0] || "",
      })
    } else {
      router.push("/produtos")
    }
  }, [params.id, router])

  const handleAddToCart = async () => {
    if (!product) return

    // Validation
    const hasColors = product.colors && product.colors.length > 0
    const hasSizes = product.sizes && product.sizes.length > 0

    if (hasColors && !selectedOptions.color) {
      toast({
        title: "Selecione uma cor",
        description: "Por favor, escolha uma cor antes de adicionar ao carrinho.",
        variant: "destructive",
      })
      return
    }

    if (hasSizes && !selectedOptions.size) {
      toast({
        title: "Selecione um tamanho",
        description: "Por favor, escolha um tamanho antes de adicionar ao carrinho.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: selectedOptions.color || "Padrão",
        size: selectedOptions.size || "Único",
        quantity: quantity,
      }

      addToCart(cartItem)

      toast({
        title: "Produto adicionado!",
        description: `${product.name} foi adicionado ao seu carrinho.`,
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto ao carrinho.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    setTimeout(() => {
      router.push("/carrinho")
    }, 500)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produto...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb 
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-accent transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-accent transition-colors">
            Produtos
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>*/}

        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-[23px] md:text-4xl  text-balance mb-4">{product.name}</h1>
              <p className="text-4xl  text-black mb-6">R$ {product.price.toFixed(2).replace(".", ",")}</p>
            </div>

            {/* Product Options */}
            <ProductOptions
              colors={product.colors}
              sizes={product.sizes}
              selectedOptions={selectedOptions}
              onSelectionChange={setSelectedOptions}
            />

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium mb-3">Quantidade</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleAddToCart} disabled={isLoading} className="w-full" size="lg">
                <ShoppingBag className="h-5 w-5 mr-2" />
                {isLoading ? "Adicionando..." : "Adicionar ao Carrinho"}
              </Button>

              <Button onClick={handleBuyNow} variant="outline" className="w-full bg-transparent" size="lg">
                Comprar Agora
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Heart className="h-4 w-4 mr-2" />
                  Favoritar
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>

            {/* Product Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Descrição</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Truck style={{ color: 'rgba(61, 60, 60, 0.87)' }} />
                <div>
                  <p className="font-medium text-sm">Frete Grátis</p>
                  <p className="text-xs text-muted-foreground">Acima de R$ 99</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Shield style={{ color: 'rgba(61, 60, 60, 0.87)' }} />
                <div>
                  <p className="font-medium text-sm">Compra Segura</p>
                  <p className="text-xs text-muted-foreground">100% protegida</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <RotateCcw style={{ color: 'rgba(61, 60, 60, 0.87)' }} />
                <div>
                  <p className="font-medium text-sm">Troca Fácil</p>
                  <p className="text-xs text-muted-foreground">30 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
