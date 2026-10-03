document.addEventListener("DOMContentLoaded", function () {
  var weekLink = document.querySelector(
    ".wy-menu-vertical li.toctree-l1.current > a.current:not([href])"
  );
  if (weekLink) {
    weekLink.id = "sidebar-current-week";
  }

  document.querySelectorAll(".week-crumb").forEach(function (el) {
    el.addEventListener("click", function () {
      var target = document.getElementById("sidebar-current-week");
      if (!target) return;

      // On mobile, the sidebar is hidden behind the nav toggle until opened.
      var navToggle = document.querySelector("[data-toggle='wy-nav-top'], .wy-nav-top i");
      if (navToggle && window.getComputedStyle(navToggle).display !== "none") {
        document.body.classList.add("wy-nav-shift");
        var sidebar = document.querySelector(".wy-nav-side");
        if (sidebar) sidebar.classList.add("shift");
      }

      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("sidebar-flash");
      setTimeout(function () {
        target.classList.remove("sidebar-flash");
      }, 1200);
    });
  });
});
