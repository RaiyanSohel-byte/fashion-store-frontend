import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="h-4 w-24 animate-pulse bg-muted rounded"></div>
    </div>
  );
};

export default Loading;
