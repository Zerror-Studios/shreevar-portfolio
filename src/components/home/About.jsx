import Image from 'next/image';
import React from 'react';

const About = () => {
    return (
        <section className="w-full relative bg-black text-white py">
            <div className="container flex flex-col gapy">

                {/* Top Header Grid */}
                <div className="grid grid-cols-2">
                    <div>
                        <h2 data-para-effect>ABOUT</h2>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                    {/* Image Column */}
                    <div data-img-effect className="w-full aspect-[4/5] relative bg-zinc-900">
                        <Image
                            fill
                            src="/images/homepage/about_pic.svg"
                            alt="About"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Text Columns */}
                    <div className="md:col-span-2 flex flex-col justify-between py-4 md:py-0">

                        {/* Paragraphs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div>
                                <p className="text-white/80 text-xl">
                                    My career sits at the intersection of strategy, creativity and execution - from global music properties and brand partnerships to emerging technology and new service models.
                                </p>
                            </div>
                            <div>
                                <p className="text-white/80 text-xl">
                                    Now based in Madrid, I am pursuing my International MBA at IE Business School while building Zcom and exploring how AI can translate business data into decisions founders can act on.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Heading */}
                        <div className="mt-16 md:mt-0">
                            <h2 data-para-effect>
                                HAVE AN IDEA? <br />
                                LET'S FIGURE OUT <br />
                                WHAT IT COULD BECOME.
                            </h2>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;