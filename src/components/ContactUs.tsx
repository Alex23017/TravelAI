import {Link} from "react-router-dom";

export const ContactUs = () => {
  return (
      <section className="py-24 relative overflow-hidden bg-primary dark:bg-sky-600 text-center text-white">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Готові до нових пригод?</h2>
          <p className="text-sky-100 text-lg mb-10 max-w-2xl mx-auto">Отримуйте персональні пропозиції та знижки до 15% на першу подорож.</p>
          <Link to="/contact" className="inline-block bg-white text-primary font-bold text-lg py-4 px-12 rounded-full shadow-xl hover:bg-slate-900 hover:text-white transition-all">Зв'язатися з нами</Link>
        </div>
      </section>
  );
};