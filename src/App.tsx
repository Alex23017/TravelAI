import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { TourProvider } from './context/TourContext';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

import HolidayGarland from './components/HolidayGarland';
import Snowfall from './components/Snowfall';
import Reviews from "./pages/Reviews";
import PrivacyPolicy from "./pages/PrivacyPolicy;


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSnowEnabled, setIsSnowEnabled] = useState(true);

  // 🌓 Ініціалізація теми з localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // 💾 Зберігаємо тему при кожній зміні
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.body.style.backgroundColor = '#0f172a'; // slate-900
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.body.style.backgroundColor = '#ffffff';
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
      <TourProvider>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader key="loader" />}
        </AnimatePresence>

        <BrowserRouter>
          <div className={`min-h-screen relative flex flex-col transition-colors duration-500 ease-in-out ${
              isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
          }`}>
            <ScrollToTop />

            <div className="sticky top-0 z-[100] flex flex-col w-full shadow-md">
              <HolidayGarland />
              <Navbar
                  isSnowEnabled={isSnowEnabled}
                  setIsSnowEnabled={setIsSnowEnabled}
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
              />
            </div>

            {isSnowEnabled && <Snowfall />}

            <main className="flex-grow relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:id" element={<TourDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TourProvider>
  );
}

export default App;