"use client";

import { useEffect } from "react";

export default function TikTokInjector() {
  useEffect(() => {
    async function setup() {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await fetch(`${API_URL}/api/page`);

        const data = await res.json();
        const pixel = data?.pixelCode?.trim();

        if (!pixel) return;

        // If admin pasted whole script block
        if (pixel.includes("<script")) {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = pixel;
          document.head.appendChild(wrapper);
          return;
        }

        // Prevent duplicate load
        if (typeof window !== "undefined" && window.ttq) {
          return;
        }

        // TikTok BASE CODE (pure JS, no TypeScript)
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

          ttq.load = function (pixelId, config) {
            var scriptURL = "https://analytics.tiktok.com/i18n/pixel/events.js";

            ttq._i = ttq._i || {};
            ttq._i[pixelId] = [];
            ttq._i[pixelId]._u = scriptURL;

            ttq._t = ttq._t || {};
            ttq._t[pixelId] = +new Date();

            ttq._o = ttq._o || {};
            ttq._o[pixelId] = config || {};

            var scriptTag = document.createElement("script");
            scriptTag.async = true;
            scriptTag.src = scriptURL + "?sdkid=" + pixelId + "&lib=" + t;

            var firstScript = document.getElementsByTagName("script")[0];
            firstScript.parentNode.insertBefore(scriptTag, firstScript);
          };
        })(window, document, "ttq");

        // Load TikTok pixel ID
        window.ttq.load(pixel);
        window.ttq.page();
      } catch (err) {
        console.error("TikTok Pixel load failed:", err);
      }
    }

    setup();
  }, []);

  return null;
}
