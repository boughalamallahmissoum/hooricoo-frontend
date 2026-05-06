import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { PixelManager } from "@/components/PixelManager";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "HOORICOO | فخامة الأناقة في الجزائر",
  description: "اكتشف تشكيلات هوريكو الحصرية من الملابس والأزياء الراقية. جودة استثنائية وتوصيل سريع لكل الولايات.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${outfit.variable} h-full antialiased`}
    >
      <head />
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.removeAttribute('data-theme');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Suspense fallback={null}>
          <PixelManager />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
