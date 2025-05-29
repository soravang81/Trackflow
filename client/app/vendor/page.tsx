"use client"
import { useEffect, useState } from 'react';
import api, { setAuthToken } from '@/utils/api';
import OrderCard from '@/components/orderCard';

const VendorDashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchOrders();
      // fetchPartners();
    }
  }, [token]);

  const fetchOrders = async () => {
    const res = await api.get('/orders/vendor');
    setOrders(res.data);
  };

  const fetchPartners = async () => {
    const res = await api.get('/users/partners'); // You can create this API or hardcode in frontend for now
    setPartners(res.data);
  };

  const handleAssign = async (orderId: string) => {
    const deliveryPartnerId = prompt('Enter Delivery Partner ID:');
    if (!deliveryPartnerId) return;
    await api.post('/orders/assign', { orderId, partnerId : deliveryPartnerId });
    fetchOrders();
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Vendor Dashboard</h1>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} onAssign={handleAssign} />
      ))}
    </div>
  );
};

export default VendorDashboard;
