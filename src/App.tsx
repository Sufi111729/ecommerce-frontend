import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import SellerDashboard from './pages/seller/SellerDashboard'
import UserDashboard from './pages/user/UserDashboard'

function AppRoutes() {
  const { user } = useAuth()

  if (!user) {
    return (
      <Routes>
        {/* Handle all paths with Login when not authenticated */}
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  return (
    <Routes>
      {/* ✅ Add this line to handle "/" route */}
      <Route path="/" element={<Navigate to={`/${user.role}`} />} />

      <Route path="/admin/*" element={user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
      <Route path="/seller/*" element={user.role === 'seller' ? <SellerDashboard /> : <Navigate to="/" />} />
      <Route path="/user/*" element={<UserDashboard />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
