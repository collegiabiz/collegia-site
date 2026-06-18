const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const dropdownButtons = document.querySelectorAll("[data-dropdown-toggle]");
const modal = document.querySelector("[data-contact-modal]");
const openContactButtons = document.querySelectorAll("[data-open-contact]");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");

function closeMobileMenu() {
  if (!nav || !menuToggle) return;
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function closeDropdowns() {
  document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
    dropdown.classList.remove("open");
    const button = dropdown.querySelector("[data-dropdown-toggle]");
    if (button) button.setAttribute("aria-expanded", "false");
  });
}

function openModal(event) {
  if (!modal) return;
  event.preventDefault();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const firstInput = modal.querySelector("input, select, textarea, button");
  if (firstInput) firstInput.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 10);
});

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

dropdownButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const dropdown = button.closest(".dropdown");
    const isOpen = dropdown.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

openContactButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeDropdowns();
    closeMobileMenu();
  }
});

document.addEventListener("click", (event) => {
  const clickedInsideDropdown = event.target.closest(".dropdown");
  const clickedMenuToggle = event.target.closest("[data-menu-toggle]");
  const clickedInsideNav = event.target.closest("[data-nav]");

  if (!clickedInsideDropdown) closeDropdowns();

  if (!clickedMenuToggle && !clickedInsideNav) closeMobileMenu();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMobileMenu();
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", () => {
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    button.textContent = "Sending...";
    button.disabled = true;
  });
});
