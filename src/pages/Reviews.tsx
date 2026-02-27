import { useState } from 'react';
import { useTours, type Review } from '../context/TourContext';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from "../components/Footer.tsx";

export default function Reviews() {
  const { reviews, tours, addReview } = useTours();

  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', tour: '', rating: 5, text: '' });


  const publicReviews = reviews.filter(r => r.status === 'Схвалено');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const reviewData: Review = {
      id: Date.now(),
      name: newReview.name,
      tour: newReview.tour || "Загальний відгук",
      text: newReview.text,
      rating: newReview.rating,
      status: 'Новий',
      date: new Date().toISOString()
    };


    addReview(reviewData);

    alert('Дякуємо! Ваш відгук відправлено на модерацію.');
    setShowForm(false);
    setNewReview({ name: '', tour: '', rating: 5, text: '' });
  };

  return (
      <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 pb-20">

        {/* --- HERO SECTION --- */}
        <section className="relative py-20 bg-slate-800 overflow-hidden">
          {/* Бекграунд з крапками через Tailwind */}
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:30px_30px]"></div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase"
            >
              Що говорять <span className="text-primary">мандрівники</span>
            </motion.h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg mb-10">
              Ваші враження — це те, що надихає нас створювати найкращі маршрути світом.
            </p>
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-primary hover:bg-primary-dark text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest text-sm"
            >
              {showForm ? 'Закрити форму' : 'Залишити відгук'}
            </button>
          </div>
        </section>

        <div className="container mx-auto px-6 mt-12">

          {/* --- FORM SECTION --- */}
          <AnimatePresence>
            {showForm && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-16"
                >
                  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400 ml-2">Ваше Ім'я</label>
                        <input
                            required
                            className="w-full p-4 bg-slate-50 dark:bg-slate-700 dark:text-white border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary"
                            value={newReview.name}
                            onChange={e => setNewReview({...newReview, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400 ml-2">Тур, який відвідали</label>
                        <select
                            className="w-full p-4 bg-slate-50 dark:bg-slate-700 dark:text-white border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                            value={newReview.tour}
                            onChange={e => setNewReview({...newReview, tour: e.target.value})}
                        >
                          <option value="">Оберіть тур</option>
                          {tours.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <label className="text-xs font-black uppercase text-slate-400 ml-2">Ваша оцінка</label>
                      <div className="flex gap-2 text-2xl text-yellow-400">
                        {[1,2,3,4,5].map(star => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setNewReview({...newReview, rating: star})}
                                className={`transition-transform active:scale-125 ${star <= newReview.rating ? 'opacity-100' : 'opacity-20'}`}
                            >★</button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mb-8">
                      <label className="text-xs font-black uppercase text-slate-400 ml-2">Ваша історія</label>
                      <textarea
                          required
                          rows={4}
                          className="w-full p-4 bg-slate-50 dark:bg-slate-700 dark:text-white border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary resize-none"
                          value={newReview.text}
                          onChange={e => setNewReview({...newReview, text: e.target.value})}
                      />
                    </div>

                    <button type="submit" className="w-full py-4 bg-green-500 text-white font-black rounded-2xl shadow-lg hover:bg-green-600 transition-all uppercase tracking-widest active:scale-[0.98]">
                      Надіслати на модерацію
                    </button>
                  </form>
                </motion.div>
            )}
          </AnimatePresence>

          {/* --- REVIEWS GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicReviews.length > 0 ? (
                publicReviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group relative"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-2xl text-xl font-black uppercase">
                          {review.name.charAt(0)}
                        </div>
                        <div className="text-yellow-400 flex text-lg">
                          {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-xl font-black dark:text-white mb-1">{review.name}</h3>
                      <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-4 bg-primary/5 inline-block px-3 py-1 rounded-full border border-primary/10">
                        Тур: {review.tour}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed text-sm">
                        "{review.text}"
                      </p>
                    </motion.div>
                ))
            ) : (
                <div className="col-span-full text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-700">
                  <span className="text-6xl mb-4 block animate-bounce">😴</span>
                  <p className="text-slate-400 font-bold italic">Відгуків поки немає, будьте першими!</p>
                </div>
            )}
          </div>
        </div>
      </div>
       <Footer/>
      </>
  );
}