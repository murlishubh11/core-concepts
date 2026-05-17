import { useEffect, useState } from 'react'
import API from '../api/axios'

export default function StudentTable() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    API.get('/students')
      .then(res => setStudents(res.data))
      .catch(() => setError('Failed to load students'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 52, animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  )

  if (error) return (
    <div className="glass rounded-xl p-6 text-center" style={{ color: 'var(--danger)' }}>⚠ {error}</div>
  )

  if (students.length === 0) return (
    <div className="glass rounded-xl p-12 text-center animate-fade-in">
      <div style={{ fontSize: 48, marginBottom: 12 }}>👥</div>
      <p style={{ color: 'var(--muted)', fontSize: 15 }}>No students yet. Add your first student!</p>
    </div>
  )

  return (
    <div className="animate-fade-in">
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Students', value: students.length, icon: '👥', color: 'var(--accent)' },
          { label: 'Active Batches', value: [...new Set(students.map(s => s.batch?._id).filter(Boolean))].length, icon: '📚', color: 'var(--accent2)' },
          { label: 'This Month', value: students.filter(s => new Date(s.createdAt).getMonth() === new Date().getMonth()).length, icon: '📅', color: 'var(--accent3)' },
        ].map((stat, i) => (
          <div key={stat.label} className={`glass rounded-xl p-5 animate-fade-up delay-${i + 1}`}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>All Students</span>
          <span style={{ fontSize: 12, color: 'var(--muted)', background: 'var(--surface2)', padding: '4px 10px', borderRadius: 20 }}>{students.length} records</span>
        </div>
        <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              {['#', 'Name', 'Email', 'Phone', 'Batch'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--muted)', fontWeight: 600, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s._id} className="animate-slide-in"
                style={{ borderTop: '1px solid var(--border)', animationDelay: `${i * 0.05}s`, opacity: 0, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '14px 16px', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{String(i + 1).padStart(2, '0')}</td>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text)' }}>{s.name}</td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{s.email}</td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{s.phone || '—'}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ background: '#00f5d415', color: 'var(--accent)', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
                    {s.batch?.name || 'No Batch'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}