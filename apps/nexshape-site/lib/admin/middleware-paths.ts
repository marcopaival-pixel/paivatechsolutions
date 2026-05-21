export const ADMIN_PUBLIC_PATHS = ["/admin/login", "/admin/api/login"] as const;

export function isAdminPublicPath(pathname: string): boolean {
  return ADMIN_PUBLIC_PATHS.some((p) => pathname === p);
}
