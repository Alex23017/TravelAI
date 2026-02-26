import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Відправка...');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // Фейковий API для тесту
      await axios.post('https://jsonplaceholder.typicode.com/posts', data);
      setStatus('Успішно відправлено!');
      e.currentTarget.reset();
    } catch (error) {
      setStatus('Помилка відправки.');
    }
  };

  return (
      <div className="container mx-auto py-12 px-4 transition-colors duration-500">
        {/* Кнопка повернення додому */}
        <div className="max-w-md mx-auto mb-6">
          <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors font-medium"
          >
            <span>←</span> {t('На головну')}
          </Link>
        </div>

        <div className="max-w-md mx-auto p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 transition-all">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">
            {t('contact')}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                {t('name')}
              </label>
              <input
                  type="text"
                  name="name"
                  placeholder="Ваше ім'я"
                  required
                  className="p-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:text-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                {t('email')}
              </label>
              <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  required
                  className="p-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:text-white transition-all"
              />
            </div>

            <button
                type="submit"
                className="bg-primary text-white font-black py-4 rounded-2xl hover:bg-sky-600 transition-all shadow-lg hover:shadow-primary/30 mt-2"
            >
              {t('send')}
            </button>

            {status && (
                <p className={`text-center text-sm font-bold mt-2 animate-pulse ${
                    status.includes('Помилка') ? 'text-red-500' : 'text-green-500 dark:text-green-400'
                }`}>
                  {status}
                </p>
            )}
          </form>
        </div>
      </div>
  );
}