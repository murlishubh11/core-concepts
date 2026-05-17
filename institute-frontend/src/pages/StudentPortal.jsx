import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const materials = [
  { title: 'Chapter 1 — Fundamentals', type: 'PDF', size: '2.4 MB', link: '#' },
  { title: 'Chapter 2 — Advanced Topics', type: 'PDF', size: '3.1 MB', link: '#' },
  { title: 'Practice Set 1', type: 'Exercise', size: '1.2 MB', link: '#' },
  { title: 'Formula Sheet', type: 'PDF', size: '0.8 MB', link: '#' },
]

export default function StudentPortal() {
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Attendance')
  const navigate = useNavigate()

  // Read student from localStorage (saved during login)
  const student = JSON.parse(localStorage.getItem('student') || '{}')

  useEffect(() => {
    // Redirect to login if no token
    if (!localStorage.getItem('token')) {
      navigate('/student-login')
      return
    }
    API.get('/student/attendance')
      .then(res => setAttendance(res.data))
      .catch(() => {}) // silently handle error
      .finally(() => setLoading(false))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('student')
    localStorage.removeItem('role')
    navigate('/')
  }

  const present = attendance.filter(a => a.status === 'present').length
  const total = attendance.length
  const percent = total ? Math.round((present / total) * 100) : 0

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Glow */}
      <div style={{ position: 'fixed', top: 0, right: '20%', width: 400, height: 400, background: '#7c3aed10', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      {/* Navbar */}
      <nav className="glass animate-fade-in" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent2), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff' }}>
              {student?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Hey, {student?.name || 'Student'} 👋</div>
              <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>{student?.batch?.name || 'No Batch'}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-ghost" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13 }}>
            Logout ↗
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Classes', value: total, icon: '📅', color: 'var(--text)' },
            { label: 'Present', value: present, icon: '✓', color: 'var(--success)' },
            { label: 'Attendance', value: `${percent}%`, icon: '📊', color: percent >= 75 ? 'var(--success)' : 'var(--danger)' },
          ].map((stat, i) => (
            <div key={stat.label} className={`glass rounded-2xl p-6 animate-fade-up delay-${i + 1}`}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: stat.color, fontFamily: 'JetBrains Mono, monospace' }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{stat.label}</div>
              {stat.label === 'Attendance' && percent < 75 && (
                <div style={{ fontSize: 11, color: 'var(--danger)', marginTop: 6, fontWeight: 500 }}>⚠ Below 75% threshold</div>
              )}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="animate-fade-up delay-2" style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'var(--surface)', padding: 6, borderRadius: 14, border: '1px solid var(--border)', width: 'fit-content' }}>
          {['📋 Attendance', '📚 Study Materials'].map(tab => {
            const key = tab.split(' ').slice(1).join(' ')
            return (
              <button key={tab} onClick={() => setActiveTab(key)}
                style={{
                  padding: '9px 20px', borderRadius: 10, fontSize: 14, fontWeight: 500,
                  border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                  background: activeTab === key ? 'var(--accent2)' : 'transparent',
                  color: activeTab === key ? '#fff' : 'var(--muted)',
                  boxShadow: activeTab === key ? '0 0 20px #7c3aed40' : 'none'
                }}>{tab}</button>
            )
          })}
        </div>

        {/* Attendance Tab */}
        {activeTab === 'Attendance' && (
          <div className="animate-fade-in">
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52 }} />)}
              </div>
            ) : attendance.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
                <p style={{ color: 'var(--muted)' }}>No attendance records yet</p>
              </div>
            ) : (
              <div className="glass rounded-2xl overflow-hidden">
                <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface)' }}>
                      {['#', 'Date', 'Status'].map(h => (
                        <th key={h} style={{ padding: '12px 20px', textAlign: 'left', color: 'var(--muted)', fontWeight: 600, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((a, i) => (
                      <tr key={a._id} className="animate-slide-in"
                        style={{ borderTop: '1px solid var(--border)', animationDelay: `${i * 0.04}s`, opacity: 0 }}>
                        <td style={{ padding: '14px 20px', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{String(i + 1).padStart(2, '0')}</td>
                        <td style={{ padding: '14px 20px', color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
                          {new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: a.status === 'present' ? '#10b98115' : '#ef444415', color: a.status === 'present' ? 'var(--success)' : 'var(--danger)' }}>
                            {a.status === 'present' ? '✓ Present' : '✗ Absent'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Materials Tab */}
        {activeTab === 'Study Materials' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {materials.map((m, i) => (
              <a key={i} href={m.link} className={`glass rounded-xl animate-fade-up delay-${i + 1}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', textDecoration: 'none', transition: 'border-color 0.2s', border: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#7c3aed20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                    {m.type === 'PDF' ? '📄' : '✏️'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{m.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{m.type} · {m.size}</div>
                  </div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 8, background: '#7c3aed20', color: 'var(--accent2)', border: '1px solid #7c3aed40' }}>
                  Download ↓
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}