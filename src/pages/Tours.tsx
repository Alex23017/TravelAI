import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTours } from '../context/TourContext';
import Footer from "../components/Footer.tsx";

export default function Tours() {
  const { t } = useTranslation();
  const { tours } = useTours();

  return (
      <>
      <div className="container mx-auto py-12 px-4 transition-colors duration-500">
        {/* Заголовок з підтримкою темної теми */}
        <h1 className="text-4xl font-bold mb-10 text-center text-slate-900 dark:text-white">
          {t('tours')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tours.map(tour => (
              <div
                  key={tour.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100 dark:border-slate-700"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                      src={tour.img}
                      alt={tour.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  {/* Ціна */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                    ${tour.price}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Назва туру */}
                  <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white transition-colors">
                    {tour.name}
                  </h2>

                  {/* Кількість днів */}
                  <p className="text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {tour.days} днів
                  </p>

                  {/* Кнопка */}
                  <Link
                      to={`/tours/${tour.id}`}
                      className="w-full text-center bg-slate-100 dark:bg-slate-700 dark:text-white hover:bg-primary dark:hover:bg-primary hover:text-white font-bold py-3 rounded-xl transition-all mt-auto"
                  >
                    Детальніше
                  </Link>
                </div>
              </div>
          ))}

          {/* Повідомлення, якщо турів немає */}
          {tours.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400 text-lg">
                Тури не знайдені. Спробуйте додати нові через Адмін-панель.
                                </div>
          )}
        </div>
      </div>
  <Footer/> </>
  );
}