import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {fadeUp} from "../pages/Home.tsx";
export const Hero = () => {
  const { t } = useTranslation();
  return (
      <section className="relative h-[85vh] flex items-center justify-center text-center px-4 mb-32 md:mb-20">
        <div className="absolute inset-0 z-0">
          <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
              alt="Travel Background"
              className="w-full h-full object-cover"
              loading={"lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-lg"
          >
            {t('hero_title')}
          </motion.h1>
          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-200 mb-10 font-light"
          >
            {t('hero_subtitle')}
          </motion.p>
        </div>

        {/* Швидкий пошук */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute -bottom-48 md:-bottom-16 left-0 right-0 max-w-5xl mx-auto px-4 z-20"
        >
          <div className="bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row gap-4 items-end border border-white/20 transition-all duration-500">
            <div className="flex-1 w-full text-left">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-2">📍 Куди вирушаємо?</label>
              <input type="text" placeholder="Країна або місто" className="w-full p-4 bg-white dark:bg-slate-700 dark:text-white rounded-2xl outline-none focus:ring-2 focus:ring-primary transition border border-slate-100 dark:border-slate-600 shadow-sm" />
            </div>
            <div className="flex-1 w-full text-left">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-2">📅 Коли?</label>
              <input type="date" className="w-full p-4 bg-white dark:bg-slate-700 dark:text-white rounded-2xl outline-none focus:ring-2 focus:ring-primary transition border border-slate-100 dark:border-slate-600 shadow-sm" />
            </div>
            <div className="flex-1 w-full text-left">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-2">👥 Скільки людей?</label>
              <select className="w-full p-4 bg-white dark:bg-slate-700 dark:text-white rounded-2xl outline-none focus:ring-2 focus:ring-primary transition border border-slate-100 dark:border-slate-600 shadow-sm cursor-pointer">
                <option>1 дорослий</option>
                <option>2 дорослих</option>
                <option>Сім'я (з дітьми)</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <Link to="/tours" className="block w-full md:w-auto bg-primary hover:bg-sky-600 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg text-center whitespace-nowrap">
                🔍 Знайти тур
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
  );
};