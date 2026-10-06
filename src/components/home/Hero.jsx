import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <>
      <div className="w-full h-screen relative">
        <Image fill className=' cover grayscale-100' src={"/images/homepage/hero_bg.png"} alt='hero img' />
      </div>

      <section className="w-full h-screen bg-black text-white relative flex flex-col justify-center items-center overflow-hidden">

        {/* Main Text Content */}
        <div className="flex flex-col items-center justify-center z-10 px-6">
          <h1 data-para-effect className="text-center uppercase">
            SHREEVAR<br />JHUNJHUNWALA
          </h1>
          <p data-para-effect className="mt-8 text-lg text-white/80 text-center ">
            Building, learning, and expanding —<br />
            across business, products and new markets.
          </p>
        </div>

      </section>
    </>
  )
}

export default Hero