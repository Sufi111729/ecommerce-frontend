import  { useState } from 'react'
import { Trash, Plus, Minus } from 'lucide-react'

const initialCartItems = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1, image: 'https://images.unsplash.com/photo-1707328739134-7cf382e74fc2?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjBwcm9kdWN0cyUyMHNob3BwaW5nfGVufDB8fHx8MTc1MDkxOTYwNXww&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800' },
  { id: 2, name: 'Running Shoes', price: 79.99, quantity: 2, image: 'https://images.unsplash.com/photo-1590483200604-e9e60b6cb2dc?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjBwcm9kdWN0cyUyMHNob3BwaW5nfGVufDB8fHx8MTc1MDkxOTYwNXww&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800' },
]

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-3 py-1 border rounded">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800">
                <Trash className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>$9.99</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span>${(total + 9.99).toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
 