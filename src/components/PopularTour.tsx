import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import {useTours} from "../context/TourContext.tsx";
import 'swiper/css';
import 'swiper/css/pagination';

export const PopularTour = () => {
  const { tours,} = useTours();
  return (
      <section className="my-20 bg-blue-200 dark:bg-slate-800/50 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="flex pt-10 flex-col md:flex-row justify-between items-end mb-12 gap-4 max-sm:items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Популярні напрямки</h2>
              <div className="w-24 h-1 bg-primary rounded-full"></div>
            </div>
            <Link to="/tours" className="text-primary dark:text-sky-400 font-medium hover:underline">
              Всі напрямки →
            </Link>
          </div>
          <Swiper modules={[Autoplay, Pagination]} spaceBetween={30} slidesPerView={1} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }} autoplay={{ delay: 3500 }} pagination={{ clickable: true }} className="!pb-16 ">
            {tours.slice(0, 8).map(tour => (
                <SwiperSlide key={tour.id}>
                  <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col h-full">
                    <div className="relative h-64 overflow-hidden">
                      <img src={tour.img} alt={tour.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-bold">${tour.price}</div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold mb-2 dark:text-white">{tour.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">{tour.desc}</p>
                      <Link to={`/tours/${tour.id}`} className="block w-full text-center border-2 border-primary text-primary dark:text-sky-400 dark:border-sky-400 hover:bg-primary hover:text-white dark:hover:bg-sky-400 dark:hover:text-white font-bold py-3 rounded-xl transition-colors mt-auto">Детальніше</Link>
                    </div>
                  </div>
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
  );
};