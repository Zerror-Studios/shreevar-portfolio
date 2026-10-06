import About from "@/components/home/About";
import OutsideWork from "@/components/home/OutsideWork";
import CurrentChapter from "@/components/home/CurrentChapter";
import Hero from "@/components/home/Hero";
import WhatIDo from "@/components/home/WhatIDo";
import Contact from "@/components/home/Contact";
import WorkSection from "@/components/home/WorkSection";
import { createPageMetadata } from "@/lib/seo";

const HomePage = () => {
  return (
    <>
    <Hero />
    <CurrentChapter/>
    <WhatIDo/>
    <WorkSection/>
    <About/>
    <OutsideWork/>
    <Contact/>
    </>
  );
};

export default HomePage;

export async function generateMetadata() {
  return createPageMetadata("/");
}
