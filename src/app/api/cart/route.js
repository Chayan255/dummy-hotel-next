// src/app/api/cart/route.js
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.cartItem.findMany({
      include: {
        menu: true,
        lunchMenu: true, // 👈 include lunchMenu too
      },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { menuId, lunchMenuId } = await request.json();

    if (!menuId && !lunchMenuId) {
      return NextResponse.json({ error: 'menuId or lunchMenuId is required' }, { status: 400 });
    }

    let existing;
    if (menuId) {
      existing = await prisma.cartItem.findFirst({ where: { menuId } });
    } else {
      existing = await prisma.cartItem.findFirst({ where: { lunchMenuId } });
    }

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 },
      });
      return NextResponse.json(updated);
    }

    const newItem = await prisma.cartItem.create({
      data: {
        menuId: menuId || undefined,
        lunchMenuId: lunchMenuId || undefined,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error('POST /api/cart error:', err);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}
