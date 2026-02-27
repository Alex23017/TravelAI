import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTours } from '../context/TourContext';
import Footer from "../components/Footer.tsx";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tours, addBooking } = useTours();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', date: '' });

  // 🔥 Стан для помилок валідації
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const tour = tours.find(t => t.id === Number(id));

  if (!tour) return <div className="p-20 text-center dark:text-white">Тур не знайдено</div>;

  // 🔥 Функція валідації
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Перевірка імені
    if (formData.name.trim().length < 2) {
      newErrors.name = "Ім'я занадто коротке";
    }

    // Перевірка телефону (Український формат)
    const phoneRegex = /^\+?3?8?(0\d{9})$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Невірний формат телефону (напр. 0991234567)";
    }

    // Перевірка дати (не можна вибрати минуле)
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!formData.date || selectedDate < today) {
      newErrors.date = "Виберіть коректну дату (сьогодні або пізніше)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const newBooking = {
        id: Date.now(),
        tourName: tour.name,
        clientName: formData.name,
        phone: formData.phone,
        date: formData.date,
        status: 'Нова' as const
      };

      addBooking(newBooking);
      setIsModalOpen(false);
      alert('Ваша заявка прийнята! Очікуйте дзвінка.');
      navigate('/tours');
    }
  };

  return (
      <>
        <div className="container mx-auto py-12 px-4 dark:bg-slate-900 transition-colors">
          <Link to="/tours"
                className="text-slate-500 hover:text-primary mb-6 inline-flex items-center gap-2 transition-colors">
            <span>←</span> До каталогу
          </Link>

          <div
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border dark:border-slate-700">
            <img src={tour.img} alt={tour.name} className="w-full h-[55vh] object-cover"/>
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black dark:text-white">{tour.name}</h1>
                  <p className="text-xl text-slate-500 mt-2">{tour.days} днів незабутніх вражень</p>
                </div>
                <div className="text-4xl font-black text-primary bg-sky-50 dark:bg-slate-700 px-8 py-4 rounded-3xl">
                  ${tour.price}
                </div>
              </div>
              <div className="border-t dark:border-slate-700 pt-8 mt-8">
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Опис маршруту</h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-10 whitespace-pre-line">{tour.desc}</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary text-white font-bold py-5 px-12 rounded-2xl hover:bg-sky-600 transition shadow-lg hover:shadow-primary/30 w-full md:w-auto text-xl"
                >
                  Забронювати зараз
                </button>
              </div>
            </div>
          </div>

          {/* --- МОДАЛКА З ВАЛІДАЦІЄЮ --- */}
          {isModalOpen && (
              <div
                  className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[120] flex items-center justify-center p-4">
                <div
                    className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl relative border dark:border-slate-700">
                  <h2 className="text-3xl font-black mb-2 dark:text-white">Бронювання</h2>
                  <p className="text-primary font-bold mb-8 uppercase tracking-widest text-sm">{tour.name}</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Поле Ім'я */}
                    <div className="space-y-1">
                      <input
                          type="text" placeholder="Ваше ім'я"
                          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                          className={`w-full p-4 bg-slate-50 dark:bg-slate-700 dark:text-white rounded-2xl border outline-none transition-all ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent focus:ring-2 focus:ring-primary'}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs font-bold ml-2">{errors.name}</p>}
                    </div>

                    {/* Поле Телефон */}
                    <div className="space-y-1">
                      <input
                          type="tel" placeholder="099 123 45 67"
                          value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                          className={`w-full p-4 bg-slate-50 dark:bg-slate-700 dark:text-white rounded-2xl border outline-none transition-all ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent focus:ring-2 focus:ring-primary'}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs font-bold ml-2">{errors.phone}</p>}
                    </div>

                    {/* Поле Дата */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-400 ml-2 mb-1">Бажана дата вильоту</label>
                      <input
                          type="date"
                          value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                          className={`w-full p-4 bg-slate-50 dark:bg-slate-700 dark:text-white rounded-2xl border outline-none transition-all ${errors.date ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent focus:ring-2 focus:ring-primary'}`}
                      />
                      {errors.date && <p className="text-red-500 text-xs font-bold ml-2">{errors.date}</p>}
                    </div>

                    <div className="pt-4 flex flex-col gap-3">
                      <button type="submit"
                              className="w-full bg-primary py-5 rounded-2xl text-white font-black text-lg shadow-xl hover:bg-sky-600 transition-all active:scale-95">
                        ПІДТВЕРДИТИ
                      </button>
                      <button type="button" onClick={() => setIsModalOpen(false)}
                              className="w-full text-slate-400 font-bold hover:text-red-500 transition-colors py-2">
                        Скасувати
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          )}
        </div>
        <Footer/>
      </>
  );
}