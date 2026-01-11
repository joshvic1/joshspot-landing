"use client";

import { useEffect } from "react";

export default function TikTokInjector() {
  useEffect(() => {
    async function setup() {
      try {
        const API =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://joshspot-landing-backend-production.up.railway.app";

        const res = await fetch(`${API}/api/page`);
        if (!res.ok) return;

        const data = await res.json();
        const pixel = data?.pixelCode?.trim();
        if (!pixel) return;

        if (pixel.includes("<script")) {
          const div = document.createElement("div");
          div.innerHTML = pixel;
          document.head.appendChild(div);
          return;
        }

        if (window.ttq) return;

        !(function (w, d, t) {
          w.TiktokAnalyticsObject = t;
          var ttq = (w[t] = w[t] || []);
          ttq.methods = ["page", "track"];
          ttq.setAndDefer = function (t, e) {
            t[e] = function () {
              t.push([e].concat([].slice.call(arguments, 0)));
            };
          };
          for (var i = 0; i < ttq.methods.length; i++)
            ttq.setAndDefer(ttq, ttq.methods[i]);
          ttq.load = function (e) {
            var n = d.createElement("script");
            n.async = true;
            n.src =
              "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" +
              e +
              "&lib=ttq";
            d.head.appendChild(n);
          };
        })(window, document, "ttq");

        window.ttq.load(pixel);
        window.ttq.page();
      } catch {}
    }

    setup();
  }, []);

  return null;
}
