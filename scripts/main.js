/**
 * Script principal – navigation, header au scroll, révélations au scroll, lazy loading
 */

(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var navList = document.getElementById("nav-list");
  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      navList.classList.toggle("open");
    });
    // Fermer en cliquant sur un lien (navigation)
    navList.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("open");
      });
    });
  }

  /* ---------- Header : fond après scroll (page d'accueil) ---------- */
  var header = document.getElementById("site-header");
  if (header && !header.classList.contains("light")) {
    function updateHeader() {
      if (window.scrollY > 80) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  /* ---------- Révélation au scroll (fade-in) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Lazy loading des images (natif si supporté) ---------- */
  var images = document.querySelectorAll("img[data-src]");
  if (images.length && "IntersectionObserver" in window) {
    var imgObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.getAttribute("data-src") || img.src;
            img.removeAttribute("data-src");
            imgObserver.unobserve(img);
          }
        });
      },
      { rootMargin: "100px" }
    );
    images.forEach(function (img) {
      imgObserver.observe(img);
    });
  }
})();
