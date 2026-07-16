import React from "react";
import Link from "next/link";
const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="font-serif text-3xl text-foreground mb-4">
        Piece Not Found
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        The item you are looking for is no longer available or does not exist.
      </p>
      <Link
        href="/products"
        className="border-b border-foreground pb-1 text-[11px] font-medium uppercase tracking-luxury text-foreground transition-colors hover:text-muted-foreground hover:border-muted-foreground"
      >
        Return to Collection
      </Link>
    </div>
  );
};

export default NotFound;
