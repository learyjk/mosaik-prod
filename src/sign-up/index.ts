window.addEventListener("load", () => {
  let debug = false;
  const form = document.querySelector<HTMLFormElement>("form");
  if (!form) return;

  const submitButton = form.querySelector<HTMLInputElement>(
    '[wb-data="submit-button"]'
  );
  if (!submitButton) return;
  debug && console.log("selectors finished");

  // @ts-ignore
  Webflow.push(function () {
    // @ts-ignore
    $("form").submit(function () {
      document
        .querySelector(".bg_radial-gradient")
        ?.classList.remove("opacity-0");
      document.querySelectorAll(".demo-shapes")?.forEach((demoShape) => {
        demoShape.classList.remove("opacity-0");
      });

      return true;
    });
  });
});
