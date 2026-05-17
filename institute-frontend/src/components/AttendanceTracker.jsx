import { useState, useEffect } from 'react'
import API from '../api/axios'

export default function AttendanceTracker() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({ student: '', status: 'present', batch: '' })
  const [msg, setMsg] = useState({ text: '', type: '' })
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)

  useEffect(() => { API.get('/students').then(res => setStudents(res.data)).catch(() => {}) }, [])

  const fetchHistory = (id) => {
    if (!id) return
    setHistoryLoading(true)
    API.get(`/attendance/${id}`).then(res => setHistory(res.data)).finally(() => setHistoryLoading(false))
  }

  const handleStudentChange = (e) => {
    const s = students.find(x => x._id === e.target.value)
    setForm({ ...form, student: e.target.value, batch: s?.batch?._id || '' })
    fetchHistory(e.target.value)
  }

  const mark = async () => {
    if (!form.student) return setMsg({ text: 'Please select a student first', type: 'error' })
    setLoading(true); setMsg({ text: '', type: '' })
    try {
      await API.post('/attendance', { student: form.student, status: form.status, batch: form.batch || undefined })
      setMsg({ text: '✓ Attendance marked successfully!', type: 'success' })
      fetchHistory(form.student)
    } catch (err) {
      setMsg({ text: err.response?.data?.error || 'Error', type: 'error' })
    } finally { setLoading(false) }
  }

  const present = history.filter(a => a.status === 'present').length
  const percent = history.length ? Math.round((present / history.length) * 100) : 0

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
      {/* Left — Mark attendance */}
      <div className="glass rounded-2xl p-8 animate-fade-up">
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Mark Attendance</h2>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>Select student and mark today's attendance</p>

        {msg.text && (
          <div className="animate-slide-in mb-5 p-3 rounded-xl text-sm"
            style={{ background: msg.type === 'success' ? '#10b98115' : '#ef444415', color: msg.type === 'success' ? 'var(--success)' : 'var(--danger)', border: `1px solid ${msg.type === 'success' ? '#10b98130' : '#ef444430'}` }}>
            {msg.text}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Student</label>
            <select className="input" style={{ cursor: 'pointer' }} value={form.student} onChange={handleStudentChange}>
              <option value="">Select Student</option>
              {students.map(s => <option key={s._id} value={s._id}>{s.name} — {s.batch?.name || 'No Batch'}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Status</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { val: 'present', label: '✓ Present', color: 'var(--success)', bg: '#10b98115' },
                { val: 'absent', label: '✗ Absent', color: 'var(--danger)', bg: '#ef444415' }
              ].map(opt => (
                <button key={opt.val} onClick={() => setForm({ ...form, status: opt.val })}
                  style={{
                    padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                    background: form.status === opt.val ? opt.bg : 'var(--surface)',
                    color: form.status === opt.val ? opt.color : 'var(--muted)',
                    border: `2px solid ${form.status === opt.val ? opt.color : 'var(--border)'}`,
                  }}>{opt.label}</button>
              ))}
            </div>
          </div>

          <button onClick={mark} disabled={loading} className="btn-neon"
            style={{ padding: '13px', borderRadius: 10, fontSize: 14, opacity: loading ? 0.7 : 1 }}>
            {loading ? '⏳ Marking...' : '📋 Mark Attendance'}
          </button>
        </div>
      </div>

      {/* Right — History */}
      <div className="glass rounded-2xl p-8 animate-fade-up delay-2">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Attendance History</h2>
          {history.length > 0 && (
            <span style={{ fontSize: 13, fontWeight: 700, color: percent >= 75 ? 'var(--success)' : 'var(--danger)', background: percent >= 75 ? '#10b98115' : '#ef444415', padding: '4px 12px', borderRadius: 20 }}>
              {percent}%
            </span>
          )}
        </div>

        {!form.student ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📊</div>
            <p style={{ fontSize: 13 }}>Select a student to view history</p>
          </div>
        ) : historyLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 44 }} />)}
          </div>
        ) : history.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>No records yet</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 380, overflowY: 'auto' }}>
            {history.map((a, i) => (
              <div key={a._id} className="animate-slide-in"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 10, background: 'var(--surface)', animationDelay: `${i * 0.05}s`, opacity: 0 }}>
                <span style={{ fontSize: 13, color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: a.status === 'present' ? '#10b98115' : '#ef444415', color: a.status === 'present' ? 'var(--success)' : 'var(--danger)' }}>
                  {a.status === 'present' ? '✓ Present' : '✗ Absent'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}