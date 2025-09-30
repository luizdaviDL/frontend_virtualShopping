"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Truck, ShieldCheck } from "lucide-react"

export function CartSummary({ subtotal, shipping, total, itemsCount, onCheckout, isLoading }) {
  const formatPrice = (price) => `R$ ${price.toFixed(2).replace(".", ",")}`

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items Summary */}
        <div className="flex justify-between text-sm">
          <span>
            {itemsCount} item{itemsCount !== 1 ? "s" : ""}
          </span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span>Frete</span>
          </div>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "Grátis" : formatPrice(shipping)}
          </span>
        </div>

        {/* Free Shipping Progress */}
        {subtotal < 99 && (
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Frete Grátis</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Adicione mais {formatPrice(99 - subtotal)} para ganhar frete grátis!
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((subtotal / 99) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-black">{formatPrice(total)}</span>
        </div>

        {/* Security Badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span>Compra 100% segura</span>
        </div>

        {/* Checkout Button */}
        <Button onClick={onCheckout} disabled={isLoading || itemsCount === 0} className="w-full" size="lg">
          {isLoading ? "Processando..." : "Finalizar Compra"}
        </Button>

        {/* Continue Shopping */}
        <Button variant="outline" asChild className="w-full bg-transparent">
          <a href="/produtos">Continuar Comprando</a>
        </Button>

        {/* Payment Methods */}
        <div className="pt-4 border-t">
          <p className="text-sm font-medium mb-2">Formas de pagamento</p>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 bg-muted rounded">PIX</span>
            <span className="px-2 py-1 bg-muted rounded">Cartão</span>
            <span className="px-2 py-1 bg-muted rounded">Boleto</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
