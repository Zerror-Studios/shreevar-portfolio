"use client";
import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { useScroll } from '@/context/ScrollContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const Footer = () => {
    const sceneRef = useRef(null);
    const { scrollToSection } = useScroll();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleNavClick = (e, key) => {
        e.preventDefault();
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

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Bodies = Matter.Bodies,
            Events = Matter.Events,
            Query = Matter.Query;

        // create engine
        const engine = Engine.create();
        const world = engine.world;

        // get current dimensions of the footer
        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        // create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio
            }
        });

        Render.run(render);

        // create runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        // add static boundaries (floor and walls very large to prevent issues on resize)
        const floor = Bodies.rectangle(width / 2, height + 25, 10000, 50, { isStatic: true, render: { fillStyle: 'transparent' } });
        const wallL = Bodies.rectangle(-25, height / 2, 50, 10000, { isStatic: true, render: { fillStyle: 'transparent' } });
        const wallR = Bodies.rectangle(width + 25, height / 2, 50, 10000, { isStatic: true, render: { fillStyle: 'transparent' } });

        Composite.add(world, [floor, wallL, wallR]);

        // add mouse control
        const mouse = Mouse.create(render.canvas);
        mouse.pixelRatio = window.devicePixelRatio; // Crucial for dragging on high-DPI displays

        // Optional: Let normal scrolling pass through if needed, though usually fine
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        Composite.add(world, mouseConstraint);
        render.mouse = mouse;

        // the shapes to drop (scaled for mobile)
        const opt = { render: { fillStyle: '#ffffff' }, friction: 0.5, restitution: 0.6 };

        // Dynamically scale shapes based on the actual container width for a smoother transition
        // On a 390px mobile screen, scale will be around 0.27
        const scale = Math.max(0.25, width / 1440);

        const shapes = [
            Bodies.circle(width * 0.3, -200, 130 * scale, opt), // Large circle
            Bodies.circle(width * 0.6, -400, 90 * scale, opt), // Small circle
            Bodies.rectangle(width * 0.7, -300, 200 * scale, 200 * scale, opt), // Square
            Bodies.polygon(width * 0.8, -600, 3, 160 * scale, opt), // Large triangle
            Bodies.polygon(width * 0.2, -500, 3, 120 * scale, opt), // Small triangle
            Bodies.rectangle(width * 0.4, -700, 260 * scale, 120 * scale, opt), // Rectangle
            Bodies.circle(width * 0.5, -800, 100 * scale, opt), // Medium circle
            Bodies.polygon(width * 0.5, -900, 3, 150 * scale, opt), // Extra triangle
            Bodies.circle(width * 0.8, -1000, 110 * scale, opt), // Extra circle
            Bodies.rectangle(width * 0.3, -1100, 180 * scale, 180 * scale, opt), // Extra square
        ];

        const initialStates = shapes.map(body => ({
            x: body.position.x,
            y: body.position.y
        }));

        // handle cursor changes based on physics hover
        Events.on(mouseConstraint, 'mousemove', function (event) {
            const foundPhysics = Query.point(shapes, event.mouse.position);
            if (mouseConstraint.body) {
                render.canvas.style.cursor = 'grabbing';
            } else if (foundPhysics.length > 0) {
                render.canvas.style.cursor = 'grab';
            } else {
                render.canvas.style.cursor = 'default';
            }
        });

        Events.on(mouseConstraint, 'mousedown', function (event) {
            const foundPhysics = Query.point(shapes, event.mouse.position);
            if (foundPhysics.length > 0) {
                render.canvas.style.cursor = 'grabbing';
            }
        });

        Events.on(mouseConstraint, 'mouseup', function (event) {
            const foundPhysics = Query.point(shapes, event.mouse.position);
            if (foundPhysics.length > 0) {
                render.canvas.style.cursor = 'grab';
            } else {
                render.canvas.style.cursor = 'default';
            }
        });

        // Drop shapes everytime footer comes into view using ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        let shapesAdded = false;

        const trigger = ScrollTrigger.create({
            trigger: sceneRef.current,
            start: "top 80%",
            onEnter: () => {
                if (!shapesAdded) {
                    Composite.add(world, shapes);
                    shapesAdded = true;
                } else {
                    shapes.forEach((body, index) => {
                        Matter.Body.setPosition(body, initialStates[index]);
                        Matter.Body.setVelocity(body, { x: 0, y: 0 });
                        Matter.Body.setAngularVelocity(body, 0);
                    });
                }
            },
            onEnterBack: () => {
                if (!shapesAdded) {
                    Composite.add(world, shapes);
                    shapesAdded = true;
                } else {
                    shapes.forEach((body, index) => {
                        Matter.Body.setPosition(body, initialStates[index]);
                        Matter.Body.setVelocity(body, { x: 0, y: 0 });
                        Matter.Body.setAngularVelocity(body, 0);
                    });
                }
            }
        });

        // handle resize
        const handleResize = () => {
            if (!sceneRef.current) return;
            const newWidth = sceneRef.current.clientWidth;
            const newHeight = sceneRef.current.clientHeight;

            render.canvas.width = newWidth;
            render.canvas.height = newHeight;
            render.options.width = newWidth;
            render.options.height = newHeight;

            Matter.Body.setPosition(floor, { x: newWidth / 2, y: newHeight + 25 });
            Matter.Body.setPosition(wallL, { x: -25, y: newHeight / 2 });
            Matter.Body.setPosition(wallR, { x: newWidth + 25, y: newHeight / 2 });
        };

        window.addEventListener('resize', handleResize);

        // cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (trigger) trigger.kill();
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            Engine.clear(engine);
        };
    }, []);

    return (
        <>
            {/* White transition overlay */}
            <div 
                className={`fixed inset-0 bg-white z-[999999] pointer-events-none transition-opacity duration-300 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
            />
            <footer className="w-full  md:h-screen relative bg-black text-white overflow-hidden z-100000">
            {/* Matter.js Canvas Container */}
            <div ref={sceneRef} className="absolute hidden md:block inset-0 z-0" />

            {/* Content Container */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between container pt pb">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between gap-12">

                    {/* Left: Branding */}
                    <div className="pointer-events-auto">
                        <h2 data-para-effect className="uppercase mb-2">
                            SHREEVAR <br />
                            JHUNJHUNWALA
                        </h2>
                        <p className="text-white/80">
                            Building what's next, one partnership at a time.
                        </p>
                        <p className="text-xs text-white/50 mt-2 uppercase">
                            © Shreevar Jhunjhunwala, 2026. All rights reserved.
                        </p>
                    </div>

                    {/* Right: Links */}
                    <div className="pointer-events-auto grid grid-cols-2 md:flex gap-0 md:gap-24 uppercase font-medium">
                        <div className="flex flex-col gap-2">
                            <span className="text-white/50 text-sm mb-2">SITE</span>
                            <a href="#" onClick={(e) => handleNavClick(e, 'work')} className="hover:text-white/80 transition-colors">WORK</a>
                            <a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white/80 transition-colors">ABOUT</a>
                            <a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-white/80 transition-colors">CONTACT</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-white/50 text-sm mb-2">SOCIALS</span>
                            <a href="#" className="hover:text-white/80 transition-colors">LINKEDIN</a>
                            <a href="#" className="hover:text-white/80 transition-colors">EMAIL</a>
                            <a href="#" className="hover:text-white/80 transition-colors">INSTAGRAM</a>
                        </div>
                    </div>
                </div>


            </div>
        </footer>
        </>
    );
};

export default Footer;