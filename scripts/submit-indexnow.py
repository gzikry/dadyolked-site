#!/usr/bin/env python3
"""Submit every sitemap URL to IndexNow after a deployment."""
from __future__ import annotations

import json
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

HOST = "dadyolked.com"
KEY = "2ce66e7d9551475bb9c344899c4fd628"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
SITEMAP = f"https://{HOST}/sitemap.xml"
ENDPOINT = "https://api.indexnow.org/indexnow"

# IndexNow returns transient 5xx / 429 under load; without retries a single
# 503 silently drops the whole submission (observed 2026-09-13, succeeded on
# retry). Retry those, never retry a 4xx that indicates a bad request.
RETRY_STATUS = {429, 500, 502, 503, 504}
MAX_ATTEMPTS = 4
BASE_DELAY = 2.0


def fetch_sitemap_urls() -> list[str]:
    with urllib.request.urlopen(SITEMAP, timeout=30) as response:
        root = ET.fromstring(response.read())
    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [
        node.text
        for node in root.findall(".//s:loc", namespace)
        if node.text
    ]


def submit(urls: list[str]) -> int:
    payload = json.dumps({
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }).encode("utf-8")
    last_error: Exception | None = None
    for attempt in range(1, MAX_ATTEMPTS + 1):
        request = urllib.request.Request(
            ENDPOINT,
            data=payload,
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.status
        except urllib.error.HTTPError as exc:
            last_error = exc
            if exc.code not in RETRY_STATUS:
                raise
            delay = BASE_DELAY ** attempt
            print(
                f"IndexNow HTTP {exc.code} on attempt "
                f"{attempt}/{MAX_ATTEMPTS}; retrying in {delay:.0f}s",
                file=sys.stderr,
            )
            time.sleep(delay)
        except urllib.error.URLError as exc:
            last_error = exc
            delay = BASE_DELAY ** attempt
            print(
                f"IndexNow network error on attempt "
                f"{attempt}/{MAX_ATTEMPTS} ({exc.reason}); retrying in {delay:.0f}s",
                file=sys.stderr,
            )
            time.sleep(delay)
    raise SystemExit(
        f"IndexNow submission failed after {MAX_ATTEMPTS} attempts: {last_error}"
    )


def main() -> None:
    urls = fetch_sitemap_urls()
    status = submit(urls)
    print(f"IndexNow accepted {len(urls)} URLs (HTTP {status}).")


if __name__ == "__main__":
    main()

