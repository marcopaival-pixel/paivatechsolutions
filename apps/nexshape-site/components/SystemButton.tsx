"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SystemButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function SystemButton({ href, className, children }: SystemButtonProps) {
  const searchParams = useSearchParams();
  const [finalHref, setFinalHref] = useState(href);

  useEffect(() => {
    const from = searchParams.get("from") || sessionStorage.getItem("paivatech_origin");
    if (from === "paivatech") {
      const url = new URL(href);
      url.searchParams.set("from", "paivatech");
      setFinalHref(url.toString());
    }
  }, [href, searchParams]);

  return (
    <Link href={finalHref} className={className}>
      {children}
    </Link>
  );
}
