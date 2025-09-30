"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/contexts/store-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItemsCount } = useStore()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-foreground">
              Loja<span className="text-accent">Style</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors">
              Tendencias
            </Link>
            <Link href="/produtos" className="text-foreground hover:text-accent transition-colors">
              Produtos
            </Link>
           {/**
            *  <Link href="/sobre" className="text-foreground hover:text-accent transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="text-foreground hover:text-accent transition-colors">
              Contato
            </Link>
            */}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/pedidos"
              className="hidden sm:flex items-center text-foreground hover:text-accent transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link href="/carrinho" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/produtos"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Produtos
              </Link>
              <Link
                href="/pedidos"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Meus Pedidos
              </Link>
              <Link
                href="/sobre"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/contato"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
