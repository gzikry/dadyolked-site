/*
  Homepage App Store CTAs.

  APP_STORE.url is the canonical public listing:
  https://apps.apple.com/us/app/dadyolked/id6773113095

  `live` is true. Each [data-app-store] control is a real link to that
  listing. This file adds the campaign query already used on the homepage
  (?ct=<token>&mt=8). The HTML href is the bare listing, so a no-JS visit
  still reaches the App Store.

  home_1 and home_sticky use Apple's official Download on the App Store
  badge (assets/download-on-the-app-store-white.svg). Only one is visible
  at a time: the hero badge on wide screens, the sticky badge on narrow
  screens. home_nav keeps the "Get the app" label.

  This file does not change JSON-LD, the Smart App Banner, or copy on
  guide, support, privacy, or waitlist pages. Edit those in their HTML.

  home_2, home_3, and home_4 stay defined so a later control can use them.

  While `live` is false, controls fall back to a non-link labeled
  soonLabel. That branch is unused while the listing is public.
*/
(function () {
  "use strict";

  var APP_STORE = {
    live: true,
    url: "https://apps.apple.com/us/app/dadyolked/id6773113095",
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

    var link = el;
    if (el.tagName !== "A") {
      link = document.createElement("a");
      link.className = el.className;
      link.setAttribute("data-app-store", slot);
      link.setAttribute("data-analytics-context", el.getAttribute("data-analytics-context") || slot);
      link.setAttribute("data-analytics-event", el.getAttribute("data-analytics-event") || "app_store_click");
      while (el.firstChild) link.appendChild(el.firstChild);
      el.replaceWith(link);
    }

    link.href = APP_STORE.url + "?ct=" + encodeURIComponent(campaign.ct) + "&mt=8";
    link.target = "_blank";
    link.rel = "noopener";
    link.removeAttribute("aria-disabled");

    if (!link.querySelector("img")) {
      var svgs = link.querySelectorAll("svg");
      for (var i = 0; i < svgs.length; i++) svgs[i].remove();
      link.textContent = campaign.label;
    }
  });
}());
