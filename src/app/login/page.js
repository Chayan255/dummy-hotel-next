'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()

    // Dummy check
    if (username === 'admin' && password === '1234') {
      Cookies.set('token', 'dummy-auth-token', { expires: 1 }) // 1 day cookie
      router.push('/dashboard')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
