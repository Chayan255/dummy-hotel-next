'use client'
import { useEffect } from 'react'

export default function ThankYou() {
  useEffect(() => {
    sessionStorage.removeItem('cart') // fallback
  }, [])

  return (
    <div className="text-center p-10">
      <h1 className="text-2xl font-bold text-green-600">✅ Order Placed Successfully!</h1>
      <p>Your cart is now empty.</p>
    </div>
  )
}
