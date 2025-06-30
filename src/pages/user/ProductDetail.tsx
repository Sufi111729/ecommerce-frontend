import  { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Star, ShoppingCart, Heart, Plus, Minus } from 'lucide-react'

export default function ProductDetail() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)

  const product = {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1707328739134-7cf382e74fc2?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjBwcm9kdWN0cyUyMHNob3BwaW5nfGVufDB8fHx8MTc1MDkxOTYwNXww&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800',
    rating: 4.5,
    reviews: 128,
    description: 'Premium wireless headphones with noise cancellation and superior sound quality.',
    features: ['Bluetooth 5.0', '30-hour battery', 'Active noise cancellation', 'Quick charge']
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">${product.price}</div>

          <p className="text-gray-600">{product.description}</p>

          <div>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
 