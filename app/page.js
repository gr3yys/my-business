// app/page.js (Home Component)
'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

export default function Home() {
  const { addToCart } = useCart()
  const [query, setQuery] = useState('')
  const [showSearchInput, setShowSearchInput] = useState(false)
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (showSearchInput && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearchInput])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <Navbar
        query={query}
        setQuery={setQuery}
        onSearch={() => setShowSearchInput(prev => !prev)}
        showMobileSearch={showSearchInput}
      />

      {/* Jumbotron */}
      <section className="bg-cover bg-no-repeat bg-blend-multiply"
        style={{ backgroundImage: "url('/assets/bg.png')" }}
      >
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-3xl md:text-4xl font-extrabold tracking-tight leading-none text-gray-700 lg:text-6xl">Handcrafted Crochet with Love</h1>
          <p className="mb-8 text-md font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48">Each piece a unique expression of creativity, blending intricate design with the warmth of handmade artistry. Every stitch is made with care, turning simple threads into lasting works of art.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#f39493] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Shop now
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
              </svg>
            </a>
            <a href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
              Learn more
            </a>
          </div>
        </div>
      </section>

      <main className="min-h-screen p-6 bg-[#FFFCF8]">
        <div className="max-w-6xl mx-auto mt-6">
          <h1 className="text-3xl font-bold mb-4 m-6">Our Products</h1>

          {/* Search Input */}
          {showSearchInput && (
            <div className="px-6 mb-4">
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div className="m-6 sm:m-10 md:m-4 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                  </Link>
                  <p className="text-gray-700">${product.price.toFixed(2)}</p>

                  <button
                    onClick={() => {
                      const { quantity, ...cleanProduct } = product
                      addToCart({ ...cleanProduct, quantity: 1 })
                      toast.success(`${product.name} added to cart!`)
                    }}
                    className="mt-2 bg-[#f39493] text-white px-4 py-2 rounded hover:bg-[#f39493]"
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
