# dadyolked.com

Static single-page site for DadYolked.

## Deployment
- GitHub Pages is enabled from the `main` branch (root).
- Custom domain: dadyolked.com (connect via Porkbun → GitHub verification).

## Updating the site
Just edit `index.html`, `privacy/index.html`, `support/index.html`, or assets and push. The site updates automatically.

See the live site at https://gzikry.github.io/dadyolked-site/ (temporary) or the custom domain once connected.

## App Store listing

The App Store page `https://apps.apple.com/app/id6773113095` is not live yet, so that URL 404s. The homepage CTAs are a non-link **Coming soon to the App Store** state until it is public:

- Nav (`home_nav`)
- Hero (`home_1`)
- Mobile sticky bar (`home_sticky`)

`home_2`, `home_3`, and `home_4` remain in `assets/app-store.js` and are unused until a control sets `data-app-store` to that slot.

Each one is a `<button type="button" aria-disabled="true">` with no `href`. Availability, the store URL, and every `ct` campaign token live in `assets/app-store.js`.

Flip the listing on by changing one line in that file:

```js
live: true
```

Leave `live` as `false` until the App Store page loads. With `live: true`, each rendered control becomes a link again:

```text
https://apps.apple.com/app/id6773113095?ct=<token>&mt=8
```

| Slot | `ct` token | Label restored when live |
|---|---|---|
| `home_nav` | `site_home_nav` | Get the app |
| `home_1` | `site_home_1` | Download on the App Store |
| `home_2` | `site_home_2` | Download on the App Store |
| `home_3` | `site_home_3` | Download |
| `home_4` | `site_home_4` | App Store |
| `home_sticky` | `site_home_sticky` | Download on the App Store |

No other file needs to change for that flip. Do not paste the store URL back into homepage `href` attributes.

The Smart App Banner (`apple-itunes-app`) is an HTML comment on the homepage until the App Store ID is confirmed. Do not uncomment it while the listing 404s. Homepage JSON-LD `downloadUrl` points at `/waitlist/` until the listing is public. This flag does not change either of those. Guide pages that still link to the store are outside this homepage switch.
