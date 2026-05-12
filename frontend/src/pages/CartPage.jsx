import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import api from '../api/axios';
import Alert from '../components/Alert';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) return;

    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      };

      await api.post('/orders', orderData);
      clearCart();
      setAlert({ type: 'success', message: 'Order placed successfully!' });
      setTimeout(() => navigate('/orders'), 2000);
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Failed to place order' });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-950">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn-primary px-8 py-3 rounded-xl">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="card p-4 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/100x100/1f2937/6b7280?text=No+Image';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold line-clamp-1">{item.name}</h3>
                  <p className="text-blue-400 font-bold">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-7 h-7 bg-gray-800 hover:bg-gray-700 text-white rounded flex items-center justify-center transition-colors"
                    >
                      −
                    </button>
                    <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-7 h-7 bg-gray-800 hover:bg-gray-700 text-white rounded flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 transition-colors"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
            
            <button
              onClick={clearCart}
              className="text-gray-400 hover:text-red-400 text-sm font-medium transition-colors"
            >
              Clear Entire Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-800 pt-4 flex justify-between text-white font-bold text-xl">
                  <span>Total</span>
                  <span className="text-blue-400">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                id="checkout-btn"
                onClick={handleCheckout}
                disabled={loading}
                className="w-full btn-primary py-4 text-lg rounded-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'Place Order'
                )}
              </button>
              
              <p className="text-center text-gray-500 text-xs mt-4">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
