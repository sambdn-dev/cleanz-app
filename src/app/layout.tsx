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
    statusBarStyle: "default",
    title: "Cleanz",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FF69B4",
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
// Force rebuild
