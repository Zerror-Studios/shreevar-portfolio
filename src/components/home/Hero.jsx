import Image from 'next/image'
import React from 'react'
import Lanyard from './CardLanyard'

const Hero = () => {
  return (
    <>
      <div className="w-full h-screen relative">

        <div className="w-full flex pt-12 text-lg leading-tight absolute! top-0 items-center justify-between container">
          <p>I build growth, partnerships & <br /> what comes next.</p>
          <div className="flex items-center gap-x-1">
            <div className="size-1.5 aspect-square bg-black"></div>
            <p>Madrid - Mumbai - Building Globally</p>
          </div>
        </div>
        <Lanyard
          position={[0, 0, 12]}
          gravity={[0, -30, 0]}
          frontImage="/images/homepage/card_front.svg"
          backImage="/images/homepage/card_back.svg"
          imageFit="cover"
          lanyardImage="/icons/lanyard.png"
          lanyardWidth={0.5}
        />
      </div>
    </>
  )
}

export default Hero