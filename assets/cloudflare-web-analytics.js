/*
  DadYolked Cloudflare Web Analytics loader.

  Replace CLOUDFLARE_WEB_ANALYTICS_TOKEN with the real site token from:
  Cloudflare Dashboard → Analytics & Logs → Web Analytics → dadyolked.com.

  The token is intentionally public in Cloudflare's standard beacon snippet.
  Until replaced, this file is a safe no-op and does not call Cloudflare.
*/
(function () {
  'use strict';

  var token = 'CLOUDFLARE_WEB_ANALYTICS_TOKEN';
  var placeholder = !token || token === 'CLOUDFLARE_WEB_ANALYTICS_TOKEN' || token.indexOf('REPLACE_') === 0;

  if (placeholder) {
    if (typeof console !== 'undefined' && console.info) {
      console.info('[DadYolked] Cloudflare Web Analytics placeholder token configured; beacon not loaded.');
    }
    return;
  }

  if (document.querySelector('script[src="https://static.cloudflareinsights.com/beacon.min.js"]')) {
    return;
  }

  var script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', JSON.stringify({ token: token }));
  document.head.appendChild(script);
}());
