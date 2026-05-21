import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken } from "./lib/admin/auth";
import { isAdminPublicPath } from "./lib/admin/middleware-paths";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (isAdminPublicPath(pathname)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("paivatech_admin_session");
    const isAuthenticated = await verifySessionToken(sessionCookie?.value);

    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);

      if (pathname.startsWith("/admin/api")) {
        return NextResponse.json(
          { error: "unauthorized", message: "Sessão expirada ou inválida." },
          { status: 401 },
        );
      }

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api/contact|api/health|_next/static|_next/image|favicon.ico).*)"],
};
