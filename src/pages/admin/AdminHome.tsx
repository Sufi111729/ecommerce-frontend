import { useEffect, useState } from 'react'
import { Users, Package, ShoppingCart, Award } from 'lucide-react'

interface Stats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
}

export default function AdminHome() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log("Frontend is using token:", token)

    if (!token) {
      setError('No token found. Please log in.')
      return
    }

    fetch('http://localhost:8080/api/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        console.log('Response status:', res.status)
        if (res.status === 401) {
          throw new Error('Unauthorized: Please log in as admin.')
        } else if (res.status === 403) {
          throw new Error('Forbidden: You do not have access to this resource.')
        } else if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        console.log('Fetched dashboard data:', data)
        setStats(data)
      })
      .catch(err => {
        console.error('Error fetching dashboard stats:', err.message)
        setError(err.message)
      })
  }, [])

  if (error) {
    return <div className="text-red-700 bg-red-100 p-4 rounded shadow">{error}</div>
  }

  if (!stats) {
    return <div className="text-gray-600 p-4">Loading dashboard...</div>
  }

  const formattedStats = [
    { name: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500' },
    { name: 'Products', value: stats.totalProducts, icon: Package, color: 'bg-green-500' },
    { name: 'Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'bg-yellow-500' },
    { name: 'Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: Award, color: 'bg-purple-500' }
  ]

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {formattedStats.map(stat => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span>New user registration: john@example.com</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span>Order #1234 completed</span>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Product "Wireless Headphones" added</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
