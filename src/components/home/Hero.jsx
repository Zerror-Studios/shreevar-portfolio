"use client";
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Lanyard from './CardLanyard'
import gsap from 'gsap'

const Hero = () => {
  const [showLanyard, setShowLanyard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setShowLanyard(true);
    }, 4000);

    let ctx = gsap.context(() => {
      const shapes = gsap.utils.toArray('.hero-totem-shape');

      // Initial state: scattered and hidden on the "floor"
      gsap.set(shapes, {
        opacity: 0,
        x: () => gsap.utils.random(-150, 50),
        y: (index) => (3 - index) * 110, // Drops upper shapes down so they rest on the same level
        rotation: () => gsap.utils.random(-90, 90),
      });

      const tl = gsap.timeline({ delay: 4 });

      // Phase 1: Appear one by one scattered on the floor
      tl.to(shapes, {
        opacity: 1,
        duration: 0.4,
        stagger: 0.15,
        ease: "power2.out"
      })
        // Phase 2: Assemble into their vertical stack after 0.5s delay
        .to(shapes, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.2)"
        }, "+=0.5");
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className="w-full h-screen relative bg-white">

        <div className="w-full md:flex  pt-12 text-lg leading-tight absolute! top-0 items-center justify-between container">
          <p data-para-effect data-delay="4" className='md:w-60'>I build growth, partnerships & what comes next.</p>
          <div className="flex items-center gap-x-1">
            <div className="size-1.5 aspect-square bg-black" data-para-effect data-delay="4"></div>
            <p data-para-effect data-delay="4">Madrid - Mumbai - Building Globally</p>
          </div>
        </div>

        

        {showLanyard && (
          <Lanyard
            position={isMobile ? [0, 0, 16] : [0, 0, 12]}
            gravity={[0, -30, 0]}
            frontImage="/images/homepage/card_front.svg"
            backImage="/images/homepage/card_back.svg"
            imageFit="cover"
            lanyardImage="/images/black.png"
            lanyardWidth={0.5}
          />
        )}

        {/* Stacked icons placeholders for GSAP Flip */}
        <div className="absolute bottom-0 right-0 padding flex flex-col z-[100] block-1-3-quote__totem mix-blend-difference text-white" data-anim="totem">
          <div className="hero-totem-shape w-32" data-totem-shape="square">
            <svg className="equilibre-shape equilibre-shape--square w-full h-auto" viewBox="0 0 132 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="132" height="110" fill="white"></rect>
            </svg>
          </div>
          <div className="hero-totem-shape w-32" data-totem-shape="diamond">
            <svg className="equilibre-shape equilibre-shape--diamond w-full h-auto" viewBox="0 0 284 284" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M142.929 283.538L0.928784 143.165L141.071 0.93052L283.071 141.304L142.929 283.538Z" fill="white"></path>
              <path d="M142.506 219.214L218.853 141.728L141.494 65.2544L65.1467 142.741L142.506 219.214Z" fill="white"></path>
            </svg>
          </div>
          <div className="hero-totem-shape w-32" data-totem-shape="circle">
            <svg className="equilibre-shape equilibre-shape--circle w-full h-auto" viewBox="0 0 263 263" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M131.711 262.605C59.5562 263.081 0.475781 204.677 0.000781 132.403C-0.474219 60.1299 57.8334 0.952 129.988 0.476C202.143 0 261.223 58.404 261.698 130.678C262.173 202.951 203.866 262.129 131.711 262.605Z" fill="white"></path>
              <path d="M131.417 217.882C178.949 217.569 217.362 178.582 217.049 130.972C216.736 83.362 177.814 44.885 130.282 45.199C82.7503 45.512 44.3369 84.499 44.6499 132.109C44.9629 179.719 83.8853 218.196 131.417 217.882Z" fill="white"></path>
            </svg>
          </div>
          <div className="hero-totem-shape w-32" data-totem-shape="triangle">
            <svg className="equilibre-shape equilibre-shape--triangle w-full h-auto" viewBox="0 0 132 67" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M132.07 66.144L66.035 0L0 66.144H132.07Z" fill="white"></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero