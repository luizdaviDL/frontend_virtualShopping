"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProductGallery({ images, productName }) {
  const [mainImage, setMainImage] = useState(0)
  const [thumbnails, setThumbnails] = useState(images.slice(1))

  const handleThumbnailClick = (clickedIndex) => {
    const actualIndex = clickedIndex + 1 // Since thumbnails start from index 1
    const currentMainImage = images[mainImage]

    // Create new images array with swapped positions
    const newImages = [...images]
    newImages[mainImage] = images[actualIndex]
    newImages[actualIndex] = currentMainImage

    // Update main image to the clicked thumbnail
    setMainImage(actualIndex)

    // Update thumbnails array (excluding the new main image)
    const newThumbnails = newImages.filter((_, index) => index !== actualIndex)
    setThumbnails(newThumbnails)
  }

  const nextImage = () => {
    setMainImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setMainImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/4] overflow-hidden rounded-lg bg-muted">
        <img
          src={images[mainImage] || "/placeholder.svg?height=600&width=480"}
          alt={`${productName} - Imagem principal`}
          className="w-full h-full object-cover"
        />

        {/* Navigation arrows for mobile */}
        <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
          <Button variant="ghost" size="sm" onClick={prevImage} className="ml-2 bg-white/80 hover:bg-white">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
          <Button variant="ghost" size="sm" onClick={nextImage} className="mr-2 bg-white/80 hover:bg-white">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Image counter for mobile */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm md:hidden">
          {mainImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails - Desktop */}
      <div className="hidden md:block">
        <div className="grid grid-cols-4 gap-2">
          {thumbnails.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className="aspect-square overflow-hidden rounded-md bg-muted hover:opacity-75 transition-opacity"
            >
              <img
                src={image || "/placeholder.svg?height=120&width=120"}
                alt={`${productName} - Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Thumbnails - Mobile (horizontal scroll) */}
      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImage(index)}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-md bg-muted transition-all ${
                index === mainImage ? "ring-2 ring-primary" : "hover:opacity-75"
              }`}
            >
              <img
                src={image || "/placeholder.svg?height=64&width=64"}
                alt={`${productName} - Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
