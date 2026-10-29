/*
  Homepage App Store CTAs.

  The listing at APP_STORE.url is not public yet. While `live` is false, the
  six homepage controls stay non-links labeled "Coming soon to the App Store".

  Flip `live` to true when that listing is public. This file is the only
  change required: each control becomes its campaign link again, using the
  ct token and label stored here. Do not put the store URL back into href
  attributes by hand.

  The Smart App Banner meta and the JSON-LD downloadUrl are separate and
  stay pointed at the store URL (DEC-2026-09-19).
*/
(function () {
  "use strict";

  var APP_STORE = {
    live: false,
    url: "https://apps.apple.com/app/id6773113095",
    soonLabel: "Coming soon to the App Store",
    slots: {
      home_nav: { ct: "site_home_nav", label: "Get the app", className: "pill primary nav-cta" },
      home_1: { ct: "site_home_1", label: "Download on the App Store", className: "pill primary" },
      home_2: { ct: "site_home_2", label: "Download on the App Store", className: "pill primary" },
      home_3: { ct: "site_home_3", label: "Download", className: "" },
      home_4: { ct: "site_home_4", label: "App Store", className: "" },
      home_sticky: { ct: "site_home_sticky", label: "Download on the App Store", className: "pill primary" }
    }
  };

  function setLabel(el, label) {
    var svg = el.querySelector("svg");
    el.textContent = "";
    if (svg) {
      el.appendChild(svg);
      el.appendChild(document.createTextNode(" " + label));
      return;
    }
    el.textContent = label;
  }

  function blockActivation(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  document.querySelectorAll("[data-app-store]").forEach(function (el) {
    var slot = el.getAttribute("data-app-store");
    var campaign = APP_STORE.slots[slot];
    if (!campaign) return;

    if (!APP_STORE.live) {
      if (el.hasAttribute("href")) el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.removeAttribute("target");
      el.removeAttribute("rel");
      setLabel(el, APP_STORE.soonLabel);
      el.addEventListener("click", blockActivation);
      return;
    }

    var link = document.createElement("a");
    link.className = campaign.className;
    link.href = APP_STORE.url + "?ct=" + encodeURIComponent(campaign.ct) + "&mt=8";
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("data-app-store", slot);
    link.setAttribute("data-analytics-context", el.getAttribute("data-analytics-context") || slot);
    link.setAttribute("data-analytics-event", "app_store_click");
    if (el.querySelector("svg")) link.appendChild(el.querySelector("svg"));
    setLabel(link, campaign.label);
    el.replaceWith(link);
  });
}());
