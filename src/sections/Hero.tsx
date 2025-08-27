'use client';

import React, {useEffect, useRef} from 'react';
import { heroSlides } from '@/data/data';
import './hero.css';

// import AOS from 'aos';

import AOS from 'aos';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import{Autoplay,Pagination,Navigation} from 'swiper/modules';
import HeroSlide from '@/components/HeroSlide';

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
                      // keep selector or let Swiper use the element we add below
                      el: '.swiper-pagination',
                      type: 'bullets',
                      clickable: true,
                    }}
                    navigation={{
                      // initial values — final refs are assigned in onBeforeInit
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                      // ensure navigation uses the refs that exist in the DOM
                      // @ts-ignore
                      swiper.params.navigation.prevEl = prevRef.current;
                      // @ts-ignore
                      swiper.params.navigation.nextEl = nextRef.current;
                    }}
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
