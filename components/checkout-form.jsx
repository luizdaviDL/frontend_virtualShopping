"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, FileText, MapPin, User } from "lucide-react"

export function CheckoutForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Address
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    // Payment
    paymentMethod: "pix",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields validation
    const requiredFields = {
      firstName: "Nome é obrigatório",
      lastName: "Sobrenome é obrigatório",
      email: "E-mail é obrigatório",
      phone: "Telefone é obrigatório",
      zipCode: "CEP é obrigatório",
      address: "Endereço é obrigatório",
      number: "Número é obrigatório",
      neighborhood: "Bairro é obrigatório",
      city: "Cidade é obrigatória",
      state: "Estado é obrigatório",
    }

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field].trim()) {
        newErrors[field] = message
      }
    })

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    // Phone validation (basic)
    if (formData.phone && formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Telefone inválido"
    }

    // CEP validation (basic)
    if (formData.zipCode && formData.zipCode.replace(/\D/g, "").length !== 8) {
      newErrors.zipCode = "CEP deve ter 8 dígitos"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  const formatZipCode = (value) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, "$1-$2")
    }
    return value
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Nome *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-destructive" : ""}
                placeholder="Seu nome"
              />
              {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <Label htmlFor="lastName">Sobrenome *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-destructive" : ""}
                placeholder="Seu sobrenome"
              />
              {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", formatPhone(e.target.value))}
                className={errors.phone ? "border-destructive" : ""}
                placeholder="(11) 99999-9999"
                maxLength={15}
              />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
            </div>
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="zipCode">CEP *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", formatZipCode(e.target.value))}
                className={errors.zipCode ? "border-destructive" : ""}
                placeholder="00000-000"
                maxLength={9}
              />
              {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Endereço *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={errors.address ? "border-destructive" : ""}
                placeholder="Rua, Avenida, etc."
              />
              {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="number">Número *</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => handleInputChange("number", e.target.value)}
                className={errors.number ? "border-destructive" : ""}
                placeholder="123"
              />
              {errors.number && <p className="text-sm text-destructive mt-1">{errors.number}</p>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={formData.complement}
                onChange={(e) => handleInputChange("complement", e.target.value)}
                placeholder="Apartamento, bloco, etc. (opcional)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="neighborhood">Bairro *</Label>
              <Input
                id="neighborhood"
                value={formData.neighborhood}
                onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                className={errors.neighborhood ? "border-destructive" : ""}
                placeholder="Seu bairro"
              />
              {errors.neighborhood && <p className="text-sm text-destructive mt-1">{errors.neighborhood}</p>}
            </div>

            <div>
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={errors.city ? "border-destructive" : ""}
                placeholder="Sua cidade"
              />
              {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
            </div>

            <div>
              <Label htmlFor="state">Estado *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value.toUpperCase())}
                className={errors.state ? "border-destructive" : ""}
                placeholder="SP"
                maxLength={2}
              />
              {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Forma de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleInputChange("paymentMethod", value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix" className="flex items-center gap-3 cursor-pointer flex-1">
                <Smartphone className="h-5 w-5 text-sm" />
                <div>
                  <p className="font-medium">PIX</p>
                  <p className="text-sm text-muted-foreground">Aprovação instantânea</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <RadioGroupItem value="credit" id="credit" />
              <Label htmlFor="credit" className="flex items-center gap-3 cursor-pointer flex-1">
                <CreditCard className="h-5 w-5 text-sm" />
                <div>
                  <p className="font-medium">Cartão de Crédito</p>
                  <p className="text-sm text-muted-foreground">Parcelamento disponível</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <RadioGroupItem value="boleto" id="boleto" />
              <Label htmlFor="boleto" className="flex items-center gap-3 cursor-pointer flex-1">
                <FileText className="h-5 w-5 text-sm" />
                <div>
                  <p className="font-medium">Boleto Bancário</p>
                  <p className="text-sm text-muted-foreground">Vencimento em 3 dias úteis</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full" size="lg">
        {isLoading ? "Processando Pedido..." : "Finalizar Compra"}
      </Button>
    </form>
  )
}
