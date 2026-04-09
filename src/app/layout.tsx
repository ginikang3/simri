import type { Metadata } from "next";
// @ts-nocheck
import "@/app/globals.css";
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
      </body>
    </html>
  );
}