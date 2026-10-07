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
                    <h2 data-para-effect className="uppercase">
                        I’m Shreevar, Building at the <br className="hidden md:block"/>
                        intersection of Strategy, <br className="hidden md:block"/>
                        Culture & Technology.
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    
                    {/* Column 1: Title and Shapes */}
                    <div className="flex flex-col justify-between">
                        <h2 data-para-effect className="">ABOUT</h2>
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