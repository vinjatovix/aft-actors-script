import { REGEX } from "../constants";

export const isInjectionFree = (input: string): boolean => {
  const { xss, crlf, maxInputLength } = REGEX;

  const validateInput = (input: string, patterns: RegExp[]): boolean => {
    return !patterns.some((pattern) => pattern.test(input));
  };

  const isSuperLinearFree = input.length <= maxInputLength;
  if (!isSuperLinearFree) {
    return false;
  }

  return validateInput(input, [...xss, ...crlf]);
};
