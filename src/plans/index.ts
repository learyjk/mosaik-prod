import { gsap } from "gsap";

enum SELECTORS {
  NUM_AGENTS = "#num-agents",
  NUM_ADMIN = "#num-admin",
  NUM_STATES = "#num-states",
  BUSINESS_TYPE = "#business-type",
  STEP = ".plans_step",
  GET_STARTED_BUTTON = "#get-started-button",
  TABS_MENU = ".w-tab-menu",
  ROW_WRAP = ".plans_form-row-wrap",
  NEXT_BUTTON = "#next-button",
  INPUT_FIELDS = ".plans_input-field",
  MONTHLY_COST = "#monthly-cost",
  IMPLEMENTATION_FEES = "#implementation-fee",
  PLAN_NAME = '[data-calc="plan-name"]',
  CHECKBOX = "#checkbox",
  TEAM_MANAGEMENT = '[data-calc="team-management"]',
  BACK_BUTTON = '[data-calc="back-button"]',
}

enum PLANS {
  ENTERPRISE = "enterprise",
  TEAM = "team",
  INDIVIDUAL = "individual",
  CUSTOM = "custom",
  PRO = "pro",
  GROW = "grow",
  SCALE = "scale",
}

const tabLinks = document.querySelectorAll<HTMLAnchorElement>(
  `${SELECTORS.TABS_MENU} a`
);
const rowWraps = document.querySelectorAll<HTMLDivElement>(SELECTORS.ROW_WRAP);
const inputFields = document.querySelectorAll<HTMLInputElement>(
  SELECTORS.INPUT_FIELDS
);

const businessTypeSelect = document.querySelector<HTMLSelectElement>(
  SELECTORS.BUSINESS_TYPE
);

const numAgents = document.querySelector<HTMLInputElement>(
  SELECTORS.NUM_AGENTS
);
const numAdmin = document.querySelector<HTMLInputElement>(SELECTORS.NUM_ADMIN);
const numStates = document.querySelector<HTMLInputElement>(
  SELECTORS.NUM_STATES
);
const planNameEls = document.querySelectorAll<HTMLSpanElement>(
  SELECTORS.PLAN_NAME
);
const getStartedButton = document.querySelector<HTMLAnchorElement>(
  SELECTORS.GET_STARTED_BUTTON
);
const nextButton = document.querySelector<HTMLAnchorElement>(
  SELECTORS.NEXT_BUTTON
);
const teamManagementEl = document.querySelector<HTMLSpanElement>(
  SELECTORS.TEAM_MANAGEMENT
);
const backButtons = document.querySelectorAll<HTMLAnchorElement>(
  SELECTORS.BACK_BUTTON
);

console.log({ rowWraps, inputFields });

let currentStep = 0;
let subStep = 0;

if (numStates) {
  numStates.value = "1";
}

gsap.fromTo(
  rowWraps[subStep],
  { opacity: 0 },
  { gridTemplateRows: "auto", opacity: 1 }
);

function showNextStep() {
  if (currentStep === 0) {
    currentStep++;
    tabLinks[currentStep].click();
  } else if (currentStep === 1) {
    if (subStep !== 3) {
      // display tab 2 options
      subStep++;
      console.log({ subStep });
      gsap.fromTo(
        rowWraps[subStep],
        { opacity: 0 },
        {
          gridTemplateRows: "auto",
          opacity: 1,
          onComplete: () => {
            gsap.set(rowWraps[subStep], { overflow: "visible" });
            inputFields[subStep].focus();
          },
        }
      );
      if (subStep !== 3) {
        nextButton?.classList.add("disabled");
      } else {
        nextButton!.textContent = "Calculate Pricing";
      }
    } else {
      // go to last step
      const plan = calculatePriceAndUpdateUI();

      scrollTo(0, 0);

      if (plan === PLANS.ENTERPRISE || plan === PLANS.CUSTOM) {
        currentStep += 2;
        tabLinks[currentStep].click();
        makeBackButtonsVisible();
      } else {
        currentStep++;
        tabLinks[currentStep].click();
        makeBackButtonsVisible();
      }
    }
  }
}

