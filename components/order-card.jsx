"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp, Package, Truck, CheckCircle, Clock } from "lucide-react"

export function OrderCard({ order, onStatusUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatPrice = (price) => `R$ ${price.toFixed(2).replace(".", ",")}`

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processando":
        return <Clock className="h-4 w-4" />
      case "Enviado":
        return <Truck className="h-4 w-4" />
      case "Entregue":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Processando":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Enviado":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Entregue":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "Processando":
        return "Enviado"
      case "Enviado":
        return "Entregue"
      default:
        return null
    }
  }

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus(order.status)
    if (nextStatus && onStatusUpdate) {
      onStatusUpdate(order.id, nextStatus)
    }
  }

  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">{order.id}</h3>
              <Badge className={`${getStatusColor(order.status)} border`}>
                <span className="flex items-center gap-1">
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
              <span>Pedido realizado em {formatDate(order.date)}</span>
              <span className="hidden sm:inline">•</span>
              <span>
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="font-semibold text-accent">{formatPrice(order.payment.total)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Demo: Status Update Button */}
            {getNextStatus(order.status) && (
              <Button variant="outline" size="sm" onClick={handleStatusUpdate} className="bg-transparent">
                Simular: {getNextStatus(order.status)}
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2"
            >
              {isExpanded ? "Ocultar" : "Ver"} Detalhes
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <Separator className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Items */}
            <div>
              <h4 className="font-semibold mb-4">Itens do Pedido</h4>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg?height=64&width=64"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm line-clamp-2">{item.name}</h5>
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
                        <span className="text-xs text-muted-foreground">Qtd: {item.quantity}</span>
                        <span className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-semibold mb-3">Informações do Cliente</h4>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-muted-foreground">{order.customer.email}</p>
                  <p className="text-muted-foreground">{order.customer.phone}</p>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h4 className="font-semibold mb-3">Endereço de Entrega</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    {order.address.address}, {order.address.number}
                    {order.address.complement && `, ${order.address.complement}`}
                  </p>
                  <p>
                    {order.address.neighborhood} - {order.address.city}/{order.address.state}
                  </p>
                  <p>CEP: {order.address.zipCode}</p>
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <h4 className="font-semibold mb-3">Resumo do Pagamento</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.payment.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className={order.payment.shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {order.payment.shipping === 0 ? "Grátis" : formatPrice(order.payment.shipping)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-black">{formatPrice(order.payment.total)}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-muted-foreground">
                      <strong>Pagamento:</strong>{" "}
                      {order.payment.method === "pix"
                        ? "PIX"
                        : order.payment.method === "credit"
                          ? "Cartão de Crédito"
                          : "Boleto Bancário"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-4">Status do Pedido</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.status === "Processando" || order.status === "Enviado" || order.status === "Entregue"
                      ? "bg-green-100"
                      : "bg-muted"
                  }`}
                >
                  <CheckCircle
                    className={`h-4 w-4 ${
                      order.status === "Processando" || order.status === "Enviado" || order.status === "Entregue"
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium">Pedido Confirmado</p>
                  <p className="text-sm text-muted-foreground">Pagamento aprovado</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.status === "Processando"
                      ? "bg-yellow-100"
                      : order.status === "Enviado" || order.status === "Entregue"
                        ? "bg-green-100"
                        : "bg-muted"
                  }`}
                >
                  <Clock
                    className={`h-4 w-4 ${
                      order.status === "Processando"
                        ? "text-yellow-600"
                        : order.status === "Enviado" || order.status === "Entregue"
                          ? "text-green-600"
                          : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium">Processando</p>
                  <p className="text-sm text-muted-foreground">Preparando seu pedido</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.status === "Enviado"
                      ? "bg-blue-100"
                      : order.status === "Entregue"
                        ? "bg-green-100"
                        : "bg-muted"
                  }`}
                >
                  <Truck
                    className={`h-4 w-4 ${
                      order.status === "Enviado"
                        ? "text-blue-600"
                        : order.status === "Entregue"
                          ? "text-green-600"
                          : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium">Enviado</p>
                  <p className="text-sm text-muted-foreground">
                    {order.status === "Enviado" || order.status === "Entregue"
                      ? "Produto a caminho"
                      : "Aguardando envio"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.status === "Entregue" ? "bg-green-100" : "bg-muted"
                  }`}
                >
                  <CheckCircle
                    className={`h-4 w-4 ${order.status === "Entregue" ? "text-green-600" : "text-muted-foreground"}`}
                  />
                </div>
                <div>
                  <p className="font-medium">Entregue</p>
                  <p className="text-sm text-muted-foreground">
                    {order.status === "Entregue" ? "Produto entregue com sucesso" : "Aguardando entrega"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
