// src/app/api/main-menu/route.js
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.menu.findMany();

    if (!Array.isArray(items)) {
      console.error('❌ Expected array from Prisma, got:', items);
      return NextResponse.json([], { status: 200 }); // safe fallback
    }

    console.log('✅ Fetched menu items:', items.length);
    return NextResponse.json(items);
  } catch (error) {
    console.error('❌ Prisma error in /api/main-menu:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch menu', detail: error.message },
      { status: 500 }
    );
  }
}
