import { describe, expect, it } from "vitest";

import { isAdminPublicPath } from "./middleware-paths";

describe("isAdminPublicPath", () => {
  it("allows login pages", () => {
    expect(isAdminPublicPath("/admin/login")).toBe(true);
    expect(isAdminPublicPath("/admin/api/login")).toBe(true);
  });

  it("denies protected admin routes", () => {
    expect(isAdminPublicPath("/admin")).toBe(false);
    expect(isAdminPublicPath("/admin/api/leads")).toBe(false);
    expect(isAdminPublicPath("/admin/foo.bar")).toBe(false);
  });
});
