import { ConvexClientProvider } from "@/components/convex-client-provider";
import { I18nProvider } from "@/components/i18n-client-provider";
import "@liveblocks/react-tiptap/styles.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-ui/styles/dark/attributes.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crafted",
  description: "Collaborative Document Editing, Reimagined",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <NuqsAdapter>
              <ConvexClientProvider>
                <Toaster />
                <Analytics />
                {children}
              </ConvexClientProvider>
            </NuqsAdapter>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
