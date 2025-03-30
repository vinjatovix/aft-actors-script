export const handleError = (error: unknown, defaultMessage: string) =>
  error instanceof Error ? error.message : defaultMessage;
