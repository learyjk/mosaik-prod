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
  // pasue videos when offscreen, play when onscreen
  // const observer = new IntersectionObserver((entries) => {
  //   for (let i = 0; i < entries.length; i++) {
  //     let video = entries[i].target as HTMLVideoElement;
  //     if (i >= 2 && i <= 6) {
  //       break;
  //     } else if (entries[i].isIntersecting) {
  //       video.play();
  //       //console.log(`playing ${video}`);
  //     } else {
  //       video.pause();
  //       //console.log(`pausing ${video}`);
  //     }
  //   }
  // });

  //loading videos
  const allVideos = document.querySelectorAll("video");
  // console.log({ videos: allVideos });
  // let loadedVideos = 0;
  allVideos.forEach((video) => {
    //observer.observe(video);
    //video.addEventListener("canplay", handleVideoCanPlay);
    //video.addEventListener("canplaythrough", handleVideoCanPlayThrough);
  });

  // function handleVideoCanPlayThrough(event) {
  //   loadedVideos++;
  //   console.log({ loadedVideos });
  //   if (loadedVideos === allVideos.length) {
  //     // All videos have finished loading
  //     console.log("All videos have finished loading!");
  //   }
  // }

  // Observe the video element
  // allVideos.forEach((video) => observer.observe(video));

  // show loader once per day

  let url = window.location;

  const COOKIE_NAME = "seenLoader";
  const loadingWrapper = document.querySelector(".section-home-header");
  if (!loadingWrapper) return;
  const hasSeenLoader = getCookie(COOKIE_NAME);
  if (!hasSeenLoader /* && window.innerWidth > 768 */) {
    typeWriterIntroGlitch();
    setCookie(COOKIE_NAME, "true", 30 * 60 * 1000);
  } else {
    gsap.set(".section-home-header", { display: "none" });
  }

  platformAnimation();
  functionalitySuiteComponent();
  meetMosaikVideoController();
  provideStickyScrollAnimation();
  everythingButtons();
  //cherryOnTopAnimation();
  let swiper = buildSwiper();
  initAnimations()
    .then(() => {
      console.info("finished loading animations");
      laptopOpenSetFirstVideoTime();
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        // viewport is >= 768px
        swiperController(swiper);
      });
      //laptopMobile(swiper);
    })
    .catch((error) => {
      console.error("error loading animations");
    });

  const laptopVideos = document.querySelectorAll(
    '[wb-data="laptop-video"]'
  ) as NodeListOf<HTMLVideoElement>;

  function functionalitySuiteComponent() {
    const bulletRows = document.querySelectorAll(
      ".bullet-row"
    ) as NodeListOf<HTMLAnchorElement>;
    const bullets = document.querySelectorAll(".bullet");
    const bulletLines = document.querySelectorAll(".bullet-line-red");
    const bulletHeadings = document.querySelectorAll(".is-bullet-content");
    const videoWrappers = document.querySelectorAll(".window-wrap-scrollcomp");

    // set initial states
    gsap.set(bullets[0], { backgroundColor: RED, borderColor: RED });
    gsap.set(bulletHeadings[0], { backgroundImage: BG_REDORANGE_GRADIENT });
    gsap.set(videoWrappers, { opacity: 0, yPercent: 4 });

    // register the effect with GSAP:
    gsap.registerEffect({
      name: "videoFadeAndMove",
      effect: (target: GSAPTweenTarget) => {
        return gsap
          .timeline({ defaults: { ease: "none" } })
          .from(target, {
            opacity: 0,
            duration: 1,
            yPercent: 4,
          })
          .to(target, {
            opacity: 1,
            duration: 5,
            yPercent: 0,
          })
          .to(target, {
            opacity: 1,
            duration: 5,
            yPercent: 0,
          })
          .to(target, {
            opacity: 0,
            duration: 1,
            yPercent: -4,
          });
      },
      extendTimeline: true,
    });

    var masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".sticky-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });

    // videos
    var videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".sticky-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });

    videoTimeline
      .videoFadeAndMove(videoWrappers[0])
      .videoFadeAndMove(videoWrappers[1])
      .videoFadeAndMove(videoWrappers[2])
      .videoFadeAndMove(videoWrappers[3])
      .videoFadeAndMove(videoWrappers[4]);

    masterTimeline
      .to(bulletLines[0], {
        height: "100%",
        onComplete: () => handleOnComplete(1),
      })
      .to(bulletLines[1], {
        height: "100%",
        onReverseComplete: () => handleOnComplete(0),
        onComplete: () => handleOnComplete(2),
      })
      .to(bulletLines[2], {
        height: "100%",
        onReverseComplete: () => handleOnComplete(1),
        onComplete: () => handleOnComplete(3),
      })
      .to(bulletLines[3], {
        height: "100%",
        onReverseComplete: () => handleOnComplete(2),
        onComplete: () => handleOnComplete(4),
      })
      .to(bulletLines[4], {
        height: "100%",
        onReverseComplete: () => handleOnComplete(3),
      });

    function handleOnComplete(stepNumber: number) {
      // reset
      gsap.to(bullets, { backgroundColor: NAVY, borderColor: GRAY });
      gsap.to(bulletHeadings, { backgroundImage: BG_WHITE_GRADIENT });
      gsap.set(bulletLines, { height: "0%" });
      //gsap.set(videoWrappers, { opacity: 0 });

      // set new
      gsap.to(bullets[stepNumber], { backgroundColor: RED, borderColor: RED });
      gsap.to(bulletHeadings[stepNumber], {
        backgroundImage: BG_REDORANGE_GRADIENT,
      });
      //gsap.to(videoWrappers[stepNumber], { opacity: 1 });
      allVideos.forEach((video, index) => {
        if (index >= 2 && index <= 6) {
          video.currentTime = 0;
        }
      });
    }
  }

  function cherryOnTopAnimation() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cherry-gradient-box",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });

    tl.from(".cherry", { yPercent: -300, rotateZ: -135 });
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

  function provideStickyScrollAnimation() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".provide-sticky-wrap",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .to(".provide-text-wrap", { yPercent: -100, ease: "none" });
  }

  function everythingButtons() {
    const buttons = document.querySelectorAll("[everything-button]");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        let attrValue = button.getAttribute("everything-button");
        if (attrValue === "collab-search") {
          lenis.scrollTo("#section-breaks-mold", { immediate: true });
        }
        if (attrValue === "listing-mgmt") {
          lenis.scrollTo("#section-seal", { immediate: true });
        }
        if (attrValue === "transaction-mgmt") {
          lenis.scrollTo("#section-seal", { immediate: true });
        }
        if (attrValue === "forms") {
          lenis.scrollTo("#section-forms", { immediate: true });
        }
        if (attrValue === "client-experience") {
          lenis.scrollTo("#section-home-run", { immediate: true });
        }
        if (attrValue === "advanced-analytics") {
          lenis.scrollTo("#section-advanced-analytics", { immediate: true });
        }
      });
    });
  }

  function typeWriterIntro() {
    document.body.classList.toggle("no-scroll");
    window.scrollTo(0, 0);
    const homeHeader = document.querySelector(".section-home-header");
    const introTextEl = document.querySelector(".placeholder-text");
    const redDotTextEl = document.querySelector("#header-red-dot");
    if (!redDotTextEl) return;
    const dotWidth = getComputedStyle(redDotTextEl).width;
    console.log({ dotWidth });

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
        const updatedRedDot = document.querySelector("#header-red-dot");
        const animatedDivs = document.querySelectorAll('[intro-anim="div"]');
        if (!updatedRedDot) return;
        updatedRedDot!.append(...animatedDivs);
        const tlAfter = gsap.timeline({
          onComplete: () => {
            window.scrollTo(0, 0);
            document.body.classList.toggle("no-scroll");
          },
        });
        tlAfter
          .to(updatedRedDot, { rotateZ: 45 })
          .to(animatedDivs, {
            scale: 120,
            duration: 2,
            stagger: {
              each: 0.5,
            },
          })
          .to(homeHeader, { yPercent: -100, opacity: 0 }, ">-=0.5")
          .from("#mm-bottom-light", { opacity: 0, yPercent: 50 }, "<+0.2")
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
    // .to(homeHeader, {
    //   yPercent: -100,
    // });
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

  function buildSwiper() {
    let swiperMain = new Swiper(".swiper", {
      slidesPerView: 1,
      keyboard: true,
      speed: 500,
      direction: "horizontal",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    const twoBtn = document.querySelector("#slide-two-btn");
    const threeBtn = document.querySelector("#slide-three-btn");

    twoBtn?.addEventListener("click", () => {
      swiperMain.slideTo(1);
    });

    threeBtn?.addEventListener("click", () => {
      swiperMain.slideTo(2);
    });
    return swiperMain;
  }

  function laptopOpenSetFirstVideoTime() {
    const LOTTIE_DURATION = 1.7;
    ScrollTrigger.create({
      trigger: ".swiper-control-wrap",
      start: "top bottom",
      onToggle: () => {
        //console.log("reset playhead");
        laptopVideos[0].currentTime = 0;
        //laptopVideos[0].pause();
        // setTimeout(() => {
        //   //console.log(`set time ${LOTTIE_DURATION} seconds!`);
        //   laptopVideos[0].play();
        // }, LOTTIE_DURATION * 1000);
      },
    });
  }

  function laptopMobile(swiper: Swiper) {
    let mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
      // this setup code only runs when viewport is less than 768px wide
      const laptopWrap = document.querySelector("#laptop-section");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: laptopWrap,
          start: "top 10%",
          end: "+=1000px",
          pin: true,
          scrub: true,
        },
      });

      const swiperControlWrap = document.querySelector<HTMLDivElement>(
        ".swiper-control-wrap"
      );
      const swiperControlAnchors = swiperControlWrap?.querySelectorAll(
        ".swiper-control"
      ) as NodeListOf<HTMLAnchorElement>;
      const swiperControlHeadings = swiperControlWrap?.querySelectorAll(
        ".swiper-control_heading"
      ) as NodeListOf<HTMLHeadingElement>;
      const swiperControlTexts = swiperControlWrap?.querySelectorAll(
        ".swiper-control_text"
      ) as NodeListOf<HTMLParagraphElement>;

      swiperControlAnchors.forEach((anchor) => {
        anchor.style.pointerEvents = "none";
        anchor.style.cursor = "default";
      });

      const initialGrayHeading = getComputedStyle(
        swiperControlHeadings[1]
      ).backgroundImage;

      gsap.set(swiperControlHeadings[0], {
        backgroundImage: BG_BLUE_GRADIENT,
      });
      gsap.set(swiperControlTexts[0], { color: WHITE, height: "auto" });

      tl.to(swiperControlTexts[0], { height: 0 })
        .set(swiperControlHeadings[0], { backgroundImage: initialGrayHeading })
        .to(
          swiperControlHeadings[1],
          {
            backgroundImage: BG_PURPLEPINK_GRADIENT,
            onStart: () => {
              swiper.slideTo(1);
            },
            onReverseComplete: () => {
              swiper.slideTo(0);
            },
          },
          "<"
        )
        .to(swiperControlTexts[1], { color: WHITE, height: "auto" }, "<")
        .to(swiperControlTexts[1], { height: 0 })
        .set(swiperControlHeadings[1], { backgroundImage: initialGrayHeading })
        .to(
          swiperControlHeadings[2],
          {
            backgroundImage: BG_REDORANGE_GRADIENT,
            onStart: () => {
              swiper.slideTo(2);
            },
            onReverseComplete: () => {
              swiper.slideTo(1);
            },
          },
          "<"
        )
        .to(swiperControlTexts[2], { color: WHITE, height: "auto" }, "<")
        .to(swiperControlTexts[2], { height: 0 })
        .set(swiperControlHeadings[2], {
          backgroundImage: initialGrayHeading,
        })
        .set(laptopWrap, {
          height: 0,
          onComplete: () => {
            console.log("restart webflow");
          },
        });

      return () => {
        // optional
        // custom cleanup code here (runs when it STOPS matching)
      };
    });
  }

  function swiperController(swiper: Swiper) {
    let activeIndex = 0;
    const DURATION = 0.5;
    const swiperControlWrap = document.querySelector<HTMLDivElement>(
      ".swiper-control-wrap"
    );
    const swiperControlAnchors = swiperControlWrap?.querySelectorAll(
      ".swiper-control"
    ) as NodeListOf<HTMLAnchorElement>;
    const swiperControlHeadings = swiperControlWrap?.querySelectorAll(
      ".swiper-control_heading"
    ) as NodeListOf<HTMLHeadingElement>;
    const swiperControlTexts = swiperControlWrap?.querySelectorAll(
      ".swiper-control_text"
    ) as NodeListOf<HTMLParagraphElement>;
    const topMover = swiperControlWrap?.querySelector(
      ".swiper-control_top-mover"
    );
    if (!topMover) return;

    //init
    const initialGrayHeading = getComputedStyle(
      swiperControlHeadings[0]
    ).backgroundImage;
    const initialGrayText = getComputedStyle(swiperControlTexts[0]).color;
    gsap.set(swiperControlHeadings[0], { backgroundImage: BG_BLUE_GRADIENT });
    gsap.set(swiperControlTexts[0], { color: WHITE, height: "auto" });

    swiperControlAnchors.forEach((control, index) => {
      control.addEventListener("click", () => {
        // do nothing if already active
        if (index === activeIndex) {
          return;
        }
        let lastIndex = activeIndex;
        activeIndex = index;

        // Move Swiper
        swiper.slideTo(activeIndex);

        // Reset Video
        swiper.on("slideChange", () => {
          laptopVideos.forEach((video) => {
            video.currentTime = 0;
            video.pause();
          });
        });
        swiper.on("slideChangeTransitionEnd", () => {
          laptopVideos.forEach((video) => {
            video.play();
          });
        });

        // Top Mover Animation
        const state = Flip.getState(topMover, { props: "backgroundImage" });
        swiperControlAnchors[activeIndex].prepend(topMover);
        gsap.set(topMover, {
          backgroundImage: () => {
            if (activeIndex === 0) {
              return BG_BLUE_GRADIENT;
            } else if (activeIndex === 1) {
              return BG_PURPLEPINK_GRADIENT;
            } else {
              return BG_REDORANGE_GRADIENT;
            }
          },
        });
        Flip.from(state, {
          duration: DURATION,
          ease: "power1.out",
          absolute: true,
        });

        // Headings and Text
        gsap
          .timeline({ defaults: { duration: DURATION, ease: "power1.out" } })
          .to(swiperControlHeadings[lastIndex], {
            backgroundImage: initialGrayHeading,
          })
          .to(
            swiperControlTexts[lastIndex],
            {
              color: initialGrayText,
            },
            "<"
          )
          .to(
            swiperControlHeadings[activeIndex],
            {
              backgroundImage: () => {
                if (activeIndex === 0) {
                  return BG_BLUE_GRADIENT;
                } else if (activeIndex === 1) {
                  return BG_PURPLEPINK_GRADIENT;
                } else {
                  return BG_REDORANGE_GRADIENT;
                }
              },
            },
            "<"
          )
          .to(
            swiperControlTexts[activeIndex],
            {
              color: WHITE,
            },
            "<"
          );

        let mm = gsap.matchMedia();

        mm.add("(max-width: 768px)", () => {
          // this setup code only runs when viewport is less than 768px wide
          gsap
            .timeline({ defaults: { duration: DURATION, ease: "power1.out" } })
            .to(swiperControlTexts, {
              height: "0px",
            })
            .to(
              swiperControlTexts[activeIndex],
              {
                height: "auto",
              },
              "<"
            );

          return () => {
            // optional
            // custom cleanup code here (runs when it STOPS matching)
          };
        });
      });
    });
  }
});
