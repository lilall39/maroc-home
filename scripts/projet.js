/**
 * Page détail projet – chargement des données selon ?id=
 */
(function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10) || 1;
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
    projet.gallery.forEach(function (url) {
      var img = document.createElement("img");
      img.src = url;
      img.alt = projet.title;
      img.loading = "lazy";
      img.width = 800;
      img.height = 600;
      inner.appendChild(img);
    });
    galleryEl.appendChild(inner);
  }

  /* Projet suivant */
  var nextLink = document.getElementById("projet-next-link");
  if (nextLink) {
    nextLink.href = "projet.html?id=" + nextProjet.id;
    nextLink.textContent = nextProjet.title;
  }
})();
