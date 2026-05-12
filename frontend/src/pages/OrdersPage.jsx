import { useState, useEffect } from 'react';
import api from '../api/axios';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data.orders);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-950 pt-10"><Loader text="Loading your orders..." /></div>;

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>

        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

        {orders.length === 0 ? (
          <div className="text-center py-20 card bg-gray-900/50 border-dashed border-2 border-gray-800">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold text-gray-400 mb-4">You haven't placed any orders yet</h2>
            <Link to="/products" className="btn-primary inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="card p-6 overflow-hidden">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-4 border-b border-gray-800">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Order ID</p>
                    <p className="text-white font-mono text-sm">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Date</p>
                    <p className="text-gray-300 text-sm">
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total</p>
                    <p className="text-blue-400 font-bold text-lg">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Status</p>
                    <span className={`badge ${
                      order.orderStatus === 'Delivered' ? 'bg-green-900/50 text-green-400' :
                      order.orderStatus === 'Shipped' ? 'bg-blue-900/50 text-blue-400' :
                      order.orderStatus === 'Cancelled' ? 'bg-red-900/50 text-red-400' :
                      'bg-yellow-900/50 text-yellow-400'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded bg-gray-800"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/50x50/1f2937/6b7280?text=No+Image';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-gray-300 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
