'use client'

import '../styles/globals.css'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { assets } from '@/assets/assets'

export default function Navbar({ query, setQuery }) {
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sideMenuRef = useRef()

  const handleSearchChange = (e) => {
    setQuery(e.target.value)
  }

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="w-full bg-white px-5 lg:px-8 xl:px-[8%] flex items-center justify-between z-50 shadow py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-xl font-bold text-[var(--primary)]">
          Tejido a Mano
        </Link>

        {/* Right Side: Desktop nav + Mobile cart/menu */}
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          {/* Search (Desktop) */}
          <div className="hidden md:block">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search"
              className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-gray-700 hover:text-[var(--primary-hover)]">Home</Link>
            <Link href="/" className="text-gray-700 hover:text-[var(--primary-hover)]">Shop</Link>
            <Link href="/cart" className="text-gray-700 hover:text-[var(--primary-hover)] flex gap-2">
              Cart ({cart.length})
            </Link>
          </div>

          {/* Cart Icon (Mobile) */}
          <Link href="/" className='flex md:hidden'>
            <Image src={assets.home_icon} alt='Home' className='w-6' />
          </Link>

          <Link href="/" className='flex md:hidden'>
            <Image src={assets.search} alt='Search' className='w-6' />
          </Link>

          <Link href="/cart" className="flex md:hidden">
            <Image src={assets.shopping_bag} alt='Cart' className='w-6' />
          </Link>

          {/* Hamburger Menu (Mobile) */}
          {/* <button className="block md:hidden ml-3" onClick={openMenu}>
            <Image src={assets.menu_black} alt="Menu" className="w-8" />
          </button> */}
        </div>
      </nav>

      {/* Mobile Menu */}
      <ul
        ref={sideMenuRef}
        className={`flex md:hidden flex-col gap-6 py-20 px-10 fixed right-0 
          top-0 bottom-0 w-64 z-50 h-screen bg-white shadow-xl transition-transform duration-500 
          ${isMenuOpen ? 'transform-none' : 'transform translate-x-full'}`}
      >
        {/* Close Button */}
        <div className="absolute right-6 top-6" onClick={closeMenu}>
          <Image src={assets.close_black} alt="Close" className="w-5 cursor-pointer" />
        </div>

        {/* Mobile Search */}
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search"
          className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Mobile Links */}
        <Link href="/" onClick={closeMenu} className="text-gray-700 hover:opacity-75">Home</Link>
        <Link href="/" onClick={closeMenu} className="text-gray-700 hover:opacity-75">Shop</Link>
        {/* <Link href="/cart" onClick={closeMenu} className="text-gray-700 hover:opacity-75 flex gap-2">
          Cart ({cart.length})
        </Link> */}
      </ul>
    </>
  )
}
