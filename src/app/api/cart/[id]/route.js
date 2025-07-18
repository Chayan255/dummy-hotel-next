import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// ✅ Force the route to use Node.js runtime
export const runtime = 'nodejs';

// ✅ PATCH: Update Quantity
export async function PATCH(req, context) {
  const { id } = context.params;
  const { quantity } = await req.json();

  try {
    const updated = await prisma.cartItem.update({
      where: { id: parseInt(id) },
      data: { quantity },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PATCH /api/cart/[id]:', error);
    return NextResponse.json({ error: 'Quantity update failed' }, { status: 500 });
  }
}

// ✅ DELETE: Remove from Cart
export async function DELETE(req, context) {
  const { id } = context.params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await prisma.cartItem.delete({
      where: { id: parsedId },
    });

    console.log('[DELETE] Successfully deleted item with ID:', parsedId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[DELETE] Failed to delete item:', error);

    if (
      error.code === 'P2025' ||
      error.message.includes('Record to delete does not exist')
    ) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
