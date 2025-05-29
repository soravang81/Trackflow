import { Order } from '@prisma/client';
import React from 'react';

interface Props {
  order: Order;
  onAssign: (orderId: string) => void;
}

const OrderCard: React.FC<Props> = ({ order, onAssign }) => {
  console.log(order)
  return (
    <div className="border p-4 rounded-xl shadow-md mb-4">
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Customer:</strong> {order.customerId || 'N/A'}</p>
      <p><strong>Assigned To:</strong> {order.partnerId || 'Not Assigned'}</p>
      {!order.partnerId && (
        <button
          onClick={() => onAssign(order.id)}
          className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
        >
          Assign Partner
        </button>
      )}
    </div>
  );
};

export default OrderCard;
