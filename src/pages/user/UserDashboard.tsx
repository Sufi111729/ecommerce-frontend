// src/pages/user/UserDashboard.tsx
import { Routes, Route } from 'react-router-dom'
import Layout from '../../components/Layout'
import Homepage from './Homepage'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import Profile from './Profile'
import { Home, ShoppingCart, User, Heart } from 'lucide-react'

const sidebarItems = [
  { name: 'Home', path: '/user', icon: Home },
  { name: 'Cart', path: '/user/cart', icon: ShoppingCart },
  { name: 'Wishlist', path: '/user/wishlist', icon: Heart },
  { name: 'Profile', path: '/user/profile', icon: User },
]

export default function UserDashboard() {
  return (
    <Layout sidebarItems={sidebarItems} title="ModernMart">
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* /user */}
        <Route path="product/:id" element={<ProductDetail />} /> {/* /user/product/:id */}
        <Route path="cart" element={<Cart />} /> {/* /user/cart */}
        <Route path="profile" element={<Profile />} /> {/* /user/profile */}
        <Route path="wishlist" element={<div>Wishlist Coming Soon</div>} /> {/* /user/wishlist */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Layout>
  )
}
