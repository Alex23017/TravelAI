import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isSnowEnabled: boolean;
  setIsSnowEnabled: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function Navbar({
                                 isSnowEnabled,
                                 setIsSnowEnabled,
                                 isDarkMode,
                                 setIsDarkMode
                               }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
      <nav className={`sticky top-0 z-50 transition-colors duration-500 shadow-md p-4 backdrop-blur-md ${
          isDarkMode ? 'bg-slate-900/90 border-b border-slate-800' : 'bg-white/90 border-b border-slate-100'
      }`}>
        <div className="container mx-auto flex justify-between items-center relative">
          <Link to="/" className="text-2xl font-black text-primary z-50 flex items-center gap-2">
            <span>✈️</span> TravelApp
          </Link>

          <div className="hidden md:flex gap-6 items-center font-medium">
            <Link to="/" className="hover:text-primary transition">{t('home')}</Link>
            <Link to="/tours" className="hover:text-primary transition">{t('tours')}</Link>
            <Link to="/admin" className="hover:text-primary transition">{t('admin')}</Link>

            {/* 🌓 ПЕРЕМИКАЧ ТЕМИ */}
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-xl transition-all ${
                    isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'
                }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                    key={isDarkMode ? 'moon' : 'sun'}
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                >
                  {isDarkMode ? '🌙' : '☀️'}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* ❄️ ПЕРЕМИКАЧ СНІГУ */}
            <div className="flex items-center gap-2 border-l-2 border-slate-200 dark:border-slate-700 pl-6">
              <span className="text-[10px] font-bold uppercase opacity-50">Сніг</span>
              <button
                  onClick={() => setIsSnowEnabled(!isSnowEnabled)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${isSnowEnabled ? 'bg-blue-400' : 'bg-slate-300'}`}
              >
                <motion.div
                    animate={{ x: isSnowEnabled ? 20 : 2 }}
                    className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>

            {/* МОВИ */}
            <div className="flex gap-3 border-l-2 border-slate-200 dark:border-slate-700 pl-6 font-bold text-xs">
              <button onClick={() => changeLanguage('ua')} className={i18n.language === 'ua' ? 'text-primary' : 'text-slate-400'}>UA</button>
              <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'text-primary' : 'text-slate-400'}>EN</button>
            </div>
          </div>

          <button className="md:hidden text-dark p-2" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>
  );
}