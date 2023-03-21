import { gsap } from "gsap";

const RED = "#ff576d";
const ORANGE = "#fb913a";
const WHITE = "#ffffff";
const BG_REDORANGE_GRADIENT = `linear-gradient(115deg, ${RED}, ${ORANGE})`;
const BG_WHITE = `linear-gradient(115deg, ${WHITE}, ${WHITE})`;

window.Webflow ||= [];
window.Webflow.push(() => {
  const questionElements = document.querySelectorAll(".faq1_question");
  const textEls = document.querySelectorAll(".our-story_journey-title");
  const answerEls = document.querySelectorAll(".faq1_answer");
  const crossEls = document.querySelectorAll(".cross-vert");
  const bgMidnightEls = document.querySelectorAll(".background-color-midnight");

  gsap.set(answerEls, { height: 0 });

  questionElements.forEach((el, index) => {
    el.addEventListener("click", () => {
      //reset all
      gsap.to(answerEls, { height: 0 });
      gsap.to(textEls, { backgroundImage: BG_WHITE });
      gsap.to(crossEls, { rotateZ: 0 });
      gsap.to(bgMidnightEls, { opacity: 1 });

      // set index
      gsap.to(textEls[index], { backgroundImage: BG_REDORANGE_GRADIENT });
      gsap.to(answerEls[index], { height: "auto" });
      gsap.to(crossEls[index], { rotateZ: 90 });
      gsap.to(bgMidnightEls[index], { opacity: 0 });
    });
  });

  setupScrollBall();
});

function setupScrollBall() {
  const scrollBall = document.querySelector<HTMLAnchorElement>("#scroll-ball");
  const sections = document.querySelectorAll<HTMLDivElement>("[section]");
  scrollBall?.addEventListener("click", () => {
    const currentScrollPosition = window.scrollY;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const y = rect.top + window.scrollY;
      if (currentScrollPosition <= y - 60) {
        lenis.scrollTo(y - 60);
        break;
      }
    }
  });
}
