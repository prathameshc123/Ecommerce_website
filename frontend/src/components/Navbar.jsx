import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path
      ? 'text-blue-400 font-semibold'
      : 'text-gray-300 hover:text-white';

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              ShopEase
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/products" className={`text-sm transition-colors ${isActive('/products')}`}>Products</Link>
            {user && (
              <>
                <Link to="/cart" className={`text-sm transition-colors relative ${isActive('/cart')}`}>
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className={`text-sm transition-colors ${isActive('/orders')}`}>My Orders</Link>
              </>
            )}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">
                  👋 <span className="text-gray-200 font-medium">{user.name}</span>
                </span>
                <button onClick={handleLogout} className="btn-secondary text-sm py-1.5 px-3">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm py-1.5 px-4">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-1.5 px-4">Register</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white py-2">Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white py-2">Products</Link>
          {user && (
            <>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white py-2">
                Cart {cartCount > 0 && <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 ml-1">{cartCount}</span>}
              </Link>
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white py-2">My Orders</Link>
            </>
          )}
          <div className="pt-2 border-t border-gray-800">
            {user ? (
              <button onClick={handleLogout} className="w-full btn-secondary text-sm">Logout</button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 btn-secondary text-sm text-center py-2">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 btn-primary text-sm text-center py-2">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
