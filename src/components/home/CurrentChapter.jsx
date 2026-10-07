"use client";
import React from 'react';
import { useScroll } from '@/context/ScrollContext';

const CurrentChapter = () => {
    const { focusRef } = useScroll();

    return (
        <section ref={focusRef} className="w-full relative bg-white py">
            <div className="container flex flex-col gapy">

                {/* Top Header Grid */}
                <div className="grid grid-cols-7">
                    <div className='col-span-5'>
                        <h2 data-para-effect>
                            THE CURRENT <br /> CHAPTER
                        </h2>
                    </div>
                    <div className="col-span-2">
                        <p className="text-black/80 text-lg leading-tight ">
                            Building, learning, and expanding — across business, products and new markets.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                    {/* Card 01 */}
                    <div data-img-effect className="bg-black text-white p-6 md:p-10 flex flex-col justify-between aspect-[4/3]">
                        <div className="bg-white text-black w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                            <h3 className="text-xl md:text-2xl font-medium">01</h3>
                        </div>
                        <div className="mt-12">
                            <h3 className="uppercase mb-4 text-xl font-medium">BUILDING ZCOM</h3>
                            <p className="text-white/80">
                                A subscription-based e-commerce venture by Zerror Studios. Helping shape the product, drive its marketing and bring new businesses onto the platform.
                            </p>
                        </div>
                    </div>

                    {/* Card 02 */}
                    <div data-img-effect className="bg-black text-white p-6 md:p-10 flex flex-col justify-between aspect-[4/3]">
                        <div className="bg-white text-black w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                            <h3 className="text-xl md:text-2xl font-medium">02</h3>
                        </div>
                        <div className="mt-12">
                            <h3 className="uppercase mb-4 text-xl font-medium">INTERNATIONAL MBA • <br />IE BUSINESS SCHOOL</h3>
                            <p className="text-white/80">
                                Currently pursuing an International MBA in Madrid, expanding his perspective on strategy, entrepreneurship and global business.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CurrentChapter;