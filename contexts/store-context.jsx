"use client"

import { createContext, useContext, useReducer, useEffect, useState } from "react"

const StoreContext = createContext()

// Sample product data
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Vestido Midi Floral",
    price: 89.9,
    originalPrice: 129.9,
    images: ["/elegant-floral-midi-dress-front-view.jpg", "/elegant-floral-midi-dress-back-view.jpg"],
    category: "Vestidos",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Floral Rosa", "Floral Azul"],
    description: "Vestido midi com estampa floral delicada, perfeito para ocasiões especiais.",
    inStock: true,
  },
  {
    id: 2,
    name: "Blusa Cropped Básica",
    price: 39.9,
    originalPrice: 59.9,
    images: ["/basic-cropped-top-white-front.jpg", "/basic-cropped-top-white-styled.jpg"],
    category: "Blusas",
    sizes: ["P", "M", "G"],
    colors: ["Branco", "Preto", "Bege"],
    description: "Blusa cropped básica, essencial para compor looks modernos.",
    inStock: true,
  },
  {
    id: 3,
    name: "Calça Wide Leg",
    price: 119.9,
    originalPrice: 159.9,
    images: ["/wide-leg-pants-beige-front-view.jpg", "/wide-leg-pants-beige-styled-look.jpg"],
    category: "Calças",
    sizes: ["36", "38", "40", "42"],
    colors: ["Bege", "Preto", "Caramelo"],
    description: "Calça wide leg de alfaiataria, elegante e confortável.",
    inStock: true,
  },
  {
    id: 4,
    name: "Conjunto Tricot",
    price: 149.9,
    originalPrice: 199.9,
    images: ["/knit-set-beige-cardigan-and-top.jpg", "/knit-set-beige-styled-outfit.jpg"],
    category: "Conjuntos",
    sizes: ["P", "M", "G"],
    colors: ["Bege", "Off White", "Camel"],
    description: "Conjunto de tricot com cardigan e top, perfeito para o inverno.",
    inStock: true,
  },
]

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      products: SAMPLE_PRODUCTS,
      cart: [],
      user: null,
      orders: [],
      favorites: [],
    }
  }

  return {
    products: SAMPLE_PRODUCTS,
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    user: JSON.parse(localStorage.getItem("user") || "null"),
    orders: JSON.parse(localStorage.getItem("orders") || "[]"),
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  }
}

function storeReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color,
      )

      let newCart
      if (existingItem) {
        newCart = state.cart.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        )
      } else {
        newCart = [...state.cart, { ...action.payload, cartId: Date.now() }]
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newCart))
      }
      return { ...state, cart: newCart }

    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter((item) => item.cartId !== action.payload)
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(filteredCart))
      }
      return { ...state, cart: filteredCart }

    case "UPDATE_CART_QUANTITY":
      const updatedCart = state.cart.map((item) =>
        item.cartId === action.payload.cartId ? { ...item, quantity: action.payload.quantity } : item,
      )
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart))
      }
      return { ...state, cart: updatedCart }

    case "CLEAR_CART":
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify([]))
      }
      return { ...state, cart: [] }

    case "SET_USER":
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload))
      }
      return { ...state, user: action.payload }

    case "UPDATE_USER":
      const updatedUser = { ...state.user, ...action.payload }
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }
      return { ...state, user: updatedUser }

    case "ADD_ORDER":
      const newOrders = [...state.orders, action.payload]
      if (typeof window !== "undefined") {
        localStorage.setItem("orders", JSON.stringify(newOrders))
      }
      return { ...state, orders: newOrders }

    case "UPDATE_ORDER_STATUS":
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.orderId ? { ...order, status: action.payload.status } : order,
      )
      if (typeof window !== "undefined") {
        localStorage.setItem("orders", JSON.stringify(updatedOrders))
      }
      return { ...state, orders: updatedOrders }

    case "TOGGLE_FAVORITE":
      const isFavorite = state.favorites.includes(action.payload)
      const newFavorites = isFavorite
        ? state.favorites.filter((id) => id !== action.payload)
        : [...state.favorites, action.payload]

      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(newFavorites))
      }
      return { ...state, favorites: newFavorites }

    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const [state, dispatch] = useReducer(storeReducer, getInitialState())

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return <div className="min-h-screen bg-background" />
  }

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
