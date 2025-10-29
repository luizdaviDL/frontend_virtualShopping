"use client"

import { useState } from "react"
//import {Header} from "../../components/header"
import Footer from "../../components/Footer"
import { useStore } from "../../contexts/store-context"
import { User, Package, Heart, Settings, LogOut, Eye, EyeOff } from "lucide-react"
import { apiRequest } from "@/data/products"

export default function AccountPage() {
  const { state, dispatch } = useStore()
  const [activeTab, setActiveTab] = useState("profile")
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passWord: "",
    confirmPassword: "",
  })
  const [profileData, setProfileData] = useState({
    name: state.user?.name || "",
    email: state.user?.email || "",
    passWord: state.user?.passWord || "",
    address: state.user?.address || "",
    cep: state.user?.cep || "",
    numberHome: state.user?.numberHome || "",
    complementAddress: state.user?.complementAddress || "",
    neighborhood: state.user?.neighborhood || "",
    city: state.user?.city || "",
    state: state.user?.state || "",
    client: state.user?.client || "",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    dispatch({ type: "UPDATE_USER", payload: profileData })
    setIsEditing(false)
    alert("Informações atualizadas com sucesso!")
  }

  const handleCancelEdit = () => {
    setProfileData({
      name: state.user?.name || "",
      email: state.user?.email || "",
      passWord: state.user?.passWord || "",
      address: state.user?.address || "",
      cep: state.user?.cep || "",
      numberHome: state.user?.numberHome || "",
      complementAddress: state.user?.complementAddress || "",
      neighborhood: state.user?.neighborhood || "",
      city: state.user?.city || "",
      state: state.user?.state || "",
      client: state.user?.client || "",
    })
    setIsEditing(false)
  }

const handleLogin = async (e) => {
  e.preventDefault()
  
  if (!formData.email || !formData.passWord) {
    alert("Por favor, preencha email e senha")
    return
  }

  const loginData = {
    email: formData.email,
    password: formData.passWord
  }

  try {
    console.log("🚀 Iniciando login...");
    
    const response = await apiRequest({
      url: "http://localhost:8081/client/login",
      method: "POST",
      data: loginData,
      actionName: "login"
    })

    console.log("📋 Resposta completa:", response);

    // Diferentes formas de extrair os dados do usuário
    let userData;

    // Caso 1: Resposta direta (quando o cliente é a própria resposta)
    if (response && response.id) {
      userData = {
        id: response.id,
        name: response.name,
        email: response.email,
        token: response.token,
        joinDate: new Date().toISOString(),
      }
    }
    // Caso 2: Resposta com objeto client (estrutura esperada)
    else if (response && response.client) {
      userData = {
        id: response.client.id,
        name: response.client.name,
        email: response.client.email,
        token: response.token,
        joinDate: new Date().toISOString(),
      }
    }
    // Caso 3: Resposta com dados em outras propriedades
    else if (response) {
      userData = {
        id: response.id || response.userId || Date.now(),
        name: response.name || response.nome || "Usuário",
        email: response.email || response.emailAddress || formData.email,
        token: response.token || response.accessToken,
        joinDate: new Date().toISOString(),
      }
    } else {
      throw new Error("Resposta da API vazia ou inválida")
    }

    console.log("👤 Dados do usuário preparados:", userData);
    
    dispatch({ type: "SET_USER", payload: userData })
    alert("Login realizado com sucesso!")
    
    // Limpa o formulário após login bem-sucedido
    setFormData({
      name: "",
      email: "",
      passWord: "",
      confirmPassword: "",
    })
  } catch (err) {
    console.error("❌ Erro detalhado no login:", err)
    alert(err.message || "Erro ao fazer login. Verifique suas credenciais.")
  }
}

  const handleRegister = async (e) => {
    e.preventDefault()
    if (formData.passWord !== formData.confirmPassword) {
      alert("As senhas não coincidem")
      return
    }
    const userData = {      
      name: formData.name,
      email: formData.email,
      password: formData.passWord
    }
    try {
      const savedUser = await apiRequest({
        url: "http://localhost:8081/client/save",
        method: "POST",
        data: userData,
        actionName: "criação de conta"
      });

      dispatch({ type: "SET_USER", payload: savedUser });
      alert("Conta criada com sucesso!");
    } catch (err) {
      alert(err.message);
    }
  }

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null })
    setFormData({ name: "", email: "", password: "", confirmPassword: "" })
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
                      name="passWord"
                      value={formData.passWord}
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

}
