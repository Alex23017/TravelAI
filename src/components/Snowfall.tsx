import { motion } from 'framer-motion';

export default function Snowfall() {
  const snowflakes = Array.from({ length: 100 });
  return (
      <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden">
        {snowflakes.map((_, i) => (
            <motion.div
                key={i}
                initial={{ top: -20, left: `${Math.random() * 100}%`, opacity: 0 }}
                animate={{ top: '110%', opacity: [0, 0.8, 0] }}
                transition={{
                  duration: Math.random() * 6 + 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 15
                }}
                className="absolute w-1.5 h-1.5 bg-white rounded-full blur-[1px] shadow-[0_0_5px_white]"
            />
        ))}
      </div>
  );
}