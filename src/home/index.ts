import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { Flip } from "gsap/Flip";
import Swiper, { Navigation } from "swiper";
import { initAnimations } from "../utils/initAnimations";
import { getCookie, setCookie } from "./cookieHelper";
import "swiper/css/bundle";

gsap.registerPlugin(TextPlugin, ScrollTrigger, ScrollToPlugin, Flip);

const RED = "#ff576d";
const ORANGE = "#fb913a";
const NAVY = "#181d2c";
export const GRAY = "#3d414e";
export const WHITE = "#ffffff";
const DARK_BLUE = "#4673D1";
const LIGHT_BLUE = "#51BFE1";
const PURPLE = "#928CDA";
const PINK = "#FF576D";
const GREEN = "#04A451";
export const BG_WHITE = `linear-gradient(115deg, ${WHITE}, ${WHITE})`;
export const BG_REDORANGE_GRADIENT = `linear-gradient(115deg, ${RED}, ${ORANGE})`;
const BG_BLUE_GRADIENT = `linear-gradient(115deg, ${DARK_BLUE}, ${LIGHT_BLUE})`;
const BG_PURPLEPINK_GRADIENT = `linear-gradient(115deg, ${PURPLE}, ${PINK})`;
const BG_PURPLEORANGE_GRADIENT = `linear-gradient(115deg, ${PURPLE}, ${ORANGE})`;
const BG_BLUE_PURPLE_GRADIENT = `linear-gradient(115deg, ${DARK_BLUE}, ${PURPLE})`;
const BG_GREENBLUE_GRADIENT = `linear-gradient(115deg, ${GREEN}, ${LIGHT_BLUE})`;
const BG_WHITE_GRADIENT = `linear-gradient(115deg, ${WHITE}, ${WHITE})`;
const BG_NAVY_NAVY = `linear-gradient(115deg, ${NAVY}, ${NAVY})`;

window.Webflow ||= [];
window.Webflow.push(() => {
  const COOKIE_NAME = "seenLoader";
  const loadingWrapper = document.querySelector(".section-home-header");
  if (!loadingWrapper) return;
  const hasSeenLoader = getCookie(COOKIE_NAME);
  if (!hasSeenLoader /* && window.innerWidth > 768 */) {
    typeWriterIntroGlitch();
    setCookie(COOKIE_NAME, "true", 12 * 60 * 60 * 1000); // 12 hours to ms
  } else {
    gsap.set(".section-home-header", { display: "none" });
  }

  platformAnimation();
  // functionalitySuiteComponent();
  meetMosaikVideoController();
  // provideStickyScrollAnimation();
  // everythingButtons();
  //cherryOnTopAnimation();
  // let swiper = buildSwiper();

  function platformAnimation() {
    const box = document.querySelector(".animated-text-box");
    const textItems = box?.querySelectorAll(".animated-text-phrase");
    const buttons = document.querySelectorAll('[platform-anim="button"]');
    if (!box || !textItems || !buttons) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      textItems?.forEach((textItem) => {
        gsap.set(textItem, { opacity: 0, x: "20%", color: RED });
        gsap.set(box, { x: "25%" });
      });
      const textTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".section-platform-where",
            start: "bottom bottom",
          },
          defaults: { ease: "circ.out", duration: 0.8 },
        })
        .to(textItems[0], { x: 0, opacity: 0.8 })
        .to(box, { x: "12.5%", delay: 0.1 })
        .to(textItems[0], { color: "#fff" }, "<")
        .to(textItems[1], { x: 0, opacity: 0.8 }, "<")
        .to(box, { x: 0, delay: 0.1 })
        .to(textItems[1], { color: "#fff" }, "<")
        .to(textItems[2], { x: 0, opacity: 0.8 }, "<")
        .from(buttons, { yPercent: 100, opacity: 0, stagger: 0.1 });
    });

    mm.add("(max-width: 991px)", () => {
      textItems?.forEach((textItem) => {
        gsap.set(textItem, { opacity: 0, x: "20%", color: RED });
      });
      const textTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".section-platform-where",
            start: "bottom bottom",
          },
          defaults: { ease: "circ.out", duration: 1 },
        })
        .to(textItems[0], { x: 0, opacity: 0.8 })
        .to(textItems[0], { color: "#fff" })
        .to(textItems[1], { x: 0, opacity: 0.8 }, "<")
        .to(textItems[1], { color: "#fff" })
        .to(textItems[2], { x: 0, opacity: 0.8 }, "<")
        .from(buttons, { yPercent: 100, opacity: 0, stagger: 0.1 });
    });
  }

  function meetMosaikVideoController() {
    const watchFilmButton = document.querySelector("#watch-film-button");
    const closeButton = document.querySelector("#watch-film-close-button");
    const meetMosaikVideo =
      document.querySelector<HTMLVideoElement>("#meet-mosaik-video");
    if (!meetMosaikVideo) return;

    let hasPlayedOnce = false;

    function handleCanPlay(e) {
      e.target.play();
    }

    watchFilmButton?.addEventListener("click", () => {
      if (!hasPlayedOnce) {
        meetMosaikVideo.addEventListener("canplay", handleCanPlay);
        hasPlayedOnce = true;
      } else {
        meetMosaikVideo.play();
      }
    });

    closeButton?.addEventListener("click", () => {
      meetMosaikVideo?.pause();
      meetMosaikVideo.removeEventListener("canplay", handleCanPlay);
    });
  }

  function typeWriterIntroGlitch() {
    document.body.classList.toggle("no-scroll");
    window.scrollTo(0, 0);
    const homeHeader = document.querySelector(".section-home-header");
    const introTextEl = document.querySelector(".placeholder-text");
    const redDotTextEl = document.querySelector("#header-red-dot");
    if (!redDotTextEl) return;

    introTextEl?.remove();
    const words = [introTextEl?.innerHTML];

    //gsap.set("is-hero-red-dot");

    gsap.to("#cursor", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "power4.inout",
    });

    let tlMaster = gsap.timeline({
      onComplete: () => {
        const tlAfter = gsap.timeline({
          onComplete: () => {
            window.scrollTo(0, 0);
            document.body.classList.toggle("no-scroll");
          },
        });
        tlAfter
          .to(".wiper", {
            width: "100%",
            duration: 0.5,
            delay: 0.8,
            stagger: 0.2,
            ease: "power4.out",
          })
          .set(".intro-text", { opacity: 0 })
          .set(".wiper", { left: "auto", right: 0 })
          .set("#cursor", { height: 0 })
          .to(".wiper", {
            width: 0,
            duration: 0.8,
            //scale: 0.8,
            stagger: 0.2,
            ease: "power4.out",
          })
          .to(homeHeader, {
            xPercent: 100,
            opacity: 0,
            duration: 0.3,
          })
          .from("#mm-bottom-light", { opacity: 0, yPercent: 50 }, "<")
          .from("#mm-header", { opacity: 0, yPercent: 100 }, "<+=0.5")
          .from("#mm-subtitle", { opacity: 0, yPercent: 100 }, ">-=0.2")
          .from(".mm-confetti", { opacity: 0, yPercent: 15 })
          .from("#mm-nav", { yPercent: -100 }, "<")
          .set(homeHeader, { display: "none" });

        //gsap.set(homeHeader, { display: "none" });
      },
    });

    let tlText = gsap.timeline();
    tlText.to("#animated-text", { duration: 2, delay: 1, text: words[0] });
    tlMaster.add(tlText);
  }
});
