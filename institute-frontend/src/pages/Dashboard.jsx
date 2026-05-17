import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentTable from '../components/StudentTable'
import AddStudentForm from '../components/AddStudentForm'
import AttendanceTracker from '../components/AttendanceTracker'

const tabs = [
  { id: 'Students', icon: '👥', label: 'Students' },
  { id: 'Add Student', icon: '➕', label: 'Add Student' },
  { id: 'Attendance', icon: '📋', label: 'Attendance' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Students')
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Navbar */}
      <nav className="glass animate-fade-in" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00f5d420, #7c3aed20)', border: '1px solid #00f5d440', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎓</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Core Concepts</div>
              <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>Admin Panel</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-ghost" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13 }}>
            Logout ↗
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* Tabs */}
        <div className="animate-fade-up" style={{ display: 'flex', gap: 8, marginBottom: 32, background: 'var(--surface)', padding: 6, borderRadius: 14, border: '1px solid var(--border)', width: 'fit-content' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '9px 20px', borderRadius: 10, fontSize: 14, fontWeight: 500,
                border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                transition: 'all 0.2s ease',
                background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                color: activeTab === tab.id ? '#000' : 'var(--muted)',
                boxShadow: activeTab === tab.id ? '0 0 20px #00f5d440' : 'none'
              }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-fade-up delay-2">
          {activeTab === 'Students' && <StudentTable key={refresh} />}
          {activeTab === 'Add Student' && <AddStudentForm onAdded={() => { setRefresh(r => r + 1); setActiveTab('Students') }} />}
          {activeTab === 'Attendance' && <AttendanceTracker />}
        </div>
      </div>
    </div>
  )
}