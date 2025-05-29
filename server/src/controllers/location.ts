import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Delivery partner updates location
export const updateLocation = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { orderId, lat, lng } = req.body;

  if (user.role !== 'delivery') return res.status(403).json({ error: 'Unauthorized' });

  try {
    const updated = await prisma.location.upsert({
      where: { orderId },
      update: { lat, lng },
      create: { orderId, lat, lng },
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update location', details: err });
  }
};

// Customer gets current location of delivery partner
export const getLocation = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  console.log(orderId)
  try {
    const location = await prisma.location.findUnique({ where: { orderId } });
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch location', details: err });
  }
};
export const setLocation = async (req: Request, res: Response) => {
  const { lat, lng , orderId } = req.body;
  try {
    const location = await prisma.location.upsert({
      where: { orderId },
      update: { lat, lng },
      create: { orderId, lat, lng },
    });
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch location', details: err });
  }
};
