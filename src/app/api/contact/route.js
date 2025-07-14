import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const saved = await prisma.contact.create({
      data: { name, email, message },
    });

    return NextResponse.json({ success: true, data: saved }, { status: 200 });
  } catch (error) {
    console.error('❌ POST /api/contact failed:', error); // <- check this in terminal
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
