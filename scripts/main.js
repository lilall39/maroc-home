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

  /* ---------- Header : transparent → fond #FFFFFF après 50px de scroll ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var scrolledHeaderBg = "#FFFFFF";

    function updateHeader() {
      if (window.scrollY > 50) {
        header.classList.remove("header-transparent");
        header.classList.add("header-scrolled");
        /* Forçage inline pour éviter les overrides externes (browser/flags). */
        header.style.backgroundColor = scrolledHeaderBg;
        header.style.background = scrolledHeaderBg;
        header.style.color = "#0a0a0a";
        header.style.boxShadow = "0 1px 0 rgba(0, 0, 0, 0.06)";
      } else {
        header.classList.remove("header-scrolled");
        header.classList.add("header-transparent");
        header.style.backgroundColor = "";
        header.style.background = "";
        header.style.color = "";
        header.style.boxShadow = "";
      }
    }
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  /* ---------- Hero : fond #262626 puis carrousel horizontal ---------- */
  var hero = document.querySelector(".hero");
  var heroSlides = Array.prototype.slice.call(
    document.querySelectorAll(".hero .hero-slide")
  );
  var heroTaglineIntro = document.querySelector(".hero .hero-tagline-intro");
  var heroTaglineItems = Array.prototype.slice.call(
    document.querySelectorAll(".hero .hero-tagline-item")
  );
  if (hero && heroSlides.length) {
    var firstSlide = heroSlides[0];
    var currentSlideIndex = 0;
    var heroDisplayMs = 3800;
    var heroSlideTransitionMs = 1100;
    var heroPostTransitionPauseMs = 700;
    var heroIntroDelayMs = 1580;
    var isSlideAnimating = false;
    var heroCarouselTimeoutId = null;
    var introTextSwitched = false;
    var carouselStarted = false;

    function revealHeroImage() {
      window.setTimeout(function () {
        // Dès que l'image 1 entre, on retire la phrase d'intro immédiatement.
        if (heroTaglineIntro) {
          heroTaglineIntro.classList.remove("is-active");
        }
        // Aucun texte de slide pendant le mouvement d'entrée.
        syncTagline(-1);
        hero.classList.add("hero-image-ready");

        function switchFromIntroToFirstSlideText() {
          if (introTextSwitched) {
            return;
          }
          introTextSwitched = true;
          syncTagline(currentSlideIndex);
          if (!carouselStarted && heroSlides.length > 1) {
            carouselStarted = true;
            // Démarre le carrousel à partir de la 1re image visible :
            // elle garde la même durée de lecture que les suivantes.
            scheduleNextSlide(heroDisplayMs);
          }
        }

        function onFirstSlideTransitionEnd(event) {
          if (event.propertyName === "transform") {
            firstSlide.removeEventListener("transitionend", onFirstSlideTransitionEnd);
            switchFromIntroToFirstSlideText();
          }
        }

        // On cale le changement de phrase exactement à la fin de l'entrée de la 1re image.
        firstSlide.addEventListener("transitionend", onFirstSlideTransitionEnd);
        // Fallback sécurité si aucun transitionend n'est émis.
        window.setTimeout(switchFromIntroToFirstSlideText, heroSlideTransitionMs + 120);
      }, heroIntroDelayMs);
    }

    function syncTagline(index) {
      if (!heroTaglineItems.length) {
        return;
      }
      heroTaglineItems.forEach(function (item, itemIndex) {
        if (itemIndex === index && index >= 0) {
          item.classList.add("is-active");
        } else {
          item.classList.remove("is-active", "is-leaving");
        }
      });
    }

    function activateSlide(index) {
      heroSlides.forEach(function (slide, slideIndex) {
        if (slideIndex === index) {
          slide.classList.add("is-active");
        } else {
          slide.classList.remove("is-active", "is-leaving");
        }
      });
      hero.classList.toggle(
        "hero-tone-marine",
        heroSlides[index].classList.contains("hero-slide--marine")
      );
      if (hero.classList.contains("hero-image-ready")) {
        syncTagline(index);
      }
    }

    function transitionToSlide(nextIndex, onComplete) {
      if (isSlideAnimating || nextIndex === currentSlideIndex) {
        return;
      }

      var currentSlide = heroSlides[currentSlideIndex];
      var nextSlide = heroSlides[nextIndex];
      var hasFinished = false;

      isSlideAnimating = true;
      // Pendant le déplacement, on cache toutes les phrases (évite texte/image désynchronisés).
      syncTagline(-1);
      currentSlide.classList.add("is-leaving");
      nextSlide.classList.add("is-active");

      function finishTransition() {
        if (hasFinished) {
          return;
        }
        hasFinished = true;
        nextSlide.removeEventListener("transitionend", onNextSlideTransitionEnd);
        currentSlide.classList.remove("is-active", "is-leaving");
        currentSlideIndex = nextIndex;
        hero.classList.toggle(
          "hero-tone-marine",
          heroSlides[currentSlideIndex].classList.contains("hero-slide--marine")
        );
        // On affiche la phrase seulement une fois l'image posée.
        window.setTimeout(function () {
          syncTagline(currentSlideIndex);
        }, 90);
        isSlideAnimating = false;
        if (typeof onComplete === "function") {
          onComplete();
        }
      }

      function onNextSlideTransitionEnd(event) {
        // On se synchronise précisément sur la fin du glissement horizontal.
        if (event.propertyName === "transform") {
          finishTransition();
        }
      }

      nextSlide.addEventListener("transitionend", onNextSlideTransitionEnd);
      // Fallback sécurité si transitionend ne remonte pas (onglet inactif, etc.).
      window.setTimeout(finishTransition, heroSlideTransitionMs + 120);
    }

    function scheduleNextSlide(delayMs) {
      if (heroCarouselTimeoutId) {
        window.clearTimeout(heroCarouselTimeoutId);
      }
      heroCarouselTimeoutId = window.setTimeout(function () {
        var nextIndex = (currentSlideIndex + 1) % heroSlides.length;
        transitionToSlide(nextIndex, function () {
          // Pause courte après le mouvement pour laisser image + texte “respirer”.
          scheduleNextSlide(heroDisplayMs + heroPostTransitionPauseMs);
        });
      }, delayMs);
    }

    activateSlide(currentSlideIndex);

    if (firstSlide.complete && firstSlide.naturalWidth > 0) {
      // Même si l'image est en cache, on garde un court écran d'intro foncé.
      revealHeroImage();
    } else {
      firstSlide.addEventListener("load", revealHeroImage, { once: true });
      // Sécurité : même en cas d'échec réseau, on évite un état bloqué.
      firstSlide.addEventListener("error", revealHeroImage, { once: true });
    }

    // Le carrousel démarre après la fin de l'intro (voir switchFromIntroToFirstSlideText).
  }

  /* ---------- Accueil : flèche vers la même image sur Réalisations ---------- */
  document.querySelectorAll(".js-home-project-card[data-avis-target]").forEach(function (card) {
    var arrow = card.querySelector(".home-project-avis-arrow");
    if (arrow) {
      arrow.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var target = card.getAttribute("data-avis-target");
        window.location.href = "pages/realisations.html?focus=" + encodeURIComponent(target);
      });
    }

    card.addEventListener("click", function (event) {
      if (event.target && event.target.closest && event.target.closest(".home-project-avis-arrow")) {
        return;
      }
      event.preventDefault();
    });
  });

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

  /* ---------- Ancres page d’accueil : ouvrir le <details> ciblé puis faire défiler ---------- */
  function openDetailsFromHash() {
    var hash = window.location.hash;
    if (hash === "#concept-reseau") {
      var concept = document.getElementById("concept-reseau");
      if (concept && concept.tagName === "DETAILS") {
        concept.open = true;
        window.requestAnimationFrame(function () {
          concept.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
      return;
    }
    if (hash === "#approach-cadrage") {
      var cadrage = document.getElementById("approach-cadrage");
      if (cadrage && cadrage.tagName === "DETAILS") {
        cadrage.open = true;
        window.requestAnimationFrame(function () {
          cadrage.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
      return;
    }
    if (hash === "#approach-etude") {
      var etude = document.getElementById("approach-etude");
      if (etude && etude.tagName === "DETAILS") {
        etude.open = true;
        window.requestAnimationFrame(function () {
          etude.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
      return;
    }
    if (hash === "#approach-artisans") {
      var artisans = document.getElementById("approach-artisans");
      if (artisans && artisans.tagName === "DETAILS") {
        artisans.open = true;
        window.requestAnimationFrame(function () {
          artisans.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
      return;
    }
    if (hash === "#approach-fabrication") {
      var fabrication = document.getElementById("approach-fabrication");
      if (fabrication && fabrication.tagName === "DETAILS") {
        fabrication.open = true;
        window.requestAnimationFrame(function () {
          fabrication.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
      return;
    }
    if (hash === "#approach-livraison") {
      var livraison = document.getElementById("approach-livraison");
      if (livraison && livraison.tagName === "DETAILS") {
        livraison.open = true;
        window.requestAnimationFrame(function () {
          livraison.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
      return;
    }
  }

  window.addEventListener("hashchange", openDetailsFromHash);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", openDetailsFromHash);
  } else {
    openDetailsFromHash();
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
