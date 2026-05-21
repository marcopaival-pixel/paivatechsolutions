/** Comparação em tempo constante para strings (senha, assinaturas hex). */
export function timingSafeEqualString(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const bufA = enc.encode(a);
  const bufB = enc.encode(b);

  if (bufA.length !== bufB.length) {
    return false;
  }

  let diff = 0;
  for (let i = 0; i < bufA.length; i++) {
    diff |= bufA[i]! ^ bufB[i]!;
  }
  return diff === 0;
}
