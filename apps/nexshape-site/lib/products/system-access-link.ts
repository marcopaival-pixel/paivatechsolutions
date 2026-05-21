/** Props extras para links externos (http/https) — abrem em nova aba. */
export function systemAccessLinkProps(href: string): { target?: "_blank"; rel?: string } {
  if (/^https?:\/\//i.test(href)) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}
