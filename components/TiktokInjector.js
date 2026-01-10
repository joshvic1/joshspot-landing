"use client";

import { useEffect } from "react";

export default function TikTokInjector() {
  useEffect(() => {
    async function setup() {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://joshspot-landing-backend-production.up.railway.app";

        const res = await fetch(`${API_URL}/api/page`);

        if (!res.ok) return;

        const data = await res.json();
        const pixel = data?.pixelCode?.trim();
        if (!pixel) return;

        // If admin pasted full script
        if (pixel.includes("<script")) {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = pixel;
          document.head.appendChild(wrapper);
          return;
        }

        if (window.ttq) return;

        (function (w, d, t) {
          w.TiktokAnalyticsObject = t;
          var ttq = (w[t] = w[t] || []);
          ttq.methods = [
            "page",
            "track",
            "identify",
            "instances",
            "debug",
            "on",
            "off",
            "once",
            "ready",
            "alias",
            "group",
            "enableCookie",
          ];
          ttq.setAndDefer = function (obj, method) {
            obj[method] = function () {
              obj.push([method].concat([].slice.call(arguments, 0)));
            };
          };
          for (var i = 0; i < ttq.methods.length; i++) {
            ttq.setAndDefer(ttq, ttq.methods[i]);
          }
          ttq.load = function (pixelId) {
            var s = document.createElement("script");
            s.async = true;
            s.src =
              "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" +
              pixelId +
              "&lib=ttq";
            document.head.appendChild(s);
          };
        })(window, document, "ttq");

        window.ttq.load(pixel);
        window.ttq.page();
      } catch (err) {
        console.warn("TikTok injector skipped:", err.message);
      }
    }

    setup();
  }, []);

  return null;
}
