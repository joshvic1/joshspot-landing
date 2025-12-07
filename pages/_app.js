// pages/_app.js
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TikTokInjector from "@/components/TiktokInjector";

import { useEffect } from "react";
import { getPixelCode } from "@/utils/storage";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const code = getPixelCode();
    if (!code) return;

    try {
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.innerHTML = code;

      document.body.appendChild(script);

      return () => {
        if (script && script.parentNode) {
          document.body.removeChild(script);
        }
      };
    } catch (error) {
      console.error("Failed to inject TikTok Pixel:", error);
    }
  }, []);

  return (
    <>
      <TikTokInjector />
      <Component {...pageProps} />
      <ToastContainer position="top-right" />
    </>
  );
}
