'use client';
import { useEffect, useState } from 'react';

export default function LunchMenuPage() {
  const [groupedItems, setGroupedItems] = useState({});
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // ✅ Fetch lunch menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/lunch-menu');
        const text = await res.text();
        if (!text) return;
        const data = JSON.parse(text);
        setGroupedItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch lunch menu:', err);
      }
    };

    fetchMenu();
    fetchCartCount(); // ✅ load cart count initially
  }, []);

  // ✅ Function to fetch cart count
 const fetchCartCount = async () => {
  try {
    const res = await fetch('/api/cart');
    const text = await res.text();
    if (!text) return;
    const cartData = JSON.parse(text);

    // ✅ Only count lunch menu items
    const lunchOnly = cartData.filter((item) => item.lunchMenuId);
    const totalQty = lunchOnly.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalQty);
  } catch (err) {
    console.error('Failed to fetch lunch cart count:', err);
  }
};

  const items = groupedItems[selectedDay] || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Weekly Lunch Menu</h1>

      {/* 🛒 Cart Badge */}
      <div className="flex justify-end mb-4">
        <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          🛒 {cartCount} item{cartCount !== 1 ? 's' : ''} in cart
        </div>
      </div>

      {/* Day Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded ${
              selectedDay === day ? 'bg-yellow-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Dishes */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="mt-2 font-semibold text-yellow-600">₹{item.price}</p>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="mt-2 h-40 w-full object-cover rounded"
                />
              )}

              <button
                onClick={async () => {
                  try {
                    const res = await fetch('/api/cart', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ lunchMenuId: item.id }),
                    });

                    if (res.ok) {
                      alert('Item added to cart!');
                      fetchCartCount(); // ✅ update count
                    } else {
                      const errData = await res.json();
                      alert(errData?.error || 'Failed to add item');
                    }
                  } catch (error) {
                    console.error('Add to cart error:', error);
                    alert('Something went wrong');
                  }
                }}
                className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No lunch items for {selectedDay}</p>
      )}
    </div>
  );
}
