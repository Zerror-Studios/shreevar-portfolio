"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RippleImage from './RippleImage';

gsap.registerPlugin(SplitText, ScrollTrigger);

const hobbies = [
    {
        title: "CARS / GO-KARTING",
        desc1: "Speed, focus, and a little adrenaline.",
        desc2: "A love for cars and the thrill of getting behind the wheel.",
        image: "/images/homepage/outsidework/carting.svg"
    },
    {
        title: "DRUMS / MUSIC",
        desc1: "College Band",
        desc2: "Performed at 5+ inter-collegiate cultural festivals across Mumbai.",
        image: "/images/homepage/outsidework/music.svg"
    },
    {
        title: "SAILING",
        desc1: "Time on the water.",
        desc2: "A way to slow down, switch off, and enjoy being out at sea.",
        image: "/images/homepage/outsidework/sailing.svg"
    },
    {
        title: "COMMUNITY EDUCATION",
        desc1: "Giving back, beyond the classroom.",
        desc2: "Taught literacy and communication, and helped build confidence through community programmes.",
        image: "/images/homepage/outsidework/community.svg"
    }
];

const HOBBY_IMAGES = hobbies.map(h => h.image);

const OutsideWork = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [displayedIndex, setDisplayedIndex] = useState(0);
    const contentContainerRef = useRef(null);
    const isFirstMount = useRef(true);

    // Animate OUT old content, then update displayedIndex
    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        if (activeIndex === displayedIndex) return;

        const container = contentContainerRef.current;
        const currentLines = container ? container.querySelectorAll('.split-line') : [];

        if (currentLines.length > 0) {
            gsap.killTweensOf(currentLines);
            gsap.to(currentLines, {
                yPercent: -105,
                opacity: 0,
                duration: 0.35,
                stagger: 0.03,
                ease: "power3.in",
                onComplete: () => {
                    setDisplayedIndex(activeIndex);
                }
            });
        } else {
            setDisplayedIndex(activeIndex);
        }
    }, [activeIndex, displayedIndex]);

    // Animate IN new content with data-para-effect (SplitText + line masking)
    useEffect(() => {
        const container = contentContainerRef.current;
        if (!container) return;

        let splits = [];
        let isCancelled = false;

        const runReveal = async () => {
            if (typeof document !== 'undefined' && document.fonts) {
                await document.fonts.ready;
            }
            if (isCancelled || !contentContainerRef.current) return;

            const targets = contentContainerRef.current.querySelectorAll('.para-split');
            const allLines = [];

            targets.forEach((el) => {
                const split = new SplitText(el, {
                    type: "lines",
                    linesClass: "split-line",
                    aria: "none",
                });
                splits.push(split);

                split.lines.forEach((line) => {
                    const wrapper = document.createElement("div");
                    wrapper.style.overflow = "hidden";
                    line.parentNode.insertBefore(wrapper, line);
                    wrapper.appendChild(line);
                    allLines.push(line);
                });
            });

            gsap.set(allLines, {
                yPercent: 100,
                opacity: 0,
                transformOrigin: "center top",
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
            });

            gsap.to(allLines, {
                yPercent: -6,
                opacity: 1,
                duration: 0.9,
                stagger: 0.08,
                ease: "power4.out",
                scrollTrigger: isFirstMount.current ? {
                    trigger: contentContainerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                } : undefined,
            });
        };

        runReveal();

        return () => {
            isCancelled = true;
            splits.forEach(s => s.revert());
        };
    }, [displayedIndex]);

    return (
        <section className="w-full bg-black text-white py overflow-hidden">
            <div className=" flex flex-col gapy">
                
                {/* Header */}
                <div className=" container max-sm:space-y-3 md:grid grid-cols-7">
                    <div className='col-span-5'>
                        <h2 data-para-effect className="uppercase">
                            OUTSIDE WORK
                        </h2>
                    </div>
                    <div className="col-span-2">
                        <p className="text-white/80 text-lg leading-tight">
                            When I'm not building partnerships, I'm usually looking for a different kind of rush.
                        </p>
                    </div>
                </div>

                {/* Horizontal Scroller via Swiper */}
                <div ref={contentContainerRef} className="relative container w-full  md:grid grid-cols-3 gap-x-12 ">
                    <div
                        key={`desktop-${displayedIndex}`}
                        className=" hidden md:flex  flex-col justify-center"
                    >
                        <h2 className="para-split">{hobbies[displayedIndex].title}</h2>
                        <p className='para-split text-xl mb-5'>{hobbies[displayedIndex].desc1}</p>
                        <p className='para-split opacity-80'>{hobbies[displayedIndex].desc2}</p>
                    </div>
                    <div className="">
                        <div className="aspect-square w-full">
                            <RippleImage images={HOBBY_IMAGES} currentIndex={activeIndex} />
                        </div>
                    </div>
                    <div
                        key={`mobile-${displayedIndex}`}
                        className=" mt-5 flex md:hidden  flex-col justify-center"
                    >
                        <h2 className="para-split">{hobbies[displayedIndex].title}</h2>
                        <p className='para-split text-xl mb-5'>{hobbies[displayedIndex].desc1}</p>
                        <p className='para-split opacity-80'>{hobbies[displayedIndex].desc2}</p>
                    </div>
                    <div className=" flex justify-end items-center max-sm:mt-10">
                        <div className="flex md:flex-col gap-4 w-full  md:w-12">
                            {hobbies.map((item,i)=>(
                                <div key={i} onClick={() => setActiveIndex(i)} className={`aspect-square group center cursor-pointer relative ${i === activeIndex ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-opacity'}`}>
                                    <div className={` hidden md:block absolute w-10 transition-all origin-right bg-white rounded-full -left-12 opacity-80 h-[2px] ${i === activeIndex ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></div>
                                    <div className={` md:hidden absolute w-full  transition-all origin-left bg-white rounded-full left-0 -bottom-2 opacity-80 h-[2px] ${i === activeIndex ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></div>
                                    <div className="w-full h-full overflow-hidden">
                                    <img className={`cover transition-all ${i === activeIndex ? 'scale-110' : 'group-hover:scale-105'}`} src={item.image} alt="work img thumbnail" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                   
                </div>

            </div>
        </section>
    );
};

export default OutsideWork;
