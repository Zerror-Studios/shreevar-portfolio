import React from 'react';

const CurrentChapter = () => {
    return (
        <section className="w-full relative bg-white py">
            <div className="container flex flex-col gapy">

                {/* Top Header Grid */}
                <div className="grid grid-cols-2">
                    <div>
                        <h2 data-para-effect>
                            THE CURRENT <br /> CHAPTER
                        </h2>
                    </div>
                    <div className="">
                        <p className="text-black/80 max-w-50">
                            Building, learning, and 
                            expanding — across 
                            business, products and 
                            new markets.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3">

                    {/* Card 01 */}
                    <div data-img-effect className="bg-black text-white p-6 flex flex-col justify-between aspect-4/3  md:col-start-1 md:row-start-1">
                        <div className="bg-white text-black w-14 h-14 md:w-18 md:h-18 flex items-center justify-center">
                            <h3>01</h3>
                        </div>
                        <div className="mt-12">
                            <h5  className="uppercase mb-6">BUSINESS HEAD • ZERROR STUDIOS</h5>
                            <p className="text-white/80">
                                Leading business development, building strategic connections, managing clients, and helping grow the studio.
                            </p>
                        </div>
                    </div>

                    {/* Card 02 */}
                    <div data-img-effect className="bg-black text-white p-6 flex flex-col justify-between aspect-4/3 md:col-start-2 md:row-start-2">
                        <div className="bg-white text-black w-14 h-14 md:w-18 md:h-18 flex items-center justify-center">
                            <h3>02</h3>
                        </div>
                        <div className="mt-12">
                            <h5  className="uppercase mb-4">INTERNATIONAL MBA • IE BUSINESS SCHOOL</h5>
                            <p className="text-white/80">
                                Currently pursuing an International MBA in Madrid, expanding his perspective on strategy, entrepreneurship and global business.
                            </p>
                        </div>
                    </div>

                    {/* Card 03 */}
                    <div data-img-effect className="bg-black text-white p-6 flex flex-col justify-between aspect-4/3 md:col-start-3 md:row-start-1">
                        <div className="bg-white text-black w-14 h-14 md:w-18 md:h-18 flex items-center justify-center">
                            <h3>03</h3>
                        </div>
                        <div className="mt-12">
                            <h5  className="uppercase mb-4">BUILDING ZCOM</h5>
                            <p className="text-white/80">
                                A subscription-based e-commerce venture by Zerror Studios. Helping shape the product, drive its marketing and bring new businesses onto the platform.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CurrentChapter;