// app/page.js (Home Component)
'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import Navbar from '@/components/Navbar'

export default function Home() {
  const { addToCart } = useCart()
  const [query, setQuery] = useState('') 

  // Filter products based on query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <Navbar query={query} setQuery={setQuery} /> 
      <main className="min-h-screen p-6 bg-gray-100">
        <div className="max-w-6xl mx-auto mt-6">
          <h1 className="text-3xl font-bold mb-4 m-6">Our Products</h1>

          {/* Products */}
          <div className="m-6 sm:m-10 md:m-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className="bg-white p-4 rounded shadow">
                  <Link href={`/product/${product.id}`}>
                    <Image src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                  </Link>
                  <p className="text-gray-700">${product.price.toFixed(2)}</p>
                  <button onClick={() => addToCart(product)}
                    className="mt-2 bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--primary-hover)]"
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
