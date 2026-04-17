import type { Metadata } from "next";
// @ts-nocheck
import "@/app/globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Simri Lab",
  description: "Test de compatibilidad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}

        {/* 1. Vignette Banner (Robust tag) */}
        <Script id="monetag-vignette" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='10887859',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>

        {/* 2. In-Page Push (Loud tag) - 상단/하단 배너 형태 */}
        <Script id="monetag-inpage-push" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='10887860',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
      </body>
    </html>
  );
}