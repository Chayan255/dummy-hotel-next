import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
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
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        menuId: item.menuId || null,
        lunchMenuId: item.lunchMenuId || null,
      });
    }

    const order = await prisma.order.create({
      data: {
        total,
        items: {
          create: orderItemsData,
        },
      },
    });

    await prisma.cartItem.deleteMany();

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
