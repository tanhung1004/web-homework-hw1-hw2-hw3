/* =========================
   SLICE 1
   DRIFT-FREE COUNTDOWN
========================= */

// UTC ISO 8601 timestamp
const EVENT_TIME = "2026-12-31T12:00:00Z";

const eventTime = new Date(EVENT_TIME).getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function formatTime(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();

  const remainingTime = eventTime - now;

  if (remainingTime <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    clearInterval(countdownInterval);

    return;
  }

  const totalSeconds = Math.floor(remainingTime / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor((totalSeconds % 86400) / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  daysElement.textContent = formatTime(days);
  hoursElement.textContent = formatTime(hours);
  minutesElement.textContent = formatTime(minutes);
  secondsElement.textContent = formatTime(seconds);
}

updateCountdown();

const countdownInterval = setInterval(updateCountdown, 1000);

/* =========================
   SLICE 2
   FORM STATE MACHINE
========================= */

const FORM_STATES = {
  IDLE: "idle",
  SUBMITTING: "submitting",
  SUCCESS: "success",
  ERROR: "error",
};

let formState = FORM_STATES.IDLE;

const registrationForm = document.getElementById("registrationForm");

const submitBtn = document.getElementById("submitBtn");

const formStatus = document.getElementById("formStatus");

/* =========================
   UPDATE FORM UI
========================= */

function renderFormState() {
  switch (formState) {
    case FORM_STATES.IDLE:
      formStatus.textContent = "Status: Idle";
      submitBtn.textContent = "Register";
      submitBtn.disabled = false;
      break;

    case FORM_STATES.SUBMITTING:
      formStatus.textContent = "Status: Submitting...";
      submitBtn.textContent = "Submitting...";
      submitBtn.disabled = true;
      break;

    case FORM_STATES.SUCCESS:
      formStatus.textContent = "Status: Success — Registration completed.";

      submitBtn.textContent = "Register";
      submitBtn.disabled = false;
      break;

    case FORM_STATES.ERROR:
      formStatus.textContent = "Status: Error — Registration failed.";

      submitBtn.textContent = "Try Again";
      submitBtn.disabled = false;
      break;

    default:
      formStatus.textContent = "Status: Idle";
      submitBtn.textContent = "Register";
      submitBtn.disabled = false;
  }
}

/* =========================
   CHANGE STATE
========================= */

function setFormState(newState) {
  formState = newState;

  renderFormState();
}

/* =========================
   SIMULATED SUBMISSION
========================= */

function submitRegistration() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

/* =========================
   SLICE 3A
   DOUBLE-SUBMIT PREVENTION
========================= */

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Prevent another submit while already submitting
  if (formState === FORM_STATES.SUBMITTING) {
    return;
  }

  setFormState(FORM_STATES.SUBMITTING);

  try {
    await submitRegistration();

    setFormState(FORM_STATES.SUCCESS);
  } catch (error) {
    console.error(error);

    setFormState(FORM_STATES.ERROR);
  }
});

/* =========================
   INITIAL STATE
========================= */

setFormState(FORM_STATES.IDLE);
