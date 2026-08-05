var STORAGE_KEY = "sk_portfolio_main";

var editableSelector =
  "main h1, main h2, main h3, main p, main li, main .section-label, main .contact-label, main .contact-value, main .hero-tags span, main .project-tags span, main .project-icon";

function setEditable(on) {
  var nodes = document.querySelectorAll(editableSelector);
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].setAttribute("contenteditable", on ? "true" : "false");
  }
}

function savePage() {
  var main = document.getElementById("main-content");
  if (main) {
    localStorage.setItem(STORAGE_KEY, main.innerHTML);
  }
}

function restorePage() {
  var saved = localStorage.getItem(STORAGE_KEY);
  var main = document.getElementById("main-content");
  if (saved && main) {
    main.innerHTML = saved;
  }
}

function initEditMode() {
  var toggle = document.getElementById("edit-toggle");
  var bar = document.getElementById("edit-bar");
  var body = document.body;

  toggle.addEventListener("click", function () {
    var on = toggle.getAttribute("aria-pressed") === "true";
    if (on) {
      setEditable(false);
      savePage();
      toggle.classList.remove("active");
      toggle.setAttribute("aria-pressed", "false");
      toggle.textContent = "Edit";
      bar.hidden = true;
      body.classList.remove("edit-mode");
    } else {
      setEditable(true);
      toggle.classList.add("active");
      toggle.setAttribute("aria-pressed", "true");
      toggle.textContent = "Editing";
      bar.hidden = false;
      body.classList.add("edit-mode");
    }
  });

  document.getElementById("edit-done").addEventListener("click", function () {
    toggle.click();
  });

  document.getElementById("edit-reset").addEventListener("click", function () {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });

  document
    .getElementById("main-content")
    .addEventListener("input", function () {
      if (body.classList.contains("edit-mode")) {
        savePage();
      }
    });

  document
    .getElementById("photo-input")
    .addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (ev) {
        var img = document.getElementById("profile-photo");
        var fb = document.getElementById("profile-fallback");
        img.src = ev.target.result;
        img.style.display = "block";
        fb.style.display = "none";
        savePage();
      };
      reader.readAsDataURL(file);
    });

  document
    .querySelector(".hero-photo")
    .addEventListener("click", function () {
      if (body.classList.contains("edit-mode")) {
        document.getElementById("photo-input").click();
      }
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();
  restorePage();
  initEditMode();

  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});
