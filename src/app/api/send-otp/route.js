// FILE: src/app/api/send-otp/route.js
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // ✅ Find or create user
    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: 'Guest User',
          password: '', // Not needed for OTP-only users
        },
      })
    }

    // ✅ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    // ✅ Update OTP in DB
    await prisma.user.update({
      where: { email },
      data: { otp, otpExpires },
    })

    console.log(`✅ OTP for ${email}: ${otp}`) // You can replace this with actual email sending

    return NextResponse.json({ message: 'OTP sent successfully' })
  } catch (error) {
    console.error('❌ Send OTP error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
