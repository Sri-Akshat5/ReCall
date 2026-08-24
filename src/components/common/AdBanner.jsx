import React, { useEffect } from "react";

/**
 * Reusable Google AdSense Banner Component for Single Page Applications (SPA)
 * 
 * Usage:
 * <AdBanner 
 *    adClient="ca-pub-XXXXXXXXXXXXXXXX" 
 *    adSlot="1234567890" 
 *    adFormat="auto" 
 * />
 */
export const AdBanner = ({
  adClient = "ca-pub-7371733450750312", // Your Google AdSense Publisher ID
  adSlot = "1234567890",                 // Replace with your Ad Unit Slot ID
  adFormat = "auto",
  fullWidthResponsive = true,
  className = ""
}) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense script error:", err);
    }
  }, []);

  const isDev = import.meta.env.DEV;

  return (
    <div className={`my-4 flex justify-center items-center overflow-hidden ${className}`}>
      {isDev || adClient === "ca-pub-XXXXXXXXXXXXXXXX" ? (
        /* Development Placeholder Box */
        <div className="w-full max-w-4xl p-4 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-dashed border-slate-300 dark:border-zinc-800 text-center space-y-1 font-mono text-xs">
          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold uppercase text-[10px]">
            Google AdSense Banner (Placeholder)
          </span>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400">
            Ad Unit Slot: <code className="text-slate-700 dark:text-zinc-300">{adSlot}</code>
          </p>
        </div>
      ) : (
        /* Live Google AdSense Tag */
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        />
      )}
    </div>
  );
};

export default AdBanner;
