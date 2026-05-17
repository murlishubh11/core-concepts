import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

export default function StudentRegister() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    batch: ''
  })
  const [batches, setBatches] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Load batches on mount
  useState(() => {
    API.get('/batches')
      .then(res => setBatches(res.data))
      .catch(() => {}) // batches optional
  }, [])

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
      await API.post('/students/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        batch: form.batch || undefined
      })
      setSuccess('Account created! Redirecting to login...')
      setTimeout(() => navigate('/student-login'), 2000)
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally { setLoading(false) }
  }

  const fields = [
    { key: 'name',    label: 'Full Name',    type: 'text',     placeholder: 'Rahul Sharma' },
    { key: 'email',   label: 'Email',        type: 'email',    placeholder: 'student@email.com' },
    { key: 'phone',   label: 'Phone (optional)', type: 'tel', placeholder: '+91 98765 43210' },
    { key: 'password',        label: 'Password',         type: 'password', placeholder: 'Min 6 characters' },
    { key: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter password' },
  ]

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4" style={{ background: 'var(--bg)' }}>
      <div style={{ position: 'fixed', top: '20%', right: '15%', width: 300, height: 300, background: '#7c3aed15', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '20%', left: '15%', width: 250, height: 250, background: '#00f5d410', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="w-full max-w-md animate-fade-up">

        {/* ← Back */}
        <button
          onClick={() => navigate('/student-login')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'Outfit, sans-serif', marginBottom: 24, padding: 0, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          ← Back to Login
        </button>

        {/* Logo */}
        <div className="text-center mb-8 animate-fade-up delay-1">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 animate-float"
            style={{ background: 'linear-gradient(135deg, #7c3aed20, #00f5d420)', border: '1px solid #7c3aed40' }}>
            <span style={{ fontSize: 28 }}>🎒</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px' }}>
            Join Core Concepts
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Create your student account</p>
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

            {fields.map((f, i) => (
              <div key={f.key} className={`animate-fade-up delay-${i + 2}`}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {f.label}
                </label>
                <input
                  className="input"
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  required={!f.label.includes('optional')}
                />
              </div>
            ))}

            {/* Batch selector — only shows if batches exist */}
            {batches.length > 0 && (
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Batch (optional)
                </label>
                <select
                  className="input"
                  value={form.batch}
                  onChange={e => setForm({ ...form, batch: e.target.value })}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select a batch</option>
                  {batches.map(b => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ padding: '13px', borderRadius: 10, fontSize: 15, marginTop: 4, background: 'var(--accent2)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'Outfit, sans-serif', opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}>
              {loading ? '⏳ Creating account...' : 'Create Student Account →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>Already have an account? </span>
            <button onClick={() => navigate('/student-login')}
              style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
              Login →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}