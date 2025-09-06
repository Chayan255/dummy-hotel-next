// // ✅ FILE: src/app/api/order/submit/route.js
// import { prisma } from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const cookieHeader = request.headers.get('cookie');
//     const tokenMatch = cookieHeader?.match(/token=([^;]+)/);
//     const token = tokenMatch?.[1];

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
//     }

//     const body = await request.json();
//     const { items, totalAmount, customerName } = body;

//     if (!items || !Array.isArray(items) || !totalAmount || !customerName) {
//       return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
//     }

//     // ✅ Debug log for checking data before DB insert
//     console.log("📦 Order items before create:", JSON.stringify(items, null, 2));
//     console.log("🧾 Total Amount:", totalAmount);
//     console.log("🧍 Customer Name:", customerName);

//     const order = await prisma.order.create({
//       data: {
//         customerName,
//         total: totalAmount,
//         items: {
//           create: items.map((item) => {
//             const menuItem = item.menu || item.lunchMenu;

//             return {
//               name: menuItem?.name || 'Unknown',
//               price: menuItem?.price || 0,
//               quantity: item.quantity || 1,
//               menuId: item.menuId || undefined,
//               lunchMenuId: item.lunchMenuId || undefined,
//             };
//           }),
//         },
//       },
//       include: { items: true },
//     });

//     return NextResponse.json({ message: 'Order placed successfully!', order });
//   } catch (err) {
//     console.error('❌ Order Submit Error:', err.message);
//     console.error(err);
//     return NextResponse.json({ error: 'Something went wrong during order submit' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function POST(request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const tokenMatch = cookieHeader?.match(/token=([^;]+)/);
    const token = tokenMatch?.[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const body = await request.json();
    const { items, totalAmount, customerName } = body;

    if (!items || !Array.isArray(items) || !totalAmount || !customerName) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
    }

    // ✅ Save order to DB
    const order = await prisma.order.create({
      data: {
        customerName,
        total: totalAmount,
        items: {
          create: items.map((item) => {
            const menuItem = item.menu || item.lunchMenu;
            return {
              name: menuItem?.name || 'Unknown',
              price: menuItem?.price || 0,
              quantity: item.quantity || 1,
              menuId: item.menuId || undefined,
              lunchMenuId: item.lunchMenuId || undefined,
            };
          }),
        },
      },
      include: { items: true },
    });

    // ✅ Clear the cart from DB
    await prisma.cartItem.deleteMany(); // 🧹 This clears all items after order

    return NextResponse.json({ message: 'Order placed successfully!', order });

  } catch (err) {
    console.error('❌ Order Submit Error:', err.message);
    return NextResponse.json({ error: 'Something went wrong during order submit' }, { status: 500 });
  }
}
