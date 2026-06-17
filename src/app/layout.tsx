import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Baloo_2 } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RecipeInteractionsProvider } from "@/contexts/RecipeInteractionsContext";
import { IngredientFavoritesProvider } from "@/contexts/IngredientFavoritesContext";
import { UserSpraysProvider } from "@/contexts/UserSpraysContext";
import "./globals.css";

// Police principale : moderne, douce et premium (corps + interface)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

// Police d'affichage arrondie : mot-clé « cleanz » + grands titres
const baloo = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

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
  viewportFit: "cover",
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
    <html lang="fr" className={`${jakarta.variable} ${baloo.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <RecipeInteractionsProvider>
            <IngredientFavoritesProvider>
              <UserSpraysProvider>
                {children}
              </UserSpraysProvider>
            </IngredientFavoritesProvider>
          </RecipeInteractionsProvider>
        </ThemeProvider>
        {/* Portrait lock overlay (visible only in landscape on phones) */}
        <div className="landscape-lock" aria-hidden="true">
          <span className="landscape-lock__icon">📱</span>
          <p style={{ fontWeight: 700, fontSize: "1.05rem" }}>
            Cleanz se savoure en mode portrait
          </p>
          <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
            Tourne ton téléphone à la verticale 🌿
          </p>
        </div>
      </body>
    </html>
  );
}
