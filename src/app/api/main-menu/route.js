import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.menu.findMany();
    return NextResponse.json(items);
  } catch (error) {
    console.error('GET /api/main-menu error:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}
