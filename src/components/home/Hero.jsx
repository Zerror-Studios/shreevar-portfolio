"use client";
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Lanyard from './CardLanyard'
import gsap from 'gsap'

const totemData = {
  square: {
    enter: 30,
    pos: [[30, -279, 430], [31, -276.59, 424.88], [32, -266.84, 404.13], [33, -242.1, 351.54], [34, -193.83, 248.88], [35, -145.9, 146.96], [36, -112.88, 76.73], [37, -89.58, 27.2], [38, -72.23, -9.71], [39, -58.81, -38.24], [40, -48.21, -60.78], [41, -39.74, -78.81], [42, -32.93, -93.29], [43, -27.46, -104.91], [44, -23.11, -114.16], [45, -19.71, -121.4], [46, -17.11, -126.92], [47, -15.22, -130.94], [48, -13.95, -133.64], [49, -13.23, -135.18], [50, -13, -135.66], [51, -12.95, -135.18], [52, -12.8, -133.57], [53, -12.51, -130.51], [54, -12.03, -125.5], [55, -11.28, -117.7], [56, -10.11, -105.46], [57, -8.12, -84.73], [58, -4.16, -43.44], [59, -.59, -6.2], [60, 0, 0], [61, -.32, -.01], [62, -2.24, 0], [63, -4.37, .12], [64, -5.44, .22], [65, -6.06, .29], [66, -6.46, .34], [67, -6.72, .38], [68, -6.88, .4], [69, -6.96, .41], [70, -6.98, .42], [71, -6.9, .41], [72, -6.63, .37], [73, -6.15, .3], [74, -5.45, .22], [75, -4.53, .13], [76, -3.42, .05], [77, -2.21, 0], [78, -1.09, -.01], [79, -.29, -.01], [80, 0, 0], [81, 0, 0], [82, 0, 0], [83, 0, 0], [84, 0, 0], [85, 0, 0], [86, 0, 0]],
    rot: [[60, 0], [70, -10], [80, 0]]
  },
  diamond: {
    enter: 25,
    pos: [[25, 218.48, 322.78], [26, 216.54, 318.75], [27, 209.01, 302.56], [28, 190.66, 262.02], [29, 155.6, 183.35], [30, 120.4, 105.13], [31, 95.17, 50.86], [32, 76.39, 12.29], [33, 61.49, -16.67], [34, 49.15, -39.17], [35, 38.65, -56.99], [36, 29.58, -71.23], [37, 21.71, -82.63], [38, 14.88, -91.69], [39, 9.01, -98.8], [40, 4.06, -104.27], [41, -.01, -108.36], [42, -3.2, -111.27], [43, -5.5, -113.18], [44, -6.9, -114.23], [45, -7.37, -114.56], [46, -7.16, -114.18], [47, -6.63, -112.9], [48, -5.88, -110.45], [49, -4.99, -106.47], [50, -4.01, -100.35], [51, -2.98, -91.03], [52, -1.97, -76.25], [53, -1.09, -49.78], [54, -.46, -9.69], [55, 0, 0], [56, -.39, 0], [57, -1.07, .01], [58, -1.85, .03], [59, -2.67, .06], [60, -3.52, .1], [61, -4.35, .15], [62, -5.18, .21], [63, -5.95, .27], [64, -6.63, .34], [65, -7.02, .38], [66, -6.68, .34], [67, -6.08, .29], [68, -5.39, .22], [69, -4.66, .17], [70, -3.9, .12], [71, -3.13, .08], [72, -2.37, .04], [73, -1.63, .02], [74, -.94, .01], [75, -.34, 0], [76, 0, 0], [77, 0, 0], [78, 0, 0], [79, 0, 0], [80, 0, 0], [81, 0, 0], [82, 0, 0], [83, 0, 0], [84, 0, 0], [85, 0, 0], [86, 0, 0]],
    rot: [[25, 31], [45, -7.4], [55, 0], [65, -6.2], [76, 0]]
  },
  circle: {
    enter: 20,
    pos: [[20, -193.87, 233.19], [21, -192.12, 229.44], [22, -185.01, 214.26], [23, -167.01, 175.76], [24, -131.86, 100.63], [25, -96.96, 26.03], [26, -72.92, -25.37], [27, -55.96, -61.62], [28, -43.32, -88.63], [29, -33.56, -109.51], [30, -25.84, -126.01], [31, -19.67, -139.2], [32, -14.71, -149.8], [33, -10.73, -158.31], [34, -7.56, -165.07], [35, -5.09, -170.37], [36, -3.2, -174.41], [37, -1.82, -177.35], [38, -.89, -179.33], [39, -.37, -180.46], [40, -.2, -180.81], [41, -.2, -180.17], [42, -.2, -178.02], [43, -.19, -173.94], [44, -.19, -167.27], [45, -.17, -156.88], [46, -.16, -140.55], [47, -.13, -112.92], [48, -.06, -57.9], [49, -.01, -8.27], [50, 0, 0], [51, -.42, 0], [52, -1.55, .02], [53, -3.21, .08], [54, -5.23, .22], [55, -7.42, .45], [56, -9.6, .77], [57, -11.59, 1.13], [58, -13.22, 1.48], [59, -14.32, 1.74], [60, -14.73, 1.84], [61, -14.2, 1.71], [62, -12.75, 1.37], [63, -10.61, .94], [64, -7.99, .53], [65, -5.13, .21], [66, -2.25, .04], [67, .4, 0], [68, 2.59, .06], [69, 4.07, .15], [70, 4.61, .19], [71, 4.13, .15], [72, 2.99, .08], [73, 1.63, .03], [74, .48, 0], [75, 0, 0], [76, 0, 0], [77, 0, 0], [78, 0, 0], [79, 0, 0], [80, 0, 0], [81, 0, 0], [82, 0, 0], [83, 0, 0], [84, 0, 0], [85, 0, 0], [86, 0, 0]],
    rot: [[50, 0], [60, -14.5], [70, 4.5], [75, 0]]
  },
  triangle: {
    enter: 0,
    pos: [[0, 0, 175], [1, 0, 170.46], [2, 0, 159.39], [3, 0, 144.87], [4, 0, 128.96], [5, 0, 112.91], [6, 0, 97.44], [7, 0, 82.94], [8, 0, 69.61], [9, 0, 57.54], [10, 0, 46.73], [11, 0, 37.18], [12, 0, 28.85], [13, 0, 21.69], [14, 0, 15.65], [15, 0, 10.68], [16, 0, 6.71], [17, 0, 3.71], [18, 0, 1.62], [19, 0, .4], [20, 0, 0], [21, 0, 0], [22, 0, 0], [23, 0, 0], [24, 0, 0], [25, 0, 0], [26, 0, 0], [27, 0, 0], [28, 0, 0], [29, 0, 0], [30, 0, 0], [31, 0, 0], [32, 0, 0], [33, 0, 0], [34, 0, 0], [35, 0, 0], [36, 0, 0], [37, 0, 0], [38, 0, 0], [39, 0, 0], [40, 0, 0], [41, 0, 0], [42, 0, 0], [43, 0, 0], [44, 0, 0], [45, 0, 0], [46, 0, 0], [47, 0, 0], [48, 0, 0], [49, 0, 0], [50, 0, 0], [51, 0, 0], [52, 0, 0], [53, 0, 0], [54, 0, 0], [55, 0, 0], [56, 0, 0], [57, 0, 0], [58, 0, 0], [59, 0, 0], [60, 0, 0], [61, 0, 0], [62, 0, 0], [63, 0, 0], [64, 0, 0], [65, 0, 0], [66, 0, 0], [67, 0, 0], [68, 0, 0], [69, 0, 0], [70, 0, 0], [71, 0, 0], [72, 0, 0], [73, 0, 0], [74, 0, 0], [75, 0, 0], [76, 0, 0], [77, 0, 0], [78, 0, 0], [79, 0, 0], [80, 0, 0], [81, 0, 0], [82, 0, 0], [83, 0, 0], [84, 0, 0], [85, 0, 0], [86, 0, 0]],
    rot: null
  }
};

