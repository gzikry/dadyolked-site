# dadyolked.com

Static single-page site for DadYolked.

## Deployment
- GitHub Pages is enabled from the `main` branch (root).
- Custom domain: dadyolked.com (connect via Porkbun → GitHub verification).

## Updating the site
Just edit `index.html`, `privacy/index.html`, `support/index.html`, or assets and push. The site updates automatically.

See the live site at https://gzikry.github.io/dadyolked-site/ (temporary) or the custom domain once connected.

## App Store listing

DadYolked is on the App Store. The canonical listing is:

```text
https://apps.apple.com/us/app/dadyolked/id6773113095
```

`https://apps.apple.com/app/id6773113095` and `https://apps.apple.com/us/app/id6773113095` redirect there. Use that canonical URL for CTAs, official badges, and JSON-LD `downloadUrl`.

Homepage controls are real links in `index.html`, so a visit with JavaScript off still opens the listing. `assets/app-store.js` has `live: true` and adds the campaign query already used on the homepage (`?ct=<token>&mt=8`) to these slots:

- Nav (`home_nav`) — text link, "Get the app"
- Hero (`home_1`) — official Download on the App Store badge, visible on wide screens
- Mobile sticky bar (`home_sticky`) — the same official badge, visible on narrow screens

Only one of those badges is on screen at a time. Apple's one-badge-per-layout rule is why the hero badge hides when the sticky bar is showing. The badge files are Apple's unmodified US English artwork in `/assets/`. The white badge is the one on the dark homepage. The black badge is the one on the light family page.

`home_2`, `home_3`, and `home_4` remain in `assets/app-store.js` and are unused until a control sets `data-app-store` to that slot.

| Slot | `ct` token | What the page shows |
|---|---|---|
| `home_nav` | `site_home_nav` | Get the app |
| `home_1` | `site_home_1` | Official Download on the App Store badge |
| `home_2` | `site_home_2` | Download on the App Store |
| `home_3` | `site_home_3` | Download |
| `home_4` | `site_home_4` | App Store |
| `home_sticky` | `site_home_sticky` | Official Download on the App Store badge |

The Smart App Banner is on: `<meta name="apple-itunes-app" content="app-id=6773113095">`. Homepage JSON-LD `downloadUrl` is the canonical listing. `live` does not update JSON-LD, the Smart App Banner, or the copy and CTAs on guide, support, privacy, or waitlist pages. Those live in their own HTML. `/waitlist/` stays up as a short "on the App Store" page for old links. It does not say the download is still coming.

`soonLabel` in `assets/app-store.js` is only the `live === false` fallback. It is not shown while `live` is true.
