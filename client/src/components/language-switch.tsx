"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguagesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSwitch = () => {
  const { t, i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-7">
          <LanguagesIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{t("general.Toggle Theme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => {
            i18n.changeLanguage("en");
          }}
        >
          <LanguagesIcon />
          EN
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => {
            i18n.changeLanguage("de");
          }}
        >
          <LanguagesIcon />
          DE
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
