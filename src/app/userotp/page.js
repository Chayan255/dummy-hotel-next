'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('otp_email')
    if (!storedEmail) {
      setError('❌ Email not found. Please go back and try again.')
    } else {
      setEmail(storedEmail)
    }
  }, [])

  const handleVerify = async () => {
    if (!otp) {
      setError('⚠️ Please enter the OTP.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      const data = await res.json()

      if (res.ok) {
        sessionStorage.removeItem('otp_email')
        router.push('/dashboard')
      } else {
        setError(data?.error || 'Invalid OTP')
      }
    } catch (err) {
      console.error('OTP verify error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 px-6 py-8 bg-white shadow-lg rounded-lg border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">🔐 Verify OTP</h2>

      {email && (
        <p className="text-center mb-4 text-gray-600">
          We have sent an OTP to <strong>{email}</strong>
        </p>
      )}

      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        placeholder="Enter your 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400 mb-4"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className={`w-full py-2 rounded text-white font-semibold ${
          loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>

      {error && (
        <p className="mt-4 text-sm text-center text-red-500 font-medium">{error}</p>
      )}
    </div>
  )
}
