"use client";
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useScroll } from '@/context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const totemData = {
    diamond: {
        pos: [[0, 513.7, 288.3], [1, 513.7, 288.3], [2, 507.3, 284], [3, 490.1, 275.1], [4, 465.8, 267.1], [5, 440.1, 263.6], [6, 420.1, 264.2], [7, 412.2, 265.2], [8, 384.4, 220.7], [9, 392.7, 179.2], [10, 402.6, 111.7], [11, 391.5, 34.2], [12, 367.7, -33.2], [13, 341.1, -81.5], [14, 326.9, -97.3], [15, 316.8, -92.4], [16, 302.2, -66.9], [17, 289.8, -32.5], [18, 279.3, -.2], [19, 265.6, -.4], [20, 250.5, -.1], [21, 237.3, 2.2], [22, 226.1, 4.2], [23, 221, 6.2], [24, 218.9, 6.7], [25, 220.8, 6.3], [26, 222.7, 5.9], [27, 226.9, 6.8], [28, 235.9, 3.8], [29, 246.2, 2.1], [30, 260, .9], [31, 276.3, -1], [32, 289.2, -1], [33, 299.9, -1], [34, 305.2, -.1], [35, 305.4, .5], [36, 299.8, 1.4], [37, 292.4, 1.7], [38, 284.8, 1.9], [39, 273.2, 1.8], [40, 253.8, 1.8], [41, 226.4, 1.9], [42, 189, 2], [43, 150, 2.2], [44, 113.6, 2], [45, 87, 1.7], [46, 69, 1.6], [47, 55.8, 1.3], [48, 42.5, .9], [49, 35.4, .7], [50, 22.1, .3], [51, 14.9, 0], [52, 12.4, 0], [53, 7.6, 0], [54, 5.1, 0], [55, 3, 0], [56, .6, 0], [57, 0, 0]],
        rot: [[1, 224], [7, 167.8], [8, 128], [9, 112.8], [10, 90.4], [11, 66.1], [12, 47.3], [13, 30.4], [14, 24.5], [15, 19.5], [16, 10.9], [17, 4.4], [18, -1.8], [19, -4.7], [20, -10.2], [21, -14.5], [22, -18.2], [23, -20], [24, -21], [26, -19.7], [27, -17.8], [28, -15.1], [29, -12.2], [30, -8.2], [31, -3.2], [32, 2.1], [33, 6.1], [34, 8.7], [35, 9.9], [36, 10.8], [39, 11.03], [44, 7.34], [46, 4.6], [48, 3.6], [51, 0]]
    },
    circle: {
        pos: [[1, 7.7, 53], [9, 185, 53], [13, 239, -87], [17, 284, 1], [18, 284, 1], [23, 271, 1], [25, 271, 1], [32, 281, 1], [34, 281, 1], [37, 264.5, .93], [38, 255.63, .88], [39, 242.45, .82], [40, 224.44, .76], [41, 200.23, .68], [42, 163.66, .6], [43, 124.97, .51], [44, 93.64, .42], [45, 71.8, .33], [48, 30.28, .13], [49, 22.05, .09], [50, 15.7, .05], [51, 10.87, .03], [52, 7.28, .02], [54, 2, 0], [57, 0, 0]],
        rot: null
    },
    triangle: {
        pos: [[1, 280, -0], [31, 280, -0], [32, 279, -0], [33, 278, -0], [34, 275, -0], [35, 270, -0], [36, 264, -0], [37, 257, -0], [38, 247, -0], [39, 235, -0], [40, 215, -0], [41, 191, -0], [42, 154, -0], [43, 116, -0], [44, 86, -0], [45, 65, -0], [46, 49, -0], [47, 36, -0], [48, 26, -0], [49, 18, -0], [50, 14, -0], [51, 9, -0], [52, 5, -0], [53, 3, -0], [54, -0, -0]],
        rot: null
    }
};

