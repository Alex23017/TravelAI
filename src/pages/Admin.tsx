import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTours, type BookingStatus, type ReviewStatus, type Booking } from '../context/TourContext';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [newTour, setNewTour] = useState({ name: '', price: '', days: '', img: '', desc: '' });

  // Стан для редагування заявок
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Booking>>({});

  const {
    tours, addTour, deleteTour,
    bookings, updateBookingStatus, updateBooking, deleteBooking,
    reviews, updateReviewStatus, deleteReview
  } = useTours();

  // --- ЛОГІКА РЕДАГУВАННЯ ЗАЯВОК ---
  const startEditing = (booking: Booking) => {
    setEditingId(booking.id);
    setEditForm(booking);
  };

  const saveEdit = () => {
    if (editingId) {
      updateBooking(editingId, editForm);
      setEditingId(null);
    }
  };

  // --- ДОДАВАННЯ ТУРУ ---
  const handleAddTour = (e: React.FormEvent) => {
    e.preventDefault();
    addTour({
      id: Date.now(),
      name: newTour.name,
      price: Number(newTour.price),
      days: Number(newTour.days),
      img: newTour.img || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80',
      desc: newTour.desc
    });
    setNewTour({ name: '', price: '', days: '', img: '', desc: '' });
    alert('Тур успішно додано!');
  };

  const newBookingsCount = bookings.filter(b => b.status === 'Нова').length;
  const newReviewsCount = reviews.filter(r => r.status === 'Новий').length;

  return (
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-900 transition-colors duration-500">

        {/* --- SIDEBAR / TOP NAV (Адаптивний) --- */}
        <div className="w-full lg:w-64 bg-slate-800 text-slate-300 flex flex-col border-b lg:border-r border-slate-700 shadow-xl shrink-0">
          <div className="p-4 lg:p-6 font-bold text-xl text-white border-b border-slate-700 flex items-center justify-between lg:justify-start gap-3">
            <span className="flex items-center gap-2">🛠️ <span className="tracking-tighter uppercase">Admin Panel</span></span>
            <Link to="/" className="lg:hidden text-[10px] bg-slate-700 px-3 py-1.5 rounded-lg font-bold border border-slate-600">← НА САЙТ</Link>
          </div>

          <nav className="flex flex-wrap lg:flex-col overflow-x-auto lg:overflow-y-auto px-2 lg:px-4 py-3 lg:py-6 gap-2 no-scrollbar">
            {[
              { id: 'overview', icon: '📊', label: 'Огляд' },
              { id: 'tours', icon: '✈️', label: 'Тури' },
              { id: 'bookings', icon: '📝', label: 'Заявки', count: newBookingsCount, color: 'bg-red-500' },
              { id: 'reviews', icon: '💬', label: 'Відгуки', count: newReviewsCount, color: 'bg-yellow-500' },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`whitespace-nowrap flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${
                        activeTab === item.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'hover:bg-slate-700 hover:text-white'
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs uppercase tracking-widest">{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                      <span className={`${item.color} text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse`}>
                  {item.count}
                </span>
                  )}
                </button>
            ))}
          </nav>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">

          {/* 1. ОГЛЯД */}
          {activeTab === 'overview' && (
              <div className="animate-in fade-in duration-500">
                <h1 className="text-2xl lg:text-3xl font-black mb-8 text-slate-800 dark:text-white uppercase">Статистика</h1>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {[
                    { label: 'Усі Тури', val: tours.length, color: 'text-primary' },
                    { label: 'Нові Заявки', val: newBookingsCount, color: 'text-red-500' },
                    { label: 'Всього Заявок', val: bookings.length, color: 'dark:text-white' },
                    { label: 'Відгуки', val: reviews.length, color: 'text-yellow-500' }
                  ].map((stat, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl lg:rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                        <h3 className="text-slate-500 dark:text-slate-400 font-bold text-[9px] uppercase tracking-widest">{stat.label}</h3>
                        <p className={`text-3xl lg:text-5xl font-black mt-2 ${stat.color}`}>{stat.val}</p>
                      </div>
                  ))}
                </div>
              </div>
          )}

          {/* 2. ЗАЯВКИ (Адаптивні: Таблиця -> Картки) */}
          {activeTab === 'bookings' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl lg:text-3xl font-black mb-8 text-slate-800 dark:text-white uppercase">Керування заявками</h1>

                <div className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                  {/* TABLE FOR DESKTOP */}
                  <div className="hidden md:block">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 dark:bg-slate-700/50 border-b dark:border-slate-700">
                      <tr>
                        <th className="p-4 text-[10px] uppercase font-black text-slate-400">Клієнт / Телефон</th>
                        <th className="p-4 text-[10px] uppercase font-black text-slate-400">Тур / Дата</th>
                        <th className="p-4 text-right text-[10px] uppercase font-black text-slate-400">Дії / Статус</th>
                      </tr>
                      </thead>
                      <tbody>
                      {bookings.map(booking => (
                          <tr key={booking.id} className={`border-b dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors ${booking.status === 'Нова' ? 'bg-primary/5' : ''}`}>
                            {editingId === booking.id ? (
                                <>
                                  <td className="p-4 space-y-2">
                                    <input className="w-full p-2 text-sm bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg dark:text-white" value={editForm.clientName} onChange={e => setEditForm({...editForm, clientName: e.target.value})} />
                                    <input className="w-full p-2 text-sm bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg dark:text-white" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
                                  </td>
                                  <td className="p-4 space-y-2">
                                    <input className="w-full p-2 text-sm bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg dark:text-white" value={editForm.tourName} onChange={e => setEditForm({...editForm, tourName: e.target.value})} />
                                  </td>
                                  <td className="p-4 text-right flex flex-col items-end gap-2">
                                    <button onClick={saveEdit} className="bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold">ОК</button>
                                  </td>
                                </>
                            ) : (
                                <>
                                  <td className="p-4">
                                    <div className="font-bold dark:text-white">{booking.clientName}</div>
                                    <div className="text-xs text-slate-500">{booking.phone}</div>
                                  </td>
                                  <td className="p-4 font-bold text-primary">{booking.tourName}</td>
                                  <td className="p-4 text-right">
                                    <div className="flex justify-end items-center gap-3">
                                      <button onClick={() => startEditing(booking)} className="p-2 text-slate-400 hover:text-primary">✏️</button>
                                      <button onClick={() => deleteBooking(booking.id)} className="p-2 text-slate-400 hover:text-red-500">🗑️</button>
                                      <select
                                          value={booking.status}
                                          onChange={(e) => updateBookingStatus(booking.id, e.target.value as BookingStatus)}
                                          className="text-[10px] font-bold p-2 rounded-lg border dark:bg-slate-700"
                                      >
                                        <option value="Нова">🔵 НОВА</option>
                                        <option value="Оплачено">🟢 ОПЛАТА</option>
                                      </select>
                                    </div>
                                  </td>
                                </>
                            )}
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>

                  {/* CARDS FOR MOBILE (image_60a4d6.png fix) */}
                  <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700">
                    {bookings.map(booking => (
                        <div key={booking.id} className={`p-4 space-y-3 ${booking.status === 'Нова' ? 'bg-primary/5' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold dark:text-white text-lg">{booking.clientName}</div>
                              <div className="text-xs text-slate-500">{booking.phone}</div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => startEditing(booking)} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">✏️</button>
                              <button onClick={() => deleteBooking(booking.id)} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">🗑️</button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-700/50 p-3 rounded-2xl">
                            <div>
                              <div className="text-primary font-black text-sm uppercase">{booking.tourName}</div>
                              <div className="text-[10px] text-slate-400">{booking.date}</div>
                            </div>
                            <select
                                value={booking.status}
                                onChange={(e) => updateBookingStatus(booking.id, e.target.value as BookingStatus)}
                                className="text-[10px] font-black p-2 rounded-xl bg-white dark:bg-slate-600 border-none shadow-sm"
                            >
                              <option value="Нова">НОВА</option>
                              <option value="Оплачено">ОПЛАТА</option>
                              <option value="Відмінено">ВІДМІНА</option>
                            </select>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          )}

          {/* 3. ТУРИ */}
          {activeTab === 'tours' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl lg:text-3xl font-black mb-8 text-slate-800 dark:text-white uppercase">Керування Турами</h1>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 mb-8 shadow-sm">
                  <form onSubmit={handleAddTour} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Назва" required value={newTour.name} onChange={e => setNewTour({...newTour, name: e.target.value})} className="p-3 bg-slate-50 dark:bg-slate-700 dark:text-white border border-slate-100 dark:border-slate-600 rounded-xl outline-none" />
                    <input type="number" placeholder="Ціна ($)" required value={newTour.price} onChange={e => setNewTour({...newTour, price: e.target.value})} className="p-3 bg-slate-50 dark:bg-slate-700 dark:text-white border border-slate-100 dark:border-slate-600 rounded-xl outline-none" />
                    <textarea placeholder="Опис..." required value={newTour.desc} onChange={e => setNewTour({...newTour, desc: e.target.value})} className="p-3 bg-slate-50 dark:bg-slate-700 dark:text-white border border-slate-100 dark:border-slate-600 rounded-xl outline-none md:col-span-2 h-20 resize-none" />
                    <div className="md:col-span-2 flex justify-end">
                      <button type="submit" className="bg-green-500 text-white font-bold py-2 px-8 rounded-xl shadow-lg hover:scale-105 transition-transform">+ ДОДАТИ</button>
                    </div>
                  </form>
                </div>
                {/* GRID OF TOURS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {tours.map(tour => (
                      <div key={tour.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex justify-between items-center shadow-sm">
                        <div className="truncate pr-4">
                          <div className="font-bold dark:text-white text-sm truncate">{tour.name}</div>
                          <div className="text-primary font-black text-xs">${tour.price}</div>
                        </div>
                        <button onClick={() => deleteTour(tour.id)} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">🗑️</button>
                      </div>
                  ))}
                </div>
              </div>
          )}

          {/* 4. ВІДГУКИ */}
          {activeTab === 'reviews' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl lg:text-3xl font-black mb-8 text-slate-800 dark:text-white uppercase">Модерація відгуків</h1>
                <div className="space-y-4">
                  {reviews.map(review => (
                      <div key={review.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl lg:rounded-3xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold dark:text-white text-sm">{review.name}</span>
                            <span className="text-[9px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-tighter">{review.tour}</span>
                          </div>
                          <p className="text-xs text-slate-500 italic">"{review.text}"</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <select
                              value={review.status}
                              onChange={(e) => updateReviewStatus(review.id, e.target.value as ReviewStatus)}
                              className="text-[10px] font-black p-2 rounded-lg border dark:bg-slate-700"
                          >
                            <option value="Новий">НОВИЙ</option>
                            <option value="Схвалено">СХВАЛЕНО</option>
                          </select>
                          <button onClick={() => deleteReview(review.id)} className="text-red-500 text-xs">🗑️</button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
          )}
        </div>
      </div>
  );
}