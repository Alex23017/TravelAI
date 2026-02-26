import { useState } from 'react';
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
    const tourToAdd = {
      id: Date.now(),
      name: newTour.name,
      price: Number(newTour.price),
      days: Number(newTour.days),
      img: newTour.img || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80',
      desc: newTour.desc
    };
    addTour(tourToAdd);
    setNewTour({ name: '', price: '', days: '', img: '', desc: '' });
    alert('Тур успішно додано!');
  };

  const newBookingsCount = bookings.filter(b => b.status === 'Нова').length;
  const newReviewsCount = reviews.filter(r => r.status === 'Новий').length;

  return (
      <div className="flex min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-900 transition-colors duration-500">

        {/* --- SIDEBAR --- */}
        <div className="w-64 bg-slate-800 text-slate-300 hidden md:flex flex-col border-r border-slate-700 shadow-xl">
          <div className="p-6 font-bold text-xl text-white border-b border-slate-700 tracking-tight">
            Admin Dashboard
          </div>
          <ul className="flex-1 px-4 py-6 space-y-2">
            <li>
              <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-slate-700 hover:text-white'}`}>
                📊 Огляд
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('tours')} className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'tours' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-slate-700 hover:text-white'}`}>
                ✈️ Тури
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('bookings')} className={`w-full flex justify-between items-center text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-slate-700 hover:text-white'}`}>
                <span>📝 Заявки</span>
                {newBookingsCount > 0 && <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">{newBookingsCount}</span>}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('reviews')} className={`w-full flex justify-between items-center text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'reviews' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-slate-700 hover:text-white'}`}>
                <span>💬 Відгуки</span>
                {newReviewsCount > 0 && <span className="bg-yellow-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{newReviewsCount}</span>}
              </button>
            </li>
          </ul>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 p-8 overflow-y-auto">

          {/* 1. ОГЛЯД */}
          {activeTab === 'overview' && (
              <div className="animate-in fade-in duration-500">
                <h1 className="text-3xl font-black mb-8 text-slate-800 dark:text-white">Статистика</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Усі Тури', val: tours.length, color: 'text-primary' },
                    { label: 'Нові Заявки', val: newBookingsCount, color: newBookingsCount > 0 ? 'text-red-500' : 'text-green-500' },
                    { label: 'Всього Заявок', val: bookings.length, color: 'text-slate-800 dark:text-white' },
                    { label: 'Відгуки', val: reviews.length, color: 'text-yellow-500' }
                  ].map((stat, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
                        <h3 className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">{stat.label}</h3>
                        <p className={`text-5xl font-black mt-2 ${stat.color}`}>{stat.val}</p>
                      </div>
                  ))}
                </div>
              </div>
          )}

          {/* 2. ЗАЯВКИ (З РЕДАГУВАННЯМ ТА ВИДАЛЕННЯМ) */}
          {activeTab === 'bookings' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-black mb-8 text-slate-800 dark:text-white">Керування заявками</h1>
                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm transition-colors">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-700/50 border-b dark:border-slate-700">
                    <tr>
                      <th className="p-4 text-slate-500 dark:text-slate-300">Клієнт / Телефон</th>
                      <th className="p-4 text-slate-500 dark:text-slate-300">Тур / Дата</th>
                      <th className="p-4 text-right text-slate-500 dark:text-slate-300">Дії / Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id} className={`border-b dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors ${booking.status === 'Нова' ? 'bg-primary/5' : ''}`}>
                          {editingId === booking.id ? (
                              /* --- РЕЖИМ РЕДАГУВАННЯ --- */
                              <>
                                <td className="p-4 space-y-2">
                                  <input className="w-full p-2 text-sm bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg dark:text-white outline-none focus:ring-1 focus:ring-primary" value={editForm.clientName} onChange={e => setEditForm({...editForm, clientName: e.target.value})} />
                                  <input className="w-full p-2 text-sm bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg dark:text-white outline-none focus:ring-1 focus:ring-primary" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
                                </td>
                                <td className="p-4 space-y-2">
                                  <input className="w-full p-2 text-sm bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg dark:text-white outline-none focus:ring-1 focus:ring-primary" value={editForm.tourName} onChange={e => setEditForm({...editForm, tourName: e.target.value})} />
                                  <input type="date" className="w-full p-2 text-sm bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg dark:text-white outline-none focus:ring-1 focus:ring-primary" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} />
                                </td>
                                <td className="p-4 text-right flex flex-col items-end gap-2">
                                  <button onClick={saveEdit} className="bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md">Зберегти</button>
                                  <button onClick={() => setEditingId(null)} className="text-slate-400 text-xs hover:text-red-500">Скасувати</button>
                                </td>
                              </>
                          ) : (
                              /* --- РЕЖИМ ПЕРЕГЛЯДУ --- */
                              <>
                                <td className="p-4">
                                  <div className="font-bold dark:text-white text-lg">{booking.clientName}</div>
                                  <div className="text-sm text-slate-500 dark:text-slate-400">{booking.phone}</div>
                                </td>
                                <td className="p-4">
                                  <div className="text-primary dark:text-sky-400 font-bold">{booking.tourName}</div>
                                  <div className="text-xs text-slate-400 dark:text-slate-500">{booking.date}</div>
                                </td>
                                <td className="p-4 text-right">
                                  <div className="flex justify-end items-center gap-3">
                                    <button onClick={() => startEditing(booking)} className="p-2 text-slate-400 hover:text-primary transition-colors" title="Редагувати">✏️</button>
                                    <button onClick={() => { if(window.confirm('Видалити заявку?')) deleteBooking(booking.id) }} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Видалити">🗑️</button>
                                    <select
                                        value={booking.status}
                                        onChange={(e) => updateBookingStatus(booking.id, e.target.value as BookingStatus)}
                                        className={`font-bold p-2 rounded-xl border-2 dark:bg-slate-700 dark:border-slate-600 outline-none cursor-pointer text-[10px] ${
                                            booking.status === 'Нова' ? 'text-blue-500 border-blue-100' :
                                                booking.status === 'Оплачено' ? 'text-green-500 border-green-100' : 'text-slate-400 border-transparent'
                                        }`}
                                    >
                                      <option value="Нова">🔵 Нова</option>
                                      <option value="Оброблено">🟡 Оброблено</option>
                                      <option value="Оплачено">🟢 Оплачено</option>
                                      <option value="Відмінено">🔴 Відмінено</option>
                                    </select>
                                  </div>
                                </td>
                              </>
                          )}
                        </tr>
                    ))}
                    </tbody>
                  </table>
                  {bookings.length === 0 && <div className="p-12 text-center text-slate-400 italic">Заявок ще немає...</div>}
                </div>
              </div>
          )}

          {/* 3. ТУРИ */}
          {activeTab === 'tours' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-black mb-8 text-slate-800 dark:text-white">Керування Турами</h1>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 mb-8 shadow-sm">
                  <form onSubmit={handleAddTour} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Назва" required value={newTour.name} onChange={e => setNewTour({...newTour, name: e.target.value})} className="p-4 bg-slate-50 dark:bg-slate-700 dark:text-white border border-slate-100 dark:border-slate-600 rounded-2xl outline-none focus:ring-2 focus:ring-primary" />
                    <input type="number" placeholder="Ціна ($)" required value={newTour.price} onChange={e => setNewTour({...newTour, price: e.target.value})} className="p-4 bg-slate-50 dark:bg-slate-700 dark:text-white border border-slate-100 dark:border-slate-600 rounded-2xl outline-none focus:ring-2 focus:ring-primary" />
                    <textarea placeholder="Опис..." required value={newTour.desc} onChange={e => setNewTour({...newTour, desc: e.target.value})} className="p-4 bg-slate-50 dark:bg-slate-700 dark:text-white border border-slate-100 dark:border-slate-600 rounded-2xl outline-none focus:ring-2 focus:ring-primary md:col-span-2 resize-none h-24" />
                    <div className="md:col-span-2 flex justify-end">
                      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-2xl transition-all shadow-lg">+ Додати</button>
                    </div>
                  </form>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <tbody>
                    {tours.map(tour => (
                        <tr key={tour.id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="p-4 font-bold dark:text-white">{tour.name}</td>
                          <td className="p-4 text-primary font-black">${tour.price}</td>
                          <td className="p-4 text-right">
                            <button onClick={() => { if(window.confirm('Видалити тур?')) deleteTour(tour.id) }} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 px-4 py-2 rounded-xl transition">Видалити</button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
          )}

          {/* 4. ВІДГУКИ */}
          {activeTab === 'reviews' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-black mb-8 text-slate-800 dark:text-white">Відгуки</h1>
                <div className="space-y-4">
                  {reviews.map(review => (
                      <div key={review.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between gap-6 shadow-sm transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-black text-xl dark:text-white">{review.name}</span>
                            <span className="text-primary text-xs font-bold bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">{review.tour}</span>
                          </div>
                          <div className="flex text-yellow-400 mb-3 text-sm">
                            {[...Array(5)].map((_, i) => <span key={i}>{i < review.rating ? '★' : '☆'}</span>)}
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 italic">"{review.text}"</p>
                        </div>
                        <div className="flex flex-col items-end gap-3 min-w-[200px]">
                          <select
                              value={review.status}
                              onChange={(e) => updateReviewStatus(review.id, e.target.value as ReviewStatus)}
                              className="w-full font-bold p-3 rounded-2xl border-2 dark:bg-slate-700 dark:text-white dark:border-slate-600 outline-none text-xs cursor-pointer"
                          >
                            <option value="Новий">🟡 Новий</option>
                            <option value="Схвалено">🟢 Схвалено</option>
                            <option value="Відхилено">🔴 Відхилено</option>
                          </select>
                          <button onClick={() => { if(window.confirm('Видалити відгук?')) deleteReview(review.id) }} className="text-red-500 text-xs font-bold hover:underline">Видалити відгук</button>
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