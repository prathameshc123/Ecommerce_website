import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty', 'Toys'];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  const fetchProducts = async (category = 'All', query = '') => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (query.trim()) {
        res = await api.get(`/products/search?query=${encodeURIComponent(query)}`);
      } else if (category && category !== 'All') {
        res = await api.get(`/products/category/${encodeURIComponent(category)}`);
      } else {
        res = await api.get('/products');
      }
      setProducts(res.data.products || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory, '');
    setSearch('');
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setSearchParams({});
      fetchProducts('All', search);
    }
  };

  const handleCategoryClick = (cat) => {
    setSearch('');
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleSearchClear = () => {
    setSearch('');
    fetchProducts(activeCategory, '');
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">All Products</h1>
          <p className="text-gray-500">Browse our full catalog of products</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <input
            id="product-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name, description or category..."
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary px-6" id="search-btn">
            🔍 Search
          </button>
          {search && (
            <button type="button" onClick={handleSearchClear} className="btn-secondary px-4">
              ✕ Clear
            </button>
          )}
        </form>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                (cat === 'All' && !searchParams.get('category')) ||
                cat === activeCategory
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

        {/* Loading */}
        {loading ? (
          <Loader text="Loading products..." />
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-600">Try a different search term or category</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-5">
              Showing <span className="text-blue-400 font-semibold">{products.length}</span> product{products.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
