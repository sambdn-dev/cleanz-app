import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RecipeInteractionsProvider } from "@/contexts/RecipeInteractionsContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cleanz - L'entretien naturel, simplifié",
  description: "Découvrez des solutions de nettoyage naturelles, économiques et écologiques pour toute la maison.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Cleanz",
  },
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "application-name": "Cleanz",
    "apple-mobile-web-app-title": "Cleanz",
    "msapplication-TileColor": "#FF69B4",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF0F5" },
    { media: "(prefers-color-scheme: dark)", color: "#1a0a2e" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <RecipeInteractionsProvider>
            {children}
          </RecipeInteractionsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
