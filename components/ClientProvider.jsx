"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function ClientProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 30,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  // Load CookieYes banner dynamically so it actually executes
  useEffect(() => {
    if (document.getElementById("cookieyes")) return; // already loaded
    const script = document.createElement("script");
    script.id = "cookieyes";
    script.type = "text/javascript";
    script.src =
      "https://cdn-cookieyes.com/client_data/540b6e6886b7acc30864649d/script.js";
    document.head.insertBefore(script, document.head.firstChild);
  }, []);

  // Track page views for Google Analytics
  useEffect(() => {
    // Track initial page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-EMQXZRRMS6", {
        page_path: window.location.pathname,
      });
    }

    // Track page changes (for client-side navigation)
    const handleRouteChange = () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", "G-EMQXZRRMS6", {
          page_path: window.location.pathname,
        });
      }
    };

    // Listen for URL changes
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
