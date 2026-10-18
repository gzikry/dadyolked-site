# dadyolked.com

Static site for DadYolked. The homepage is the App Store landing page. Guides, tools, privacy, terms, support, and about are separate pages.

## Deployment

GitHub Pages publishes the repository root from `main`. The workflow is `.github/workflows/pages.yml`. A merge to `main` updates https://dadyolked.com. The `CNAME` file is `dadyolked.com`.

Do not merge to `main` until the change is approved. A merge deploys the live site.

## Pages

- `/` is the landing page.
- `/privacy/`, `/terms/`, `/support/`, `/about/`, and `/editorial-standards/` are the legal and help pages.
- `/tools/` is the guides hub. It lists the calculators, templates, and guides.
- Each guide is its own directory at the repository root.
- `/dadwingman/` is a separate page. The homepage does not link to it.

## Download button

The nav, the hero, and the mobile bar share one destination. It lives on the `<html>` element as `data-download-href`. A short script copies that value onto every `[data-download-cta]` link. The `href` on those links matches the attribute, so the button still works with JavaScript off.

To send those three buttons to a new App Store URL, change `data-download-href` and the matching `href` values together. Leave `downloadUrl`, the Smart App Banner `apple-itunes-app` meta, and the other App Store links alone until that decision is explicit. They still use app id 6773113095.

## Redirect checklist

This repo has no redirect config. GitHub Pages will not apply these from an HTML edit. They need a host or DNS change.

- Send `www.dadyolked.com` to `https://dadyolked.com/` with an absolute `https` Location. The current redirect is protocol-relative (`//dadyolked.com/`).
- Send `https://gzikry.github.io/dadyolked-site/` to `https://dadyolked.com/`. It currently redirects to `http://dadyolked.com/`.
- Send `/privacy-policy` to `/privacy/`.
- Send `/contact` to `/support/`.
- Optional. Send `/download` to `/#download`.
- Optional. Send `/faq` to `/#faq`. Both paths 404 today.

## Editing

Edit the HTML in the repository root and push a branch. Preview it before any merge to `main`.
