import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.lunchMenu.findMany();

    const grouped = {};
    items.forEach(item => {
      const day = item.category;
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(item);
    });

    return NextResponse.json(grouped);
  } catch (error) {
    console.error('GET /api/lunch-menu:', error);
    return NextResponse.json({ error: 'Error fetching lunch menu' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, price, category, image } = body;

    if (!name || !description || !price || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newItem = await prisma.lunchMenu.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        image: image || null,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('POST /api/lunch-menu:', error);
    return NextResponse.json({ error: 'Error creating lunch menu item' }, { status: 500 });
  }
}
