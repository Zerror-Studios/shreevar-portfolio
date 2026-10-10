"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useScroll } from '@/context/ScrollContext';
import { SplitText } from 'gsap/SplitText';
import RippleImage from './RippleImage';

gsap.registerPlugin(ScrollTrigger, SplitText);

    const experiences = [
        {
            id: 1,
            zIndex: 40,
            year: "2025—26",
            title: "BUILDING THE BUSINESS\n SIDE OF THE STUDIO.",
            image: "images/homepage/work/zerror.svg",
            logo: "images/homepage/work/zerror-logo.svg",
            roles: [
                {
                    num: "01",
                    name: "RELATIONSHIPS",
                    desc: "Building strategic connections and managing key client relationships."
                },
                {
                    num: "02",
                    name: "ZCOM",
                    desc: "Positioning Zerror's commerce platform around real business and client needs."
                },
                {
                    num: "03",
                    name: "GROWTH",
                    desc: "Driving business development and new opportunities."
                }
            ]
        },
        {
            id: 2,
            zIndex: 30,
            year: "2024—25",
            title: "TURNING STRATEGY\nINTO GROWTH.",
            image: "images/homepage/work/disrptve.svg",
            logo: "images/homepage/work/disrptve-logo.svg",
            roles: [
                {
                    num: "01",
                    name: "GROWTH STRATEGY",
                    desc: "Spearheaded GTM, positioning and operational frameworks from 0 to 1."
                },
                {
                    num: "02",
                    name: "GTM & CLIENTS",
                    desc: "Built B2B offerings, led sales for DISRPTVE bringing 15 partners on board."
                },
                {
                    num: "03",
                    name: "OPERATIONS",
                    desc: "Streamlined workflows, built playbooks and delivered turnaround times < 48hrs."
                }
            ]
        },
        {
            id: 3,
            zIndex: 20,
            year: "2023—24",
            title: "CONNECTING BRANDS\nWITH LIVE CULTURE.",
            image: "images/homepage/work/bookmyshow.svg",
            logo: "images/homepage/work/bookmyshow-logo.svg",
            roles: [
                {
                    num: "01",
                    name: "SPONSORSHIP REVENUE",
                    desc: "Drove $1M+ in sponsorship revenue across 15+ flagship IPs."
                },
                {
                    num: "02",
                    name: "BRAND PARTNERSHIPS",
                    desc: "Built strategies with brands like Netflix, MAC, Bumble, H&M and more."
                },
                {
                    num: "03",
                    name: "LIVE EXPERIENCES",
                    desc: "Managed on-ground brand activations at Lollapalooza India & Sunburn, reaching 100K+ attendees."
                }
            ]
        },
        {
            id: 4,
            zIndex: 10,
            year: "2022—23",
            title: "BRINGING ART INTO\nWEB3.",
            image: "/images/homepage/work/heftyart.svg",
            logo: "images/homepage/work/hefty-logo.svg",
            roles: [
                {
                    num: "01",
                    name: "WEB3 REVENUE",
                    desc: "Generated $500K+ through NFTs, physical auctions and new revenue models."
                },
                {
                    num: "02",
                    name: "ARTIST ECOSYSTEM",
                    desc: "Onboarded 50+ artists and expanded HEFTY.art's creative network."
                },
                {
                    num: "03",
                    name: "GLOBAL PARTNERSHIPS",
                    desc: "Built relationships with Sotheby's, L'Officiel, and Polygon at Art Dubai."
                }
            ]
        }
];

const WORK_IMAGES = experiences.map(exp => exp.image);
    
