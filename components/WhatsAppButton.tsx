import { WHATSAPP_URL } from "@/lib/site";

/** Persistent WhatsApp click-to-chat — real number from Verified Facts. */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1DAA61] text-white shadow-lg transition-transform hover:scale-105 motion-reduce:hover:scale-100"
    >
      <span className="sr-only">Chat with Tourglobe on WhatsApp</span>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a9.9 9.9 0 0 0-8.5 15.1L2 22l5-1.4A9.9 9.9 0 1 0 12 2Zm0 18.1a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3 0-.2 0-.3-.1-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8 14 14 0 0 0 1.4.5 3.4 3.4 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
      </svg>
    </a>
  );
}