const Hero = () => {
  const [showLanyard, setShowLanyard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    // Block scrolling while intro plays
    document.body.style.overflow = 'hidden';
    if (window.lenis) {
      window.lenis.stop();
    }
    // Backup check in case lenis initializes slightly after mount
    const lenisTimer = setTimeout(() => {
      if (window.lenis) window.lenis.stop();
    }, 100);

    const timer = setTimeout(() => {
      setShowLanyard(true);
    }, 0);

    let ctx = gsap.context(() => {
      const shapes = gsap.utils.toArray('.hero-totem-shape');

      const tl = gsap.timeline({ 
        delay: 2,
        onComplete: () => {
          // Re-enable scrolling
          document.body.style.overflow = '';
          if (window.lenis) {
            window.lenis.start();
          }
          // Notify other components that intro is finished
          document.body.classList.add("intro-finished");
          window.dispatchEvent(new Event("intro-finished"));
        }
      });

      tl.to(".ani_bot_her", {
        transform: "translateY(0)",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });

      // Phase 1 & 2: Totem shapes animation using provided keyframes
      tl.addLabel("totemStart", 0);

      shapes.forEach((shape) => {
        const type = shape.getAttribute('data-totem-shape');
        const data = totemData[type];
        if (!data) return;

        const startFrame = data.enter;
        const totalDur = (data.pos.length / 86) * 3; // Normalize against max frame (86) and 3s duration

        // Set initial state
        gsap.set(shape, {
          x: data.pos[0][1],
          y: data.pos[0][2],
          rotation: data.rot ? data.rot[0][1] : 0,
          opacity: 0
        });

        const shapeStartTime = `totemStart+=${(startFrame / 86) * 3}`;

        // Fade in
        tl.to(shape, { opacity: 1, duration: 0.4 }, shapeStartTime);

        // Position animation
        const posKeyframes = data.pos.map(p => ({
          x: p[1],
          y: p[2]
        }));

        tl.to(shape, {
          keyframes: posKeyframes,
          duration: totalDur,
          ease: "none"
        }, shapeStartTime);

        // Rotation animation
        if (data.rot) {
          data.rot.forEach((r, i) => {
            if (i === 0) return;
            const prevFrame = data.rot[i - 1][0];
            const frame = r[0];
            const val = r[1];
            const dur = ((frame - prevFrame) / 86) * 3;

            tl.to(shape, {
              rotation: val,
              duration: dur,
              ease: "power1.inOut"
            }, `totemStart+=${(prevFrame / 86) * 3}`);
          });
        }
      });
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      clearTimeout(lenisTimer);
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className="w-full h-screen relative bg-white">

        <div className="w-full md:flex  pt-12 text-lg leading-tight absolute! top-0 items-center justify-between container">
          <h1 data-para-effect data-delay="2" className='md:w-60 text-lg! font-normal! leading-tight'>I build growth, partnerships & what comes next.</h1>
        </div>
        <div className="w-full md:flex  pb-12 text-lg leading-tight absolute! bottom-0 items-center justify-between container">
          <div className="space-y-1">
            <div className=" block overflow-hidden">
              <div className=' translate-y-full ani_bot_her flex items-center leading-none gap-x-1' > <img className=' flag_1 w-4.5' src="/icons/india_flag.svg" alt="" /> <p >Mumbai, India</p></div>
            </div>
            <div className=" block overflow-hidden">
              <div className=' translate-y-full ani_bot_her flex items-center leading-none gap-x-1' > <img className=' flag_1 w-4.5' src="/icons/spain_flag.webp" alt="" /> <p >Madrid, Spain</p></div>
            </div>
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