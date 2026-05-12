import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty', 'Toys'];

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 py-24 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-700 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 rounded-full px-4 py-2 mb-6">
            <span className="text-blue-400 text-sm font-medium">🚀 Cloud Computing Practical Project</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Shop Smarter with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              ShopEase
            </span>
          </h1>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Discover thousands of products across all categories. Fast, secure, and easy to use.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="btn-primary px-8 py-3 text-lg rounded-xl shadow-lg shadow-blue-900/40 hover:shadow-blue-700/50 transition-shadow"
            >
              🛍️ Browse Products
            </Link>
            {!user && (
              <Link
                to="/register"
                className="btn-secondary px-8 py-3 text-lg rounded-xl border border-gray-700"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Secure Auth', desc: 'JWT-based authentication keeps your account safe.' },
              { icon: '⚡', title: 'Fast & Responsive', desc: 'Built with React + Vite for blazing-fast performance.' },
              { icon: '☁️', title: 'Cloud Ready', desc: 'MongoDB Atlas backend deployed on the cloud.' },
            ].map((f) => (
              <div key={f.title} className="card p-6 text-center hover:border-blue-700/50 transition-colors">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Shop by <span className="text-blue-400">Category</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const icons = {
                Electronics: '💻', Clothing: '👕', Books: '📚',
                'Home & Kitchen': '🏠', Sports: '⚽', Beauty: '💄', Toys: '🧸',
              };
              return (
                <Link
                  key={cat}
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className="card p-5 text-center hover:border-blue-600/60 hover:-translate-y-1 transition-all duration-200 group"
                >
                  <div className="text-3xl mb-2">{icons[cat]}</div>
                  <p className="text-gray-300 text-sm font-medium group-hover:text-blue-400 transition-colors">{cat}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="py-16 px-4 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-y border-blue-900/30">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to start shopping?</h2>
            <p className="text-gray-400 mb-8">Create a free account and start exploring our product catalog.</p>
            <Link to="/register" className="btn-primary px-8 py-3 text-lg rounded-xl">
              Get Started — It's Free
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8 text-center">
        <p className="text-gray-600 text-sm">
          © 2026 ShopEase — MERN Stack E-Commerce | Cloud Computing Practical Assignment
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
