import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { Flip } from "gsap/Flip";
import Swiper, { Navigation } from "swiper";
import { initAnimations } from "../utils/initAnimations";
import "swiper/css/bundle";

gsap.registerPlugin(TextPlugin, ScrollTrigger, ScrollToPlugin, Flip);

const RED = "#ff576d";
const ORANGE = "#fb913a";
const NAVY = "#181d2c";
const GRAY = "#3d414e";
const WHITE = "#ffffff";
const DARK_BLUE = "#4673D1";
const LIGHT_BLUE = "#51BFE1";
const PURPLE = "#928CDA";
const PINK = "#FF576D";
const BG_REDORANGE_GRADIENT = `linear-gradient(115deg, ${RED}, ${ORANGE})`;
const BG_BLUE_GRADIENT = `linear-gradient(115deg, ${DARK_BLUE}, ${LIGHT_BLUE})`;
const BG_PURPLEPINK_GRADIENT = `linear-gradient(115deg, ${PURPLE}, ${PINK})`;
const BG_WHITE_GRADIENT = `linear-gradient(115deg, ${WHITE}, ${WHITE})`;

window.Webflow ||= [];
window.Webflow.push(() => {
  // pasue videos when offscreen, play when onscreen
  const observer = new IntersectionObserver((entries) => {
    for (let i = 0; i < entries.length; i++) {
      let video = entries[i].target as HTMLVideoElement;
      if (i >= 2 && i <= 6) {
        break;
      } else if (entries[i].isIntersecting) {
        video.play();
        //console.log(`playing ${video}`);
      } else {
        video.pause();
        //console.log(`pausing ${video}`);
      }
    }
  });

  //loading videos
  const allVideos = document.querySelectorAll("video");
  console.log({ videos: allVideos });
  let loadedVideos = 0;
  allVideos.forEach((video) => {
    observer.observe(video);
    //video.addEventListener("canplay", handleVideoCanPlay);
    //video.addEventListener("canplaythrough", handleVideoCanPlayThrough);
  });

  function handleVideoCanPlay(event) {}

  function handleVideoCanPlayThrough(event) {
    loadedVideos++;
    console.log({ loadedVideos });
    if (loadedVideos === allVideos.length) {
      // All videos have finished loading
      console.log("All videos have finished loading!");
    }
  }

  // Observe the video element
  // allVideos.forEach((video) => observer.observe(video));

  typeWriterIntro();
  functionalitySuiteComponent();
  let swiper = buildSwiper();
  initAnimations()
    .then(() => {
      console.info("finished loading animations");
      swiperController(swiper);
      laptopOpening();
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
        scrub: 0.5,
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
        scrub: 0.5,
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
      console.log("reset video times");
      allVideos.forEach((video, index) => {
        if (index >= 2 && index <= 6) {
          video.currentTime = 0;
        }
      });
    }
  }

  function typeWriterIntro() {
    document.querySelector(".placeholder-text")?.remove();
    const words = ["Every superhero needs a sidekick..."];

    gsap.to("#cursor", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "power4.inout",
    });

    let tlMaster = gsap.timeline();

    words.forEach((word) => {
      let tlText = gsap.timeline();
      tlText.to("#animated-text", { duration: 3, delay: 2, text: word });
      tlMaster.add(tlText);
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

  function laptopOpening() {
    const LOTTIE_DURATION = 1.7;
    ScrollTrigger.create({
      trigger: ".swiper-control-wrap",
      start: "top bottom",
      onToggle: () => {
        setTimeout(() => {
          console.log(`set time ${LOTTIE_DURATION} seconds!`);
          laptopVideos[0].currentTime = 0;
        }, LOTTIE_DURATION * 1000);
      },
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
