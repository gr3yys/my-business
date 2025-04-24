'use client'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function Navbar({ query, setQuery }) {
  const { cart } = useCart()

  const handleSearchChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Tejido a Mano
      </Link>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link href="/cart" className="text-gray-700 hover:text-blue-600">
          Cart ({cart.length})
        </Link>
      </div>
    </nav>
  )
}
