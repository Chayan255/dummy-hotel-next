'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [mode, setMode] = useState('password') // 'password' or 'otp'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePasswordLogin = async () => {
    setMessage('')
    if (!email || !password) {
      setMessage('⚠️ Please fill in all fields.')
      return
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/') // ✅ Redirect after login
      } else {
        setMessage(data.error || '❌ Invalid credentials')
      }
    } catch (err) {
      console.error(err)
      setMessage('❌ Something went wrong.')
    }
  }

  const handleSendOtp = async () => {
    setMessage('')
    if (!email) {
      setMessage('⚠️ Please enter your email.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (res.ok) {
        sessionStorage.setItem('otp_email', email)
        setStep(2)
        setMessage('✅ OTP sent to your email.')
      } else {
        setMessage(data.error || '❌ Failed to send OTP.')
      }
    } catch (err) {
      console.error(err)
      setMessage('❌ Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setMessage('')
    if (!otp) {
      setMessage('⚠️ Please enter the OTP.')
      return
    }

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      const data = await res.json()
      if (res.ok) {
        sessionStorage.removeItem('otp_email')
        router.push('/cart')
      } else {
        setMessage(data.error || '❌ Invalid or expired OTP')
      }
    } catch (err) {
      console.error(err)
      setMessage('❌ OTP verification failed.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 px-6 py-8 bg-white shadow-lg rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">🔐 Login</h2>

      {/* Toggle Mode */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l ${mode === 'password' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => {
            setMode('password')
            setStep(1)
            setMessage('')
          }}
        >
          Password Login
        </button>
        <button
          className={`px-4 py-2 rounded-r ${mode === 'otp' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => {
            setMode('otp')
            setStep(1)
            setMessage('')
          }}
        >
          OTP Login
        </button>
      </div>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />

      {/* Password Login */}
      {mode === 'password' && (
        <>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handlePasswordLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </>
      )}

      {/* OTP Login */}
      {mode === 'otp' && (
        <>
          {step === 1 ? (
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className={`w-full py-2 rounded text-white ${loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Verify OTP
              </button>
            </>
          )}
        </>
      )}

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-sm text-red-500 font-medium">{message}</p>
      )}
    </div>
  )
}
