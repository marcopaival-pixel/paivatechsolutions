"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ProductInterest } from "@/lib/contact/schema";
import {
  OTHER_PRODUCT_INTEREST,
  PRODUCT_INTEREST_OPTIONS,
  type ProductInterestOption,
} from "@/lib/contact/product-interest-options";

interface ProductInterestSelectProps {
  id?: string;
  value?: ProductInterest;
  onChange: (value: ProductInterest) => void;
  onBlur?: () => void;
  invalid?: boolean;
  describedBy?: string;
  /** Lista do admin/CMS; padrão = catálogo estático. */
  options?: ProductInterestOption[];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function ProductInterestSelect({
  id,
  value,
  onChange,
  onBlur,
  invalid,
  describedBy,
  options: optionsProp,
}: ProductInterestSelectProps) {
  const options = optionsProp?.length ? optionsProp : PRODUCT_INTEREST_OPTIONS;
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  useEffect(() => {
    if (!open) return;

    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [open, selectedIndex]);

  const selectOption = useCallback(
    (next: ProductInterest) => {
      onChange(next);
      setOpen(false);
      onBlur?.();
    },
    [onChange, onBlur],
  );

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        onBlur?.();
        return;
      }

      if (!open) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, options.length - 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const option = options[activeIndex];
        if (option) {
          selectOption(option.value as ProductInterest);
        }
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onBlur, activeIndex, selectOption, options]);

  useEffect(() => {
    if (!open) return;
    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  function openList() {
    setOpen(true);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(event) => {
          if ((event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") && !open) {
            event.preventDefault();
            openList();
          }
        }}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border bg-white/5 px-6 py-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
          open
            ? "border-indigo-500 ring-2 ring-indigo-500/40"
            : invalid
              ? "border-red-500/50"
              : "border-white/10 hover:border-white/20"
        }`}
      >
        <span className={selected ? "font-medium text-white" : "text-slate-500"}>
          {selected?.label ?? "Selecione um sistema"}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          aria-activedescendant={`${listboxId}-option-${activeIndex}`}
          className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-white/15 bg-slate-950 py-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            const isOther = option.value === OTHER_PRODUCT_INTEREST;

            return (
              <li key={option.value} role="presentation">
                <button
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  id={`${listboxId}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option.value as ProductInterest)}
                  className={`flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors ${
                    isSelected
                      ? "bg-indigo-600/25 text-white"
                      : isActive
                        ? "bg-indigo-600/15 text-white"
                        : "text-slate-200 hover:bg-indigo-600/15 hover:text-white"
                  }`}
                >
                  <span className={`text-sm ${isOther ? "font-bold" : "font-semibold"}`}>{option.label}</span>
                  {"hint" in option && option.hint ? (
                    <span className="text-xs leading-relaxed text-slate-400">{option.hint}</span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
