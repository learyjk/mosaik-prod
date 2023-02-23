async function animationLoaded(animation) {
  if (animation.isLoaded) {
    return true;
  }

  return new Promise((resolve, reject) => {
    animation.addEventListener("DOMLoaded", () => {
      resolve(true);
    });
  });
}

// Return a promise that resolves to true once all animations are loaded
async function waitForAnimationsLoaded(animations) {
  await Promise.all(animations.map(animationLoaded));
}

export async function initAnimations() {
  const lottie = Webflow.require("lottie").lottie;
  const animations = lottie.getRegisteredAnimations();
  await waitForAnimationsLoaded(animations);
}
