/**
 * Filtres par catégorie – page Projets
 */
(function () {
  var filterBtns = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".project-card[data-category]");
  if (!filterBtns.length || !cards.length) return;

  /* Sur la page Réalisations, on reste sur place et on ouvre l'avis client */
  var isRealisationsPage = /\/pages\/realisations\.html$/.test(window.location.pathname);
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

    cards.forEach(function (card) {
      card.addEventListener("click", function (event) {
        event.preventDefault();
        var cardIndex = Array.prototype.indexOf.call(cards, card);
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
          renderAvis(0, cards[0]);
          avisModal.classList.add("is-open");
          avisModal.setAttribute("aria-hidden", "false");
        });
      }
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
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      cards.forEach(function (card) {
        var category = card.getAttribute("data-category");
        var show = filter === "all" || category === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });
})();
