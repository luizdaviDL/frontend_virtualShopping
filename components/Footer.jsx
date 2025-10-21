import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-secondary mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold">Moda</h3>
            <p className="text-sm text-muted-foreground">
              Descubra as últimas tendências da moda feminina com qualidade e estilo únicos.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Comprar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/produtos" className="hover:text-foreground transition-colors">
                  Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="/vestidos" className="hover:text-foreground transition-colors">
                  Vestidos
                </Link>
              </li>
              <li>
                <Link href="/blusas" className="hover:text-foreground transition-colors">
                  Blusas
                </Link>
              </li>
              <li>
                <Link href="/calcas" className="hover:text-foreground transition-colors">
                  Calças
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-medium">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contato" className="hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/trocas" className="hover:text-foreground transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/entrega" className="hover:text-foreground transition-colors">
                  Entrega
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Receba novidades e ofertas exclusivas</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-3 py-2 bg-background border border-border rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md text-sm hover:bg-primary/90 transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Moda Store. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
