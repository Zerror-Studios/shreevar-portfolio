"use client"

import { usePathname } from "next/navigation"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const GlobalImgReveal = () => {
  const pathname = usePathname()

  useGSAP(() => {
    const ctx = gsap.context(async () => {
      // Wait for fonts/layout to settle if needed
      await document.fonts.ready

      const elements = gsap.utils.toArray("[data-img-effect]")

      elements.forEach((el) => {
        if (el.dataset.imgInitialized) return

        el.dataset.imgInitialized = "true"

        // Initial state
        gsap.set(el, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
          willChange: "clip-path",
        })

        // Animation
        gsap.to(el, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // adjust as needed
            toggleActions: "play none none reverse",
          },
        })
      })
    })

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      clearTimeout(timeout)
      document.querySelectorAll("[data-img-effect]").forEach((el) => {
        delete el.dataset.imgInitialized
      })
      ctx.revert()
    }
  }, [pathname])

  return null
}

export default GlobalImgReveal
