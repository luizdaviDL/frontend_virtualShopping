export const products = [
  {
    id: 1,
    name: "Vestido Floral Elegante",
    price: 89.9,
    images: [
      "/elegant-floral-dress-front-view.jpg",
      "/elegant-floral-dress-back-view.jpg",
      "/elegant-floral-dress-side-view.jpg",
      "/elegant-floral-dress-detail.jpg",
    ],
    colors: [
      { name: "Rosa", value: "#F8BBD9" },
      { name: "Azul", value: "#A8DADC" },
      { name: "Verde", value: "#B8E6B8" },
    ],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Vestido floral elegante perfeito para ocasiões especiais. Tecido leve e confortável com estampa delicada.",
    category: "vestidos",
  },
  {
    id: 2,
    name: "Blusa Básica Premium",
    price: 45.9,
    images: [
      "/premium-basic-blouse-white.jpg",
      "/premium-basic-blouse-black.jpg",
      "/premium-basic-blouse-beige.jpg",
      "/premium-basic-blouse-detail.jpg",
    ],
    colors: [
      { name: "Branco", value: "#FFFFFF" },
      { name: "Preto", value: "#000000" },
      { name: "Bege", value: "#F5F5DC" },
    ],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Blusa básica de alta qualidade, essencial para qualquer guarda-roupa. Tecido premium e corte perfeito.",
    category: "blusas",
  },
  {
    id: 3,
    name: "Calça Jeans Skinny",
    price: 129.9,
    images: [
      "/skinny-jeans-dark-blue-front.jpg",
      "/skinny-jeans-dark-blue-back.jpg",
      "/skinny-jeans-light-blue.jpg",
      "/skinny-jeans-detail.jpg",
    ],
    colors: [
      { name: "Azul Escuro", value: "#1E3A8A" },
      { name: "Azul Claro", value: "#60A5FA" },
      { name: "Preto", value: "#000000" },
    ],
    sizes: ["36", "38", "40", "42", "44"],
    description:
      "Calça jeans skinny com modelagem perfeita. Tecido de alta qualidade com elastano para maior conforto.",
    category: "calcas",
  },
  {
    id: 4,
    name: "Casaco Tricot Aconchegante",
    price: 159.9,
    images: [
      "/cozy-knit-cardigan-cream.jpg",
      "/cozy-knit-cardigan-brown.jpg",
      "/cozy-knit-cardigan-detail.jpg",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: [
      { name: "Creme", value: "#F5F5DC" },
      { name: "Marrom", value: "#8B4513" },
      { name: "Cinza", value: "#808080" },
    ],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Casaco de tricot super aconchegante, perfeito para os dias mais frios. Textura macia e design atemporal.",
    category: "casacos",
  },
  {
    id: 5,
    name: "Saia Midi Plissada",
    price: 79.9,
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: [
      { name: "Marinho", value: "#1E3A8A" },
      { name: "Bege", value: "#F5F5DC" },
      { name: "Preto", value: "#000000" },
    ],
    sizes: ["P", "M", "G", "GG"],
    description: "Saia midi plissada elegante e versátil. Perfeita para looks casuais e formais.",
    category: "saias",
  },
  {
    id: 6,
    name: "Tênis Casual Confortável",
    price: 199.9,
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: [
      { name: "Branco", value: "#FFFFFF" },
      { name: "Preto", value: "#000000" },
      { name: "Rosa", value: "#F8BBD9" },
    ],
    sizes: ["35", "36", "37", "38", "39", "40"],
    description: "Tênis casual super confortável para o dia a dia. Solado anatômico e design moderno.",
    category: "calcados",
  },
]

export const categories = [
  { id: "todos", name: "Todos os Produtos" },
  { id: "vestidos", name: "Vestidos" },
  { id: "blusas", name: "Blusas" },
  { id: "calcas", name: "Calças" },
  { id: "casacos", name: "Casacos" },
  { id: "saias", name: "Saias" },
  { id: "calcados", name: "Calçados" },
]
