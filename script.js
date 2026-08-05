var STORAGE_KEY = "sk_portfolio_main";

var editableSelector =
  "main h1, main h2, main h3, main p, main li, main .kicker, main .section-title, main .stat-num, main .stat-label, main .service-num, main .project-tags span, main .project-num, main .award-num, main .about-stat-num, main .cta-links a";

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
    .getElementById("hero-photo-wrap")
    .addEventListener("click", function () {
      if (body.classList.contains("edit-mode")) {
        document.getElementById("photo-input").click();
      }
    });
}

function initNav() {
  var header = document.getElementById("header");
  var toggle = document.getElementById("nav-toggle");
  var nav = document.querySelector(".nav");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();
  restorePage();
  initEditMode();
  initNav();

  var preloader = document.getElementById("preloader");
  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.classList.add("hidden");
    }, 500);
  });

  setTimeout(function () {
    if (!preloader.classList.contains("hidden")) {
      preloader.classList.add("hidden");
    }
  }, 3500);
});