for (let i = 0; i < 3; i++) {
  let input = inputFields[i];
  input.addEventListener("input", (event) => {
    if (input.value === "") {
      nextButton?.classList.add("disabled");
    } else {
      nextButton?.classList.remove("disabled");
    }

    const lastText = document.querySelectorAll(".plans_input-text")[3];
    const dropDownToggle =
      document.querySelector<HTMLDivElement>(".dropdown-toggle-2");
    const dropDownBorder = inputFields[3];
    input.addEventListener("focus", (event) => {
      lastText.classList.remove("text-color-white");
      dropDownToggle!.style.color = "rgba(255, 255, 255, 0.2)";
      dropDownBorder.style.border = "2px solid rgba(255, 255, 255, 0.2)";
    });

    input.addEventListener("blur", (event) => {
      lastText.classList.add("text-color-white");
      dropDownToggle!.style.color = "rgba(255, 255, 255, 1)";
      dropDownBorder.style.border = "2px solid rgba(255, 255, 255, 1)";
    });
  });
}

nextButton?.classList.add("disabled");
getStartedButton?.addEventListener("click", showNextStep);
nextButton?.addEventListener("click", showNextStep);
backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentStep = 1;
    tabLinks[currentStep].click();
    makeBackButtonsInvisible();
  });
});

function calculatePriceAndUpdateUI() {
  let implementationFee = 0;
  let monthlyFee = 0;
  let planName = "";

  const numUsers =
    parseInt(numAgents!.value, 10) + parseInt(numAdmin!.value, 10);
  const businessType = businessTypeSelect!.value;

  // plan
  if (businessType === "Brokerage" || businessType === "MLS") {
    planName = PLANS.ENTERPRISE;
  } else if (businessType === "Other") {
    planName = PLANS.CUSTOM;
  } else if (businessType === "Solo Agent") {
    teamManagementEl!.style.display = "none";
    if (numUsers < 2) {
      planName = PLANS.PRO;
    } else {
      planName = PLANS.GROW;
    }
  } else if (businessType === "Team") {
    if (numUsers < 2) {
      planName = PLANS.PRO;
    } else if (numUsers < 6) {
      planName = PLANS.GROW;
    } else if (numUsers < 51) {
      planName = PLANS.SCALE;
    } else {
      planName = PLANS.CUSTOM;
    }
  } else {
    planName = PLANS.CUSTOM;
  }

  // cost
  if (numUsers === 1) {
    implementationFee = 250;
    monthlyFee = 75;
  } else if (numUsers < 6) {
    implementationFee = 250;
    monthlyFee = 60;
  } else {
    implementationFee = 450;
    monthlyFee = 50;
  }

  // states
  // add $100 for each additional state above 1
  implementationFee += 100 * (parseInt(numStates!.value, 10) - 1);

  // updateUI
  const monthlyCostEl = document.querySelector<HTMLDivElement>(
    SELECTORS.MONTHLY_COST
  );
  const implementationFeeEl = document.querySelector<HTMLDivElement>(
    SELECTORS.IMPLEMENTATION_FEES
  );

  console.log({ numUsers, numStates, businessType });
  console.log({ monthlyFee, implementationFee, planName });

  monthlyCostEl!.textContent = monthlyFee.toString();
  implementationFeeEl!.textContent = implementationFee.toString();
  planNameEls.forEach((el) => {
    el.textContent = planName;
  });

  return planName;
}

const checkbox = document.querySelector<HTMLInputElement>(SELECTORS.CHECKBOX);
checkbox?.addEventListener("change", (event) => {
  const monthlyCostEl = document.querySelector<HTMLDivElement>(
    SELECTORS.MONTHLY_COST
  );
  if (checkbox.checked) {
    monthlyCostEl!.textContent = Math.ceil(
      parseInt(monthlyCostEl!.textContent as string, 10) * 0.8
    ).toString();
  } else {
    monthlyCostEl!.textContent = Math.ceil(
      parseInt(monthlyCostEl!.textContent as string, 10) * 1.25
    ).toString();
  }
});

function makeBackButtonsVisible() {
  backButtons.forEach((button) => {
    button!.classList.remove("off");
  });
}

function makeBackButtonsInvisible() {
  backButtons.forEach((button) => {
    button!.classList.add("off");
  });
}
