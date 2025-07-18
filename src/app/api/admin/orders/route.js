// ✅ FILE: src/app/api/admin/orders/route.js

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: true, // 👈 orderItems include kora lagbe
        
      },
    });

    return NextResponse.json(orders);
  } catch (err) {
    console.error('❌ Failed to fetch orders:', err);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
