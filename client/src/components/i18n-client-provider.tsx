"use client";

import { type ReactNode, useEffect } from "react";

import { I18nextProvider } from "react-i18next";

import i18n from "../config/i18n";

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem("i18nextLng") || "en";
    if (i18n.language !== saved) {
      i18n.changeLanguage(saved);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
