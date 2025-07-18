'use client';

import { useEffect, useState } from 'react';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchMenu();
    fetchCartCount();
  }, []);

  // 🥘 Fetch Menu Items from DB
  const fetchMenu = async () => {
  try {
    const res = await fetch('/api/main-menu');

    // ✅ Defensive check
    if (!res.ok) {
      const errText = await res.text();
      console.error('Menu API error:', errText);
      setMenuItems([]); // fallback
      return;
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      setMenuItems(data);
    } else {
      console.error('Invalid menu data:', data);
      setMenuItems([]); // fallback
    }
  } catch (err) {
    console.error('Menu fetch error:', err);
    setMenuItems([]); // fallback
  }
};

  // 🛒 Count items in cart
  const fetchCartCount = async () => {
    try {
      const res = await fetch('/api/cart');
      const text = await res.text();
      if (!text) return;

      const data = JSON.parse(text);
      if (!Array.isArray(data)) return;

      const total = data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.error('Cart count error:', err);
    }
  };

  // ➕ Add item to cart
  const addToCart = async (menuId) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuId }),
      });

      if (res.ok) {
        fetchCartCount(); // 🛒 Refresh count
      } else {
        console.warn('Failed to add to cart:', await res.text());
      }
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🍽️ Our Menu</h1>
        <p className="text-lg font-semibold bg-yellow-100 text-yellow-700 px-4 py-2 rounded">
          🛒 Cart Items: {cartCount}
        </p>
      </div>

      {menuItems.length === 0 ? (
        <p className="text-center text-gray-500">No menu items available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white shadow rounded p-2 text-center">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded mb-2"
                />
              )}
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="font-semibold text-green-600 mt-1">₹ {item.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(item.id)}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
