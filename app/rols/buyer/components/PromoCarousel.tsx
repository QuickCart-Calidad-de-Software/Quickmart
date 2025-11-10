'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'NEW COLLECTION',
    subtitle: 'Premium Electronics',
    description: 'Discover our curated selection',
    textColor: 'text-neutral-900',
    bgColor: 'bg-stone-100',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&h=600&fit=crop&q=80',
    badge: 'NEW',
  },
  {
    id: 2,
    title: 'LATEST ARRIVALS',
    subtitle: 'Modern Technology',
    description: 'Experience innovation',
    textColor: 'text-white',
    bgColor: 'bg-neutral-800',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&h=600&fit=crop&q=80',
    badge: 'FEATURED',
  },
  {
    id: 3,
    title: 'SPECIAL OFFER',
    subtitle: 'Limited Edition',
    description: 'Exclusive products available',
    textColor: 'text-neutral-900',
    bgColor: 'bg-stone-200',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&q=80',
    badge: 'LIMITED',
  },
  {
    id: 4,
    title: 'FREE SHIPPING',
    subtitle: 'Orders Over $500',
    description: 'Complimentary delivery service',
    textColor: 'text-white',
    bgColor: 'bg-neutral-900',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1200&h=600&fit=crop&q=80',
    badge: 'PROMO',
  },
];

export default function PromoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-neutral-50 dark:bg-neutral-950 group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        >
          {/* Background Layout - Split Design */}
          <div className="absolute inset-0 flex">
            {/* Left Side - Content */}
            <div className={`w-1/2 ${slide.bgColor} flex items-center justify-center px-16`}>
              <div className="max-w-lg space-y-6">
                {/* Badge Superior */}
                <div className="border border-neutral-300 dark:border-neutral-700 px-4 py-1.5 w-fit">
                  <span className={`${slide.textColor} text-xs font-light tracking-[0.2em] uppercase`}>
                    {slide.badge}
                  </span>
                </div>
                
                {/* Título Principal */}
                <h2 className={`text-5xl md:text-6xl font-light ${slide.textColor} tracking-tight leading-none`}>
                  {slide.title}
                </h2>
                
                {/* Subtítulo */}
                <p className={`text-xl md:text-2xl font-light ${slide.textColor} tracking-wide`}>
                  {slide.subtitle}
                </p>
                
                {/* Descripción */}
                <p className={`text-sm ${slide.textColor} opacity-70 font-light tracking-wide`}>
                  {slide.description}
                </p>

                {/* CTA Button - Minimalista */}
                <button className={`mt-6 px-8 py-3 border ${
                  slide.textColor === 'text-white' 
                    ? 'border-white text-white hover:bg-white hover:text-neutral-900' 
                    : 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'
                } transition-all duration-500 uppercase tracking-[0.15em] text-xs font-normal`}>
                  Shop Now
                </button>
              </div>
            </div>

            {/* Right Side - Product Image (Clean, no overlay) */}
            <div className={`w-1/2 ${
              slide.bgColor === 'bg-stone-100' ? 'bg-stone-50' : 
              slide.bgColor === 'bg-stone-200' ? 'bg-stone-100' : 
              slide.bgColor === 'bg-neutral-800' ? 'bg-neutral-900' : 
              'bg-black'
            } flex items-center justify-center p-12`}>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain max-w-md transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Minimalista */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-neutral-400/30 hover:border-neutral-900 dark:hover:border-white backdrop-blur-sm flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-5 h-5 text-neutral-900 dark:text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-neutral-400/30 hover:border-neutral-900 dark:hover:border-white backdrop-blur-sm flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-5 h-5 text-neutral-900 dark:text-white" />
      </button>

      {/* Dots Indicator - Minimalista */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 ${
              index === currentSlide
                ? 'w-12 h-[2px] bg-neutral-900 dark:bg-white'
                : 'w-8 h-[1px] bg-neutral-400/50 hover:bg-neutral-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
