"use client";
import { useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function TikTokInjector() {
  function extractTikTokPixelId(input) {
    if (!input) return null;

    // Trim whitespace
    const value = input.trim();

    // Case 1: already looks like a pixel ID
    // TikTok pixel IDs are usually alphanumeric, ~16–20 chars
    if (/^[A-Za-z0-9]{10,30}$/.test(value)) {
      return value;
    }

    // Case 2: full script pasted → extract sdkid
    const match = value.match(/sdkid\s*=\s*["']?([A-Za-z0-9]+)["']?/i);
    if (match && match[1]) {
      return match[1];
    }

    return null;
  }

  useEffect(() => {
    async function loadPixel() {
      try {
        const res = await fetch(`${API_BASE}/api/page`, {
          headers: {
            "x-site-domain": window.location.hostname.toLowerCase(),
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        const rawPixel = data?.page?.pixelCode;

        const pixel = extractTikTokPixelId(rawPixel);

        if (!pixel) {
          console.warn("No valid TikTok pixel ID found");
          return;
        }

        // Prevent double injection
        if (window.ttq) return;

        // 🔥 TikTok OFFICIAL loader (detectable)
        !(function (w, d, t) {
          w.TiktokAnalyticsObject = t;
          var ttq = (w[t] = w[t] || []);
          ttq.methods = ["page", "track"];
          ttq.methods.forEach(function (m) {
            ttq[m] = function () {
              ttq.push([m].concat([].slice.call(arguments)));
            };
          });
          ttq.load = function (id) {
            var s = d.createElement("script");
            s.async = true;
            s.src =
              "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" +
              id +
              "&lib=" +
              t;
            d.head.appendChild(s);
          };
          ttq.load(pixel);
          ttq.page();
        })(window, document, "ttq");
      } catch (err) {
        console.error("TikTok pixel load failed", err);
      }
    }

    loadPixel();
  }, []);

  return null;
}
