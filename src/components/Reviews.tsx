import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useTours } from '../context/TourContext';

interface ReviewsSectionProps {
  onOpenModal: () => void;
}

export default function Reviews({ onOpenModal }: ReviewsSectionProps) {
  const { reviews } = useTours();
  const approvedReviews = reviews.filter(r => r.status === 'Схвалено');

  return (
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold dark:text-white mb-16">Відгуки мандрівників</h2>

          <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              autoplay={{ delay: 5000 }}
              pagination={{ clickable: true }}
              className="pb-16"
          >
            {approvedReviews.map(review => (
                <SwiperSlide key={review.id}>
                  <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 text-left h-full flex flex-col shadow-sm">
                    <div className="flex text-yellow-400 mb-4 gap-1">
                      {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic mb-8 flex-grow leading-relaxed">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold uppercase shadow-inner">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold dark:text-white">{review.name}</h4>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{review.tour}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
            ))}
          </Swiper>

          <button
              onClick={onOpenModal}
              className="mt-8 bg-primary hover:bg-sky-600 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            + Залишити відгук
          </button>
        </div>
      </section>
  );
}