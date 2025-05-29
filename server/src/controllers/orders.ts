import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get vendor's orders
export const getVendorOrders = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role !== 'vendor') return res.status(403).json({ error: 'Unauthorized' });
  try {
    const orders = await prisma.order.findMany({
      where: { vendorId: user.id },
      include: {
        partner: {
          select: {
            id : true,
            email: true,
          }
        },
        customer: {
          select: {
            id : true,
            email: true,
          }
        },
        location: true,
      },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch orders', details: err });
  }
};
export const getCustomerOrders = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role !== 'customer') return res.status(403).json({ error: 'Unauthorized' });
  try {
    const orders = await prisma.order.findMany({
      where: { customerId: user.id },
      include: {
        partner: true,
        vendor: true,
        location: true,
      },
    });
    // console.log(orders)
    res.json(orders);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not fetch orders', details: err });
  }
};

// Create a new order (temporary, for demo/testing)
export const createOrder = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { customerId } = req.body;
  console.log(customerId)
  if (user.role !== 'vendor') return res.status(403).json({ error: 'Unauthorized' });

  try {
    const order = await prisma.order.create({
      data: {
        vendorId: user.id,
        customerId,
      },
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not create order', details: err });
  }
};

// Assign delivery partner
export const assignpartner = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { orderId, partnerId } = req.body;
  console.log(partnerId , orderId)
  if (user.role !== 'vendor') return res.status(403).json({ error: 'Unauthorized' });

  try {
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { partnerId, status: 'assigned' },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not assign delivery partner', details: err });
  }
};

// Delivery partner gets their assigned order
export const getAssignedOrder = async (req: Request, res: Response) => {
  console.log((req as any).user)
  const user = (req as any).user;
  if (user.role !== 'delivery') return res.status(403).json({ error: 'Unauthorized' });

  try {
    const order = await prisma.order.findFirst({
      where: { partnerId: user.id, status: { not: 'delivered' } },
      include: { vendor: {
        select: {
          id : true,
          email: true,
        }
      }, customer: {
        select: {
          id : true,
          email: true,
        }
      }, location: true },
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch order', details: err });
  }
};

