"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

const OutsideWork = () => {
    const hobbies = [
        {
            title: "CARS / GO-KARTING",
            desc1: "Speed, focus, and a little adrenaline.",
            desc2: "A love for cars and the thrill of getting behind the wheel.",
            image: "/images/homepage/outsidework/carting.svg" // Replace with actual image paths
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

    return (
        <section className="w-full bg-black text-white py overflow-hidden">
            <div className=" flex flex-col gapy">
                
                {/* Header */}
                <div className=" container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                    <div>
                        <h2 data-para-effect className="uppercase">
                            OUTSIDE WORK
                        </h2>
                    </div>
                    <div className=" flex items-start">
                        <p className="text-white/80 max-w-50">
                            When I'm not building partnerships, I'm usually looking for a different kind of rush.
                        </p>
                    </div>
                </div>

                {/* Horizontal Scroller via Swiper */}
                <div className="relative w-full ">
                    <Swiper
                        spaceBetween={16} // gap-4 equivalent
                        slidesPerView="auto"
                        grabCursor={true}
                        speed={800}
                        className="w-full"
                    >
                        {hobbies.map((hobby, index) => (
                            <SwiperSlide 
                                key={index} 
                                className="!w-[85vw] first:ml-[3rem] last:mr-[3rem] md:!w-[35vw]"
                            >
                                <div className="flex flex-col gap-6 select-none">
                                    {/* Image Placeholder */}
                                    <div data-img-effect className="w-full aspect-square bg-white/10 relative overflow-hidden pointer-events-none">
                                      <Image fill src={hobby.image} className='cover' alt="hobby image" />
                                    </div>
                                    
                                    {/* Text Content */}
                                    <div className="flex flex-col gap-2">
                                        <h5 className="uppercase pointer-events-none">{hobby.title}</h5>
                                        <div className="flex flex-col pointer-events-none">
                                            <p className="text-white/80 font-medium">{hobby.desc1}</p>
                                            <p className="text-white/50 text-sm">{hobby.desc2}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </section>
    );
};

export default OutsideWork;
