
"use strict";

// FIXIT AI — Dashboard navigation

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(
    ".nav-item[data-view]"
  );

  const views = document.querySelectorAll(
    ".view"
  );

  function showView(viewName) {
    const target = document.getElementById(
      "view-" + viewName
    );

    if (!target) {
      console.warn("View not found:", viewName);
      return;
    }

    views.forEach(view => {
      const active = view === target;

      view.classList.toggle("hidden", !active);
      view.hidden = !active;
    });

    navButtons.forEach(button => {
      const active =
        button.dataset.view === viewName;

      button.classList.toggle("active", active);
      button.setAttribute(
        "aria-current",
        active ? "page" : "false"
      );
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      showView(button.dataset.view);
    });
  });

  // Allow other buttons to open diagnosis.
  document.querySelectorAll(
    '[data-view="diagnose"]'
  ).forEach(button => {
    if (!button.classList.contains("nav-item")) {
      button.addEventListener("click", () => {
        showView("diagnose");
      });
    }
  });

  // Set the initial screen.
  showView("overview");
});
