"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"
import { useStore } from "@/contexts/store-context"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFetch } from "@/data/products"

export default function CheckoutPage() {
  const {data: clientInformation, loading, error} = useFetch('http://localhost:8081/clientAdress/getAll')
  const router = useRouter()
  const { cart, cartTotal, cartItemsCount, addOrder, clearCart } = useStore()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Calculate totals
  const shipping = cartTotal >= 99 ? 0 : 15
  const total = cartTotal + shipping

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/carrinho")
    }
  }, [cart.length, router])

  const handleOrderSubmit = async (formData) => {
    setIsLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate order
      const order = {
        id: `PED-${Date.now()}`,
        date: new Date().toISOString(),
        status: "Processando",
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
        },
        address: {
          zipCode: formData.zipCode,
          address: formData.address,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
        },
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          image: item.image,
        })),
        payment: {
          method: formData.paymentMethod,
          subtotal: cartTotal,
          shipping: shipping,
          total: total,
        },
      }

      // Add order to store
      addOrder(order)

      // Clear cart
      clearCart()

      // Show success message
      toast({
        title: "Pedido realizado com sucesso!",
        description: `Seu pedido ${order.id} foi confirmado.`,
      })

      // Redirect to confirmation page
      router.push(`/pedido-confirmado/${order.id}`)
    } catch (error) {
      toast({
        title: "Erro ao processar pedido",
        description: "Ocorreu um erro ao processar seu pedido. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (cart.length === 0) {
    return null // Will redirect via useEffect
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
              Finalizar Compra
            </h1>
            <p className="text-muted-foreground">
              {cartItemsCount} item{cartItemsCount !== 1 ? "s" : ""} • Total: R$ {total.toFixed(2).replace(".", ",")}
            </p>
          </div>
        </div>

        {/* Checkout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleOrderSubmit} isLoading={isLoading} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary items={cart} subtotal={cartTotal} shipping={shipping} total={total} />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-sm">SSL Seguro</h3>
              <p className="text-xs text-muted-foreground">Dados criptografados</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-sm">Pagamento Seguro</h3>
              <p className="text-xs text-muted-foreground">Múltiplas opções</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-sm">Entrega Rápida</h3>
              <p className="text-xs text-muted-foreground">Até 7 dias úteis</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75 9.75 9.75 0 019.75-9.75z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-sm">Suporte 24/7</h3>
              <p className="text-xs text-muted-foreground">Sempre disponível</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
