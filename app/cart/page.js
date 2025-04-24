'use client'
import { useCart } from '../../context/CartContext'

export default function CartPage() {
  const { cart, removeFromCart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center py-2 border-b">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xl font-semibold">Total: ${total.toFixed(2)}</p>
        </>
      )}
    </div>
  )
}
