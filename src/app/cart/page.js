// 'use client';
// import { useEffect, useState } from 'react';
// import LoginPage from '../login/page';

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [customerName, setCustomerName] = useState('');
//   const [orderStatus, setOrderStatus] = useState('');
//   const [isPlacingOrder, setIsPlacingOrder] = useState(false);

//   const fetchCart = async () => {
//     try {
//       const res = await fetch('/api/cart');
//       const text = await res.text();
//       if (!text) return;

//       const data = JSON.parse(text);
//       if (!Array.isArray(data)) {
//         console.warn('Invalid cart response:', data);
//         return;
//       }
//  console.log( data);
//       setCartItems(data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Failed to fetch cart:', err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
  
//   }, []);

//   const updateQty = async (id, delta) => {
//     const item = cartItems.find((i) => i.id === id);
//     if (!item) return;

//     const newQty = item.quantity + delta;
//     if (newQty < 1) return;

//     try {
//       const res = await fetch(`/api/cart/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ quantity: newQty }),
//       });

//       if (res.ok) {
//         fetchCart();
//       }
//     } catch (err) {
//       console.error('Quantity update failed:', err);
//     }
//   };

//   const deleteItem = async (id) => {
//     try {
//       const res = await fetch(`/api/cart/${id}`, {
//         method: 'DELETE',
//       });

//       if (res.ok || res.status === 204) {
//         setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//       } else {
//         console.warn('Delete failed with status:', res.status);
//       }
//     } catch (err) {
//       console.error('Failed to delete item:', err);
//     }
//   };

//   const getMenuInfo = (item) => item.menu || item.lunchMenu;

//   const subtotal = cartItems.reduce((sum, item) => {
//     const menuItem = getMenuInfo(item);
//     return sum + menuItem.price * item.quantity;
//   }, 0);

//   const deliveryFee = 40;
//   const totalAmount = subtotal + deliveryFee;

//   const handleOrderSubmit = async () => {
//     if (!customerName) {
//       alert('Please enter your name');
//       return;
//     }


//     const items = cartItems.map((item) => ({
      
//       itemId: item.id,
//       quantity: item.quantity,
//     }));


//     try {
//       setIsPlacingOrder(true);
//       const res = await fetch('/api/order/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',

//         body: JSON.stringify({
//           items:cartItems,
//           totalAmount,
//           customerName,
//         }),
//       });

//       const result = await res.json();
//       if (res.ok) {
//         setOrderStatus('✅ Order placed successfully!');
//         setCartItems([]);
//       } else {
//         setOrderStatus(`❌ ${result.error || 'Order failed'}`);
//       }
//     } catch (err) {
//       console.error('Order submit error:', err);
//       setOrderStatus('❌ Something went wrong');
//     } finally {
//       setIsPlacingOrder(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading cart...</p>;

//   return (
//     <div className="p-10 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

//       {cartItems.map((item) => {
//         const menuItem = getMenuInfo(item);
//         return (
//           <div
//             key={item.id}
//             className="flex justify-between items-center bg-white rounded shadow p-4 mb-4"
//           >
//             <div>
//               <h3 className="font-semibold">{menuItem.name}</h3>
//               <p className="text-sm text-gray-600">
//                 ₹{menuItem.price} x {item.quantity}
//               </p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => updateQty(item.id, -1)}
//                 className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
//               >
//                 -
//               </button>
//               <span>{item.quantity}</span>
//               <button
//                 onClick={() => updateQty(item.id, 1)}
//                 className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
//               >
//                 +
//               </button>
//               <button
//                 onClick={() => deleteItem(item.id)}
//                 className="ml-2 text-red-600 hover:text-red-800 text-sm underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         );
//       })}

//       <div className="bg-gray-100 p-6 rounded shadow mt-8">
//         <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
//         <div className="flex justify-between mb-2">
//           <span>Subtotal</span>
//           <span>₹{subtotal}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Delivery</span>
//           <span>₹{deliveryFee}</span>
//         </div>
//         <div className="flex justify-between font-semibold text-lg">
//           <span>Total</span>
//           <span>₹{totalAmount}</span>
//         </div>
//       </div>

//       {/* 🧾 Order Form Section */}
//       <div className="bg-white p-6 rounded shadow mt-6">
//         <h2 className="text-lg font-semibold mb-2">Place Your Order</h2>
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//           className="w-full border border-gray-300 p-2 rounded mb-3"
//         />
//         <button
//           onClick={handleOrderSubmit}
//           disabled={isPlacingOrder}
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
//         </button>
//         {orderStatus && (
//           <p className="mt-4 font-medium text-center">{orderStatus}</p>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import LoginPage from '../login/page';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

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
 console.log( data);
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

  const getMenuInfo = (item) => item.menu || item.lunchMenu;

  const subtotal = cartItems.reduce((sum, item) => {
    const menuItem = getMenuInfo(item);
    return sum + menuItem.price * item.quantity;
  }, 0);

  const deliveryFee = 40;
  const totalAmount = subtotal + deliveryFee;

 const handleOrderSubmit = async () => {
  if (!customerName) {
    alert('Please enter your name');
    return;
  }

  const items = cartItems.map((item) => ({
    itemId: item.id,
    quantity: item.quantity,
  }));

  try {
    setIsPlacingOrder(true);
    const res = await fetch('/api/order/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        items: cartItems,
        totalAmount,
        customerName,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      setOrderStatus('✅ Order placed successfully!');
      setCustomerName('');         // 🔥 Clear the input
      await fetchCart();           // Refresh cart if needed
    } else {
      setOrderStatus(`❌ ${result.error || 'Order failed'}`);
    }
  } catch (err) {
    console.error('Order submit error:', err);
    setOrderStatus('❌ Something went wrong');
  } finally {
    setIsPlacingOrder(false);
  }
};

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
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {/* 🧾 Order Form Section */}
      <div className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-lg font-semibold mb-2">Place Your Order</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-3"
        />
        <button
          onClick={handleOrderSubmit}
          disabled={isPlacingOrder}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
        {orderStatus && (
          <p className="mt-4 font-medium text-center">{orderStatus}</p>
        )}
      </div>
    </div>
  );
}
