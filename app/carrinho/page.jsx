"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import { useStore } from "@/contexts/store-context"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const router = useRouter()
  const { cart, updateCartQuantity, removeFromCart, cartTotal, cartItemsCount } = useStore()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Calculate shipping (free above R$ 99)
  const shipping = cartTotal >= 99 ? 0 : 15
  const total = cartTotal + shipping

  const handleUpdateQuantity = async (cartId, quantity) => {
    try {
      updateCartQuantity(cartId, quantity)
      toast({
        title: "Quantidade atualizada",
        description: "A quantidade do produto foi atualizada.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a quantidade.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveItem = async (cartId) => {
    try {
      removeFromCart(cartId)
      toast({
        title: "Produto removido",
        description: "O produto foi removido do seu carrinho.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o produto.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/checkout")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível prosseguir para o checkout.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Seu <span className="text-accent">Carrinho</span>
            </h1>
            <p className="text-muted-foreground">
              {cartItemsCount} item{cartItemsCount !== 1 ? "s" : ""} no seu carrinho
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Que tal dar uma olhada na nossa coleção e encontrar algo especial para você?
            </p>
            <Button asChild size="lg">
              <Link href="/produtos">Explorar Produtos</Link>
            </Button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.cartId}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}

              {/* Additional Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/produtos">Continuar Comprando</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Clear cart functionality could be added here
                    toast({
                      title: "Funcionalidade em desenvolvimento",
                      description: "A opção de limpar carrinho será adicionada em breve.",
                    })
                  }}
                  className="flex-1 bg-transparent"
                >
                  Limpar Carrinho
                </Button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={cartTotal}
                shipping={shipping}
                total={total}
                itemsCount={cartItemsCount}
                onCheckout={handleCheckout}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        {cart.length > 0 && (
          <div className="mt-16 pt-8 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Pagamento Seguro</h3>
                <p className="text-sm text-muted-foreground">Seus dados estão protegidos</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Entrega Rápida</h3>
                <p className="text-sm text-muted-foreground">Receba em casa rapidamente</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Suporte Dedicado</h3>
                <p className="text-sm text-muted-foreground">Estamos aqui para ajudar</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
