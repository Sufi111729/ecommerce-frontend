import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'seller' | 'user'
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const email = localStorage.getItem('email')
    const rawRole = localStorage.getItem('role')
    const id = localStorage.getItem('id')

    if (token && username && email && rawRole && id) {
      const normalizedRole = rawRole.toLowerCase()
      let role: User['role'] = 'user'
      if (normalizedRole === 'admin') role = 'admin'
      else if (['seller', 'mod', 'moderator'].includes(normalizedRole)) role = 'seller'

      setUser({
        id,
        name: username,
        email,
        role
      })
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!res.ok) throw new Error('Login failed')

      const data = await res.json()

      const backendRole = data.roles?.[0] || 'ROLE_USER'
      const raw = backendRole.replace('ROLE_', '').toLowerCase()

      let userRole: User['role'] = 'user'
      if (raw === 'admin') userRole = 'admin'
      else if (['mod', 'moderator', 'seller'].includes(raw)) userRole = 'seller'

      const userData: User = {
        id: data.id?.toString() || '0',
        name: data.username || '',
        email: data.email || '',
        role: userRole
      }

      localStorage.setItem('token', data.token || data.accessToken)
      localStorage.setItem('username', userData.name)
      localStorage.setItem('email', userData.email)
      localStorage.setItem('role', userData.role)
      localStorage.setItem('id', userData.id)

      setUser(userData)

      const redirectMap = {
        admin: '/admin',
        seller: '/seller',
        user: '/user'
      }
      window.location.href = redirectMap[userRole]

    } catch (err) {
      console.error('Login error:', err)
      throw err
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
