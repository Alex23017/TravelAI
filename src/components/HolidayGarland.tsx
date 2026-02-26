import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function HolidayGarland() {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Початкове значення за замовчуванням
  const [ballCount, setBallCount] = useState(20);

  // Визначаємо кількість кульок залежно від ширини екрана (оновлені брейкпоінти)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 440) setBallCount(12);        // 🔥 Дуже малі: було 8 -> стало 12
      else if (width < 900) setBallCount(16);   // 🔥 Мобільні: було 12 -> стало 16
      else if (width < 1300) setBallCount(28);   // 🔥 Планшети: було 20 -> стало 28
      else if (width < 1650) setBallCount(35);  // 🔥 Ноутбуки: було 35 -> стало 45
      else setBallCount(60);                    // 🔥 Десктопи: було 50 -> стало 60
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Завантаження звуків (без змін)
  useEffect(() => {
    const sounds = ['bell1.mp3', 'bell2.mp3', 'bell3.mp3', 'bell4.mp3', 'bell5.mp3', 'bell6.mp3'];
    audioRefs.current = sounds.map(src => {
      const audio = new Audio(`/sounds/${src}`);
      audio.volume = 0.25;
      audio.preload = 'auto';
      audio.loop = true;
      return audio;
    });
    return () => { if (currentAudioRef.current) currentAudioRef.current.pause(); };
  }, []);

  const handleBallClick = (index: number) => {
    if (isMuted) return;
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    const nextAudio = audioRefs.current[index % audioRefs.current.length];
    if (nextAudio) {
      currentAudioRef.current = nextAudio;
      setIsPlaying(true);
      nextAudio.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    setIsMuted(!isMuted);
    setIsPlaying(false);
  };

  return (
      <>
        <div className="relative w-full z-[9999] select-none overflow-visible bg-transparent pt-0">

          {/* 🌲 Основа гілки */}
          <div className="relative w-full h-8 min-[400px]:h-10 md:h-12 bg-green-950 overflow-hidden shadow-lg border-b border-green-400/10">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(82deg, transparent, transparent 1px, #042f24 2px, #064e3b 3px)' }}></div>
            <div className="absolute inset-0 w-full h-full" style={{ background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.5) 100%)', backgroundSize: '80px 100%' }}></div>
          </div>

          {/* 🔴 Кульки (ГУСТІШІ) */}
          {/* 🔥 Змінено justify-around на justify-center та додано gap-1 */}
          <div className="absolute top-0 left-0 w-full flex justify-center items-start gap-1 px-2 pointer-events-none mt-1 overflow-visible">
            {Array.from({ length: ballCount }).map((_, i) => (
                <div key={i} className="flex flex-col items-center z-30 flex-shrink-0 overflow-visible">

                  {/* Нитка (зменшено висоту, щоб підкреслити густоту) */}
                  <div className={`w-[1px] bg-yellow-600/40 ${i % 2 === 0 ? 'h-2 min-[400px]:h-3' : 'h-4 min-[400px]:h-6'}`}></div>

                  {/* Кулька */}
                  <motion.div
                      onClick={() => handleBallClick(i)}
                      // Трохи зменшено scale при ховері, щоб кульки не перекривали одна одну занадто сильно
                      whileHover={{ rotate: [0, -15, 12, -8, 4, 0], scale: 1.15, transition: { duration: 0.5 } }}
                      animate={{
                        boxShadow: ["0 0 5px rgba(255,255,255,0.2)", "0 0 12px rgba(255,255,255,0.6)", "0 0 5px rgba(255,255,255,0.2)"]
                      }}
                      transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 } }}
                      className={`w-4 h-4 min-[400px]:w-6 min-[400px]:h-6 md:w-7 md:h-7 rounded-full cursor-pointer pointer-events-auto relative border-t border-white/40 shadow-xl ${
                          i % 4 === 0 ? 'bg-red-600' : i % 4 === 1 ? 'bg-blue-600' : i % 4 === 2 ? 'bg-yellow-500' : 'bg-emerald-500'
                      }`}
                      style={{ transformOrigin: 'top center' }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-1 h-0.5 min-[400px]:w-2 min-[400px]:h-1 bg-white/70 rounded-full blur-[0.4px] rotate-[-20deg]" />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 min-[400px]:w-2 h-1 min-[400px]:h-2 bg-gradient-to-r from-yellow-800 via-yellow-400 to-yellow-800 rounded-t-sm"></div>
                  </motion.div>
                </div>
            ))}
          </div>

          {/* ✨ ПІДКАЗКА */}
          <AnimatePresence>
            {!isPlaying && (
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: [0.3, 0.7, 0.3], y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                    transition={{ opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }, y: { duration: 0.8 } }}
                    className="absolute top-14 max-sm:top-12 left-0 right-0 flex justify-center pointer-events-none z-[60]"
                >
              <span className="text-white max-sm:text-[8px] min-[400px]:text-[10px] font-black uppercase tracking-[0.15em] min-[400px]:tracking-[0.3em] drop-shadow-md text-center bg-black/20 px-3 py-1 rounded-full backdrop-blur-[2px]">
                Натисни на кульку
              </span>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Кнопка музики (без змін) */}
        <div className="fixed bottom-4 right-4 z-[110] flex items-center gap-2">
          <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className={`h-9 w-9 min-[400px]:h-12 min-[400px]:w-12 rounded-full shadow-2xl backdrop-blur-md border flex items-center justify-center transition-all ${
                  isMuted ? 'bg-red-500/20 border-red-500/50 text-red-600' : 'bg-white/90 dark:bg-slate-800 border-green-500/30 text-green-700'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 min-[400px]:h-6 min-[400px]:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMuted ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              )}
            </svg>
          </motion.button>
        </div>
      </>
  );
}