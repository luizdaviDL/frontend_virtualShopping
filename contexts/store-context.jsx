"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const StoreContext = createContext()

const initialState = {
  cart: [],
  orders: [],
  user: null,
}

function storeReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) =>
          item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size,
      )

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        }
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, cartId: Date.now() }],
      }

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.cartId === action.payload.cartId ? { ...item, quantity: Math.max(1, action.payload.quantity) } : item,
        ),
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.cartId !== action.payload.cartId),
      }

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      }

    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId ? { ...order, status: action.payload.status } : order,
        ),
      }

    case "LOAD_FROM_STORAGE":
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("store-data")
    if (stored) {
      try {
        const data = JSON.parse(stored)
        dispatch({ type: "LOAD_FROM_STORAGE", payload: data })
      } catch (error) {
        console.error("Error loading store data:", error)
      }
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("store-data", JSON.stringify(state))
  }, [state])

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  const updateCartQuantity = (cartId, quantity) => {
    dispatch({ type: "UPDATE_CART_QUANTITY", payload: { cartId, quantity } })
  }

  const removeFromCart = (cartId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { cartId } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const addOrder = (order) => {
    dispatch({ type: "ADD_ORDER", payload: order })
  }

  const updateOrderStatus = (orderId, status) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status } })
  }

  const cartTotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <StoreContext.Provider
      value={{
        ...state,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        addOrder,
        updateOrderStatus,
        cartTotal,
        cartItemsCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
