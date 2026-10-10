"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useScroll } from '@/context/ScrollContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { RiArrowRightUpLine } from '@remixicon/react';
import { createPortal } from 'react-dom';

const Contact = () => {
    const { contactRef } = useScroll();
    
    // Form State
    const [formData, setFormData] = useState({ name: '', email: '', location: '' });
    const [selectedTopic, setSelectedTopic] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Toast State
    const [mounted, setMounted] = useState(false);
    const [toastData, setToastData] = useState({ visible: false, message: '', type: 'success' });
    const toastRef = useRef(null);

    useEffect(() => setMounted(true), []);

    const showToast = (message, type = 'success') => {
        setToastData({ visible: true, message, type });
        
        setTimeout(() => {
            if (toastRef.current) {
                gsap.fromTo(toastRef.current, 
                    { x: 400, opacity: 0 }, 
                    { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
                );
                
                // Hide after 4 seconds
                setTimeout(() => {
                    if (toastRef.current) {
                        gsap.to(toastRef.current, { 
                            x: 400, opacity: 0, duration: 0.5, ease: "power2.in",
                            onComplete: () => setToastData(prev => ({ ...prev, visible: false }))
                        });
                    }
                }, 4000);
            }
        }, 50);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.location || !selectedTopic) {
            showToast("PLEASE FILL IN ALL FIELDS AND SELECT A TOPIC", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    location: formData.location,
                    about: selectedTopic
                })
            });

            if (res.ok) {
                showToast("YOUR MESSAGE HAS BEEN SENT. WE'LL BE IN TOUCH SOON.", "success");
                setFormData({ name: '', email: '', location: '' });
                setSelectedTopic("");
            } else {
                showToast("SOMETHING WENT WRONG. PLEASE TRY AGAIN.", "error");
            }
        } catch (error) {
            showToast("FAILED TO SEND MESSAGE.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const { contextSafe } = useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(".contact-circle", { y: -400 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: contactRef.current,
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });

        tl.to(".contact-circle", {
            y: 0,
            duration: 1.5,
            ease: "bounce.out"
        }, 0.2);
    }, { scope: contactRef });

    const handleSemicircleHover = contextSafe(() => {
        if (gsap.isTweening('.contact-semicircle') || gsap.isTweening('.contact-circle')) return;

        const direction = Math.random() > 0.5 ? 1 : -1;
        const tl = gsap.timeline();

        tl.to('.contact-semicircle', {
            rotation: direction * 35,
            svgOrigin: "100 165",
            duration: 0.6,
            ease: "back.out(2.5)"
        })
            .to('.contact-circle', {
                x: direction * 700,
                y: 400,
                svgOrigin: "100 50",
                duration: 1.2,
                ease: "power2.in"
            }, "<0.1")
            .to('.contact-circle', { opacity: 0, duration: 0.1 }, ">")
            .to('.contact-circle', { x: 0, y: -400, duration: 0.1 }, ">")
            .to('.contact-circle', { opacity: 1, duration: 0.1 }, ">")
            .to({}, { duration: 1 })
            .to('.contact-semicircle', {
                rotation: 0,
                duration: 0.5,
                ease: "back.out(2.5)"
            })
            .to('.contact-circle', {
                y: 0,
                opacity: 1,
                rotation: 0,
                duration: 1.5,
                ease: "bounce.out"
            }, "-=0.2");
    });

    return (
        <section ref={contactRef} className="w-full relative bg-white text-black py overflow-hidden">
            <div className="container flex flex-col gapy">

                {/* Top Header */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <h2 data-para-effect>
                            THE BEST CONVERSATIONS 
                            START WITH AN IDEA. 
                            LET’S SEE WHERE YOURS 
                            COULD GO.
                        </h2>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">

                    {/* Left: Shape */}
                    <div className="flex items-end justify-center md:justify-start">
                        {/* Geometric Shape */}
                        <svg
                            viewBox="0 0 200 220"
                            className="w-48 h-auto md:w-72 overflow-visible"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle className="contact-circle" cx="100" cy="50" r="35" fill="black" />
                            <path
                                className="contact-semicircle"
                                onMouseEnter={handleSemicircleHover}
                                d="M 20 85 H 180 A 80 80 0 0 1 20 85 Z"
                                fill="black"
                            />
                            <path className="contact-triangle" d="M 100 165 L 60 215 H 140 Z" fill="black" />
                        </svg>
                    </div>

                    {/* Right: Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-12">

                        {/* Form Fields */}
                        <div className="flex flex-col gap-10">
                            <input
                                type="text"
                                placeholder="YOUR NAME"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-transparent outline-none border-b border-black/30 pb-4 font-medium placeholder:text-black focus:border-black transition-colors uppercase"
                            />

                            <input
                                type="email"
                                placeholder="YOUR EMAIL"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-transparent outline-none border-b border-black/30 pb-4 font-medium placeholder:text-black focus:border-black transition-colors uppercase"
                            />

                            <input
                                type="text"
                                placeholder="WHERE ARE YOU WORKING FROM?"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                className="w-full bg-transparent outline-none border-b border-black/30 pb-4 font-medium placeholder:text-black focus:border-black transition-colors uppercase"
                            />
                        </div>

                        {/* Options & Submit */}
                        <div className="flex flex-col gap-6">
                            <p className="font-medium uppercase">WHAT WOULD YOU LIKE TO TALK ABOUT?</p>

                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                                <div className="flex flex-wrap gap-3">
                                    {['A Partnership', 'Business Idea', 'Opportunity'].map((topic) => (
                                        <button
                                            key={topic}
                                            type="button"
                                            onClick={() => setSelectedTopic(topic)}
                                            className={`border rounded-sm transition-colors duration-300 px-4 py-2 ${
                                                selectedTopic === topic
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-transparent text-black border-black/30 hover:border-black'
                                            }`}
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="bg-black group text-white px-6 text-sm py-2 flex items-center justify-center hover:gap-2 gap-0 rounded-sm transition-all duration-300 w-fit disabled:opacity-70"
                                >
                                    {isSubmitting ? 'SENDING...' : 'SEND'}
                                    {!isSubmitting && <RiArrowRightUpLine className='size-5 scale-0 group-hover:scale-100 transition-all duration-300 origin-bottom-left w-0 group-hover:w-5'/>}
                                </button>
                            </div>
                        </div>

                    </form>
                </div>

            </div>

            {/* Custom GSAP Toast Notification (Portal) */}
            {mounted && toastData.visible && createPortal(
                <div 
                    ref={toastRef}
                    className={`fixed top-5 right-8 z-[9999] bg-white shadow-xl p-6 border-l-4 min-w-[300px] max-w-sm flex items-start gap-4 ${toastData.type === 'success' ? 'border-black' : 'border-red-600'}`}
                >
                    <div className="flex-1">
                        <p className={`font-medium uppercase text-sm ${toastData.type === 'success' ? 'text-black' : 'text-red-600'}`}>
                            {toastData.message}
                        </p>
                    </div>
                    <button 
                        type="button" 
                        onClick={() => setToastData({ ...toastData, visible: false })}
                        className="text-black/50 hover:text-black transition-colors"
                    >
                        &times;
                    </button>
                </div>,
                document.body
            )}
        </section>
    );
};

export default Contact;
