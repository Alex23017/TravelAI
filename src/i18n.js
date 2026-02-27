import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ua: {
    translation: {
      "home": "Головна",
      "tours": "Тури",
      "contact": "Контакти",
      "admin": "Адмінка",
      "reviews" :"Відгуки",
      "hero_title": "Відкрий для себе світ",
      "hero_subtitle": "Найкращі подорожі починаються тут",
      "send": "Відправити",
      "name": "Ваше ім'я",
      "email": "Ваш Email"
    }
  },
  en: {
    translation: {
      "home": "Home",
      "tours": "Tours",
      "contact": "Contact",
      "reviews" :"Reviews",
      "admin": "Admin",
      "hero_title": "Discover the World",
      "hero_subtitle": "The best journeys start here",
      "send": "Send",
      "name": "Your Name",
      "email": "Your Email"
    }
  }
};

i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: "ua", // Мова за замовчуванням
      fallbackLng: "en",
      interpolation: { escapeValue: false }
    });

export default i18n;