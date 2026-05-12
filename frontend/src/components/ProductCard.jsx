import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const categoryColors = {
    Electronics:     'bg-blue-900/50 text-blue-300',
    Clothing:        'bg-purple-900/50 text-purple-300',
    Books:           'bg-yellow-900/50 text-yellow-300',
    'Home & Kitchen':'bg-green-900/50 text-green-300',
    Sports:          'bg-orange-900/50 text-orange-300',
    Beauty:          'bg-pink-900/50 text-pink-300',
    Toys:            'bg-cyan-900/50 text-cyan-300',
    Other:           'bg-gray-700 text-gray-300',
  };

  return (
    <Link to={`/products/${product._id}`} className="group block">
      <div className="card overflow-hidden hover:border-blue-600/50 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-xl hover:-translate-y-1">
        {/* Image */}
        <div className="relative overflow-hidden h-52 bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x300/1f2937/6b7280?text=No+Image';
            }}
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="text-red-400 font-bold text-lg">Out of Stock</span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className={`badge ${categoryColors[product.category] || 'bg-gray-700 text-gray-300'}`}>
              {product.category}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-gray-100 font-semibold text-base leading-tight mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-blue-400 font-bold text-xl">${product.price.toFixed(2)}</span>
            <span className="text-gray-600 text-xs">Stock: {product.stock}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-3 w-full btn-primary text-sm py-2 disabled:opacity-40"
          >
            {product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
