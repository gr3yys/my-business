// Product details page
'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import products from '../../../data/products'
import { useCart } from '../../../context/CartContext'
import '../../../styles/globals.css'
import Navbar from '../../../components/Navbar'
import { assets } from '../../../assets/assets'

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) return <p>Product not found</p>

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: parseInt(quantity) })
  }

  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  return (
    <>
      <Navbar />
      <div className="p-6 flex flex-col md:flex-row gap-8 m-5">
        {/* Left side (Back arrow + Image) */}
        <div className="md:w-1/2 flex flex-col">
          {/* Back arrow */}
          <div className="flex items-center gap-2 mb-4 cursor-pointer"
            onClick={handleBack}
          >
            <Image src={assets.back_arrow} alt="Back Arrow" className="w-6 h-6" />
            <span className='text-[#f39493]'>Back</span>
          </div>
          {/* Image */}
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            className="rounded w-full h-auto"
          />
        </div>

        {/* Right side - Details */}
        <div className="md:w-1/2">
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
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value) || 1)
                setQuantity(value)
              }}
              className="border px-2 py-1 rounded w-20"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-[#f39493] text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  )
}
