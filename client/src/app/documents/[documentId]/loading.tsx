import React, { memo } from "react";

import { FullScreenLoader } from "@/components/fullscreen-loader";

const LoadingPage = () => {
  return <FullScreenLoader label="Loading document..." />;
};

export default memo(LoadingPage);
