'use client'
import { useCart } from '../../context/CartContext'
import { useRouter } from 'next/navigation'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { cart, removeFromCart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const router = useRouter()

  const handleContinueShopping = () => {
    router.push('/')
  }

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!')
      return
    }
    router.push('/checkout')
  }

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Back arrow link */}
        <button
          onClick={handleContinueShopping}
          className="flex items-center gap-2 mb-6 cursor-pointer w-fit"
        >
          <Image src={assets.back_arrow} alt='Back Arrow' className='w-5' />
          <span className="text-sm text-[#f39493]">Continue Shopping</span>
        </button>
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                      <div className="text-sm font-medium text-gray-800 mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(item.id)
                      toast.error(`${item.name} removed from cart!`)
                    }}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </li>

              ))}
            </ul>

            <p className="flex items-center justify-end mt-4 text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <div className='flex items-center justify-end'>
              <button
                onClick={handleProceedToCheckout}
                className="mt-4 bg-[#f39493] text-white px-6 py-2 rounded hover:bg-[#e57c7c] transition"
              >
                Checkout
              </button>
            </div>

          </>
        )}
      </div>
    </>
  )
}
