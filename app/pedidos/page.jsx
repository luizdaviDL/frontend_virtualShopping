"use client"

import { useState, useEffect } from "react"
import { OrderCard } from "@/components/order-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/contexts/store-context"
import { useToast } from "@/hooks/use-toast"
import { Package, ShoppingBag, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFetch } from "@/data/products"


export default function OrdersPage() {
  const router = useRouter()

  const [orders, setOrders] = useState([])
  const {data: ordersFetch, loading, error} = useFetch('http://localhost:8081/clientAdress/getAll')
  useEffect(() => {
    if (ordersFetch) {
      setOrders(ordersFetch)
    }
  }, [ordersFetch])

  const { toast } = useToast()
  const [statusFilter, setStatusFilter] = useState("all")

  const handleStatusUpdate = (orderId, newStatus) => {

    updateOrderStatus(orderId, newStatus)
    toast({
      title: "Status atualizado",
      description: `O pedido ${orderId} foi atualizado para "${newStatus}".`,
    })
  }

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "all") return true
    return order.status === statusFilter
  })

  const statusCounts = {
    all: orders.length,
    Processando: orders.filter((o) => o.status === "Processando").length,
    Enviado: orders.filter((o) => o.status === "Enviado").length,
    Entregue: orders.filter((o) => o.status === "Entregue").length,
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
              Meus Pedidos
            </h1>
            <p className="text-muted-foreground">Acompanhe o status dos seus pedidos</p>
          </div>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Nenhum pedido encontrado</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Você ainda não fez nenhum pedido. Que tal dar uma olhada na nossa coleção?
            </p>
            <Button asChild size="lg">
              <Link href="/produtos">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Explorar Produtos
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Status Filter */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Filtrar por Status</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={statusFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("all")}
                    className={statusFilter !== "all" ? "bg-transparent" : ""}
                  >
                    Todos
                    <Badge variant="secondary" className="ml-2">
                      {statusCounts.all}
                    </Badge>
                  </Button>

                  <Button
                    variant={statusFilter === "Processando" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("Processando")}
                    className={statusFilter !== "Processando" ? "bg-transparent" : ""}
                  >
                    Processando
                    <Badge variant="secondary" className="ml-2">
                      {statusCounts.Processando}
                    </Badge>
                  </Button>

                  <Button
                    variant={statusFilter === "Enviado" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("Enviado")}
                    className={statusFilter !== "Enviado" ? "bg-transparent" : ""}
                  >
                    Enviado
                    <Badge variant="secondary" className="ml-2">
                      {statusCounts.Enviado}
                    </Badge>
                  </Button>

                  <Button
                    variant={statusFilter === "Entregue" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("Entregue")}
                    className={statusFilter !== "Entregue" ? "bg-transparent" : ""}
                  >
                    Entregue
                    <Badge variant="secondary" className="ml-2">
                      {statusCounts.Entregue}
                    </Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nenhum pedido encontrado</h3>
                <p className="text-muted-foreground">Não há pedidos com o status "{statusFilter}" no momento.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((order) => (
                    <OrderCard key={order.id} order={order} onStatusUpdate={handleStatusUpdate} />
                  ))}
              </div>
            )}

            {/* Help Section */}
            <Card className="mt-12">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Precisa de Ajuda?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Status dos Pedidos</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong>Processando:</strong> Seu pedido foi confirmado e está sendo preparado.
                      </p>
                      <p>
                        <strong>Enviado:</strong> Seu pedido saiu do nosso estoque e está a caminho.
                      </p>
                      <p>
                        <strong>Entregue:</strong> Seu pedido foi entregue com sucesso.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Dúvidas Frequentes</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Prazo de entrega: até 7 dias úteis</p>
                      <p>• Frete grátis para compras acima de R$ 99</p>
                      <p>• Trocas e devoluções em até 30 dias</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t">
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link href="/contato">Entrar em Contato</Link>
                  </Button>
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link href="/produtos">Fazer Novo Pedido</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
