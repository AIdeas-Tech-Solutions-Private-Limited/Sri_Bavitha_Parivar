(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".main-nav");
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".main-nav a");
  var backToTop = document.querySelector(".back-to-top");
  var sectionIds = ["hero", "founder", "awards", "legal", "products", "roi", "income-types", "direct-referral", "level-incomes", "bonanza-structure", "bonanza", "pre-launch", "chairman-club", "terms"];

  // Smooth scroll for anchor links (enhance native scroll-behavior)
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          if (nav && nav.classList.contains("is-open")) {
            nav.classList.remove("is-open");
            if (navToggle) navToggle.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
  });

  // Mobile menu toggle
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
      navToggle.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");
      nav.classList.toggle("is-open", !expanded);
    });
  }

  // Active nav item on scroll
  function setActiveNav() {
    var scrollY = window.pageYOffset;
    var headerHeight = header ? header.offsetHeight : 0;
    var tolerance = 100;

    for (var i = sectionIds.length - 1; i >= 0; i--) {
      var section = document.getElementById(sectionIds[i]);
      if (!section) continue;
      var top = section.offsetTop - headerHeight;
      if (scrollY >= top - tolerance) {
        navLinks.forEach(function (link) {
          var href = link.getAttribute("href");
          if (href === "#" + sectionIds[i]) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
        return;
      }
    }
    navLinks.forEach(function (link) {
      link.classList.remove("active");
    });
  }

  // Back to top visibility
  function updateBackToTop() {
    if (!backToTop) return;
    if (window.pageYOffset > 400) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  }

  // Throttled scroll handler
  var scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        setActiveNav();
        updateBackToTop();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", function () {
    setActiveNav();
    updateBackToTop();
  });

  // Scroll-triggered section reveal: fade in from bottom when section enters the lower 30% of viewport
  var sections = document.querySelectorAll(".section");
  if (typeof IntersectionObserver !== "undefined") {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "-70% 0px 0px 0px", threshold: 0.05 }
    );
    sections.forEach(function (section) {
      revealObserver.observe(section);
    });
  } else {
    sections.forEach(function (section) {
      section.classList.add("is-visible");
    });
  }
})();
