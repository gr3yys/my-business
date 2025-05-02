// Navbar.js
'use client'
import '../styles/globals.css'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { assets } from '../assets/assets'

export default function Navbar({ onSearch }) {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="w-full bg-[#FFFCF8] px-5 lg:px-8 xl:px-[8%] flex items-center justify-between z-50 shadow py-4 sticky top-0">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 text-xl font-bold text-[#f39493]">
        Tejido a Mano
      </Link>

      {/* Right Side */}
      <div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
        {/* Home Icon */}
        <Link href="/" className='flex'>
          <Image src={assets.home_icon} alt='Home' className='w-6' />
        </Link>

        {/* Search Icon */}
        <button onClick={onSearch} className='flex'>
          <Image src={assets.search} alt='Search' className='w-6' />
        </button>

        {/* Cart Icon */}
        <Link href="/cart" className='relative flex'>
          <Image src={assets.shopping_bag} alt='Cart' className='w-6' />
          {totalItems > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}
