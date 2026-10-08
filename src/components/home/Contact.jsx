"use client";
import React from 'react';
import { useScroll } from '@/context/ScrollContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const Contact = () => {
    const { contactRef } = useScroll();

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.set(".contact-circle", { y: -400 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: contactRef.current,
                start: "top 60%",
                toggleActions:"play none none reverse"
            }
        });

        tl.to(".contact-circle", {
            y: 0,
            duration: 1.5,
            ease: "bounce.out"
        }, 0.2);
    }, { scope: contactRef });

    return (
        <section ref={contactRef} className="w-full relative bg-white text-black py overflow-hidden">
            <div className="container flex flex-col gapy">

                {/* Top Header */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <h2 data-para-effect>
                            THE BEST CONVERSATIONS <br className="hidden md:block" />
                            START WITH AN IDEA. <br className="hidden md:block" />
                            LET’S SEE WHERE YOURS <br className="hidden md:block" />
                            COULD GO.
                        </h2>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 md:mt-0">

                    {/* Left: Shape */}
                    <div className="flex items-end justify-start">
                        {/* Geometric Shape */}
                        <svg
                            viewBox="0 0 200 220"
                            className="w-48 h-auto md:w-72 overflow-visible"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle className="contact-circle" cx="100" cy="50" r="35" fill="black" />
                            <path className="contact-semicircle" d="M 20 85 H 180 A 80 80 0 0 1 20 85 Z" fill="black" />
                            <path className="contact-triangle" d="M 100 165 L 60 215 H 140 Z" fill="black" />
                        </svg>
                    </div>

                    {/* Right: Form */}
                    <div className="flex flex-col gap-12">

                        {/* Form Fields */}
                        <div className="flex flex-col gap-10">
                            <input
                                type="text"
                                placeholder="YOUR NAME"
                                className="w-full bg-transparent outline-none border-b border-black/30 pb-4 font-medium placeholder:text-black focus:border-black transition-colors uppercase"
                            />

                            <input
                                type="email"
                                placeholder="YOUR EMAIL"
                                className="w-full bg-transparent outline-none border-b border-black/30 pb-4 font-medium placeholder:text-black focus:border-black transition-colors uppercase"
                            />

                            <input
                                type="text"
                                placeholder="WHERE ARE YOU WORKING FROM?"
                                className="w-full bg-transparent outline-none border-b border-black/30 pb-4 font-medium placeholder:text-black focus:border-black transition-colors uppercase"
                            />
                        </div>

                        {/* Options & Submit */}
                        <div className="flex flex-col gap-6">
                            <p className="font-medium uppercase">WHAT WOULD YOU LIKE TO TALK ABOUT?</p>

                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                                <div className="flex flex-wrap gap-3">
                                    <button type="button" className="border border-black/30 hover:border-black transition-colors px-4 py-2 bg-transparent">
                                        A Partnership
                                    </button>
                                    <button type="button" className="border border-black/30 hover:border-black transition-colors px-4 py-2 bg-transparent">
                                        Business Idea
                                    </button>
                                    <button type="button" className="border border-black/30 hover:border-black transition-colors px-4 py-2 bg-transparent">
                                        Opportunity
                                    </button>
                                </div>

                                <button type="submit" className="bg-black text-white px-8 py-3 flex items-center justify-center gap-2 hover:bg-black/80 transition-colors w-fit">
                                    SEND ↗
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
