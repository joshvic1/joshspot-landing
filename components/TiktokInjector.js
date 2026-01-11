"use client";
import { useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function TikTokInjector() {
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/page`, {
          headers: {
            "x-site-domain": window.location.hostname.toLowerCase(),
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        const pixel = data?.pixelCode?.trim();
        if (!pixel) return;

        if (window.ttq) return;

        (function (w, d, t) {
          w.TiktokAnalyticsObject = t;
          var ttq = (w[t] = w[t] || []);
          ttq.methods = ["page", "track"];
          ttq.methods.forEach((m) => {
            ttq[m] = function () {
              ttq.push([m].concat([].slice.call(arguments)));
            };
          });
          ttq.load = function (id) {
            var s = d.createElement("script");
            s.async = true;
            s.src =
              "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + id;
            d.head.appendChild(s);
          };
        })(window, document, "ttq");

        window.ttq.load(pixel);
        window.ttq.page();
      } catch (err) {
        console.error("TikTok pixel load failed", err);
      }
    }

    load();
  }, []);

  return null;
}
