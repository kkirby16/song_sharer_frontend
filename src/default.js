import { gsap } from "gsap";

const siteTitle1 = document.querySelector("site-title1");

gsap.to(siteTitle1, {
  duration: 0.9,
  opacity: 1,
  y: -20,
  ease: "power3",
});
