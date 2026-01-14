// pages/_app.js
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TikTokInjector from "@/components/TiktokInjector";

import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TikTokInjector />
      <Component {...pageProps} />
      <ToastContainer position="top-right" />
    </>
  );
}
