
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");

  if (!toggle || !menu) return;

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.textContent = "☰";
  }

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  window.matchMedia("(min-width: 901px)")
    .addEventListener("change", event => {
      if (event.matches) closeMenu();
    });
});
