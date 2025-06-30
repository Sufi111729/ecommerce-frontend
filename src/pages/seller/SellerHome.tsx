import { useEffect, useState } from 'react'
import axios from 'axios'
import { Package, ShoppingCart, Award, TrendingUp } from 'lucide-react'

interface OrderSummary {
  id: number
  productName: string
  amount: number
}

interface SellerDashboardData {
  totalProducts: number
  pendingOrders: number
  totalSales: number
  growthPercentage: number
  recentOrders: OrderSummary[]
}

export default function SellerHome() {
  const [data, setData] = useState<SellerDashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:8080/api/seller/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setData(res.data)
      } catch (err) {
        setError('Failed to load dashboard')
        console.error(err)
      }
    }

    fetchDashboard()
  }, [])

  if (error) return <div className="text-red-500">{error}</div>
  if (!data) return <div>Loading dashboard...</div>

  const stats = [
    { name: 'Total Products', value: data.totalProducts, icon: Package, color: 'bg-blue-500' },
    { name: 'Pending Orders', value: data.pendingOrders, icon: ShoppingCart, color: 'bg-yellow-500' },
    { name: 'Total Sales', value: `₹${data.totalSales.toFixed(2)}`, icon: Award, color: 'bg-green-500' },
    { name: 'Growth', value: `${data.growthPercentage}%`, icon: TrendingUp, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
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
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {data.recentOrders.length === 0 ? (
            <div className="text-gray-500">No recent orders</div>
          ) : (
            data.recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center py-2 border-b">
                <div>
                  <span className="font-medium">Order #{order.id}</span>
                  <span className="text-sm text-gray-500 ml-2">{order.productName}</span>
                </div>
                <span className="text-green-600 font-medium">₹{order.amount}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
