import { Routes, Route } from 'react-router-dom'
import Layout from '../../components/Layout'
import AdminHome from './AdminHome'
import UserManagement from './UserManagement'
import ProductManagement from './ProductManagement'
import OrderManagement from './OrderManagement'
import { Users, ShoppingBag, Package, Settings, Home } from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', path: '/admin', icon: Home },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
]

export default function AdminDashboard() {
  return (
    <Layout sidebarItems={sidebarItems} title="Admin Panel">
      <Routes>
        <Route index element={<AdminHome />} /> {/* matches /admin */}
        <Route path="users" element={<UserManagement />} /> {/* matches /admin/users */}
        <Route path="products" element={<ProductManagement />} /> {/* matches /admin/products */}
        <Route path="orders" element={<OrderManagement />} /> {/* matches /admin/orders */}
        <Route path="settings" element={<div>Settings Coming Soon</div>} />
      </Routes>
    </Layout>
  )
}
