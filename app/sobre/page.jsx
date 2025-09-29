export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nossa <span className="text-accent">História</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Criamos moda que inspira confiança e expressa a personalidade única de cada mulher.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Moda com Propósito</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A LojaStyle nasceu da paixão por criar peças que combinam estilo, qualidade e conforto. Acreditamos que
                cada mulher merece se sentir confiante e elegante, independentemente da ocasião.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nossa missão é democratizar a moda de qualidade, oferecendo peças cuidadosamente selecionadas que
                atendem aos mais diversos estilos e personalidades.
              </p>
            </div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img src="assets/images/instagram-placeholder-5.png" alt="Nossa loja" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Paixão pela Moda</h3>
              <p className="text-muted-foreground">
                Cada peça é escolhida com carinho, pensando no bem-estar e estilo de nossas clientes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualidade Garantida</h3>
              <p className="text-muted-foreground">
                Trabalhamos apenas com fornecedores confiáveis e materiais de alta qualidade.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Atendimento Especial</h3>
              <p className="text-muted-foreground">
                Nossa equipe está sempre pronta para ajudar você a encontrar o look perfeito.
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">Sustentabilidade</h3>
                <p className="text-sm text-muted-foreground">
                  Comprometidas com práticas sustentáveis e responsabilidade ambiental.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Inclusividade</h3>
                <p className="text-sm text-muted-foreground">
                  Moda para todas as mulheres, celebrando a diversidade e individualidade.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Inovação</h3>
                <p className="text-sm text-muted-foreground">
                  Sempre em busca das últimas tendências e tecnologias para melhor atendê-las.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Transparência</h3>
                <p className="text-sm text-muted-foreground">
                  Relacionamento honesto e transparente com nossas clientes e parceiros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
