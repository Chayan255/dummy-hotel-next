'use client';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const text = await res.text();
      if (!text) return;

      const data = JSON.parse(text);
      if (!Array.isArray(data)) {
        console.warn('Invalid cart response:', data);
        return;
      }

      setCartItems(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (id, delta) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQty }),
      });

      if (res.ok) {
        fetchCart();
      }
    } catch (err) {
      console.error('Quantity update failed:', err);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
      });

      if (res.ok || res.status === 204) {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        console.warn('Delete failed with status:', res.status);
      }
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  // 🧠 Unified access for menu or lunchMenu
  const getMenuInfo = (item) => item.menu || item.lunchMenu;

  const total = cartItems.reduce((sum, item) => {
    const menuItem = getMenuInfo(item);
    return sum + menuItem.price * item.quantity;
  }, 0);

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems.map((item) => {
        const menuItem = getMenuInfo(item);
        return (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white rounded shadow p-4 mb-4"
          >
            <div>
              <h3 className="font-semibold">{menuItem.name}</h3>
              <p className="text-sm text-gray-600">
                ₹{menuItem.price} x {item.quantity}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQty(item.id, -1)}
                className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQty(item.id, 1)}
                className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                +
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="ml-2 text-red-600 hover:text-red-800 text-sm underline"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      <div className="bg-gray-100 p-6 rounded shadow mt-8">
        <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Delivery</span>
          <span>₹40</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{total + 40}</span>
        </div>

        <button
  onClick={async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });

      const result = await res.json();

      if (res.ok) {
        alert(`Order placed! Order ID: ${result.orderId}`);
        window.location.reload(); // optionally reload cart
      } else {
        alert(`❌ Checkout failed: ${result.error}`);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('❌ Checkout failed');
    }
  }}
  className="mt-6 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
>
  Proceed to Payment
</button>

      </div>
    </div>
  );
}
