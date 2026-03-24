/**
 * Page détail projet – chargement des données selon ?id=
 */
(function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10) || 1;
  const openAvisOnLoad = params.get("avis") === "1" || id === 1;
  const index = Math.max(0, PROJETS_DATA.findIndex(function (p) { return p.id === id; }));
  const projet = PROJETS_DATA[index] || PROJETS_DATA[0];
  const nextIndex = (index + 1) % PROJETS_DATA.length;
  const nextProjet = PROJETS_DATA[nextIndex];

  /* Titre page */
  document.title = projet.title + " – Assia";

  /* Image principale */
  var mainImg = document.getElementById("projet-main-image");
  if (mainImg) {
    mainImg.src = projet.mainImage;
    mainImg.alt = projet.title;
  }

  /* Titre */
  var titleEl = document.getElementById("projet-title");
  if (titleEl) titleEl.textContent = projet.title;

  /* Description */
  var descEl = document.getElementById("projet-description");
  if (descEl) {
    var paragraphs = projet.description.split(/\n\n+/).filter(Boolean);
    descEl.innerHTML = paragraphs.length
      ? paragraphs.map(function (p) { return "<p>" + p + "</p>"; }).join("")
      : "<p>" + projet.description + "</p>";
  }

  /* Meta */
  var typeEl = document.getElementById("projet-type");
  var lieuEl = document.getElementById("projet-lieu");
  var anneeEl = document.getElementById("projet-annee");
  if (typeEl) typeEl.textContent = projet.type;
  if (lieuEl) lieuEl.textContent = projet.lieu;
  if (anneeEl) anneeEl.textContent = projet.annee;

  /* Galerie */
  var galleryEl = document.getElementById("projet-gallery");
  if (galleryEl && projet.gallery && projet.gallery.length) {
    var inner = document.createElement("div");
    inner.className = "projet-gallery-inner";
    var imageIndex = 0;
    var clickToRevealNotes = [];

    projet.gallery.forEach(function (item) {
      if (typeof item === "string") {
        var img = document.createElement("img");
        img.src = item;
        img.alt = projet.title;
        img.loading = "lazy";
        img.width = 800;
        img.height = 600;
        img.dataset.galleryImageIndex = String(imageIndex);
        inner.appendChild(img);
        imageIndex += 1;
        return;
      }

      if (item && item.type === "text") {
        var note = document.createElement(item.link ? "a" : "div");
        note.className = "projet-gallery-note";
        if (item.link) {
          note.href = item.link;
          note.setAttribute("aria-label", item.content || "Avis du client");
        }
        var title = document.createElement("p");
        title.className = "projet-gallery-note-title";
        title.textContent = item.content || "";
        note.appendChild(title);

        if (item.image) {
          var noteImg = document.createElement("img");
          noteImg.className = "projet-gallery-note-image";
          noteImg.src = item.image;
          noteImg.alt = item.content || "Avis client";
          noteImg.loading = "lazy";
          noteImg.width = 800;
          noteImg.height = 600;
          note.appendChild(noteImg);
        }

        if (typeof item.revealOnImageClick === "number") {
          clickToRevealNotes.push({
            noteImage: item.image || "",
            noteAlt: item.content || "Avis du client",
            imageIndex: item.revealOnImageClick
          });
          return;
        }

        inner.appendChild(note);
      }
    });
    galleryEl.appendChild(inner);

    var avisModal = document.createElement("div");
    avisModal.className = "projet-avis-modal";
    avisModal.setAttribute("aria-hidden", "true");
    avisModal.innerHTML = '<button class="projet-avis-nav projet-avis-prev" type="button" aria-label="Avis précédent">‹</button><div class="projet-avis-frame"><img class="projet-avis-image" alt="Avis du client" width="800" height="600"></div><button class="projet-avis-nav projet-avis-next" type="button" aria-label="Avis suivant">›</button>';
    document.body.appendChild(avisModal);

    var avisImage = avisModal.querySelector(".projet-avis-image");
    var avisFrame = avisModal.querySelector(".projet-avis-frame");
    var avisPrevBtn = avisModal.querySelector(".projet-avis-prev");
    var avisNextBtn = avisModal.querySelector(".projet-avis-next");
    var currentAvisIndex = 0;

    function closeAvisModal() {
      avisModal.classList.remove("is-open");
      avisModal.setAttribute("aria-hidden", "true");
    }

    function renderAvis(index, triggerImg) {
      if (!clickToRevealNotes.length || !avisImage || !avisFrame) return;
      currentAvisIndex = (index + clickToRevealNotes.length) % clickToRevealNotes.length;
      var entry = clickToRevealNotes[currentAvisIndex];
      if (!entry || !entry.noteImage) return;
      avisImage.src = entry.noteImage;
      avisImage.alt = entry.noteAlt || "Avis du client";
      if (triggerImg) {
        avisFrame.style.width = triggerImg.clientWidth + "px";
      }
      var showNav = clickToRevealNotes.length > 1;
      if (avisPrevBtn) avisPrevBtn.style.display = showNav ? "flex" : "none";
      if (avisNextBtn) avisNextBtn.style.display = showNav ? "flex" : "none";
    }

    clickToRevealNotes.forEach(function (entry) {
      var triggerImg = inner.querySelector('img[data-gallery-image-index="' + entry.imageIndex + '"]');
      if (!triggerImg) return;
      triggerImg.classList.add("projet-gallery-clickable");
      triggerImg.addEventListener("click", function () {
        var avisIndex = clickToRevealNotes.indexOf(entry);
        renderAvis(avisIndex, triggerImg);
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
      avisFrame.addEventListener("click", function () {
        closeAvisModal();
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAvisModal();
    });

    if (openAvisOnLoad && clickToRevealNotes.length) {
      var firstTrigger = inner.querySelector('img[data-gallery-image-index="0"]');
      renderAvis(0, firstTrigger);
      avisModal.classList.add("is-open");
      avisModal.setAttribute("aria-hidden", "false");
    }
  }

  /* Projet suivant */
  var nextLink = document.getElementById("projet-next-link");
  if (nextLink) {
    nextLink.href = "realisation.html?id=" + nextProjet.id;
    nextLink.textContent = nextProjet.title;
  }
})();
