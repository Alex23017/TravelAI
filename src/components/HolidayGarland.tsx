import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function HolidayGarland() {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ballCount, setBallCount] = useState(20);

  // Адаптивна кількість кульок залежно від екрана
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 440) setBallCount(14); //
      else if (width < 900) setBallCount(20);
      else if (width < 1300) setBallCount(32);
      else if (width < 1650) setBallCount(45);
      else setBallCount(65);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ініціалізація аудіо
  useEffect(() => {
    const sounds = ['bell1.mp3', 'bell2.mp3', 'bell3.mp3', 'bell4.mp3', 'bell5.mp3', 'bell6.mp3'];
    audioRefs.current = sounds.map(src => {
      const audio = new Audio(`/sounds/${src}`);
      audio.volume = 0.2;
      audio.preload = 'auto';
      return audio;
    });

    return () => {
      audioRefs.current.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);


  useEffect(() => {
    audioRefs.current.forEach(audio => {
      audio.muted = isMuted; //
      if (isMuted) {
        audio.pause(); // Примусова зупинка
      }
    });
    if (isMuted) setIsPlaying(false);
  }, [isMuted]);

  const handleBallClick = (index: number) => {
    if (isMuted) return;

    // Зупиняємо попередній звук перед відтворенням нового
    audioRefs.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

    const nextAudio = audioRefs.current[index % audioRefs.current.length];
    if (nextAudio) {
      nextAudio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Playback blocked:", err));
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
      <div className="relative w-full z-[9999] select-none overflow-visible bg-transparent pt-0">

        {/* 🌲 Глибокий фон гілки (fix для текстури) */}
        <div className="relative w-full h-8 min-[400px]:h-10 md:h-12 overflow-hidden shadow-2xl border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-[#022c22] via-[#011c15] to-[#022c22]"></div>
          <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #064e3b 3px, transparent 4px)',
                backgroundSize: '4px 100%'
              }}
          ></div>
        </div>

        {/* 🔴 Кульки */}
        <div className="absolute top-0 left-0 w-full flex justify-between px-2 pointer-events-none mt-1 overflow-visible">
          {Array.from({ length: ballCount }).map((_, i) => (
              <div key={i} className="flex flex-col items-center flex-1 overflow-visible">
                {/* Нитка */}
                <div className={`w-[1px] bg-yellow-600/30 ${i % 2 === 0 ? 'h-3 md:h-5' : 'h-5 md:h-8'}`}></div>


                <motion.div
                    onClick={() => handleBallClick(i)}
                    animate={{
                      rotate: [0, -2, 0, 2, 0],
                      boxShadow: ["0 0 5px rgba(255,255,255,0.2)", "0 0 15px rgba(255,255,255,0.5)", "0 0 5px rgba(255,255,255,0.2)"]
                    }}
                    whileHover={{ rotate: [-15, 12, -8, 4, 0], scale: 1.15 }}
                    whileTap={{
                      rotate: [-25, 20, -15, 10, 0],
                      scale: 0.9,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    transition={{
                      rotate: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
                      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }
                    }}
                    className={`w-4 h-4 min-[400px]:w-6 min-[400px]:h-6 md:w-7 md:h-7 rounded-full cursor-pointer pointer-events-auto relative border-t border-white/40 shadow-xl ${
                        i % 4 === 0 ? 'bg-red-600' : i % 4 === 1 ? 'bg-blue-600' : i % 4 === 2 ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`}
                    style={{ transformOrigin: 'top center' }}
                >
                  <div className="absolute top-0.5 left-0.5 w-1 h-0.5 min-[400px]:w-2 min-[400px]:h-1 bg-white/60 rounded-full blur-[0.4px] rotate-[-20deg]" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 min-[400px]:w-2 h-1 min-[400px]:h-2 bg-gradient-to-r from-yellow-800 via-yellow-400 to-yellow-800 rounded-t-sm"></div>
                </motion.div>
              </div>
          ))}
        </div>

        <AnimatePresence>
          {!isPlaying && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute max-xl:top-[100px] top-16 inset-x-0 flex justify-center pointer-events-none z-[60]"
              >
            <span className="text-white  text-[9px] font-black uppercase tracking-[0.2em] drop-shadow-md text-center bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
              Натисни на кульку
            </span>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Кнопка керування звуком */}
        <div className="fixed bottom-4 right-4 z-[110]">
          <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={toggleMute}
              className={`h-10 w-10 min-[400px]:h-12 min-[400px]:w-12 rounded-full shadow-2xl backdrop-blur-md border flex items-center justify-center transition-all ${
                  isMuted ? 'bg-red-500 text-white border-red-400 shadow-red-500/20' : 'bg-white/90 dark:bg-slate-800 border-green-500/30 text-green-700'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMuted ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>
  );
}