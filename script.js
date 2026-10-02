document.addEventListener("DOMContentLoaded", () => {
  // ES6 variables, arrow functions, DOM manipulation
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const currentYear = document.getElementById("currentYear");
  const backToTop = document.getElementById("backToTop");
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const skillButtons = document.querySelectorAll(".skill-filter");
  const skillItems = document.querySelectorAll(".skill-item");

  currentYear.textContent = new Date().getFullYear();

  // Interactive feature 1: theme switching
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.innerHTML = '<i class="bi bi-sun" aria-hidden="true"></i>';
    themeToggle.setAttribute("aria-label", "Switch to light theme");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const dark = body.classList.contains("dark");
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    themeToggle.innerHTML = dark
      ? '<i class="bi bi-sun" aria-hidden="true"></i>'
      : '<i class="bi bi-moon-stars" aria-hidden="true"></i>';
    themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  });

  // Interactive feature 2: project/skill-style filtering
  skillButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      skillButtons.forEach((btn) => {
        btn.classList.remove("active", "btn-primary");
        btn.classList.add("btn-outline-primary");
      });
      button.classList.add("active", "btn-primary");
      button.classList.remove("btn-outline-primary");

      skillItems.forEach((item) => {
        const show = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("d-none", !show);
      });
    });
  });

  // Client-side form validation + dynamic success message
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      event.stopPropagation();
      contactForm.classList.add("was-validated");
      formMessage.innerHTML = '<div class="alert alert-danger" role="alert">Please correct the highlighted fields and try again.</div>';
      return;
    }

    contactForm.classList.remove("was-validated");
    formMessage.innerHTML = '<div class="alert alert-success" role="alert">Thank you! Your message passed validation. This demo form does not send data to a server.</div>';
    contactForm.reset();
  });

  // Back-to-top interaction
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Close mobile navbar after clicking a link
  document.querySelectorAll(".navbar .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("portfolioNav");
      if (nav.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
});
