// FILE: src/app/api/verify-otp/route.js
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'


export async function POST(request) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.otp || !user.otpExpires) {
      return NextResponse.json({ error: 'OTP not found or already used' }, { status: 400 })
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 })
    }

    if (new Date() > user.otpExpires) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 401 })
    }

    // ✅ OTP valid, clear it from DB
    await prisma.user.update({
      where: { email },
      data: {
        otp: null,
        otpExpires: null,
      },
    })

    // ✅ Create token (optional)
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    const response = NextResponse.json({ message: 'OTP verified successfully' })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('❌ OTP verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
