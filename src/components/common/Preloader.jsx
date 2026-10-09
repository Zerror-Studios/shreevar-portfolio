"use client";
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const [isMounted, setIsMounted] = useState(true);
    const counterRef = useRef(null);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "auto";
                setIsMounted(false);
            }
        });

        const progress = { value: 0 };

        tl.to(progress, {
            value: 100,
            duration: 3,
            ease: "power2.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.innerText = Math.round(progress.value) + "%";
                }
            }
        }, 0)
        // The bar fills up over 3 seconds
        .to(".loader-progress-bar", {
            scaleX: 1,
            duration: 3,
            ease: "power2.inOut"
        }, 0)
        // 1) Fade out inner elements while background turns white
        .to(".loader-content", {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
        })
        .to(".loader-wrapper", {
            backgroundColor: "#ffffff",
            duration: 0.5,
            ease: "power2.inOut"
        }, "<")
        // 2) Then fade out the whole loader wrapper
        .to(".loader-wrapper", {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut"
        });
        
    }, []);

    if (!isMounted) return null;

    return (
        <div className="loader-wrapper fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center pointer-events-auto">
            <div className="loader-content flex flex-col items-center w-full">
                {/* Center GIF */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
                    <img 
                        src="/images/loading.gif" 
                        alt="Loading..."  
                        className="object-contain w-full grayscale-100 h-full"
                    />
                </div>

                {/* Percentage Counter */}
                <div ref={counterRef} className="text-sm font-medium mb-12 text-[#ffffff]">
                    0%
                </div>

                {/* Progress Bar Container */}
                <div className="w-48 md:w-64 h-[2px] bg-black/10 overflow-hidden">
                    {/* The fill bar */}
                    <div className="loader-progress-bar w-full h-full bg-[#ffffff] origin-left scale-x-0"></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
