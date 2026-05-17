import { useState, useEffect } from 'react'
import API from '../api/axios'

export default function AddStudentForm({ onAdded }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', batch: '', password: '' })
  const [batches, setBatches] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => { API.get('/batches').then(res => setBatches(res.data)).catch(() => {}) }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess(false)
    try {
      await API.post('/students', form)
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', batch: '', password: '' })
      setTimeout(() => onAdded(), 1200)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally { setLoading(false) }
  }

  const fields = [
    { key: 'name', label: 'Full Name', placeholder: 'Rahul Sharma', type: 'text' },
    { key: 'email', label: 'Email', placeholder: 'rahul@gmail.com', type: 'email' },
    { key: 'phone', label: 'Phone', placeholder: '9876543210', type: 'text' },
    { key: 'password', label: 'Password', placeholder: 'Student login password', type: 'password' },
  ]

  return (
    <div style={{ maxWidth: 520 }}>
      <div className="animate-fade-up" style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Register New Student</h2>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Add a student to the system</p>
      </div>

      {error && (
        <div className="animate-slide-in mb-5 p-3 rounded-xl text-sm"
          style={{ background: '#ef444415', color: 'var(--danger)', border: '1px solid #ef444430' }}>
          ⚠ {error}
        </div>
      )}
      {success && (
        <div className="animate-slide-in mb-5 p-3 rounded-xl text-sm"
          style={{ background: '#10b98115', color: 'var(--success)', border: '1px solid #10b98130' }}>
          ✓ Student added! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {fields.map((f, i) => (
          <div key={f.key} className={`animate-fade-up delay-${i + 1}`}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f.label}</label>
            <input className="input" type={f.type} placeholder={f.placeholder}
              value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              required={f.key !== 'phone'} />
          </div>
        ))}

        <div className="animate-fade-up delay-5">
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Batch</label>
          {batches.length > 0 ? (
            <select className="input" style={{ cursor: 'pointer' }} value={form.batch}
              onChange={e => setForm({ ...form, batch: e.target.value })}>
              <option value="">Select Batch</option>
              {batches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
            </select>
          ) : (
            <input className="input" placeholder="Paste Batch ObjectId"
              value={form.batch} onChange={e => setForm({ ...form, batch: e.target.value })} />
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-neon animate-fade-up"
          style={{ padding: '13px', borderRadius: 10, fontSize: 15, marginTop: 4, opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Adding Student...' : '➕ Register Student'}
        </button>
      </form>
    </div>
  )
}