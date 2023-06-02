window.addEventListener("load", () => {
  let debug = true;
  const form = document.querySelector<HTMLFormElement>("form");
  if (!form) return;
  const wTabContent = form.querySelector<HTMLDivElement>(".w-tab-content");
  if (!wTabContent) return;
  const formContentPanes =
    wTabContent.querySelectorAll<HTMLDivElement>("[data-w-tab]");
  const tabMenu = form.querySelector<HTMLDivElement>(".w-tab-menu");
  if (!tabMenu) return;
  const tabLinks = tabMenu.querySelectorAll<HTMLAnchorElement>("a");
  if (!tabLinks) return;
  const nextButton = form.querySelector<HTMLAnchorElement>(
    '[wb-data="next-button"]'
  );
  if (!nextButton) return;
  //   const backButton = document.querySelector<HTMLAnchorElement>('[wb-data="back-button"]');
  //   if (!backButton) return;
  const submitButton = form.querySelector<HTMLInputElement>(
    '[wb-data="submit-button"]'
  );
  if (!submitButton) return;
  debug && console.log("selectors finished");

  //checkIfRedirect();

  // set current step to start form
  let currentStep = 0;
  let numberOfSteps = formContentPanes.length;

  debug && console.log({ numberOfSteps });
  debug && console.log({ currentStep });

  // inputs
  const formFields = document.querySelectorAll<HTMLInputElement>("input");

  const validateEmail = (value: string) => {
    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (value.match(emailValidation)) {
      return true;
    }
    return false;
  };

  const checkInputValidity = (input: HTMLInputElement) => {
    let { type, value, checked } = input;
    if (type === "text") {
      if (value.length > 0) {
        return true;
      } else {
        return false;
      }
    } else if (type === "email") {
      return validateEmail(value);
    } else if (type === "radio") {
      return checked;
    }
  };

  const checkStepValidityAndRequired = () => {
    const stepInputs =
      wTabContent.children[currentStep].querySelectorAll<HTMLInputElement>(
        "input"
      );

    //console.log({ stepInputs });
    for (const input of stepInputs) {
      let isRequired = input.required;
      let isValid = checkInputValidity(input);
      if (input.type === "radio") {
        if (isValid) {
          return true;
        }
      } else {
        if (isRequired && !isValid) return false;
      }
    }
    return true;
  };

  const updateUI = (isValid: boolean) => {
    // last step
    if (currentStep === numberOfSteps - 1) {
      nextButton.classList.add("hide");
    } else {
      nextButton.classList.remove("hide");
    }

    // first step logic to redirect to demo page
    if (currentStep === 0) {
      const seeDemoRadio =
        document.querySelector<HTMLInputElement>("#See-a-demo");
      if (seeDemoRadio?.checked) {
        window.location.href = `${window.location.origin}/get-a-demo`;
      }
    }

    // update next button
    if (isValid) {
      nextButton.classList.remove("disabled");
      submitButton.classList.remove("disabled");
    } else {
      nextButton.classList.add("disabled");
      submitButton.classList.add("disabled");
    }
  };
  updateUI(false); // initial load

  const handleFormChange = (e) => {
    let type = e.target.type;
    let value = e.target.value;
    const isValid = checkStepValidityAndRequired();
    //let isValid = checkInputValidity(type, value);
    updateUI(isValid);
  };

  const handleNextButtonClicked = (e) => {
    currentStep++;
    let oncomingForm = formContentPanes[currentStep].querySelector("input");
    if (!oncomingForm) return;
    let type = oncomingForm.type;
    let value = oncomingForm.value;
    let isValid = checkInputValidity(oncomingForm);
    updateUI(isValid);
    tabLinks[currentStep].click();
  };

  //   const handleBackButtonClicked = (e) => {
  //     currentStep--;
  //     let oncomingForm = formContentPanes[currentStep].querySelector('input');
  //     if (!oncomingForm) return;
  //     let type = oncomingForm.type;
  //     let value = oncomingForm.value;
  //     let isValid = checkInputValidity(type, value);
  //     updateUI(isValid);
  //     tabLinks[currentStep].click();
  //   };

  const getFormData = (form: HTMLFormElement) => {
    let fData = new FormData(form);
    return {
      name: fData.get("name")?.toString() || "",
      email: fData.get("email")?.toString() || "",
      phone: fData.get("phone")?.toString() || "",
      role: fData.get("role")?.toString() || "",
    };
  };

  Webflow.push(function () {
    $("form").submit(function () {
      if (currentStep === numberOfSteps - 1) {
        //backButton.classList.add('hide');
        document
          .querySelector(".bg_radial-gradient")
          ?.classList.remove("opacity-0");
        document.querySelectorAll(".demo-shapes")?.forEach((demoShape) => {
          demoShape.classList.remove("opacity-0");
        });

        const form = this as HTMLFormElement;
        const { name, email, phone, role } = getFormData(form);

        const calendlyButton =
          document.querySelector<HTMLAnchorElement>("#calendly-button");
        if (!calendlyButton) return true; // just submit the form
        calendlyButton!.href += `?name=${encodeURIComponent(
          name
        )}&email=${encodeURIComponent(email)}`;

        return true;
      } else {
        document
          .querySelector(".bg_radial-gradient")
          ?.classList.remove("opacity-0");
        document.querySelectorAll(".demo-shapes")?.forEach((demoShape) => {
          demoShape.classList.remove("opacity-0");
        });
        return true;
        // return false
      }
    });
  });

  formFields.forEach((formField) => {
    formField.addEventListener("input", handleFormChange);
  });

  nextButton?.addEventListener("click", handleNextButtonClicked);
  //backButton?.addEventListener('click', handleBackButtonClicked);

  document.addEventListener("keypress", function (e) {
    if (currentStep === numberOfSteps - 1) return;
    if (e.key === "Enter") {
      if (nextButton.classList.contains("disabled")) return;
      setTimeout(() => {
        nextButton.click();
      }, 500);
    }
  });

  function checkIfRedirect() {
    let urlParams = new URLSearchParams(window.location.search);
    let activeTab = urlParams.get("activeTab");
    if (activeTab === "1") {
      // tabLinks[1].click();
      // setTimeout(() => {
      simulateClick(tabLinks[1]);
      nextButton?.remove();
      // }, 0);
    }
  }

  function simulateClick(element: HTMLAnchorElement) {
    // Add event listener that stops default actions.
    element.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
      },
      false
    );

    let clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false,
    });

    element.dispatchEvent(clickEvent);
  }
});
