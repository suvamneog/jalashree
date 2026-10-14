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
