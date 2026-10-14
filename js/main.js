// Where custom-order inquiries are sent. Replace with the shop's real address.
const CONTACT_EMAIL = "orders@example.com";

// Mobile navigation
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setNav(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
}

navToggle.addEventListener("click", () => {
  setNav(navToggle.getAttribute("aria-expanded") !== "true");
});
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) setNav(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setNav(false);
});

// Header shadow once the page scrolls
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Product filters
const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.filter;
    filters.forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    products.forEach((p) => {
      p.hidden = value !== "all" && p.dataset.category !== value;
    });
  });
});

// "Inquire" links preselect the product in the form
const interest = document.getElementById("interest");
document.querySelectorAll("[data-product]").forEach((link) => {
  link.addEventListener("click", () => {
    interest.value = link.dataset.product;
  });
});

// Contact form: validate, then open the visitor's mail client
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstInvalid = null;

  form.querySelectorAll("[required]").forEach((input) => {
    const valid = input.checkValidity() && input.value.trim() !== "";
    input.closest(".field").classList.toggle("has-error", !valid);
    input.setAttribute("aria-invalid", String(!valid));
    if (!valid && !firstInvalid) firstInvalid = input;
  });

  if (firstInvalid) {
    status.textContent = "Please fill in your name, a valid email and a few details.";
    status.className = "form-status is-error";
    firstInvalid.focus();
    return;
  }

  const data = new FormData(form);
  const subject = `Inquiry: ${data.get("interest")}`;
  const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nInterested in: ${data.get("interest")}\n\n${data.get("message")}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  status.textContent = "Thanks! Your email app should open with the inquiry ready to send.";
  status.className = "form-status is-ok";
});

// Reveal sections as they scroll into view
const revealTargets = document.querySelectorAll(".section-head, .product, .steps li, .about > *, .faq details, .contact > *");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
