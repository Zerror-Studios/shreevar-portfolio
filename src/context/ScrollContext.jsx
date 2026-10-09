"use client";
import React, { createContext, useContext, useRef } from "react";

const ScrollContext = createContext(null);

export const ScrollProvider = ({ children }) => {
  const expertiseRef = useRef(null);
  const focusRef = useRef(null);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (refName, immediate = false) => {
    let targetRef;
    switch (refName) {
      case 'expertise': targetRef = expertiseRef; break;
      case 'focus': targetRef = focusRef; break;
      case 'work': targetRef = workRef; break;
      case 'about': targetRef = aboutRef; break;
      case 'contact': targetRef = contactRef; break;
      default: return;
    }

    if (targetRef && targetRef.current) {
      if (window.lenis) {
        window.lenis.scrollTo(targetRef.current, immediate ? { immediate: true } : { duration: 1.2 });
      } else {
        targetRef.current.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
      }
    }
  };

  return (
    <ScrollContext.Provider 
      value={{ 
        expertiseRef, 
        focusRef, 
        workRef, 
        aboutRef,
        contactRef,
        scrollToSection 
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
