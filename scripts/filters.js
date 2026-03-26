/**
 * Filtres par catégorie – page Projets
 */
(function () {
  var filterBtns = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".project-card[data-category]");
  if (!filterBtns.length || !cards.length) return;

  function applyFilter(filter) {
    filterBtns.forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-filter") === filter);
    });

    cards.forEach(function (card) {
      var category = card.getAttribute("data-category");
      var show;
      if (filter === "all") {
        show = category === "avis";
      } else {
        show = category === filter;
      }
      card.classList.toggle("hidden", !show);
    });

    /* Vidéos : visibles uniquement sur l’onglet Traditionnel */
    var shouldShowVideo = filter === "traditionnel";
    document.querySelectorAll(".project-card[data-video-card]").forEach(function (videoCard) {
      videoCard.classList.toggle("show-video", shouldShowVideo);
      var video = videoCard.querySelector("video");
      if (!video) return;
      video.pause();
      video.currentTime = 0;
      if (shouldShowVideo) {
        try {
          video.load();
        } catch (e) {}
      }
    });
  }

  /* Sur la page Réalisations, on reste sur place et on ouvre l'avis client */
  var isRealisationsPage =
    /\/pages\/realisations\.html$/.test(window.location.pathname) ||
    /\/realisations\/?$/.test(window.location.pathname) ||
    /\/projets\/?$/.test(window.location.pathname);
  if (isRealisationsPage) {
    var avisItems = [
      {
        image: "../assets/images/projet-1-avis-client.png",
        title: "",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-2-avis-client.png",
        title: "Table basse en travertin beige",
        subtitle: "Forme bloc rectangulaire plein (style \"monolithe\") Design minimaliste / wabi-sabi / contemporain"
      },
      {
        image: "../assets/images/projet-3-avis-client.png",
        title: "Pierre naturelle (travertin) -> table / Bois + textile -> chaises / MDF / bois plaque -> meuble / Enduit decoratif -> murs / Metal + verre -> structure",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-4-avis-client.png",
        title: "Table en travertin naturel massif, au design monolithe sculpte, alliant elegance brute et esthetique contemporaine haut de gamme.",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-5-avis-client.png",
        title: "Une table en travertin aux lignes epurees, sublimee par un pied cannele sculptural, qui incarne une elegance minerale et contemporaine.",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-6-avis-client.png",
        title: "Console en marbre du Guatemala",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-avis-7.png",
        title: "",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-avis-8.png",
        title: "",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-avis-9.png",
        title: "",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-avis-10.png",
        title: "",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-avis-11.png",
        title: "",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-avis-12.png",
        title: "",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-avis-13.png",
        title: "",
        subtitle: ""
      },
      {
        image: "../assets/images/projet-avis-14.png",
        title: "",
        subtitle: ""
      }
    ];
    var currentAvisIndex = 0;

    var avisModal = document.createElement("div");
    avisModal.className = "projet-avis-modal";
    avisModal.setAttribute("aria-hidden", "true");
    avisModal.innerHTML = '<button class="projet-avis-nav projet-avis-prev" type="button" aria-label="Avis précédent">‹</button><div class="projet-avis-content"><p class="projet-avis-title"></p><p class="projet-avis-subtitle"></p><div class="projet-avis-frame"><img class="projet-avis-image" alt="Avis du client" width="800" height="600"></div></div><button class="projet-avis-nav projet-avis-next" type="button" aria-label="Avis suivant">›</button>';
    document.body.appendChild(avisModal);

    var avisFrame = avisModal.querySelector(".projet-avis-frame");
    var avisImage = avisModal.querySelector(".projet-avis-image");
    var avisTitle = avisModal.querySelector(".projet-avis-title");
    var avisSubtitle = avisModal.querySelector(".projet-avis-subtitle");
    var avisPrevBtn = avisModal.querySelector(".projet-avis-prev");
    var avisNextBtn = avisModal.querySelector(".projet-avis-next");

    function closeAvisModal() {
      avisModal.classList.remove("is-open");
      avisModal.setAttribute("aria-hidden", "true");
    }

    function renderAvis(index, triggerCard) {
      if (!avisItems.length || !avisImage || !avisFrame) return;
      currentAvisIndex = (index + avisItems.length) % avisItems.length;
      var avisItem = avisItems[currentAvisIndex];
      if (!avisItem) return;
      if (avisItem.image) {
        avisImage.src = avisItem.image;
        avisFrame.style.display = "block";
      } else {
        avisImage.removeAttribute("src");
        avisFrame.style.display = "none";
      }
      if (avisTitle) avisTitle.textContent = avisItem.title || "";
      if (avisSubtitle) avisSubtitle.textContent = avisItem.subtitle || "";
      if (avisTitle) avisTitle.style.display = avisItem.title ? "block" : "none";
      if (avisSubtitle) avisSubtitle.style.display = avisItem.subtitle ? "block" : "none";
      var showNav = avisItems.length > 1;
      if (avisPrevBtn) avisPrevBtn.style.display = showNav ? "flex" : "none";
      if (avisNextBtn) avisNextBtn.style.display = showNav ? "flex" : "none";
    }

    var avisCards = document.querySelectorAll('.project-card[data-category="avis"]');
    avisCards.forEach(function (card) {
      card.addEventListener("click", function (event) {
        /* Si on clique sur une vidéo (ou ses contrôles), on laisse le lecteur agir */
        if (event.target && event.target.closest && event.target.closest("video")) {
          return;
        }
        event.preventDefault();
        var cardIndex = Array.prototype.indexOf.call(avisCards, card);
        if (cardIndex >= 0 && cardIndex < avisItems.length) {
          renderAvis(cardIndex, card);
          avisModal.classList.add("is-open");
          avisModal.setAttribute("aria-hidden", "false");
        }
      });
    });

    filterBtns.forEach(function (btn) {
      if (btn.getAttribute("data-filter") === "all") {
        btn.addEventListener("click", function () {
          renderAvis(0, avisCards[0]);
          avisModal.classList.add("is-open");
          avisModal.setAttribute("aria-hidden", "false");
        });
      }
    });

    /* Bouton “Avis client” sur une carte */
    document.querySelectorAll(".avis-link[data-avis-index]").forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var indexAttr = btn.getAttribute("data-avis-index");
        var index = Number(indexAttr);
        if (!Number.isFinite(index)) return;
        renderAvis(index);
        avisModal.classList.add("is-open");
        avisModal.setAttribute("aria-hidden", "false");
      });
    });

    if (avisPrevBtn) {
      avisPrevBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        renderAvis(currentAvisIndex - 1);
      });
    }

    if (avisNextBtn) {
      avisNextBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        renderAvis(currentAvisIndex + 1);
      });
    }

    avisModal.addEventListener("click", function (event) {
      if (event.target === avisModal) closeAvisModal();
    });

    if (avisFrame) {
      avisFrame.addEventListener("click", closeAvisModal);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAvisModal();
    });

    /* Zoom au clic sur les cartes “Pièces signatures” */
    var zoomModal = document.createElement("div");
    zoomModal.className = "signature-zoom-modal";
    zoomModal.setAttribute("aria-hidden", "true");
    zoomModal.innerHTML =
      '<img class="signature-zoom-image" alt="Agrandissement" width="1200" height="800">';
    document.body.appendChild(zoomModal);
    var zoomImage = zoomModal.querySelector(".signature-zoom-image");

    function closeZoom() {
      zoomModal.classList.remove("is-open");
      zoomModal.setAttribute("aria-hidden", "true");
      if (zoomImage) zoomImage.removeAttribute("src");
    }

    document.querySelectorAll(".project-card--signature").forEach(function (card) {
      card.addEventListener("click", function (event) {
        // Ne pas ouvrir si on clique sur un bouton (au cas où)
        if (event.target && event.target.closest && event.target.closest("button")) return;
        var img = card.querySelector("img");
        if (!img || !zoomImage) return;
        zoomImage.src = img.getAttribute("src") || "";
        zoomModal.classList.add("is-open");
        zoomModal.setAttribute("aria-hidden", "false");
      });
    });

    zoomModal.addEventListener("click", function () {
      closeZoom();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeZoom();
    });

    /* Deep-link : /pages/realisations.html?avis=0 ouvre directement l’avis */
    if (typeof URLSearchParams !== "undefined") {
      try {
        var params = new URLSearchParams(window.location.search || "");
        var avisParam = params.get("avis");
        if (avisParam != null && avisParam !== "") {
          var requestedIndex = Number(avisParam);
          if (Number.isFinite(requestedIndex)) {
            applyFilter("all");
            renderAvis(requestedIndex);
            avisModal.classList.add("is-open");
            avisModal.setAttribute("aria-hidden", "false");
          }
        }
      } catch (e) {}
    }
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      if (filter === "futuriste") {
        window.location.href = "a-propos.html";
        return;
      }
      applyFilter(filter);
    });
  });

  /* Appliquer l’onglet actif au chargement (évite les doublons visibles) */
  var initialActive = document.querySelector(".filter-btn.active");
  applyFilter((initialActive && initialActive.getAttribute("data-filter")) || "all");
})();
