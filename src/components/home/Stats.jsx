"use client"
import React, { useEffect, useState, useRef } from 'react';

const CountUp = ({ end, prefix = "", suffix = "", duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) {
            setCount(0);
            return;
        }

        let startTimestamp = null;
        let animationFrameId;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            
            // easeOutExpo for smooth deceleration
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
                animationFrameId = window.requestAnimationFrame(step);
            }
        };

        animationFrameId = window.requestAnimationFrame(step);

        return () => {
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [end, duration, isVisible]);

    return (
        <span ref={ref}>
            {prefix}{count}{suffix}
        </span>
    );
};

const statsData = [
    {
        end: 3,
        prefix: "$",
        suffix: "M",
        text: "Sponsorship revenue driven across 15+ flagship IPs"
    },
    {
        end: 400,
        prefix: "$",
        suffix: "k+",
        text: "Web3 revenue generated through new revenue models"
    },
    {
        end: 100,
        prefix: "",
        suffix: "+",
        text: "Artists onboarded into the Web3 ecosystem"
    },
    {
        end: 750,
        prefix: "",
        suffix: "k+",
        text: "People reached across 15+ concerts & festivals"
    }
];

const Stats = () => {
    return (
        <section className="w-full relative bg-black text-white pt">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/20 border border-white/20">
                    
                    {statsData.map((stat, index) => (
                        <div key={index} className="md:flex flex-col justify-center items-center md:text-center p-5 md:p-14 bg-black text-white hover:bg-white hover:text-black transition-colors duration-300 group">
                            <h2  className=" text-4xl! md:text-7xl! mb-4">
                                <CountUp end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                            </h2>
                            <p className="text-sm md:text-base leading-tight max-w-[250px] opacity-80">
                                {stat.text}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Stats;
