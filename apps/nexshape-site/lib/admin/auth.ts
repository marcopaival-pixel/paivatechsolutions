import { cookies } from "next/headers";
import { timingSafeEqualString } from "@/lib/security/timing-safe";

const DEFAULT_PASSWORD = "admin123";
const COOKIE_NAME = "paivatech_admin_session";
const SESSION_DURATION = 1000 * 60 * 60 * 24; // 24 hours

/** Em produção exige ADMIN_PASSWORD definida e diferente do valor de desenvolvimento. */
export function isAdminAuthMisconfigured(): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  const configured = process.env.ADMIN_PASSWORD?.trim();
  return !configured || configured === DEFAULT_PASSWORD;
}

/** Em produção exige SESSION_SECRET independente da senha admin. */
export function isSessionSecretMisconfigured(): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  return !process.env.SESSION_SECRET?.trim();
}

export function isAdminPanelMisconfigured(): boolean {
  return isAdminAuthMisconfigured() || isSessionSecretMisconfigured();
}

export function getAdminPassword(): string {
  const configured = process.env.ADMIN_PASSWORD?.trim();
  if (process.env.NODE_ENV === "production") {
    return configured || "";
  }
  return configured || DEFAULT_PASSWORD;
}

function getSessionSecret(): string {
  const configured = process.env.SESSION_SECRET?.trim();
  if (process.env.NODE_ENV === "production") {
    return configured || "";
  }
  return configured || getAdminPassword() + "_salt_secret";
}

// Convert string to ArrayBuffer
function textToBuffer(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

// Generate HMAC signature using Web Crypto API (fully Edge-compatible)
async function generateHmacSignature(message: string, secret: string): Promise<string> {
  const keyBuffer = textToBuffer(secret);
  const msgBuffer = textToBuffer(message);

  // Import secret key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer as BufferSource,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // Sign message
  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgBuffer as BufferSource);

  // Convert to hex string
  return Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Creates a signed session token
export async function createSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION;
  const payload = JSON.stringify({ expiresAt });
  const encodedPayload = btoa(payload);
  const signature = await generateHmacSignature(encodedPayload, getSessionSecret());
  return `${encodedPayload}.${signature}`;
}

// Verifies a signed session token
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encodedPayload, signature] = parts;
  try {
    const secret = getSessionSecret();
    if (!secret) return false;

    const expectedSignature = await generateHmacSignature(encodedPayload, secret);
    if (!timingSafeEqualString(signature, expectedSignature)) return false;

    const payloadStr = atob(encodedPayload);
    const payload = JSON.parse(payloadStr) as { expiresAt: number };
    
    // Check if token has expired
    if (Date.now() > payload.expiresAt) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// Admin login action
export async function adminLogin(password: string): Promise<boolean> {
  if (isAdminPanelMisconfigured()) {
    console.error("[admin] ADMIN_PASSWORD and SESSION_SECRET must be set in production");
    return false;
  }

  const expected = getAdminPassword();
  if (!expected) return false;

  if (timingSafeEqualString(password, expected)) {
    const token = await createSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
      maxAge: SESSION_DURATION / 1000,
    });
    return true;
  }
  return false;
}

// Admin logout action
export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Reads the current session from headers/cookies (Server Component usage)
export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  return verifySessionToken(sessionCookie?.value);
}
