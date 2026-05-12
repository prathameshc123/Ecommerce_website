import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const categoryColors = {
  Electronics: 'bg-blue-900/50 text-blue-300',
  Clothing: 'bg-purple-900/50 text-purple-300',
  Books: 'bg-yellow-900/50 text-yellow-300',
  'Home & Kitchen': 'bg-green-900/50 text-green-300',
  Sports: 'bg-orange-900/50 text-orange-300',
  Beauty: 'bg-pink-900/50 text-pink-300',
  Toys: 'bg-cyan-900/50 text-cyan-300',
  Other: 'bg-gray-700 text-gray-300',
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    setAlert({ type: 'success', message: `✅ ${product.name} added to cart!` });
  };

  if (loading) return <div className="min-h-screen bg-gray-950 pt-10"><Loader text="Loading product..." /></div>;
  if (error) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-red-400 mb-4">{error}</h2>
        <button onClick={() => navigate('/products')} className="btn-primary">Back to Products</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-blue-400 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-blue-400 transition-colors">Products</button>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-xs">{product.name}</span>
        </nav>

        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="card overflow-hidden md:flex">
          {/* Image */}
          <div className="md:w-1/2 bg-gray-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-72 md:h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400/1f2937/6b7280?text=No+Image';
              }}
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className={`badge ${categoryColors[product.category] || 'bg-gray-700 text-gray-300'}`}>
                {product.category}
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                {product.stock > 0 ? `✓ In Stock (${product.stock})` : '✕ Out of Stock'}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white mb-3">{product.name}</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.description}</p>

            <div className="text-4xl font-extrabold text-blue-400 mb-6">
              ${product.price.toFixed(2)}
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-400 text-sm">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center font-bold transition-colors"
                  >
                    −
                  </button>
                  <span className="text-white font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary py-3 text-base disabled:opacity-40"
              >
                {product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
              </button>
              <button
                onClick={() => navigate('/products')}
                className="btn-secondary py-3 px-5"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
