"use client";
import React from 'react';
import { useScroll } from '@/context/ScrollContext';

const WhatIDo = () => {
    const { expertiseRef } = useScroll();

    return (
        <section ref={expertiseRef} className="w-full relative bg-black text-white py">
            <div className="container flex flex-col gapy">

                {/* Top Header Grid */}
                <div className="grid grid-cols-7">
                    <div className='col-span-5'>
                        <h2 data-para-effect>WHAT I DO</h2>
                    </div>
                    <div className="col-span-2">
                        <p className="text-white/80 text-lg leading-tight">
                            I build the connection between an idea and what comes next.
                        </p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
                    
                    <div className="hidden md:block"></div>

                    {/* Item 1: Growth */}
                    <div className="bg-white text-black  aspect-square p-6 md:p-8 flex flex-col justify-between ">
                        <div className="w-full flex-1 center relative mb-8">
                            <img  src="/icons/semicircle.svg" alt="Growth" className="w-[50%]" />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium mb-2">Growth</h3>
                            <p className="text-black/80 leading-tight">Finding where the next opportunity can come from.</p>
                        </div>
                    </div>

                    {/* Item 2: Partnerships */}
                    <div className="bg-white text-black  aspect-square p-6 md:p-8 flex flex-col justify-between ">
                        <div className="w-full flex-1 center relative mb-8">
                            <img  src="/icons/square.svg" alt="Partnerships" className="w-[50%]" />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium mb-2">Partnerships</h3>
                            <p className="text-black/80 leading-tight">Bringing the right people, brands and businesses together.</p>
                        </div>
                    </div>

                    {/* Item 3: New Ventures */}
                    <div className="bg-white text-black  aspect-square p-6 md:p-8 flex flex-col justify-between ">
                        <div className="w-full flex-1 center relative mb-8">
                            <img  src="/icons/circle.svg" alt="New Ventures" className="w-[50%]" />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium mb-2">New Ventures</h3>
                            <p className="text-black/80 leading-tight">Taking an idea beyond the conversation.</p>
                        </div>
                    </div>

                    {/* Item 4: Execution */}
                    <div className="bg-white text-black  aspect-square p-6 md:p-8 flex flex-col justify-between ">
                        <div className="w-full flex-1 center relative mb-8">
                            <img  src="/icons/triangle.svg" alt="Execution" className="w-[50%]" />
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
