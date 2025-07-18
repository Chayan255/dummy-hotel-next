'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 Incoming orders data:", data)

        // ✅ Safe fallback if response is not array
        if (Array.isArray(data)) {
          setOrders(data)
        } else {
          console.warn("⚠️ Data is not an array:", data)
          setOrders([])
        }

        setLoading(false)
      })
      .catch((err) => {
        console.error('❌ Failed to load orders:', err)
        setLoading(false)
      })
  }, [])

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  // ✅ Safe total calculation
  const totalRevenue = Array.isArray(orders)
    ? orders.reduce((sum, order) => sum + (order.total || 0), 0)
    : 0

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin Dashboard</h1>

      <div className="mb-6 bg-gray-100 p-4 rounded shadow">
        <p>Total Orders: {orders.length}</p>
        <p>Total Revenue: ₹{totalRevenue}</p>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Customer</th>
              <th className="p-2">Total</th>
              <th className="p-2">Date</th>
              <th className="p-2">Items</th>
            </tr>
          </thead>
          <tbody>
            
            {Array.isArray(orders) && orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-2">{order.customerName}</td>
                <td className="p-2">₹{order.total}</td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                
                <td className="p-2">
                  <ul className="list-disc pl-4">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={handleLogout}
        className="mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}
