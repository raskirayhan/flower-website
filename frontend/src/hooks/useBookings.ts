import { useState } from 'react';
import { Booking } from '../types/index.js';

const INITIAL_BOOKINGS: Booking[] = [
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
];

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const addBooking = (newBooking: Omit<Booking, 'id' | 'bookingCode'>) => {
    const booking: Booking = {
      ...newBooking,
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingCode: `FM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setBookings((prev) => [booking, ...prev]);
    return booking;
  };

  return { bookings, addBooking };
}
