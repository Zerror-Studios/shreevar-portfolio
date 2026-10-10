"use client";
import React, { useEffect, useRef } from 'react';
import { useScroll } from '@/context/ScrollContext';
import gsap from 'gsap';

const chaptersData = [
    {
        id: "01",
        title: "BUILDING ZCOM",
        img: "/images/homepage/dashboard.svg",
        description: "A subscription-based e-commerce venture by Zerror Studios. Helping shape the product, drive its marketing and bring new businesses onto the platform."
    },
    {
        id: "02",
        title: <>INTERNATIONAL MBA &bull; <br />IE BUSINESS SCHOOL</>,
        img: "/images/homepage/school.svg",
        description: "Currently pursuing an International MBA in Madrid, expanding his perspective on strategy, entrepreneurship and global business."
    }
];

const CurrentChapter = () => {
    const { focusRef } = useScroll();
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const imgWrappersRef = useRef([]);
    const timersRef = useRef([]);

    useEffect(() => {
        // Default values set by gsap.set
        gsap.set(cardsRef.current, { y: 100, opacity: 0 });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Animate in when visible
                    gsap.to(cardsRef.current, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out"
                    });
                } else {
                    // Reset to default values when out of view (toggle action)
                    gsap.set(cardsRef.current, { y: 100, opacity: 0 });
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e, index) => {
        const wrapper = imgWrappersRef.current[index];
        if (!wrapper) return;

        const rect = wrapper.parentElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        clearTimeout(timersRef.current[index]);

        gsap.to(wrapper, {
            '--mouse-x': `${x}px`,
            '--mouse-y': `${y}px`,
            '--mask-size': '200px',
            opacity: 1,
            duration: 0.4,
            ease: "power3.out"
        });

        // Hide after delay of no movement
        timersRef.current[index] = setTimeout(() => {
            gsap.to(wrapper, {
                '--mask-size': '0px',
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        }, 800);
    };

    const handleMouseLeave = (e, index) => {
        const wrapper = imgWrappersRef.current[index];
        if (!wrapper) return;

        clearTimeout(timersRef.current[index]);
        gsap.to(wrapper, {
            '--mask-size': '0px',
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    };

    return (
        <section ref={focusRef} className="w-full relative bg-white py">
            <div className="container flex flex-col gapy">

                {/* Top Header Grid */}
                <div className=" max-sm:space-y-3 md:grid grid-cols-7">
                    <div className='col-span-5'>
                        <h2 data-para-effect>
                            THE CURRENT <br /> CHAPTER
                        </h2>
                    </div>
                    <div className="col-span-2">
                        <p data-para-effect className="text-black/80 text-lg leading-tight ">
                            Building, learning, and expanding — across business, products and new markets.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {chaptersData.map((chapter, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="bg-black text-white p-6 md:p-10 flex flex-col justify-between aspect-[4/3] relative overflow-hidden"
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={(e) => handleMouseLeave(e, index)}
                        >
                            <div
                                ref={el => imgWrappersRef.current[index] = el}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
                                style={{
                                    '--mouse-x': '50%',
                                    '--mouse-y': '50%',
                                    '--mask-size': '0px',
                                    maskImage: 'radial-gradient(circle var(--mask-size) at var(--mouse-x) var(--mouse-y), black 20%, transparent 80%)',
                                    WebkitMaskImage: 'radial-gradient(circle var(--mask-size) at var(--mouse-x) var(--mouse-y), black 20%, transparent 80%)',
                                }}
                            >
                                <img className='w-full object-contain ' src={chapter.img} alt="" />
                            </div>
                            <div className="bg-white text-black w-14 h-14 md:w-16 md:h-16 flex items-center justify-center relative z-10 pointer-events-none">
                                <h3 className="text-xl md:text-2xl font-medium">{chapter.id}</h3>
                            </div>
                            <div className="mt-12 relative z-10 pointer-events-none">
                                <h3 className="uppercase mb-4 text-xl font-medium">{chapter.title}</h3>
                                <p className="text-white/80">
                                    {chapter.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CurrentChapter;