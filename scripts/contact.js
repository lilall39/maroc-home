/**
 * Formulaire contact – prévention envoi (démo), message de confirmation
 */
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // En production : envoyer les données (fetch vers backend ou mailto)
    var name = form.querySelector("#name").value;
    var email = form.querySelector("#email").value;
    var message = form.querySelector("#message").value;
    if (!name || !email || !message) return;
    alert("Merci pour votre message, " + name + ". Nous vous recontactons très rapidement.");
    form.reset();
  });
})();
