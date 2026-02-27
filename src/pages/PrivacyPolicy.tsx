import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const lastUpdated = "27 лютого 2026 року";

  return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 pb-20">

        {/* --- HERO SECTION --- */}
        <section className="relative py-20 bg-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:30px_30px]"></div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 inline-block p-3 bg-primary/20 rounded-2xl text-primary text-2xl"
            >
              🛡️
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase"
            >
              Політика <span className="text-primary">конфіденційності</span>
            </motion.h1>
            <p className="text-slate-400 text-sm font-medium">Останнє оновлення: {lastUpdated}</p>
          </div>
        </section>

        {/* --- CONTENT SECTION --- */}
        <div className="container mx-auto px-6 max-w-4xl -mt-10">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-2xl space-y-10"
          >

            <section className="space-y-4">
              <h2 className="text-2xl mt-10 font-black dark:text-white flex items-center gap-3 uppercase tracking-tight">
                <span className="text-primary">01.</span> Збір інформації
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Ми збираємо дані, які ви надаєте безпосередньо через форми бронювання та відгуків.
                Це включає ваше ім'я, номер телефону та назву обраного туру.
                Ця інформація використовується виключно для обробки замовлень у нашій адмін-панелі.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black dark:text-white flex items-center gap-3 uppercase tracking-tight">
                <span className="text-primary">02.</span> Використання LocalStorage
              </h2>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border-l-4 border-primary">
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                  Для вашої зручності наш додаток використовує <strong>LocalStorage</strong> для збереження даних про тури,
                  бронювання та відгуки безпосередньо у вашому браузері. Це дозволяє зберігати ваші дії після
                  оновлення сторінки без використання сторонніх баз даних.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black dark:text-white flex items-center gap-3 uppercase tracking-tight">
                <span className="text-primary">03.</span> Модерація відгуків
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Усі відгуки, залишені на сайті, спочатку отримують статус <strong>"Новий"</strong> і стають доступними
                для публічного перегляду лише після схвалення адміністратором в адмін-панелі.
                Ми залишаємо за собою право видаляти відгуки, що містять нецензурну лексику або спам.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black dark:text-white flex items-center gap-3 uppercase tracking-tight">
                <span className="text-primary">04.</span> Безпека даних
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Оскільки проект працює на клієнтській стороні (React), ваші дані знаходяться під вашим контролем у вашому браузері.
                Ми не передаємо вашу персональну інформацію третім особам.
              </p>
            </section>

            <div className="pt-10 border-t border-slate-100 dark:border-slate-700 flex justify-center">
              <Link
                  to="/"
                  className="text-primary font-black uppercase tracking-widest text-xs hover:text-primary-dark transition-colors flex items-center gap-2"
              >
                ← Повернутися на головну
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
  );
}