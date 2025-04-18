export const handleFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T | null> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message ?? "Unknown error");
  }

  const contentType = response.headers?.get("Content-Type") ?? "";
  const contentLength = response.headers?.get("Content-Length");

  if (contentType.includes("application/json") && contentLength !== "0") {
    return (await response.json()) as T;
  }

  return null;
};
