// pages/index.tsx
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();
  const { locale, locales } = useRouter();

  return (
    <div>
      <h1>{t("welcome")}</h1>

      {/* Sprachwechsel */}
      <nav>
        {locales?.map((lng) => (
          <button
            key={lng}
            disabled={lng === locale}
            onClick={() => {
              // setzt Cookie + reload
              i18n.changeLanguage(lng);
            }}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </nav>

      <button>{t("login")}</button>
    </div>
  );
}
