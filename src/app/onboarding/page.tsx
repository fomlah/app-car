'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const slides = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfPHecLd_ZMgSHVqC0ehiic0d60qmOR_b8IaL80wpCAZIUr5byu8OfbtjNvmXUAq6JxEvEfD0MkjrSZ-cnK0oNtmkAs-RhXm-GxpYTUJ3eoN9Bj7Wn5wm1YNNDNRNvjsq84lz-BckQ897RG0fbaXWvsccssET9YaZ4mibCsfmpYpb6lDlkHgUNunj_tbG2OWsMIfeJlxvaYCOsET-BOAkP-9pytIL8R701S8AzJ57XDrw8qZF-3cQR5B-vr5OVUpwCefYdixi6zgw',
    title: 'تتبع دخلك من',
    titleHighlight: 'كل المنصات',
    description: 'سجل دخلك وأرباحك من أوبر وديدي في مكان واحد. تقارير دقيقة تساعدك تزيد دخلك.',
    floatingIcon: 'local_taxi',
    floatingIconBg: 'bg-white',
    floatingIconColor: 'text-black',
    floatingIconPos: 'top-[10%] left-[10%] -rotate-12',
    coinIcon: 'monetization_on',
    coinBg: 'bg-[#FFD700]',
    coinColor: 'text-yellow-900',
    coinPos: 'bottom-[20%] right-[5%] rotate-12',
    buttonText: 'التالي',
    layout: 'full',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg1yvEDurP4FAIUtDj8Eh7fk3z4RT-E-swFfiOg8c_0FbTaNKOb1SaRt9ZfFrH7N6yffOcIHwZdCVEa5ZCa5pWdDnL6W9em0-R--kBHK7cJgu1sLkqM4TF1rFr-vpBsIsm3VoCpVlnwunPPnULK8RvgdB2LgbHYsKWItam4ohWJqo3f68D6EJD6pmgvqkbWs2LVLxhcmzLfUcKHHuB-eQZdZk9ay_FEe69CPbf6ID5mNEIci0RuuXXgvIQV9Bn8a69CcnZp32Dkrw',
    title: 'إدارة مصاريفك',
    titleHighlight: 'بذكاء',
    description: 'تتبع تكاليف الوقود، الصيانة، وفواتير الهاتف لتعرف أرباحك الحقيقية بدقة.',
    floatingIcon: 'local_gas_station',
    floatingIconBg: 'bg-[#102217] border border-[#13ec6a]/30',
    floatingIconColor: 'text-[#13ec6a]',
    floatingIconPos: 'bottom-6 right-6',
    floatingIcon2: 'build',
    coinIcon: null,
    coinBg: '',
    coinColor: '',
    coinPos: '',
    buttonText: 'التالي',
    layout: 'circle',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3M9oZlUweXYmedLTpvIMPFddzltGmD9TqdwaNzW1Vcp5bjo3t4DLx4zsGrPyGKDZeLOQa29vf8R4JLbx_IM7vvca3DlJLxfUtxhhGvlzooGOxJpKm4BmTyRFrkYH16Kd9h01mniNPjQJYkfsa4UaE9oLEwNOugz0JPlYHeVUdokS9sPXfZksMX81X4prhbpb8SYIN-b6tzpUz2uvuCvVoSV2ijUc7BUMtr7fUwdenWjfSBA9ob0ggtUu7pK3ti9wa2f6kTj54SEE',
    title: 'تقارير أرباح',
    titleHighlight: 'دقيقة',
    description: 'تابع صافي دخلك اليومي والشهري. نقوم بحساب نفقاتك تلقائيًا لترى ربحك الحقيقي.',
    floatingIcon: 'bar_chart',
    floatingIconBg: 'bg-[#162e21]/80 backdrop-blur-md border border-white/10',
    floatingIconColor: 'text-[#13ec6a]',
    floatingIconPos: 'top-[20%] right-[10%] rotate-6',
    centerIcon: 'security',
    coinIcon: null,
    coinBg: '',
    coinColor: '',
    coinPos: '',
    buttonText: 'ابدأ الآن',
    layout: 'tall',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slide = slides[current];

  const goTo = useCallback((idx: number) => {
    if (isAnimating || idx === current) return;
    setDirection(idx > current ? 1 : -1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setTimeout(() => setIsAnimating(false), 50);
    }, 250);
  }, [current, isAnimating]);

  const finishOnboarding = () => {
    localStorage.setItem('onboarding_done', '1');
    router.push('/login');
  };

  const handleNext = () => {
    if (current < slides.length - 1) goTo(current + 1);
    else finishOnboarding();
  };

  const handleSkip = () => finishOnboarding();

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0 && current < slides.length - 1) goTo(current + 1);
      else if (diff < 0 && current > 0) goTo(current - 1);
    }
  };

  return (
    <div
      className="relative flex flex-col min-h-screen bg-[#102217] text-white overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Glow Effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] bg-[#13ec6a]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] bg-[#13ec6a]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#13ec6a]/5 blur-[80px] pointer-events-none" />

      {/* Top Navigation */}
      <div className="w-full px-6 pt-12 pb-2 flex justify-between items-center z-10">
        <div className="w-12" />
        <button onClick={handleSkip} className="text-slate-400 hover:text-[#13ec6a] transition-colors text-sm font-bold">
          تخطي
        </button>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col items-center justify-center px-6 relative z-10 w-full max-w-md mx-auto transition-all duration-500 ease-out ${isAnimating ? (direction > 0 ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8') : 'opacity-100 translate-x-0'}`}>

        {/* Illustration Area */}
        {slide.layout === 'full' && (
          <div className="w-full aspect-square relative mb-8 flex items-center justify-center">
            <div className="absolute inset-0 m-auto w-64 h-64 bg-gradient-to-tr from-[#13ec6a]/30 to-transparent rounded-full blur-3xl animate-pulse" />
            <div
              className="w-full h-full bg-contain bg-center bg-no-repeat relative z-10"
              style={{ backgroundImage: `url("${slide.image}")` }}
            >
              {/* Floating taxi icon - top left */}
              <div className={`absolute ${slide.floatingIconPos} w-12 h-12 ${slide.floatingIconBg} rounded-2xl shadow-lg shadow-[#13ec6a]/20 flex items-center justify-center animate-[bounce_3s_infinite]`}>
                <span className={`material-symbols-outlined ${slide.floatingIconColor} text-2xl`}>{slide.floatingIcon}</span>
              </div>
              {/* Floating coin - bottom right */}
              {slide.coinIcon && (
                <div className={`absolute ${slide.coinPos} w-10 h-10 ${slide.coinBg} rounded-full shadow-lg shadow-yellow-500/20 flex items-center justify-center animate-[bounce_4s_infinite]`}>
                  <span className={`material-symbols-outlined ${slide.coinColor} text-xl`}>{slide.coinIcon}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {slide.layout === 'circle' && (
          <div className="relative w-full aspect-square max-h-[340px] mb-8">
            <div className="absolute inset-0 border border-[#13ec6a]/10 rounded-full scale-90" />
            <div className="absolute inset-0 border border-[#13ec6a]/5 rounded-full scale-110" />
            <div className="w-full h-full bg-gradient-to-b from-white/5 to-transparent rounded-full flex items-center justify-center p-8 backdrop-blur-sm border border-white/5 shadow-2xl shadow-black/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(19,236,106,0.3)] opacity-90"
              />
              {/* Fuel + Wrench icons */}
              <div className={`absolute ${slide.floatingIconPos} ${slide.floatingIconBg} p-3 rounded-xl shadow-lg flex items-center gap-2`}>
                <span className={`material-symbols-outlined ${slide.floatingIconColor} text-2xl`}>{slide.floatingIcon}</span>
                {slide.floatingIcon2 && <span className={`material-symbols-outlined ${slide.floatingIconColor} text-2xl`}>{slide.floatingIcon2}</span>}
              </div>
            </div>
          </div>
        )}

        {slide.layout === 'tall' && (
          <div className="w-full relative aspect-[4/5] max-h-[420px] rounded-2xl overflow-hidden flex items-end justify-center mb-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(19,236,106,0.1)_0%,transparent_70%)] opacity-50" />
            <div
              className="relative w-full h-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url("${slide.image}")` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#102217] via-[#102217]/20 to-transparent" />
            </div>
            {/* Center shield icon */}
            {slide.centerIcon && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#13ec6a]/20 blur-2xl rounded-full animate-pulse" />
                  <span className="material-symbols-outlined text-[80px] text-[#13ec6a] drop-shadow-[0_0_15px_rgba(19,236,106,0.8)]">{slide.centerIcon}</span>
                </div>
              </div>
            )}
            {/* Floating chart icon */}
            <div className={`absolute ${slide.floatingIconPos} ${slide.floatingIconBg} p-3 rounded-xl shadow-lg animate-bounce z-10`} style={{ animationDuration: '3s' }}>
              <span className={`material-symbols-outlined ${slide.floatingIconColor} text-3xl`}>{slide.floatingIcon}</span>
            </div>
          </div>
        )}

        {/* Text Content */}
        <div className="w-full text-center space-y-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
            {slide.title}{' '}
            <span className="text-[#13ec6a] relative inline-block">
              {slide.titleHighlight}
              {current === 0 && (
                <svg className="absolute w-full h-3 bottom-1 left-0 text-[#13ec6a] opacity-30 -z-10" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
                </svg>
              )}
            </span>
          </h1>
          <p className="text-slate-300 text-base leading-relaxed max-w-xs mx-auto">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full px-6 pb-10 pt-4 z-10 flex flex-col items-center gap-8 max-w-md mx-auto">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2" dir="ltr">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 bg-[#13ec6a] shadow-[0_0_10px_rgba(19,236,106,0.5)]'
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleNext}
          className="group relative w-full bg-[#13ec6a] hover:bg-[#0fd65f] active:scale-[0.97] text-[#102217] font-bold text-lg py-4 rounded-2xl shadow-lg shadow-[#13ec6a]/25 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10 flex items-center gap-2">
            <span>{slide.buttonText}</span>
            <ArrowLeft size={20} />
          </span>
        </button>
      </div>

      {/* Material Symbols font */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    </div>
  );
}
