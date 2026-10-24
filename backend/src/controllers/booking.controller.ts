import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import { AppError } from '../middlewares/error.middleware.js';

const DEMO_BOOKINGS = [
  {
    id: 'ord-8901',
    bookingCode: 'FM-2026-8901',
    customerName: 'Sarah Jenkins',
    customerEmail: 'user@flowermarket.shop',
    itemTitle: 'Peace Lily Air Purifier',
    totalAmount: 38.0,
    status: 'Dispatched',
    scheduledDate: '2026-10-25T14:00:00Z',
    deliveryAddress: '742 Evergreen Terrace, Springfield, OR',
  },
  {
    id: 'ord-8902',
    bookingCode: 'FM-2026-8902',
    customerName: 'Rayhan Raski',
    customerEmail: 'rayhan@example.com',
    itemTitle: 'Velvet Ecuadorian Long-Stem Roses',
    totalAmount: 54.0,
    status: 'Delivered',
    scheduledDate: '2026-10-23T11:30:00Z',
    deliveryAddress: '120 Market Street, San Francisco, CA',
  },
  {
    id: 'ord-8903',
    bookingCode: 'FM-2026-8903',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus@example.com',
    itemTitle: 'Kyoto Heritage Juniper Bonsai',
    totalAmount: 88.0,
    status: 'Processing',
    scheduledDate: '2026-10-26T09:00:00Z',
    deliveryAddress: '45 Nursery Lane, Sonoma Valley, CA',
  },
];

export async function createBooking(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { serviceId, scheduledDate, deliveryAddress, notes } = req.body;
    const userId = req.user?.id || 'usr_guest';

    const newBooking = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingCode: `FM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: userId,
      serviceId,
      status: 'Confirmed',
      scheduledDate,
      deliveryAddress,
      notes,
      totalAmount: 48.0,
      createdAt: new Date().toISOString(),
    };

    res.status(201).json({
      success: true,
      message: 'Booking created successfully. Our botanical artisans are preparing your stems.',
      data: newBooking,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyBookings(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.json({
      success: true,
      data: DEMO_BOOKINGS,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBookingStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;

    res.json({
      success: true,
      message: `Booking #${id} status updated to ${status}.`,
      data: { id, status, updatedAt: new Date().toISOString() },
    });
  } catch (error) {
    next(error);
  }
}
