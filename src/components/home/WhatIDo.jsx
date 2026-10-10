"use client";
import React, { useRef } from 'react';
import { useScroll } from '@/context/ScrollContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Flip);
}

const WhatIDo = () => {
    const { expertiseRef } = useScroll();
    const iconsRef = useRef([]);

    useGSAP(() => {
        const heroShapes = document.querySelectorAll('.hero-totem-shape');
        const targets = document.querySelectorAll('.what-i-do-target');

        if (!heroShapes.length || !targets.length) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                endTrigger: expertiseRef.current,
                end: "center center",
                scrub: 1,
            }
        });

        heroShapes.forEach((shape, i) => {
            if (!shape || !targets[i]) return;

            const shapeRect = shape.getBoundingClientRect();
            const targetRect = targets[i].getBoundingClientRect();

            const shapeCenterX = shapeRect.left + shapeRect.width / 2;
            const shapeCenterY = shapeRect.top + shapeRect.height / 2;

            const targetCenterX = targetRect.left + targetRect.width / 2;
            const targetCenterY = targetRect.top + targetRect.height / 2;

            const deltaX = targetCenterX - shapeCenterX;
            const deltaY = targetCenterY - shapeCenterY;

            tl.to(shape, {
                x: deltaX,
                y: deltaY,
                rotation: 360,
                duration: 1,
                ease: "power1.inOut"
            }, 0);
        });
    }, { dependencies: [] });

    return (
        <section ref={expertiseRef} className="w-full relative bg-black text-white py">
            <div className="container flex flex-col gapy">

                {/* Top Header Grid */}
                <div className=" max-sm:space-y-3 md:grid grid-cols-7">
                    <div className='col-span-5'>
                        <h2 data-para-effect>WHAT I DO</h2>
                    </div>
                    <div className="col-span-2">
                        <p data-para-effect className="text-white/80 text-lg leading-tight">
                            I build the connection between an idea and what comes next.
                        </p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                    <div className="hidden md:block"></div>

                    {/* Item 1: Growth */}
                    <div className="bg-white text-black  aspect-4/3 md:aspect-square p-6 md:p-8 flex flex-col justify-between ">
                        <div className="w-full flex-1 center relative mb-8 what-i-do-target h-32">
                            {/* Target for Growth Shape */}
                        </div>
                        <div>
                            <h3 className="text-xl font-medium mb-2">Growth</h3>
                            <p className="text-black/80 leading-tight">Finding where the next opportunity can come from.</p>
                        </div>
                    </div>

                    {/* Item 2: Partnerships */}
                    <div className="bg-white text-black  aspect-4/3 md:aspect-square p-6 md:p-8 flex flex-col justify-between ">
                        <div className="w-full flex-1 center relative mb-8 what-i-do-target h-32">
                            {/* Target for Partnerships Shape */}
                        </div>
                        <div>
                            <h3 className="text-xl font-medium mb-2">Partnerships</h3>
                            <p className="text-black/80 leading-tight">Bringing the right people, brands and businesses together.</p>
                        </div>
                    </div>

                    {/* Item 3: New Ventures */}
                    <div className="bg-white text-black  aspect-4/3 md:aspect-square p-6 md:p-8 flex flex-col justify-between ">
                        <div className="w-full flex-1 center relative mb-8 what-i-do-target h-32">
                            {/* Target for New Ventures Shape */}
                        </div>
                        <div>
                            <h3 className="text-xl font-medium mb-2">New Ventures</h3>
                            <p className="text-black/80 leading-tight">Taking an idea beyond the conversation.</p>
                        </div>
                    </div>

                    {/* Item 4: Execution */}
                    <div className="bg-white text-black  aspect-4/3 md:aspect-square p-6 md:p-8 flex flex-col justify-between ">
                        <div className="w-full flex-1 center relative mb-8 what-i-do-target h-32">
                            {/* Target for Execution Shape */}
                        </div>
                        <div>
                            <h3 className="text-xl font-medium mb-2">Execution</h3>
                            <p className="text-black/80 leading-tight">Turning strategy into something teams can actually act on.</p>
                        </div>
                    </div>

                    <div className="hidden md:block"></div>

                </div>

            </div>
        </section>
    );
};

export default WhatIDo;
