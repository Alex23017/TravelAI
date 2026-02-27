import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="relative bg-white dark:relative dark:bg-[#0f172a] dark:[background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] dark:[background-size:30px_30px] pt-16 pb-8 border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* 1. BRAND & DESC */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">✈️</span>
                <span className="text-2xl font-black bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent tracking-tighter">
                TravelApp
              </span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                Відкривайте світ разом з нами. Ми створюємо незабутні подорожі, які залишаються у серці назавжди.
              </p>
              {/* Соціальні мережі */}
              <div className="flex gap-4">
                {['FB', 'IG', 'TW', 'YT'].map((soc) => (
                    <a key={soc} href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-primary hover:border-primary transition-all text-xs font-bold">
                      {soc}
                    </a>
                ))}
              </div>
            </div>

            {/* 2. QUICK LINKS */}
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-widest text-xs">Навігація</h4>
              <ul className="space-y-4">

                <li> <Link to="/reviews" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">
                  Відгуки
                </Link>
                </li>
                <li> <Link to="/tours" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">
                  Тури
                </Link>
                </li>
              </ul>
            </div>

            {/* 3. INFO */}
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-widest text-xs">Допомога</h4>
              <ul className="space-y-4">

                    <li>

                        <Link to="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">Політика конфіденційності</Link>

                    </li>
                <li>
                  <Link to="/contact" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors">
                    Контакти
                  </Link>
                </li>


              </ul>
            </div>

            {/* 4. NEWSLETTER */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm">Хочете знижку?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Підпишіться на розсилку гарячих турів.</p>
              <div className="flex flex-col gap-2">
                <input
                    type="email"
                    placeholder="Ваш Email"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/50 dark:text-white transition-all"
                />
                <button className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 transition-all active:scale-95">
                  Підписатись
                </button>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              © {currentYear} TravelApp. Всі права захищені.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Україна 🇺🇦</span>
              <div className="flex gap-2">
                <span className="text-xl grayscale hover:grayscale-0 transition cursor-help" title="Visa">💳</span>
                <span className="text-xl grayscale hover:grayscale-0 transition cursor-help" title="Mastercard">🏧</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}