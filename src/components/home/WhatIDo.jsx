import Image from 'next/image';
import React from 'react';

const WhatIDo = () => {
    return (
        <section className="w-full relative bg-black text-white py">
            <div className="container flex flex-col gapy">

                {/* Top Header Grid */}
                <div className="grid grid-cols-2">
                    <div>
                        <h2 data-para-effect>WHAT I DO</h2>
                    </div>
                    <div className="">
                        <p className="text-white/80 ml-2 max-w-50">
                            I build the connection <br className="hidden md:block" />
                            between an idea and <br className="hidden md:block" />
                            what comes next.
                        </p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    
                    {/* Item 1: Growth */}
                    <div className="flex flex-col gap-4">
                        <div data-img-effect className="w-full aspect-[4/5] relative bg-zinc-900">
                            <Image fill src="/images/homepage/what_i_do/growth.svg" alt="Growth" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h5 className="mb-2">Growth</h5>
                            <p className="text-white/80">Finding where the next opportunity can come from.</p>
                        </div>
                    </div>

                    {/* Item 2: Partnerships */}
                    <div className="flex flex-col gap-4">
                        <div data-img-effect className="w-full aspect-square relative bg-zinc-900">
                            <Image fill src="/images/homepage/what_i_do/partnership.svg" alt="Partnerships" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h5 className="mb-2">Partnerships</h5>
                            <p className="text-white/80">Bringing the right people, brands and businesses together.</p>
                        </div>
                    </div>

                    {/* Item 3: New Ventures */}
                    <div className="flex flex-col gap-4">
                        <div data-img-effect className="w-full aspect-[4/5] relative bg-zinc-900">
                            <Image fill src="/images/homepage/what_i_do/new_venture.svg" alt="New Ventures" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h5 className="mb-2">New Ventures</h5>
                            <p className="text-white/80">Taking an idea beyond the conversation.</p>
                        </div>
                    </div>

                    {/* Item 4: Execution */}
                    <div className="flex flex-col gap-4">
                        <div data-img-effect className="w-full aspect-square relative bg-zinc-900">
                            <Image fill src="/images/homepage/what_i_do/execution.svg" alt="Execution" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h5 className="mb-2">Execution</h5>
                            <p className="text-white/80">Turning strategy into something teams can actually act on.</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default WhatIDo;
