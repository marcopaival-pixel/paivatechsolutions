"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef } from "react";

interface TurnstileFieldProps {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

export function TurnstileField({ siteKey, onToken, onExpire, onError }: TurnstileFieldProps) {
  const ref = useRef<TurnstileInstance>(null);

  return (
    <div className="flex justify-center">
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        onSuccess={onToken}
        onExpire={() => {
          ref.current?.reset();
          onExpire?.();
        }}
        onError={() => {
          onError?.();
        }}
        options={{ theme: "dark", size: "normal" }}
      />
    </div>
  );
}
