"use client"
import { useEffect, useState, useRef } from 'react';
import api, { setAuthToken } from '@/utils/api';
import { getNextLocation } from '@/utils/geolocation';
import { io, Socket } from 'socket.io-client';

const DeliveryDashboard = () => {
  const [order, setOrder] = useState<any>(null);
  const [isTracking, setIsTracking] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchAssignedOrder();
    }
  }, [token]);

  const fetchAssignedOrder = async () => {
    const res = await api.get('/orders/delivery/assigned');
    setOrder(res.data);
  };

  const startTracking = () => {
    if (!order) return;
    setIsTracking(true);

    // Init Socket
    const socket = io('http://localhost:3001');
    socket.emit('joinOrderRoom', order.id);
    socketRef.current = socket;

    intervalRef.current = setInterval(async () => {
      const { lat, lng } = getNextLocation();

      // Send to backend (DB update)
      await api.post('/location/update', {
        orderId: order.id,
        lat,
        lng,
      });

      // Emit via socket to clients
      socket.emit('locationUpdate', { orderId: order.id, lat, lng });

      console.log('Location sent:', lat, lng);
    }, 3000);
  };

  const stopTracking = () => {
    setIsTracking(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    socketRef.current?.disconnect();
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Delivery Dashboard</h1>

      {order ? (
        <div className="border p-4 rounded-xl shadow">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Vendor:</strong> {order.vendor.email}</p>
          <p><strong>Customer:</strong> {order.customer.email}</p>

          {!isTracking ? (
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              onClick={startTracking}
            >
              Start Delivery
            </button>
          ) : (
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              onClick={stopTracking}
            >
              Stop
            </button>
          )}
        </div>
      ) : (
        <p>No assigned orders</p>
      )}
    </div>
  );
};

export default DeliveryDashboard;
