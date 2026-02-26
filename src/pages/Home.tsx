import { useState } from 'react';
import { Hero } from "../components/Hero.tsx";
import { Advantages } from "../components/Advantages.tsx";
import { PopularTour } from "../components/PopularTour.tsx";
import Reviews from "../components/Reviews.tsx";
import { ContactUs } from "../components/ContactUs.tsx";
import ReviewModal from "../components/ReviewModal.tsx";

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Home() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
      <div className="overflow-hidden transition-colors duration-500 dark:bg-slate-900">

        {/* 1. HERO SECTION */}
        <Hero />

        {/* 2. БЛОК ПЕРЕВАГ */}
        <Advantages />

        {/* 3. ПОПУЛЯРНІ ТУРИ */}
        <PopularTour />

        {/* 4. ВІДГУКИ */}
        <Reviews onOpenModal={() => setIsReviewModalOpen(true)} />

        {/* 5. CALL TO ACTION / CONTACT US */}
        <ContactUs />

        {/* МОДАЛКА ВІДГУКУ */}
        <ReviewModal
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
        />

      </div>
  );
}