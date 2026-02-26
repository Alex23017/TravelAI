import { motion } from 'framer-motion';

export default function Preloader() {
  return (
      // Фіксуємо на весь екран поверх усього (z-[100])
      <motion.div
          className="fixed inset-0 z-[900] bg-dark flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Декоративні хмаринки на фоні */}
        <motion.div
            animate={{ x: [0, 100, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute top-1/4 text-6xl opacity-10 blur-[2px]"
        >
          ☁️
        </motion.div>
        <motion.div
            animate={{ x: [0, -100, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute bottom-1/3 right-1/4 text-5xl opacity-10 blur-[2px]"
        >
          ☁️
        </motion.div>

        {/* Анімація літака */}
        <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
            className="text-8xl drop-shadow-2xl z-10"
        >
          ✈️
        </motion.div>

        {/* Пульсуючий текст */}
        <motion.h2
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="mt-8 text-2xl font-bold text-white tracking-widest uppercase"
        >
          Пакуємо валізи...
        </motion.h2>

        {/* Смуга завантаження */}
        <div className="w-48 h-1 bg-slate-700 rounded-full mt-6 overflow-hidden">
          <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full bg-primary rounded-full"
          />
        </div>
      </motion.div>
  );
}