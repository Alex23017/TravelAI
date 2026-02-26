import {motion} from "framer-motion";
import {fadeUp} from "../pages/Home.tsx";

export const Advantages = () => {
  return (
      <section className="pt-24 pb-20 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Чому обирають нас?</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: '🌍', title: 'Сотні напрямків', desc: 'Ми пропонуємо подорожі в будь-яку точку світу за найкращими маршрутами.' },
              { icon: '🛡️', title: 'Безпека', desc: 'Страхування та підтримка 24/7 для вашого повного спокою.' },
              { icon: '💎', title: 'Найкращі ціни', desc: 'Ексклюзивні знижки та прозоре ціноутворення без переплат.' }
            ].map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="text-center p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
};