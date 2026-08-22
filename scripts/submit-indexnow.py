#!/usr/bin/env python3
"""Submit every sitemap URL to IndexNow after a deployment."""
from __future__ import annotations

import json
import urllib.request
import xml.etree.ElementTree as ET

HOST = "dadyolked.com"
KEY = "2ce66e7d9551475bb9c344899c4fd628"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
SITEMAP = f"https://{HOST}/sitemap.xml"
ENDPOINT = "https://api.indexnow.org/indexnow"

with urllib.request.urlopen(SITEMAP, timeout=30) as response:
    root = ET.fromstring(response.read())

namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
urls = [node.text for node in root.findall(".//s:loc", namespace) if node.text]
payload = json.dumps({
    "host": HOST,
    "key": KEY,
    "keyLocation": KEY_LOCATION,
    "urlList": urls,
}).encode("utf-8")
request = urllib.request.Request(
    ENDPOINT,
    data=payload,
    headers={"Content-Type": "application/json; charset=utf-8"},
    method="POST",
)
with urllib.request.urlopen(request, timeout=30) as response:
    print(f"IndexNow accepted {len(urls)} URLs (HTTP {response.status}).")
