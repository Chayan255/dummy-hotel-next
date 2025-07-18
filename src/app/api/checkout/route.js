import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// ✅ POST: Place Order from Cart
export async function POST(request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const tokenMatch = cookieHeader?.match(/token=([^;]+)/);
    const token = tokenMatch?.[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const { customerName } = await request.json();

    if (!customerName || customerName.trim() === '') {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }

    const cartItems = await prisma.cartItem.findMany({
      include: {
        menu: true,
        lunchMenu: true,
      },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    let total = 0;
    const orderItemsData = [];

    for (const item of cartItems) {
      const menuItem = item.menu || item.lunchMenu;
      if (!menuItem) continue;

      const itemTotal = menuItem.price * item.quantity;
      total += itemTotal;

      orderItemsData.push({
        quantity: item.quantity,
        menuId: item.menuId || null,
        lunchMenuId: item.lunchMenuId || null,
      });
    }

    // ✅ Save order with items
    const order = await prisma.order.create({
      data: {
        customerName,
        totalAmount: total,
        items: {
          create: orderItemsData,
        },
      },
    });

    // 🧹 Clear cart
    await prisma.cartItem.deleteMany();

    return NextResponse.json({
      message: 'Order placed successfully!',
      orderId: order.id,
    });
  } catch (error) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
