"use client";

import { ReactNode } from "react";

import { LANGUAGE, THEME } from "@/constants/settings";
import { deDE, enUS } from "@clerk/localizations";
import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useTranslation } from "react-i18next";

import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import { FullScreenLoader } from "./fullscreen-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const { i18n } = useTranslation();

  const isGermanLanguage = i18n.language === LANGUAGE.GERMAN;
  const rightLocalization = isGermanLanguage ? deDE : enUS;

  const isDarkTheme = resolvedTheme === THEME.DARK ? dark : undefined;

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        baseTheme: isDarkTheme,
      }}
      localization={rightLocalization}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
