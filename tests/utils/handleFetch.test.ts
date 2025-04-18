import { handleFetch } from "../../src/utils/handleFetch";

describe("handleFetch", () => {
  const URL = "https://api.example.com/resource";
  const OPTIONS: RequestInit = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return parsed JSON when response is successful and content type is JSON", async () => {
    const mockResponse = { data: "test" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      headers: {
        get: jest.fn((header) =>
          header === "Content-Type" ? "application/json" : null,
        ),
      },
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await handleFetch<typeof mockResponse>(URL, OPTIONS);

    expect(global.fetch).toHaveBeenCalledWith(URL, OPTIONS);
    expect(result).toEqual(mockResponse);
  });

  it("should return null when response is successful but content length is 0", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      headers: {
        get: jest.fn((header) =>
          header === "Content-Type"
            ? "application/json"
            : header === "Content-Length"
              ? "0"
              : null,
        ),
      },
      json: jest.fn(),
    });

    const result = await handleFetch(URL, OPTIONS);

    expect(global.fetch).toHaveBeenCalledWith(URL, OPTIONS);
    expect(result).toBeNull();
  });

  it("should throw an error when response is not successful", async () => {
    const errorMessage = "Invalid Credentials";
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({ message: errorMessage }),
    });

    await expect(handleFetch(URL, OPTIONS)).rejects.toThrow(errorMessage);
    expect(global.fetch).toHaveBeenCalledWith(URL, OPTIONS);
  });

  it("should throw a default error message when response is not successful and no message is provided", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    await expect(handleFetch(URL, OPTIONS)).rejects.toThrow("Unknown error");
    expect(global.fetch).toHaveBeenCalledWith(URL, OPTIONS);
  });

  it("should return null when response content type is not JSON", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      headers: {
        get: jest.fn((header) =>
          header === "Content-Type" ? "text/plain" : null,
        ),
      },
      json: jest.fn(),
    });

    const result = await handleFetch(URL, OPTIONS);

    expect(global.fetch).toHaveBeenCalledWith(URL, OPTIONS);
    expect(result).toBeNull();
  });
});
