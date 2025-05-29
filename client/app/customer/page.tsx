'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api, { setAuthToken } from '@/utils/api';
import { Order } from '@prisma/client';


export default function CustomerOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const token = session?.user.token
  
  useEffect(() => {
    console.log(token)
    if (token) {
      setAuthToken(token);
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/customer');
      console.log(res.data)
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };
  // const handleTrack = (e:) => {
  //   router.push(`/track?orderId=${e.}`)
  // }

  if (status === 'loading' || loading) {
    return <div className="text-center mt-10">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center mt-10">No orders found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border rounded-lg shadow-sm">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Vendor ID:</strong>{order.vendorId}</p>
            <p><strong>Delivery partner ID:</strong>{order.partnerId}</p>
            <p><strong>Ordered on:</strong> {new Date((order as any).createdAt).toLocaleString()}</p>
            <button className='bg-blue-500 p-2 rounded-md px-4 mt-2 hover:cursor-pointer'
              id={order.id}
              onClick={(e)=>{
                router.push(`/customer/track?orderId=${e.currentTarget.id}`)
              }}
              >Track you order</button >
          </div>
        ))}
      </div>
    </div>
  );
}
