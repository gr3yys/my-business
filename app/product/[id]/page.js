// Product details page
'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import products from '../../../data/products'
import { useCart } from '../../../context/CartContext'

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))
  const { addToCart } = useCart()

  if (!product) return <p>Product not found</p>

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
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  )
}
