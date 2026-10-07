"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useScroll } from '@/context/ScrollContext';

gsap.registerPlugin(ScrollTrigger);

const WorkSection = () => {
    const { workRef } = useScroll();
    const wrapperRef = useRef(null);
    const sectionsRef = useRef([]);

    const experiences = [
        {
            id: 1,
            zIndex:40,
            year: "2025—26",
            title: "BUILDING THE\nBUSINESS SIDE OF THE\nSTUDIO.",
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
            zIndex:30,
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
            zIndex:20,
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
            zIndex:10,
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

    useEffect(() => {
        if (!wrapperRef.current) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1, // Smooth scrub
                }
            });

            // Animate each section's clip-path from bottom up
            // except the last one (zIndex: 10, index: 3) which stays static at the bottom
            sectionsRef.current.forEach((section, index) => {
                if (index < experiences.length - 1) {
                    tl.to(section, {
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                        ease: "none"
                    });
                }
            });
        }, wrapperRef);

        return () => ctx.revert();
    }, [experiences.length]);

    return (
        <div ref={workRef}>
            {/* Intro Screen */}
            <section className="w-full h-screen bg-black text-white flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <h2 data-para-effect className="uppercase text-center">
                        WHERE I'VE WORKED?
                    </h2>
                    
                    {/* Geometric Shapes */}
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="w-8 h-8 rounded-full border-2 border-white"></div>
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-white"></div>
                        <div className="w-8 h-8 border-2 border-white"></div>
                    </div>
                </div>
            </section>

            {/* Experience Screens Pinned Wrapper */}
            <div ref={wrapperRef} className="relative w-full h-[400vh]">
                
                {/* Sticky Container */}
                <div className="sticky top-0 w-full h-screen bg-black overflow-hidden">
                    {experiences.map((exp, index) => (
                        <section 
                            key={exp.id} 
                            ref={(el) => (sectionsRef.current[index] = el)}
                            className="absolute inset-0 w-full  h-full py-12 bg-black  text-white flex items-center"
                            style={{ 
                                zIndex: exp.zIndex,
                                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                            }}
                        >
                            <div className="container grid grid-cols-1 md:grid-cols-2">
                                
                                {/* Left: Image Column */}
                                <div data-img-effect className="w-full h-full relative bg-zinc-900 flex items-center justify-center overflow-hidden">
                                    <Image 
                                        fill 
                                        src={exp.image} 
                                        alt={`Work at ${exp.id}`} 
                                        className="object-cover opacity-80" 
                                    />
                                </div>

                                {/* Right: Content Column */}
                                <div className="flex flex-col justify-center md:pl-8 h-full">
                                    
                                    {/* Top Info */}
                                    <div className="flex justify-between items-start mb-12 md:mb-16">
                                        <h2 className=" leading-none">{exp.id}</h2>
                                        <span className="text-white/60 text-sm md:text-base pt-2">{exp.year}</span>
                                    </div>

                                    {/* Heading */}
                                    <h2 data-para-effect className="uppercase  mb-12 md:mb-16">
                                        {exp.title.split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}<br/>
                                            </React.Fragment>
                                        ))}
                                    </h2>

                                    {/* Roles List */}
                                    <div className="flex flex-col">
                                        {exp.roles.map((role, idx) => (
                                            <div key={idx} className={`flex gap-8 py-6 ${idx !== 0 ? 'border-t border-white/10' : ''}`}>
                                                <h4 className="text-white/80 leading-none  w-6">{role.num}</h4>
                                                <div className="flex flex-col gap-1">
                                                    <h5 className="uppercase ">{role.name}</h5>
                                                    <p className="text-white/60 text-sm md:text-base max-w-[90%]">{role.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkSection;
