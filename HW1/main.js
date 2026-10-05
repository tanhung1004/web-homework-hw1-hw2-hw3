const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-navigation");

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

/* =========================
   Mobile navigation
   ========================= */

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

/* =========================
   Close mobile navigation
   after selecting a link
   ========================= */

const navigationLinks = navigation.querySelectorAll("a");

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

/* =========================
   Contact form
   ========================= */

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formStatus.textContent = "Thanks! Your message has been received.";

  contactForm.reset();
});
