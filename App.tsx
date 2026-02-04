
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import ContactForm from './components/ContactForm.tsx';
import Footer from './components/Footer.tsx';
import SavingsCalculator from './components/SavingsCalculator.tsx';
import PromoWheel from './components/PromoWheel.tsx';
import { CONTACT_INFO } from './constants.tsx';
import { Gift, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [hasPromoClosedManually, setHasPromoClosedManually] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Auto-open promo wheel after 5 seconds
    const promoTimer = setTimeout(() => {
      const hasShown = localStorage.getItem('aqua_blue_promo_shown');
      if (!hasShown) {
        setIsPromoOpen(true);
        localStorage.setItem('aqua_blue_promo_shown', 'true');
      }
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(promoTimer);
    };
  }, []);

  const getBgColor = () => {
    if (scrollProgress < 0.4) {
      return '#f8fafc'; // Slate 50
    } else if (scrollProgress < 0.8) {
      return '#ffffff'; // Puro
    }
    return '#fffdfa'; 
  };

  return (
    <div 
      className="flex flex-grow flex-col min-h-screen relative transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: getBgColor() }}
    >
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{ 
          opacity: Math.max(0, 1 - scrollProgress * 2.5),
          background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.1) 0%, rgba(255, 255, 255, 0) 100%)'
        }}
      />

      <Navbar onOpenCalculator={() => setIsCalculatorOpen(true)} />
      
      <main className="flex-grow relative z-10">
        <Hero scrollProgress={scrollProgress} />
        <Features />
        
        <section className="py-32 bg-slate-950 overflow-hidden relative">
          <div className="absolute inset-0 bg-water-gradient opacity-5"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-10">
               <h2 className="text-4xl md:text-7xl font-brand font-black text-white leading-tight">
                Dispenser a Red: <br /> <span className="text-sky-500">Más Higiénico.</span>
              </h2>
              <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Al conectarse directamente a tu red doméstica, eliminamos el contacto con el aire y la manipulación manual de envases. Disfrutá de la máxima seguridad alimentaria con la tecnología <strong>Aqua Blue Eco</strong>.
              </p>
              <div className="pt-8 flex justify-center">
                <div className="inline-flex items-center space-x-6 bg-white/5 border border-white/10 px-10 py-5 rounded-2xl">
                   <div className="w-4 h-4 bg-sky-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(14,165,233,0.8)]"></div>
                   <span className="text-white font-bold tracking-[0.2em] text-xs uppercase">Certificación de Agua Doméstica Segura</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductDetail />
        <ContactForm />
      </main>
      <Footer />
      
      {/* Widget Calculadora de Ahorro */}
      <SavingsCalculator 
        isOpen={isCalculatorOpen} 
        onToggle={setIsCalculatorOpen} 
      />

      {/* Ruleta de Promo */}
      <PromoWheel 
        isOpen={isPromoOpen} 
        onClose={() => {
          setIsPromoOpen(false);
          setHasPromoClosedManually(true);
        }} 
      />

      {/* Botón flotante de Ruleta - SIEMPRE ARRIBA DE WHATSAPP AL INICIAR */}
      {!isPromoOpen && (
        <button 
          onClick={() => setIsPromoOpen(true)}
          className="fixed bottom-32 right-6 z-50 group flex items-center justify-end animate-in fade-in slide-in-from-bottom-4 duration-700"
          title="Ganá un descuento"
        >
          <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out bg-slate-900 text-white rounded-l-2xl shadow-xl mr-[-15px] relative z-0 h-12 flex items-center opacity-0 group-hover:opacity-100">
             <span className="px-5 font-bold whitespace-nowrap pl-4 pr-8 text-xs uppercase tracking-widest">
               ¡Ganá tu Descuento!
             </span>
          </div>
          <div className="relative z-10 bg-gradient-to-tr from-sky-600 to-blue-400 p-4 rounded-full shadow-[0_10px_30px_rgba(14,165,233,0.5)] border-4 border-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <Zap className="w-7 h-7 text-white fill-current animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white animate-bounce"></div>
          </div>
        </button>
      )}

      {/* WhatsApp Flotante */}
      <a 
        href={CONTACT_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center justify-end"
        title="Consultar por WhatsApp"
      >
        <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out bg-white text-slate-900 rounded-l-2xl shadow-lg mr-[-15px] relative z-0 h-12 flex items-center opacity-0 group-hover:opacity-100">
           <span className="px-5 font-bold whitespace-nowrap pl-4 pr-8 text-sm">
             ¿Consultas? Escribinos
           </span>
        </div>
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-2xl">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp Aqua Blue" 
            className="w-16 h-16 md:w-20 md:h-20"
          />
        </div>
      </a>
    </div>
  );
};

export default App;
