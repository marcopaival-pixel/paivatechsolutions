import Link from "next/link";
import { getContactWhatsApp } from "@/lib/site/whatsapp";

function ChatBubbleIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

interface WhatsAppContactButtonProps {
  className?: string;
}

export async function WhatsAppContactButton({ className = "" }: WhatsAppContactButtonProps) {
  const { url: href } = await getContactWhatsApp();

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:bg-[#20BD5A] hover:shadow-[#25D366]/40 active:scale-95 ${className}`}
    >
      <ChatBubbleIcon />
      Fale Conosco
    </Link>
  );
}
