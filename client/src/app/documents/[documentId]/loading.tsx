"use client";

import React, { memo } from "react";

import { FullScreenLoader } from "@/components/fullscreen-loader";
import { useTranslation } from "react-i18next";

const LoadingPage = () => {
  const { t } = useTranslation();

  return <FullScreenLoader label={t("loading.Document")} />;
};

export default memo(LoadingPage);
