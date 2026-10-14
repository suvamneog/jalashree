(function () {
  const contact = window.JALASHREE_CONTACT || {};
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector("#site-nav");

  function setMenu(open) {
    if (!btn || !nav) return;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  }

  if (btn && nav) {
    btn.addEventListener("click", function () {
      const open = btn.getAttribute("aria-expanded") === "true";
      setMenu(!open);
      if (!open) {
        const first = nav.querySelector("a");
        if (first) first.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (btn.getAttribute("aria-expanded") !== "true") return;
      if (nav.contains(event.target) || btn.contains(event.target)) return;
      setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        btn.focus();
      }
    });

    const wide = window.matchMedia("(min-width: 900px)");
    wide.addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });
  }

  const menuOpen = document.querySelector(".menu-open");
  const menuView = document.querySelector(".menu-view");
  if (menuOpen && menuView) {
    const menuPhoto = menuView.querySelector("img");
    menuOpen.addEventListener("click", function () {
      menuView.showModal();
    });
    menuView.querySelector(".menu-close").addEventListener("click", function () {
      menuView.classList.remove("is-zoomed");
      menuView.close();
    });
    menuPhoto.addEventListener("click", function () {
      menuView.classList.toggle("is-zoomed");
    });
    menuView.addEventListener("click", function (event) {
      if (event.target === menuView) menuView.close();
    });
    menuView.addEventListener("close", function () {
      menuView.classList.remove("is-zoomed");
    });
  }

  const shots = document.querySelectorAll(".gallery .shot img");
  if (shots.length) {
    const view = document.createElement("dialog");
    view.className = "menu-view photo-view";
    view.setAttribute("aria-label", "Photograph");
    view.innerHTML =
      '<button class="menu-close" type="button">Close</button><p class="menu-hint">Tap the picture to zoom</p>';
    document.body.appendChild(view);
    const photo = document.createElement("img");
    view.appendChild(photo);

    function showZoom(on) {
      view.classList.toggle("is-zoomed", on);
      photo.style.width = on ? (photo.naturalWidth || photo.width) + "px" : "";
    }

    shots.forEach(function (img) {
      const open = document.createElement("button");
      open.type = "button";
      open.className = "shot-open";
      open.setAttribute("aria-label", "Enlarge " + (img.alt || "photo"));
      img.parentNode.insertBefore(open, img);
      open.appendChild(img);
      open.addEventListener("click", function () {
        photo.src = img.currentSrc || img.src;
        photo.alt = img.alt;
        showZoom(false);
        view.showModal();
      });
    });

    view.querySelector(".menu-close").addEventListener("click", function () {
      showZoom(false);
      view.close();
    });
    photo.addEventListener("click", function () {
      showZoom(!view.classList.contains("is-zoomed"));
    });
    view.addEventListener("close", function () {
      showZoom(false);
    });
  }

  const form = document.querySelector("#book-form");
  if (!form) return;

  const error = document.querySelector("#form-error");
  const draft = document.querySelector("#draft");
  const draftText = document.querySelector("#draft-text");
  const copyBtn = document.querySelector("#copy-enquiry");
  const copyStatus = document.querySelector("#copy-status");
  const params = new URLSearchParams(location.search);
  const wantLabels = { Tent: "Stay overnight", Fishing: "Day visit" };

  if (params.get("tent") === "1") form.querySelector('input[value="Tent"]').checked = true;
  if (params.get("fishing") === "1") form.querySelector('input[value="Fishing"]').checked = true;

  function enquiryBody(source) {
    const data = new FormData(source);
    const wants = [...source.querySelectorAll('input[name="want"]:checked')].map(function (box) {
      return wantLabels[box.value] || box.value;
    });
    const people = String(data.get("people") || "").trim();
    const note = String(data.get("note") || "").trim();
    return [
      "Name: " + String(data.get("name") || "").trim(),
      "Phone: " + String(data.get("phone") || "").trim(),
      "Date: " + String(data.get("date") || "").trim(),
      "People: " + (people || "not given"),
      "Request: " + wants.join(", "),
      "Note: " + (note || "—"),
    ].join("\n");
  }

  function mailtoFor(body) {
    const email = contact.email || "jalashreeanglersretreat@gmail.com";
    return (
      "mailto:" +
      email +
      "?subject=" +
      encodeURIComponent("Enquiry from the website") +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  window.jalashreeEnquiry = { body: enquiryBody, mailto: mailtoFor };

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const wants = form.querySelectorAll('input[name="want"]:checked');
    if (!wants.length) {
      error.hidden = false;
      const first = form.querySelector('input[name="want"]');
      if (first) first.focus();
      return;
    }
    error.hidden = true;
    const body = enquiryBody(form);
    draft.hidden = false;
    draftText.textContent = body;
    if (copyStatus) copyStatus.textContent = "";
    location.href = mailtoFor(body);
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const text = draftText.textContent;
      const done = function () {
        copyStatus.textContent = "Copied. Paste it into an email to " + (contact.email || "") + ".";
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done);
        return;
      }
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      done();
    });
  }
})();
