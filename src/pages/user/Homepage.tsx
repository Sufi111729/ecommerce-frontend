import  { useState } from 'react'
import { Filter, Search, Star, ShoppingCart } from 'lucide-react'

const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://images.unsplash.com/photo-1707328739134-7cf382e74fc2?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjBwcm9kdWN0cyUyMHNob3BwaW5nfGVufDB8fHx8MTc1MDkxOTYwNXww&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800', rating: 4.5 },
  { id: 2, name: 'Running Shoes', price: 79.99, image: 'https://images.unsplash.com/photo-1590483200604-e9e60b6cb2dc?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjBwcm9kdWN0cyUyMHNob3BwaW5nfGVufDB8fHx8MTc1MDkxOTYwNXww&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800', rating: 4.8 },
  { id: 3, name: 'Coffee Maker', price: 149.99, image: 'https://images.unsplash.com/photo-1536755668196-cf1fa5822f98?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjBwcm9kdWN0cyUyMHNob3BwaW5nfGVufDB8fHx8MTc1MDkxOTYwNXww&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800', rating: 4.3 },
  { id: 4, name: 'Smart Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1707328957003-81ff596ad70a?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBlY29tbWVyY2UlMjBwcm9kdWN0cyUyMHNob3BwaW5nfGVufDB8fHx8MTc1MDkxOTYwNXww&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800', rating: 4.6 },
]

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
 