"use client";
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useScroll } from '@/context/ScrollContext';

const NAV_ITEMS = [
  { key: 'expertise', label: 'EXPERTISE' },
  { key: 'focus', label: 'FOCUS' },
  { key: 'work', label: 'WORK' },
  { key: 'about', label: 'ABOUT' },
];

const Header = () => {
  const { scrollToSection } = useScroll();
  const containerRef = useRef(null);
  const contactBtnRef = useRef(null);
  const navRefs = useRef({});
  
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, height: 0, top: 0, opacity: 0 });
  const [hoveredItem, setHoveredItem] = useState('contact'); // default highlight on contact

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

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        ref={containerRef}
        onMouseLeave={resetIndicator}
        className="relative flex items-center gap-6 bg-[#0a0a0a] text-white pl-1 pr-1 py-1 rounded-md border border-white/50"
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

        <nav className="flex items-center gap-4 text-sm relative z-10">
          {NAV_ITEMS.map(({ key, label }) => (
            <button
              key={key}
              ref={(el) => (navRefs.current[key] = el)}
              onMouseEnter={() => handleNavHover(key)}
              onClick={() => scrollToSection(key)}
              className="px-3 py-3 uppercase text-sm transition-colors duration-300"
              style={{ color: hoveredItem === key ? '#000' : '#fff' }}
            >
              {label}
            </button>
          ))}
        </nav>
        
        <button 
          ref={contactBtnRef}
          onMouseEnter={handleContactHover}
          onClick={() => scrollToSection('contact')}
          className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-sm ml-2 sm:ml-4 relative z-10 transition-colors duration-300"
        >
          <div className="w-7 h-7 rounded-full overflow-hidden relative bg-gray-300 flex-shrink-0">
            <Image 
              src="/images/homepage/about_pic.svg" 
              alt="Profile" 
              fill
              className="object-cover"
            />
          </div>
          <span 
            className="text-sm whitespace-nowrap transition-colors duration-300"
            style={{ color: hoveredItem === 'contact' ? '#000' : '#fff' }}
          >
            LET'S TALK
          </span>
        </button>
      </div>
    </div>
  );
}

export default Header;