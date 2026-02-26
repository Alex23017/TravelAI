import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // 1. Скрол наверх при переході по посиланнях (React Router)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. Скрол наверх при жорсткому ОНОВЛЕННІ сторінки (F5)
  useEffect(() => {
    // Вимикаємо стандартну пам'ять браузера про позицію скролу
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Примусово кидаємо наверх при завантаженні
    window.scrollTo(0, 0);


    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return null;
}