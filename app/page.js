// app/page.js (Home Component)
'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import Navbar from '@/components/Navbar' // add this!

export default function Home() {
  const { addToCart } = useCart()
  const [query, setQuery] = useState('') // 👈 add query state here

  // ✅ Filter products based on query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <Navbar query={query} setQuery={setQuery} /> {/* 👈 pass props */}
      <main className="min-h-screen p-6 bg-gray-100">
        <div className="max-w-6xl mx-auto mt-6">
          <h1 className="text-3xl font-bold mb-4">Our Products</h1>

          {/* 🛍 Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className="bg-white p-4 rounded shadow">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                    <h2 className="text-xl font-semibold hover:underline">{product.name}</h2>
                  </Link>
                  <p className="text-gray-700">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  )
}
