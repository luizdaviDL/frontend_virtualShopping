"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/contexts/store-context"
import { CheckCircle, Package, Truck, MapPin, CreditCard, Calendar, ArrowRight } from "lucide-react"

export default function OrderConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const { orders } = useStore()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const foundOrder = orders.find((o) => o.id === params.id)
    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      router.push("/pedidos")
    }
  }, [params.id, orders, router])

  const formatPrice = (price) => `R$ ${price.toFixed(2).replace(".", ",")}`

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPaymentMethodName = (method) => {
    const methods = {
      pix: "PIX",
      credit: "Cartão de Crédito",
      boleto: "Boleto Bancário",
    }
    return methods[method] || method
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando pedido...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Pedido <span className="text-accent">Confirmado!</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Obrigada por escolher nossa loja! Seu pedido foi recebido e está sendo processado.
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {order.id}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Status do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Package className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{order.status}</p>
                    <p className="text-sm text-muted-foreground">Pedido realizado em {formatDate(order.date)}</p>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Pedido Confirmado</p>
                      <p className="text-sm text-muted-foreground">Pagamento aprovado</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <Package className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Processando</p>
                      <p className="text-sm text-muted-foreground">Preparando seu pedido</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Enviado</p>
                      <p className="text-sm text-muted-foreground">Em breve</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Itens do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
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
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-muted-foreground">Qtd: {item.quantity}</span>
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{order.customer.name}</p>
                  <p>
                    {order.address.address}, {order.address.number}
                    {order.address.complement && `, ${order.address.complement}`}
                  </p>
                  <p>
                    {order.address.neighborhood} - {order.address.city}/{order.address.state}
                  </p>
                  <p>CEP: {order.address.zipCode}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Resumo do Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.payment.subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span className={order.payment.shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {order.payment.shipping === 0 ? "Grátis" : formatPrice(order.payment.shipping)}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">{formatPrice(order.payment.total)}</span>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Forma de pagamento:</strong> {getPaymentMethodName(order.payment.method)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximos Passos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">1</span>
                    </div>
                    <p>Você receberá um e-mail de confirmação em breve</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">2</span>
                    </div>
                    <p>Seu pedido será processado em até 1 dia útil</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">3</span>
                    </div>
                    <p>Você receberá o código de rastreamento quando o pedido for enviado</p>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button asChild className="w-full">
                    <Link href="/pedidos">
                      Ver Meus Pedidos
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>

                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/produtos">Continuar Comprando</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
