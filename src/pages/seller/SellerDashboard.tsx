// pages/seller/SellerDashboard.tsx
import { Routes, Route } from 'react-router-dom'
import Layout from '../../components/Layout'
import SellerHome from './SellerHome'
import SellerProducts from './SellerProducts'
import SellerOrders from './SellerOrders'
import { Home, Package, ShoppingBag, User } from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', path: '/seller', icon: Home },
  { name: 'My Products', path: '/seller/products', icon: Package },
  { name: 'Orders', path: '/seller/orders', icon: ShoppingBag },
  { name: 'Profile', path: '/seller/profile', icon: User },
]

export default function SellerDashboard() {
  return (
    <Layout sidebarItems={sidebarItems} title="Seller Portal">
      <Routes>
        <Route index element={<SellerHome />} />
        <Route path="products" element={<SellerProducts />} />
        <Route path="orders" element={<SellerOrders />} />
        <Route path="profile" element={<div>Profile Coming Soon</div>} />
      </Routes>
    </Layout>
  )
}  