import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function HolidayGarland() {
  const segments = Array.from({ length: 55 });
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
      // 🔥 Цей рядок змушує текст зникнути при кліку
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
        <div className="relative  w-full z-[9999] select-none overflow-visible bg-transparent">
          {/* 🌲 Основа гілки */}
          <div className="relative w-full h-12 bg-green-950 overflow-hidden shadow-lg border-b border-green-400/10">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(82deg, transparent, transparent 1px, #042f24 2px, #064e3b 3px)' }}></div>
            <div className="absolute inset-0 w-full h-full" style={{ background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.5) 100%)', backgroundSize: '80px 100%' }}></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-green-950" style={{ clipPath: 'polygon(0% 0%, 2% 100%, 4% 15%, 6% 85%, 8% 0%, 10% 100%, 12% 25%, 14% 85%, 16% 0%, 18% 100%, 20% 15%, 22% 80%, 24% 0%, 26% 100%, 28% 25%, 30% 85%, 32% 0%, 34% 100%, 36% 15%, 38% 80%, 40% 0%, 42% 100%, 44% 25%, 46% 85%, 48% 0%, 50% 100%, 52% 15%, 54% 80%, 56% 0%, 58% 100%, 60% 25%, 62% 90%, 64% 0%, 66% 100%, 68% 15%, 70% 80%, 72% 0%, 74% 100%, 76% 25%, 78% 85%, 80% 0%, 82% 100%, 84% 15%, 86% 80%, 88% 0%, 90% 100%, 92% 25%, 94% 85%, 96% 0%, 98% 100%, 100% 0%)' }}></div>
          </div>

          {/* 🔴 Кульки */}
          <div className="absolute top-0 left-0 w-full flex justify-between px-2 pointer-events-none mt-1">
            {segments.map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center min-w-[20px] z-30">
                  <div className={`w-[1px] bg-yellow-600/40 ${i % 2 === 0 ? 'h-4' : 'h-7'}`}></div>
                  <motion.div
                      onClick={() => handleBallClick(i)}
                      whileHover={{ rotate: [0, -18, 14, -10, 5, 0], scale: 1.2, transition: { duration: 0.5 } }}
                      animate={{
                        boxShadow: [
                          "0 0 5px rgba(255,255,255,0.3)",
                          "0 0 15px rgba(255,255,255,0.7)",
                          "0 0 5px rgba(255,255,255,0.3)"
                        ]
                      }}
                      transition={{
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }
                      }}
                      className={`w-7 h-7 rounded-full cursor-pointer pointer-events-auto relative border-t border-white/40 shadow-xl ${
                          i % 4 === 0 ? 'bg-red-600' : i % 4 === 1 ? 'bg-blue-600' : i % 4 === 2 ? 'bg-yellow-500' : 'bg-emerald-500'
                      }`}
                      style={{ transformOrigin: 'top center' }}
                  >
                    <div className="absolute top-1 left-1.5 w-2.5 h-1.5 bg-white/70 rounded-full blur-[0.6px] rotate-[-20deg]" />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2 bg-gradient-to-r from-yellow-800 via-yellow-400 to-yellow-800 rounded-t-sm"></div>
                  </motion.div>
                </div>
            ))}
          </div>

          {/* ✨ ПІДКАЗКА ПО ЦЕНТРУ */}
          <AnimatePresence>
            {!isPlaying && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: [0.3, 0.7, 0.3], y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                    transition={{
                      opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 0.8 }
                    }}
                    className="absolute top-16 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-[60]"
                >
                  <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-white/60 mb-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 blur-[0.4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </motion.div>

                  {/* Текст підказки */}
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] blur-[0.4px] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    Натисни на кульку
                  </span>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Кнопка музики */}
        <div className="fixed bottom-6 right-6 z-[110] flex items-center gap-3">
          <AnimatePresence>
            {isPlaying && !isMuted && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white/90 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold text-green-900 dark:text-green-400 shadow-xl border border-green-100 dark:border-slate-700 backdrop-blur-sm flex items-center">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
                  Музика грає...
                </motion.div>
            )}
          </AnimatePresence>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleMute} className={`h-14 w-14 rounded-full shadow-2xl backdrop-blur-md border-2 flex items-center justify-center transition-all ${isMuted ? 'bg-red-500/20 border-red-500/50 text-red-600' : 'bg-white/90 dark:bg-slate-800 border-green-500/30 text-green-700'}`}>
            {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
            )}
          </motion.button>
        </div>
      </>
  );
}