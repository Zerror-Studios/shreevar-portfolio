"use client";
import Image from 'next/image';
import React from 'react';
import { useScroll } from '@/context/ScrollContext';

const About = () => {
    const { aboutRef } = useScroll();

    return (
        <section ref={aboutRef} className="w-full relative bg-black text-white py">
            <div className="container flex flex-col gapy">
                
                {/* Top Header */}
                <div className="w-full md:w-[95%] lg:w-[90%] mb-4 md:mb-8">
                    <h2 data-para-effect className="uppercase md:w-3xl">
                        I’m Shreevar, Building at the 
                        intersection of Strategy, 
                        Culture & Technology.
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    
                    {/* Column 1: Title and Shapes */}
                    <div className="flex flex-col justify-between">
                        <h2 data-para-effect className="">ABOUT</h2>
                        
                        {/* Stacked Shapes for Animation */}
                        <div className="about-totem-stack relative flex flex-col items-center mt-12 w-fit z-50 text-white">
                            <div className="about-totem-shape w-24" data-totem-shape="diamond">
                                <svg className="equilibre-shape equilibre-shape--diamond w-full h-auto" viewBox="0 0 284 284" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M142.929 283.538L0.928784 143.165L141.071 0.93052L283.071 141.304L142.929 283.538ZM142.506 219.214L218.853 141.728L141.494 65.2544L65.1467 142.741L142.506 219.214Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <div className="about-totem-shape w-24 -mt-4" data-totem-shape="circle">
                                <svg className="equilibre-shape equilibre-shape--circle w-full h-auto" viewBox="0 0 263 263" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M131.711 262.605C59.5562 263.081 0.475781 204.677 0.000781 132.403C-0.474219 60.1299 57.8334 0.952 129.988 0.476C202.143 0 261.223 58.404 261.698 130.678C262.173 202.951 203.866 262.129 131.711 262.605ZM131.417 217.882C178.949 217.569 217.362 178.582 217.049 130.972C216.736 83.362 177.814 44.885 130.282 45.199C82.7503 45.512 44.3369 84.499 44.6499 132.109C44.9629 179.719 83.8853 218.196 131.417 217.882Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <div className="about-totem-shape w-24 -mt-4" data-totem-shape="triangle">
                                <svg className="equilibre-shape equilibre-shape--triangle w-full h-auto" viewBox="0 0 132 67" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M132.07 66.144L66.035 0L0 66.144H132.07Z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Image */}
                    <div data-img-effect className="w-full aspect-square relative bg-zinc-900">
                        <Image
                            fill
                            src="/images/homepage/about_pic.svg"
                            alt="Shreevar"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Column 3: Text */}
                    <div className="flex flex-col">
                        <p className="text-white/80 text-xl">
                            My career sits at the intersection of strategy, creativity and execution - from global music properties and brand partnerships to emerging technology and new service models. Now based in Madrid, I am pursuing my International MBA at IE Business School while building Zcom and exploring how AI can translate business data into decisions founders can act on.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default About;