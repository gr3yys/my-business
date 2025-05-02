'use client'
import { useCart } from '../../context/CartContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const router = useRouter()

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  })

  useEffect(() => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!')
      router.push('/')
    }
  }, [cart, router])

  const handlePlaceOrder = () => {
    if (
      Object.values(shippingInfo).some(v => !v.trim()) ||
      Object.values(paymentInfo).some(v => !v.trim())
    ) {
      toast.error('Please fill out all fields.')
      return
    }

    toast.success('Order placed successfully!')
    clearCart()
    router.push('/')
  }

  const handleBackToCart = () => {
    router.push('/cart') // Adjust the route if necessary
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 space-y-8">
      <h1 className="text-3xl font-semibold text-center">Checkout</h1>

      {/* Cart Summary */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
        <ul className="space-y-4">
          {cart.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="text-lg font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-right text-xl font-semibold">
          Total: ${total.toFixed(2)}
        </div>
      </div>

      {/* Shipping Info */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f39493]"
            value={shippingInfo.name}
            onChange={e => setShippingInfo({ ...shippingInfo, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f39493]"
            value={shippingInfo.address}
            onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })}
          />
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="City"
              className="flex-1 min-w-[200px] border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f39493]"
              value={shippingInfo.city}
              onChange={e => setShippingInfo({ ...shippingInfo, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="flex-1 min-w-[200px] border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f39493]"
              value={shippingInfo.postalCode}
              onChange={e => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
            />
          </div>
          <input
            type="text"
            placeholder="Country"
            className="w-full border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f39493]"
            value={shippingInfo.country}
            onChange={e => setShippingInfo({ ...shippingInfo, country: e.target.value })}
          />
        </div>
      </div>

      {/* Payment Info */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f39493]"
            value={paymentInfo.cardNumber}
            onChange={e => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
          />
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              className="flex-1 min-w-[200px] border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f39493]"
              value={paymentInfo.expiry}
              onChange={e => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
            />
            <input
              type="text"
              placeholder="CVV"
              className="flex-1 min-w-[200px] border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f39493]"
              value={paymentInfo.cvv}
              onChange={e => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-4 mt-6">
        {/* Back to Cart Button */}
        <button
          onClick={handleBackToCart}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded hover:bg-gray-300 transition w-full md:w-auto"
        >
          Back to Cart
        </button>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f39493] text-white px-6 py-3 rounded hover:bg-[#e57c7c] transition w-full md:w-auto"
        >
          Place Order
        </button>
      </div>

    </div>
  )
}
