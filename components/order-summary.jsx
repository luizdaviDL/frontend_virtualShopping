"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function OrderSummary({ items, subtotal, shipping, total }) {
  const formatPrice = (price) => `R$ ${price.toFixed(2).replace(".", ",")}`

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.cartId} className="flex gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={item.image || "/placeholder.svg?height=64&width=64"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                <div className="flex flex-wrap gap-1 mt-1">
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
                  <span className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Pricing Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} itens)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Frete</span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
              {shipping === 0 ? "Grátis" : formatPrice(shipping)}
            </span>
          </div>

          {shipping === 0 && subtotal >= 99 && (
            <p className="text-xs text-green-600 bg-green-50 p-2 rounded">🎉 Você ganhou frete grátis!</p>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-muted-foreground">{formatPrice(total)}</span>
        </div>

        {/* Security Info */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Compra 100% segura e protegida</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Seus dados pessoais e de pagamento estão criptografados e protegidos.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
