import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTours } from '../context/TourContext';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const { addReview } = useTours();
  const [reviewForm, setReviewForm] = useState({ name: '', tour: '', text: '', rating: 5 });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      id: Date.now(),
      ...reviewForm,
      status: 'Новий',
      date: new Date().toISOString()
    });
    onClose();
    setReviewForm({ name: '', tour: '', text: '', rating: 5 });
    alert('Дякуємо! Ваш відгук відправлено на перевірку модератором.');
  };

  return (
      <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
              <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-blue-100 mt-20 dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full relative shadow-2xl border dark:border-slate-700"
              >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-2xl dark:text-white hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
                <h2 className="text-2xl font-bold mb-6 dark:text-white">Ваш відгук</h2>

                <form onSubmit={handleReviewSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Оцініть подорож:</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                          <button
                              key={star}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                              className={`text-3xl transition-transform hover:scale-110 ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-slate-200 dark:text-slate-600'}`}
                          >
                            ★
                          </button>
                      ))}
                    </div>
                  </div>

                  <input
                      type="text"
                      placeholder="Ім'я"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-700 dark:text-white rounded-xl outline-none border dark:border-slate-600 focus:ring-2 focus:ring-primary transition-all"
                      required
                  />
                  <input
                      type="text"
                      placeholder="Назва туру"
                      value={reviewForm.tour}
                      onChange={(e) => setReviewForm({ ...reviewForm, tour: e.target.value })}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-700 dark:text-white rounded-xl outline-none border dark:border-slate-600 focus:ring-2 focus:ring-primary transition-all"
                      required
                  />
                  <textarea
                      placeholder="Ваші враження"
                      value={reviewForm.text}
                      onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-700 dark:text-white rounded-xl outline-none border dark:border-slate-600 h-32 resize-none focus:ring-2 focus:ring-primary transition-all"
                      required
                  />
                  <button className="w-full bg-primary py-4 rounded-xl text-white font-bold hover:bg-sky-600 transition-all shadow-lg active:scale-95">
                    Надіслати
                  </button>
                </form>
              </motion.div>
            </div>
        )}
      </AnimatePresence>
  );
}