'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, Play, Megaphone, ArrowUpLeft } from 'lucide-react';

interface Ad {
  id: number;
  title: string;
  type: 'BANNER_TEXT' | 'BANNER_LINK' | 'BANNER_VIDEO';
  imageUrl: string;
  text: string | null;
  linkUrl: string | null;
  videoUrl: string | null;
  active: boolean;
  order: number;
}

export default function AdBanner() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    fetch('/api/ads')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setAds(data); })
      .catch(() => {});
  }, []);

  const startAutoSlide = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    if (ads.length <= 1) return;

    setProgress(0);
    const duration = 5000;
    const step = 50;
    let elapsed = 0;

    progressRef.current = setInterval(() => {
      elapsed += step;
      setProgress((elapsed / duration) * 100);
    }, step);

    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((p) => (p + 1) % ads.length);
        setIsTransitioning(false);
        setProgress(0);
        elapsed = 0;
      }, 300);
    }, duration);
  }, [ads.length]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startAutoSlide]);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setShowVideo(false);
      setIsTransitioning(false);
      startAutoSlide();
    }, 250);
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo((current + 1) % ads.length);
      else goTo((current - 1 + ads.length) % ads.length);
    }
  };

  const handleAdClick = (ad: Ad) => {
    if (ad.type === 'BANNER_LINK' && ad.linkUrl) {
      window.open(ad.linkUrl, '_blank', 'noopener,noreferrer');
    } else if (ad.type === 'BANNER_VIDEO' && ad.videoUrl) {
      setShowVideo(true);
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    }
  };

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/);
    return match ? match[1] : null;
  };

  if (ads.length === 0) return null;

  const ad = ads[current];

  return (
    <section className="relative">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Megaphone size={13} className="text-orange-500" />
          </div>
          <h3 className="text-sm font-bold text-foreground">العروض والإعلانات</h3>
        </div>
        {ads.length > 1 && (
          <span className="text-[10px] text-muted font-medium">{current + 1} / {ads.length}</span>
        )}
      </div>

      <div
        className="relative overflow-hidden rounded-2xl shadow-lg shadow-black/10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress bar at top */}
        {ads.length > 1 && !showVideo && (
          <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 px-3 pt-2.5">
            {ads.map((_, i) => (
              <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/20 backdrop-blur-sm">
                <div
                  className="h-full rounded-full transition-all ease-linear"
                  style={{
                    width: i < current ? '100%' : i === current ? `${progress}%` : '0%',
                    backgroundColor: i <= current ? 'rgba(255,255,255,0.9)' : 'transparent',
                    transitionDuration: i === current ? '50ms' : '300ms',
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Banner content */}
        <div
          className={`relative w-full overflow-hidden transition-all duration-300 ease-out ${ad.type !== 'BANNER_TEXT' ? 'cursor-pointer' : ''} ${isTransitioning ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'}`}
          onClick={() => handleAdClick(ad)}
        >
          {showVideo && ad.type === 'BANNER_VIDEO' && ad.videoUrl ? (
            <div className="w-full aspect-video bg-black flex items-center justify-center">
              {getYouTubeId(ad.videoUrl) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(ad.videoUrl)}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={ad.title}
                />
              ) : (
                <video src={ad.videoUrl} controls autoPlay className="w-full h-full object-contain">
                  <track kind="captions" />
                </video>
              )}
            </div>
          ) : (
            <div className="relative">
              {/* Image */}
              <div className="relative w-full aspect-[2/1] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                {/* Video play button */}
                {ad.type === 'BANNER_VIDEO' && ad.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-2xl shadow-black/30 hover:scale-110 transition-transform">
                      <Play size={22} className="text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                )}

                {/* Link badge */}
                {ad.type === 'BANNER_LINK' && ad.linkUrl && (
                  <div className="absolute top-10 left-3 z-20">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 shadow-lg">
                      <ExternalLink size={11} className="text-white" />
                      <span className="text-[10px] text-white font-semibold">زيارة الموقع</span>
                    </div>
                  </div>
                )}

                {/* Ad badge */}
                <div className="absolute top-10 right-3 z-20">
                  <div className="px-2 py-0.5 rounded-md bg-primary/20 backdrop-blur-md border border-primary/30">
                    <span className="text-[9px] text-primary font-bold">إعلان</span>
                  </div>
                </div>
              </div>

              {/* Content area below image */}
              <div className="relative bg-card border-t border-border">
                {/* Decorative accent line */}
                <div className="absolute top-0 right-6 w-12 h-[2px] bg-gradient-to-l from-primary to-primary/0" />

                <div className="p-3.5 pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-foreground leading-snug">{ad.title}</h4>
                      {ad.type === 'BANNER_TEXT' && ad.text && (
                        <p className="text-[11px] text-muted mt-1 leading-relaxed line-clamp-2">{ad.text}</p>
                      )}
                      {ad.type === 'BANNER_LINK' && ad.linkUrl && (
                        <p className="text-[11px] text-primary mt-1 font-medium flex items-center gap-1">
                          <ArrowUpLeft size={11} className="rotate-90" />
                          اضغط للمزيد
                        </p>
                      )}
                      {ad.type === 'BANNER_VIDEO' && (
                        <p className="text-[11px] text-purple-400 mt-1 font-medium flex items-center gap-1">
                          <Play size={11} />
                          شاهد الفيديو
                        </p>
                      )}
                    </div>

                    {/* CTA button for link ads */}
                    {ad.type === 'BANNER_LINK' && ad.linkUrl && (
                      <button className="shrink-0 mt-0.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold hover:bg-primary/20 transition-colors">
                        زيارة
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom dots navigation */}
                {ads.length > 1 && (
                  <div className="flex items-center justify-center gap-1.5 pb-2.5" dir="ltr">
                    {ads.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); goTo(i); }}
                        className={`rounded-full transition-all duration-400 ${
                          i === current
                            ? 'w-6 h-[5px] bg-primary shadow-[0_0_8px_rgba(34,197,94,0.4)]'
                            : 'w-[5px] h-[5px] bg-muted/30 hover:bg-muted/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