const About = () => {
    const { aboutRef } = useScroll();

    useEffect(() => {
        let ctx = gsap.context(() => {
            const shapes = gsap.utils.toArray('.about-totem-shape');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-totem-stack',
                    start: "top 80%", // Adjust start point as needed
                    toggleActions: "play none none reverse",
                }
            });

            tl.addLabel("totemStart", 0);

            const maxFrame = 57;
            const animationDur = 2; // 2 seconds

            shapes.forEach((shape) => {
                const type = shape.getAttribute('data-totem-shape');
                const data = totemData[type];
                if (!data) return;

                // Set initial state
                gsap.set(shape, {
                    x: data.pos[0][1],
                    y: data.pos[0][2],
                    rotation: data.rot ? data.rot[0][1] : 0,
                });

                // Position animation
                data.pos.forEach((p, i) => {
                    if (i === 0) return;
                    const prevFrame = data.pos[i - 1][0];
                    const frame = p[0];
                    const x = p[1];
                    const y = p[2];
                    const dur = ((frame - prevFrame) / maxFrame) * animationDur;

                    tl.to(shape, {
                        x: x,
                        y: y,
                        duration: dur,
                        ease: "none"
                    }, `totemStart+=${(prevFrame / maxFrame) * animationDur}`);
                });

                // Rotation animation
                if (data.rot) {
                    data.rot.forEach((r, i) => {
                        if (i === 0) return;
                        const prevFrame = data.rot[i - 1][0];
                        const frame = r[0];
                        const val = r[1];
                        const dur = ((frame - prevFrame) / maxFrame) * animationDur;

                        tl.to(shape, {
                            rotation: val,
                            duration: dur,
                            ease: "power1.inOut"
                        }, `totemStart+=${(prevFrame / maxFrame) * animationDur}`);
                    });
                }
            });
        }, aboutRef);

        return () => ctx.revert();
    }, [aboutRef]);

    return (
        <section ref={aboutRef} className="w-full relative bg-black text-white py max-sm:pb-0!">
            <div className="container flex flex-col gapy">
                
                {/* Top Header */}
                <div className="w-full md:w-[95%] lg:w-[90%] mb-4 md:mb-8">
                    <h2 data-para-effect className="uppercase md:w-3xl">
                        I’m Shreevar, Building at the 
                        intersection of Strategy, 
                        Culture & Technology.
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    
                    {/* Column 1: Title and Shapes */}
                    <div className="flex flex-col justify-between">
                        <h2 data-para-effect className="">ABOUT</h2>
                    </div>

                    {/* Column 2: Image */}
                    <div className="w-full aspect-square relative bg-zinc-900">
                        <Image
                            fill
                            src="/images/homepage/about_pic.svg"
                            alt="Shreevar"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Column 3: Text */}
                    <div className="flex flex-col">
                        <p data-para-effect className="text-white/80 text-xl">
                            My career sits at the intersection of strategy, creativity and execution - from global music properties and brand partnerships to emerging technology and new service models. Now based in Madrid, I am pursuing my International MBA at IE Business School while building Zcom and exploring how AI can translate business data into decisions founders can act on.
                        </p>
                    </div>

                </div>

            </div>
            
            {/* Stacked Shapes for Animation */}
            <div className=" hidden md:flex about-totem-stack absolute bottom-0 left-0 padding flex-col items-center w-fit z-50 text-white">
                <div className="about-totem-shape w-32" data-totem-shape="diamond">
                    <svg className="equilibre-shape equilibre-shape--diamond w-full h-auto" viewBox="0 0 284 284" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M142.929 283.538L0.928784 143.165L141.071 0.93052L283.071 141.304L142.929 283.538ZM142.506 219.214L218.853 141.728L141.494 65.2544L65.1467 142.741L142.506 219.214Z" fill="currentColor"></path>
                    </svg>
                </div>
                <div className="about-totem-shape w-32" data-totem-shape="circle">
                    <svg className="equilibre-shape equilibre-shape--circle w-full h-auto" viewBox="0 0 263 263" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M131.711 262.605C59.5562 263.081 0.475781 204.677 0.000781 132.403C-0.474219 60.1299 57.8334 0.952 129.988 0.476C202.143 0 261.223 58.404 261.698 130.678C262.173 202.951 203.866 262.129 131.711 262.605ZM131.417 217.882C178.949 217.569 217.362 178.582 217.049 130.972C216.736 83.362 177.814 44.885 130.282 45.199C82.7503 45.512 44.3369 84.499 44.6499 132.109C44.9629 179.719 83.8853 218.196 131.417 217.882Z" fill="currentColor"></path>
                    </svg>
                </div>
                <div className="about-totem-shape w-32" data-totem-shape="triangle">
                    <svg className="equilibre-shape equilibre-shape--triangle w-full h-auto" viewBox="0 0 132 67" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M132.07 66.144L66.035 0L0 66.144H132.07Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

        </section>
    );
};

export default About;