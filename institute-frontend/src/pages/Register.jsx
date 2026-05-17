import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match')
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    setLoading(true)
    try {
      await API.post('/auth/register', {
        email: form.email,
        password: form.password
      })
      setSuccess('Admin account created! Redirecting to login...')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4" style={{ background: 'var(--bg)' }}>
      <div style={{ position: 'fixed', top: '20%', left: '15%', width: 300, height: 300, background: '#00f5d415', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '20%', right: '15%', width: 250, height: 250, background: '#7c3aed15', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="w-full max-w-md animate-fade-up">

        {/* ← Back */}
        <button
          onClick={() => navigate('/login')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'Outfit, sans-serif', marginBottom: 24, padding: 0, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          ← Back to Login
        </button>

        {/* Logo */}
        <div className="text-center mb-8 animate-fade-up delay-1">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 animate-float"
            style={{ background: 'linear-gradient(135deg, #00f5d420, #7c3aed20)', border: '1px solid #00f5d440' }}>
            <span style={{ fontSize: 28 }}>🛡️</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px' }}>
            Create Admin
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Core Concepts — Admin Account</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 animate-fade-up delay-2">

          {error && (
            <div className="mb-5 p-3 rounded-xl text-sm"
              style={{ background: '#ef444415', color: 'var(--danger)', border: '1px solid #ef444430' }}>
              ⚠ {error}
            </div>
          )}

          {success && (
            <div className="mb-5 p-3 rounded-xl text-sm"
              style={{ background: '#10b98115', color: 'var(--success)', border: '1px solid #10b98130' }}>
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="animate-fade-up delay-3">
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Email
              </label>
              <input className="input" type="email" placeholder="admin@core.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required />
            </div>

            <div className="animate-fade-up delay-4">
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Password
              </label>
              <input className="input" type="password" placeholder="Min 6 characters"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required />
            </div>

            <div className="animate-fade-up delay-5">
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Confirm Password
              </label>
              <input className="input" type="password" placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                required />
            </div>

            <button type="submit" disabled={loading} className="btn-neon"
              style={{ padding: '13px', borderRadius: 10, fontSize: 15, marginTop: 4, opacity: loading ? 0.7 : 1 }}>
              {loading ? '⏳ Creating...' : 'Create Admin Account →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>Already have an account? </span>
            <button onClick={() => navigate('/login')}
              style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
              Login →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}