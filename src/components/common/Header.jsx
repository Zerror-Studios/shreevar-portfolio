"use client";
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useScroll } from '@/context/ScrollContext';
import gsap from 'gsap';

const NAV_ITEMS = [
  { key: 'expertise', label: 'EXPERTISE' },
  { key: 'focus', label: 'FOCUS' },
  { key: 'work', label: 'WORK' },
  { key: 'about', label: 'ABOUT' },
];

const Header = () => {
  const { scrollToSection } = useScroll();
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const contactBtnRef = useRef(null);
  const navRefs = useRef({});
  
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, height: 0, top: 0, opacity: 0 });
  const [hoveredItem, setHoveredItem] = useState('contact'); // default highlight on contact
  const [isTransitioning, setIsTransitioning] = useState(false);

  const moveIndicatorTo = (el) => {
    if (el && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: elRect.left - containerRect.left,
        top: elRect.top - containerRect.top,
        width: elRect.width,
        height: elRect.height,
        opacity: 1
      });
    }
  };

  const resetIndicator = () => {
    setHoveredItem('contact');
    moveIndicatorTo(contactBtnRef.current);
  };

  useEffect(() => {
    const timer = setTimeout(resetIndicator, 100);
    window.addEventListener('resize', resetIndicator);

    // Header reveal animation after 4 seconds
    gsap.fromTo(
      wrapperRef.current,
      { xPercent: -50, y: 100, opacity: 0 },
      { xPercent: -50, y: 0, opacity: 1, duration: 1, delay: 4, ease: 'power3.out' }
    );

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resetIndicator);
    };
  }, []);

  const handleNavHover = (key) => {
    setHoveredItem(key);
    moveIndicatorTo(navRefs.current[key]);
  };

  const handleContactHover = () => {
    setHoveredItem('contact');
    moveIndicatorTo(contactBtnRef.current);
  };

  const handleNavClick = (key) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Fast fade in takes 200ms
    setTimeout(() => {
      scrollToSection(key, true);
      
      // Wait a moment then fade out
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  return (
    <>
      {/* White transition overlay */}
      <div 
        className={`fixed inset-0 bg-white z-1000 pointer-events-none transition-opacity duration-300  ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      />
      <div ref={wrapperRef} className="fixed bottom-5 left-1/2 z-100000 opacity-0 w-full padding md:w-max md:p-0">
      <div 
        ref={containerRef}
        onMouseLeave={resetIndicator}
        className="relative flex items-center justify-between w-full bg-[#0a0a0a] text-white p-1 rounded-md border border-white/50"
      >
        {/* Sliding Indicator */}
        <div 
          className="absolute bg-white rounded-sm pointer-events-none"
          style={{
            left: indicatorStyle.left,
            top: indicatorStyle.top,
            width: indicatorStyle.width,
            height: indicatorStyle.height,
            opacity: indicatorStyle.opacity,
            transition: 'left 0.3s ease, top 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
          }}
        />

        <nav className="flex items-center justify-between flex-1 md:flex-none text-sm relative z-10">
          {NAV_ITEMS.map(({ key, label }) => (
            <button
              key={key}
              ref={(el) => (navRefs.current[key] = el)}
              onMouseEnter={() => handleNavHover(key)}
              onClick={() => handleNavClick(key)}
              className="group max-md:px-1 px-3 py-3 uppercase max-md:text-xs text-sm transition-colors duration-300"
              style={{ color: hoveredItem === key ? '#000' : '#fff' }}
            >
              <span className="relative inline-block">
                {label}
                {/* Underline that grows from left and shrinks to right */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </button>
          ))}
        </nav>
        
        <button 
          ref={contactBtnRef}
          onMouseEnter={handleContactHover}
          onClick={() => handleNavClick('contact')}
          className="group flex items-center gap-1 md:gap-3 max-md:px-2 pl-2 pr-5 py-2 rounded-sm relative z-10 transition-colors duration-300 ml-1 md:ml-0"
        >
          <div className="w-5 h-5 md:w-7 md:h-7 rounded-full overflow-hidden relative bg-gray-300 flex-shrink-0">
            <Image 
              src="/images/homepage/about_pic.svg" 
              alt="Profile" 
              fill
              className="object-cover"
            />
          </div>
          <span 
            className="relative inline-block max-md:text-[10px] text-sm whitespace-nowrap transition-colors duration-300"
            style={{ color: hoveredItem === 'contact' ? '#000' : '#fff' }}
          >
            LET'S TALK
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
          </span>
        </button>
      </div>
    </div>
    </>
  );
}

export default Header;