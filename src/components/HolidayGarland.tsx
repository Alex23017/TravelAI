import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Масив з вашими картинками для кульок
const ballImages = [
  '/garland/bellWhite.webp',
  '/garland/bigRed.webp',
  '/garland/redWhite.webp'
];

export default function HolidayGarland() {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // Кількість кульок залишається незмінною
  const [ballCount, setBallCount] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 440) setBallCount(12);
      else if (width < 900) setBallCount(16);
      else if (width < 1300) setBallCount(32);
      else if (width < 1650) setBallCount(45);
      else setBallCount(65);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const sounds = ['bell1.mp3', 'bell2.mp3', 'bell3.mp3', 'bell4.mp3', 'bell5.mp3', 'bell6.mp3'];
    audioRefs.current = sounds.map(src => {
      const audio = new Audio(`/sounds/${src}`);
      audio.volume = 0.2;
      audio.preload = 'auto';
      return audio;
    });

    return () => {
      stopAllSounds();
    };
  }, []);

  const stopAllSounds = () => {
    audioRefs.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
      audio.onended = null;
    });
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.onended = null;
    }
  };

  useEffect(() => {
    if (isMuted) {
      stopAllSounds();
      setIsPlaying(false);
    }
  }, [isMuted]);

  const playSoundLoop = (audio: HTMLAudioElement) => {
    audio.currentTime = 0;
    audio.play().then(() => {
      setIsPlaying(true);
      audio.onended = () => {
        if (!isMuted) playSoundLoop(audio);
      };
    }).catch(err => console.log("Playback blocked:", err));
  };

  const handleBallClick = (index: number) => {
    if (isMuted) return;

    const nextAudio = audioRefs.current[index % audioRefs.current.length];

    if (nextAudio) {
      if (activeAudioRef.current === nextAudio && !nextAudio.paused) return;

      stopAllSounds();

      activeAudioRef.current = nextAudio;
      playSoundLoop(nextAudio);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
      <div className="relative bg-slate-900 w-full z-[9999] select-none overflow-visible pt-0">

        {/* Гілка */}
        <div
            className="relative w-full h-[75px] max-sm:h-20"
            style={{
              backgroundImage: "url('/garland/background.png')",
              backgroundRepeat: "repeat-x",
              backgroundSize: "auto 100%",
              backgroundPosition: "center top"
            }}
        ></div>

        <div className="absolute top-0 left-0 w-full flex justify-center px-2 pointer-events-none mt-3 overflow-visible">
          {Array.from({ length: ballCount }).map((_, i) => (
              <div key={i} className="flex flex-col items-center flex-1 overflow-visible">
                {/* Нитка */}
                <div className={`w-[1px] bg-yellow-600/40 ${i % 2 === 0 ? 'h-3 md:h-4' : 'h-4 md:h-6'}`}></div>

                {/* Анімована кругла кулька-контейнер */}
                <motion.div
                    onClick={() => handleBallClick(i)}
                    animate={{
                      rotate: [-5, 0, 5, 0, -5],
                      filter: [
                        "drop-shadow(0 0 15px rgba(255,255,255,0.3)) drop-shadow(0 0 5px rgba(255,244,196,0.3))",
                        "drop-shadow(0 0 25px rgba(255,255,255,0.6)) drop-shadow(0 0 10px rgba(255,244,196,0.5))",
                        "drop-shadow(0 0 10px rgba(255,255,255,0.3)) drop-shadow(0 0 3px rgba(255,244,196,0.2))"
                      ]
                    }}
                    whileHover={{
                      rotate: [-10, 5, -5, 5, 0],

                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      rotate: { duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
                      filter: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
                      layout: { duration: 0.3 },
                      rotate: {
                        type: "spring",
                        stiffness: 100,
                        damping: 1,
                        mass: 1
                      },
                    }}

                    // Збільшені розміри у 2 рази, додано rounded-full та м'яку напівпрозору підкладку
                    // md замено на min-[1000px] для великих екранів
                    className="cursor-pointer -mx-[50px] pointer-events-auto relative w-[48px] h-[48px]  rounded-full flex items-center justify-center p-0.5"
                    style={{ transformOrigin: 'top center' }}
                >
                  <img
                      src={ballImages[i % ballImages.length]}
                      alt="Holiday Bell"
                      // Зображення тепер також rounded-full, щоб ідеально вписуватися
                      className="w-full h-full object-contain pointer-events-none rounded-full"
                      draggable={false}
                  />
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
                  className="absolute max-xl:top-[100px] top-24 inset-x-0 flex justify-center pointer-events-none z-[60]" // top-16 -> top-24
              >
            <span className="text-white text-[9px] font-black uppercase tracking-[0.2em] drop-shadow-md text-center bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
              Натисни на кульку
            </span>
              </motion.div>
          )}
        </AnimatePresence>

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