const WorkSection = () => {
    const { workRef, aboutRef } = useScroll();
    const wrapperRef = useRef(null);
    const contentContainerRef = useRef(null);
    const sectionsRef = useRef([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [displayedIndex, setDisplayedIndex] = useState(0);
    const isFirstMount = useRef(true);

    useGSAP(() => {
        const aboutShapes = document.querySelectorAll('.about-totem-shape');
        const targets = document.querySelectorAll('.work-target');

        if (!aboutShapes.length || !targets.length) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: workRef.current,
                start: "top bottom",
                end: "top top",
                scrub: 1,
            }
        });

        aboutShapes.forEach((shape, i) => {
            if (!shape || !targets[i]) return;

            const shapeRect = shape.getBoundingClientRect();
            const targetRect = targets[i].getBoundingClientRect();

            const shapeCenterX = shapeRect.left + shapeRect.width / 2;
            const shapeCenterY = shapeRect.top + shapeRect.height / 2;

            const targetCenterX = targetRect.left + targetRect.width / 2;
            const targetCenterY = targetRect.top + targetRect.height / 2;

            const deltaX = targetCenterX - shapeCenterX;
            const deltaY = targetCenterY - shapeCenterY;
            const scale = targetRect.width / shapeRect.width;

            tl.to(shape, {
                x: deltaX,
                y: deltaY,
                scale: scale,
                rotation: 360,
                duration: 1,
                ease: "power1.inOut"
            }, 0);
        });

        ScrollTrigger.create({
            trigger: workRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: ".about-totem-stack",
            pinSpacing: false,
        });
    }, { dependencies: [] });

    // Track scroll progress to update activeIndex
    useGSAP(() => {
        if (!wrapperRef.current) return;
        
        ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const progress = self.progress;
                let index = Math.floor(progress * experiences.length);
                if (index >= experiences.length) index = experiences.length - 1;
                setActiveIndex(prev => prev !== index ? index : prev);
            }
        });
    }, { scope: wrapperRef });

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
                ease: "power4.out"
            });
        };

        runReveal();

        return () => {
            isCancelled = true;
            splits.forEach(s => s.revert());
        };
    }, [displayedIndex]);

    useGSAP(()=>{
        gsap.to(".inner_bar",{
            width:"100%",
            ease:"none",
            scrollTrigger:{
                trigger:wrapperRef.current,
                start:"top top",
                end:"bottom bottom",
                scrub:true
            }
        })
    })

    return (
        <div ref={workRef} className='w-full relative '>
            {/* Intro Screen */}
            <section className="w-full h-screen sticky top-0 bg-black  text-white flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <h2 data-para-effect className="uppercase text-center">
                        WHERE I'VE WORKED?
                    </h2>

                    {/* Geometric Shapes Targets */}
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="work-target w-8 h-8"></div>
                        <div className="work-target w-8 h-8"></div>
                        <div className="work-target w-8 h-8"></div>
                    </div>
                </div>
            </section>

            {/* Experience Screens Pinned Wrapper */}
            <div ref={wrapperRef} className="relative w-full h-[400vh] z-[100000]">

                {/* Sticky Container */}
                <div className="sticky top-0 w-full h-screen bg-black overflow-hidden flex items-center">

                        <div className="bar  bg-white/20 h-[2px] w-[50%] md:w-[20%] overflow-hidden rounded-full absolute bottom-5 left-1/2 -translate-x-1/2">
                        <div className="inner_bar w-0 bg-white h-full"></div>
                        </div>

                    <div className="container h-full py-12 flex flex-col md:grid md:grid-cols-2">
                        
                        {/* Left: RippleImage Column */}
                        <div className="w-full flex-1 min-h-0 md:h-full relative bg-zinc-900 flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full relative">
                                <RippleImage images={WORK_IMAGES} currentIndex={activeIndex} />
                            </div>
                        </div>

                        {/* Right: Content Column */}
                        <div ref={contentContainerRef} className="md:flex flex-col justify-center max-sm:space-y-4 max-sm:mt-5 md:pl-8 md:h-full text-white">
                            {(() => {
                                const exp = experiences[displayedIndex];
                                return (
                                    <div key={displayedIndex} className="flex flex-col justify-center h-full">
                                        {/* Top Info */}
                                        <div className="flex justify-between items-start md:mb-16">
                                            <h2 className="para-split leading-none">0{exp.id}</h2>
                                            <span className="para-split text-white/60 text-sm md:text-base pt-2">{exp.year}</span>
                                        </div>

                                        {/* Heading */}
                                        <h2 className="para-split uppercase md:mb-16">
                                            {exp.title.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}<br />
                                                </React.Fragment>
                                            ))}
                                        </h2>

                                        {/* Roles List */}
                                        <div className="flex flex-col">
                                            {exp.roles.map((role, idx) => (
                                                <div key={idx} className={`flex gap-8 py-6 ${idx !== 0 ? 'border-t border-white/10' : ''}`}>
                                                    <h4 className="para-split text-white/80 leading-none w-10">{role.num}</h4>
                                                    <div className="flex flex-col gap-1">
                                                        <h5 className="para-split uppercase">{role.name}</h5>
                                                        <p className="para-split text-white/60 text-sm md:text-base">{role.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkSection;
