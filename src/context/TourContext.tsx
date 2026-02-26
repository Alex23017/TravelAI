import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { tours as initialTours } from '../data/tours';

export interface Tour {
  id: number;
  name: string;
  price: number;
  days: number;
  img: string;
  desc: string;
}

export type BookingStatus = 'Нова' | 'Оброблено' | 'Оплачено' | 'Відмінено';

export interface Booking {
  id: number;
  tourName: string;
  clientName: string;
  phone: string;
  date: string;
  status: BookingStatus;
}

export type ReviewStatus = 'Новий' | 'Схвалено' | 'Відхилено';

export interface Review {
  id: number;
  name: string;
  tour: string;
  text: string;
  rating: number;
  status: ReviewStatus;
  date: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Анна Мельник",
    tour: "Балі, Індонезія",
    text: "Найкраща відпустка у моєму житті! Організація на вищому рівні, готель відповідав усім очікуванням.",
    rating: 5,
    status: 'Схвалено',
    date: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 2,
    name: "Олег та Марія",
    tour: "Париж, Франція",
    text: "Дуже дякуємо за романтичний тур до Парижа. Все продумано до дрібниць.",
    rating: 4,
    status: 'Схвалено',
    date: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 3,
    name: "Віктор Савченко",
    tour: "Рим, Італія",
    text: "Місто неймовірно красиве, але влітку дуже спекотно.",
    rating: 3,
    status: 'Схвалено',
    date: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: 4,
    name: "Олена Коваленко",
    tour: "Кіото, Японія",
    text: "Це просто магія! Цвітіння сакури і чайні церемонії залишили незабутні враження.",
    rating: 5,
    status: 'Новий',
    date: new Date().toISOString()
  },
];

interface TourContextType {
  tours: Tour[];
  addTour: (tour: Tour) => void;
  deleteTour: (id: number) => void;

  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: number, newStatus: BookingStatus) => void;
  updateBooking: (id: number, updatedData: Partial<Booking>) => void;
  deleteBooking: (id: number) => void;

  reviews: Review[];
  addReview: (review: Review) => void;
  updateReviewStatus: (id: number, newStatus: ReviewStatus) => void;
  deleteReview: (id: number) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: ReactNode }) {
  // --- ТУРИ ---
  const [tours, setTours] = useState<Tour[]>(() => {
    const savedTours = localStorage.getItem('toursData');
    return savedTours ? JSON.parse(savedTours) : initialTours;
  });

  // --- БРОНЮВАННЯ ---
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const savedBookings = localStorage.getItem('bookingsData');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  // --- ВІДГУКИ ---
  const [reviews, setReviews] = useState<Review[]>(() => {
    const savedReviews = localStorage.getItem('reviewsData');
    return savedReviews ? JSON.parse(savedReviews) : initialReviews;
  });

  // Автозбереження у LocalStorage
  useEffect(() => localStorage.setItem('toursData', JSON.stringify(tours)), [tours]);
  useEffect(() => localStorage.setItem('bookingsData', JSON.stringify(bookings)), [bookings]);
  useEffect(() => localStorage.setItem('reviewsData', JSON.stringify(reviews)), [reviews]);

  // Функції для Турів
  const addTour = (tour: Tour) => setTours([tour, ...tours]);
  const deleteTour = (id: number) => setTours(tours.filter(t => t.id !== id));

  // Функції для Бронювань
  const addBooking = (booking: Booking) => setBookings([booking, ...bookings]);

  const updateBookingStatus = (id: number, newStatus: BookingStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const updateBooking = (id: number, updatedData: Partial<Booking>) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
  };

  const deleteBooking = (id: number) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  // Функції для Відгуків
  const addReview = (review: Review) => setReviews([review, ...reviews]);

  const updateReviewStatus = (id: number, newStatus: ReviewStatus) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const deleteReview = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
      <TourContext.Provider value={{
        tours, addTour, deleteTour,
        bookings, addBooking, updateBookingStatus, updateBooking, deleteBooking,
        reviews, addReview, updateReviewStatus, deleteReview
      }}>
        {children}
      </TourContext.Provider>
  );
}

export const useTours = () => {
  const context = useContext(TourContext);
  if (context === undefined) throw new Error('useTours must be used within a TourProvider');
  return context;
};