# DadYolked Site Measurement Plan

This repo intentionally avoids invasive analytics by default. The current conversion measurement layer uses Apple App Store campaign tokens on outbound App Store links, plus `data-analytics-*` attributes that can be wired to a privacy-safe analytics provider later.

## Current implementation

### App Store campaign links

Clickable App Store links use:

```text
https://apps.apple.com/app/id6773113095?ct=site_<page_slug>_<link_number>&mt=8
```

Examples:

```text
site_home_1
site_tools_2
site_private_baby_tracker_app_1
site_tools_wake_window_calculator_2
```

These preserve the canonical app ID while making campaigns distinguishable in Apple/App Store reporting surfaces that honor `ct` campaign tokens.

### Event-ready attributes

Clickable App Store anchors also include:

```html
data-analytics-event="app_store_click"
data-analytics-context="<page_slug>_<link_number>"
```

These do nothing by themselves. They are safe placeholders for a future privacy-safe analytics script.

## Recommended analytics provider

Preferred order:

1. **Cloudflare Web Analytics** — best if `dadyolked.com` is already proxied through Cloudflare. Free and lightweight.
2. **Plausible** — best dashboard and clean privacy posture, but paid.
3. **GoatCounter** — very lightweight and cheap/free-ish.

Avoid Google Analytics unless there is a specific reason; it is off-brand for a privacy-first baby tracking app.

## If adding analytics later

Requirements:

- No ad pixels.
- No cross-site behavioral tracking.
- No resale or ad-tech language.
- Keep analytics disclosure in `/privacy/` accurate.
- Track only pageviews and App Store outbound click events.
- Verify no console errors and no broken CSP/browser behavior.

## Suggested event names

| Event | Trigger |
|---|---|
| `pageview` | Provider default pageview |
| `app_store_click` | Any outbound App Store CTA |
| `print_template` | Printable templates' print buttons, if provider supports custom events |
| `tool_calculate` | Calculator submit buttons, only if useful and non-invasive |

## Verification checklist

Before publishing analytics code:

- [ ] Local HTML/link/schema verification passes.
- [ ] Privacy policy updated if provider adds cookies, identifiers, or third-party processing.
- [ ] Live page source contains expected analytics script exactly once.
- [ ] App Store links still contain `ct=site_*` tokens.
- [ ] App Store links still open successfully.
- [ ] No social/email/paid/App Store metadata/account changes are made without explicit approval.
