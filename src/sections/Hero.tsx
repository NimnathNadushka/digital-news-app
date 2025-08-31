'use client';

import React, { useEffect, useRef } from 'react';
import { heroSlides } from '@/data/data';
import './hero.css';

import AOS from 'aos';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import HeroSlide from '@/components/HeroSlide';

// Import Swiper types
import type { Swiper as SwiperType } from 'swiper';

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }, []);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const handleSwiperInit = (swiper: SwiperType) => {
    // Type-safe navigation setup
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
  };

  return (
    <section id="hero-slider" className="hero-slider">
      <div className="container-md" data-aos="fade-in">
        <div className="row">
          <div className="col-12">
            <Swiper
              slidesPerView={'auto'}
              speed={500}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={handleSwiperInit}
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}
              className="sliderFeaturedPosts"
            >
              {heroSlides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <HeroSlide slide={slide} />
                </SwiperSlide>
              ))}

              {/* pagination element required for bullets */}
              <div className="swiper-pagination" />

              {/* custom nav elements wired via refs */}
              <div ref={nextRef} className="custom-swiper-button-next">
                <span className="bi-chevron-right"></span>
              </div>

              <div ref={prevRef} className="custom-swiper-button-prev">
                <span className="bi-chevron-left"></span>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
