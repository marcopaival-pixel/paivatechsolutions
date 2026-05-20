import { describe, expect, it } from "vitest";
import { redactEmail, redactPhone } from "./redact";

describe("redact", () => {
  it("redacts email", () => {
    expect(redactEmail("maria@empresa.com.br")).toBe("ma***@empresa.com.br");
  });

  it("redacts phone", () => {
    expect(redactPhone("(11) 98765-4321")).toBe("***4321");
  });
});
