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
  // Always get the real current time
  const now = Date.now();

  // Calculate remaining time again on every update
  const remainingTime = eventTime - now;

  // Event has finished
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

// Run immediately when the page loads
updateCountdown();

// Refresh display every second
const countdownInterval = setInterval(updateCountdown, 1000);
