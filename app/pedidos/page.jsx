"use client"

import { useState,useEffect  } from "react"
//import {Header} from "../../components/header"
import Footer from "../../components/Footer"
import { useStore } from "../../contexts/store-context"
import { User, Package, Heart, Settings, LogOut, Eye, EyeOff } from "lucide-react"
import { apiRequest } from "@/data/products"
import {UserInformation} from "../conta/UserInformation"

export default function AccountPage() {
  const { state, dispatch } = useStore()
  const [activeTab, setActiveTab] = useState("profile")
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [profileData, setProfileData] = useState({
    id: state.id || "",
    name: state.name || "",
    email: state.email || "",
    password: state.password || "",
    address: state.address || "",
    cep: state.cep || "",
    numberHome: state.numberHome || "",
    complementAddress: state.complementAddress || "",
    neighborhood: state.neighborhood || "",
    city: state.city || "",
    state: state.state || "",
    client: state.client || "",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }


  const handleCancelEdit = () => {
    setProfileData({
      id: state.id || "",
      name: state.user.name || "",
      email: state.user.email || "",
      password: state.user.password || "",
      address: state.address || "",
      cep: state.cep || "",
      numberHome: state.numberHome || "",
      complementAddress: state.complementAddress || "",
      neighborhood: state.neighborhood || "",
      city: state.city || "",
      state: state.state || "",
      client: state.client || "",
    })
    setIsEditing(false)
  }

  const handleLogin = async(e) => {
    e.preventDefault()
    
    const requestClient = await apiRequest({
      url: `http://localhost:8081/client/login`, // ou a URL correta do seu login
      method: "POST",
      data: {
        email: formData.email,
        password: formData.password
      },
      actionName: "fazer login"
    })

    let requestClientAdress = null;
    
    
    if (requestClient?.success && requestClient.data?.id) {
      requestClientAdress = await apiRequest({
        url: `http://localhost:8081/clientAdress/client/${requestClient.data.id}`, // ou a URL correta do seu login
        method: "GET",
        data: {
          email: formData.email,
          password: formData.password
        },
        actionName: "fazer login"
      })
    }

    if (requestClientAdress?.success && requestClientAdress.data?.length > 0) {
        //const endereco = handleclientAdress(requestClientAdress.data);

        const userData = {
          id: requestClient.data.id,
          name: requestClient.data.name,
          email: requestClient.data.email,
          phone: requestClient.data.email,  // ajuste se tiver telefone real
          adressList: requestClientAdress
          /*cep: endereco.cep,
          state: endereco.state,
          adressClient: endereco.adressClient,
          houseNumber: endereco.houseNumber,
          complement: endereco.complement,
          neighborhood: endereco.neighborhood,
          city: endereco.city*/
    };

      dispatch({ type: "SET_USER", payload: userData })
      //alert("Login realizado com sucesso!")*/
    }


  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem")
      return
    }
    const userData = {      
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
    try {
      const savedUser = await apiRequest({
        url: "http://localhost:8081/client/save",
        method: "POST",
        data: userData,
        actionName: "create account"
      });

      dispatch({ type: "SET_USER", payload: savedUser });
      setProfileData({
          name: state.user.name || "",
          email: data.email || "",
          password: "", // nunca traga a senha!
          address: data.address || "",
          cep: data.cep || "",
          numberHome: data.numberHome || "",
          complementAddress: data.complementAddress || "",
          neighborhood: data.neighborhood || "",
          city: data.city || "",
          state: data.state || "",
          client: data.client || "",
          phone: data.phone || ""
        })
      alert("Conta criada com sucesso!");
    } catch (err) {
      alert(err.message);
    }
  }

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null })
    setFormData({ name: "", email: "", passWord: "", confirmPassword: "" })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "processando":
        return "text-yellow-600 bg-yellow-50"
      case "enviado":
        return "text-blue-600 bg-blue-50"
      case "entregue":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "processando":
        return "Processando"
      case "enviado":
        return "Enviado"
      case "entregue":
        return "Entregue"
      default:
        return "Pendente"
    }
  }

  const handleclientAdress = function(e) {
    if (!e || e.length === 0) return null; // trata lista vazia ou indefinida

    const firstAdress = e[0];

    const datas = {
      cep: firstAdress.cep || '',
      state: firstAdress.state || '',
      email: firstAdress.email || '',          // Se existir email nesse objeto
      adressClient: firstAdress.adress || '',
      houseNumber: firstAdress.numberHome || '',
      complement: firstAdress.complement || '',
      neighborhood: firstAdress.neighborhood || '',
      city: firstAdress.city || ''
    };

    return datas; // retorna o objeto preenchido
  };


  if (!state.user) {
    return (
      <div className="min-h-screen">
       
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-serif font-bold mb-2">
                  {isLogin ? "Entrar na sua conta" : "Criar nova conta"}
                </h1>                
              </div>

              <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Digite seu nome"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Digite seu e-mail"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Senha</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring pr-10"
                      placeholder="Digite sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirmar senha</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Confirme sua senha"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  {isLogin ? "Entrar" : "Criar Conta"}
                </button>
              </form>

              <div className="text-center mt-6">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isLogin ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Faça login"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-medium">{state.user.name}</h2>
                  <p className="text-sm text-muted-foreground">{state.user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  <User className="h-4 w-4" />
                  Meu Perfil
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  Meus Pedidos
                </button>

                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === "favorites" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  Favoritos
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  Configurações
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
             
              <UserInformation state={state}/>
            )}

            {activeTab === "orders" && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-serif font-bold mb-6">Meus Pedidos</h2>

                {state.orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhum pedido ainda</h3>
                    <p className="text-muted-foreground mb-6">Quando você fizer um pedido, ele aparecerá aqui.</p>
                    <a
                      href="/produtos"
                      className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Começar a Comprar
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.orders.map((order) => (
                      <div key={order.id} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">Pedido #{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.name} - {item.size} - {item.color} (x{item.quantity})
                              </span>
                              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-border">
                          <span className="font-medium">Total: R$ {order.total.toFixed(2)}</span>
                          <button className="text-sm text-primary hover:underline">Ver detalhes</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-serif font-bold mb-6">Meus Favoritos</h2>

                {state.favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhum favorito ainda</h3>
                    <p className="text-muted-foreground mb-6">
                      Adicione produtos aos favoritos para encontrá-los facilmente.
                    </p>
                    <a
                      href="/produtos"
                      className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Explorar Produtos
                    </a>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {state.products
                      .filter((product) => state.favorites.includes(product.id))
                      .map((product) => (
                        <div key={product.id} className="border border-border rounded-lg p-4">
                          <div className="aspect-square bg-muted rounded-md mb-3 overflow-hidden">
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                          <p className="text-sm font-bold">R$ {product.price.toFixed(2)}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-serif font-bold mb-6">Configurações</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Notificações</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Receber e-mails sobre novos produtos</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Receber e-mails sobre promoções</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Receber SMS sobre status do pedido</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Privacidade</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Permitir cookies para melhorar a experiência</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Compartilhar dados para personalização</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Alterar Senha</h3>
                    <div className="space-y-4 max-w-md">
                      <input
                        type="password"
                        placeholder="Senha atual"
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <input
                        type="password"
                        placeholder="Nova senha"
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <input
                        type="password"
                        placeholder="Confirmar nova senha"
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        Alterar Senha
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}