import { Server } from 'socket.io';

const connectedClients = new Map<string, any>();

export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinOrderRoom', (orderId: string) => {
      socket.join(orderId);
      connectedClients.set(socket.id, orderId);
      console.log(`Socket ${socket.id} joined order room ${orderId}`);
    });

    socket.on('locationUpdate', ({ orderId, lat, lng }) => {
      io.to(orderId).emit('locationUpdate', { lat, lng });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
      connectedClients.delete(socket.id);
    });
  });
}
