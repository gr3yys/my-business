// Product details page
'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import products from '../../../data/products'
import { useCart } from '../../../context/CartContext'
import '@/styles/globals.css'

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) return <p>Product not found</p>

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: parseInt(quantity) })
  }

  return (
    <div className="p-6">
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        className="rounded mb-4"
      />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="my-4">{product.description}</p>
      <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>

      {/* Quantity Selector */}
      <div className="my-4">
        <label htmlFor="quantity" className="mr-2 font-medium">
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border px-2 py-1 rounded w-20"
        />
      </div>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  )
}
