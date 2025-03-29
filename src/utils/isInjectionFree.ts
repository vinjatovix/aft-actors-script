const validateXss = (input: string) => {
  const patterns = [
    /<script.*?>.*?<\/script>/i,
    /javascript:/i,
    /on\w+=".*?"/i,
    /on\w+=.*/i,
    /\$where/i,
    /\$gt/i,
    /SELECT.*FROM/i,
    /DROP\s+TABLE/i,
    /OR\s+1=1/i,
    /--/i,
    /#/,
    /\/\*/,
  ];
  return patterns.some((pattern) => pattern.test(input));
};

const validateSql = (input: string) => {
  const sqlPatterns = [
    /\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE)?)\b/gi,
    /\b(INSERT( +INTO)?|MERGE( +INTO)?|SELECT|UPDATE)\b/gi,
    /\b(UNION( +ALL)?|TRUNCATE|REPLACE)\b/gi,
    /--/g,
    /;/g,
    /\b(AND|OR)\b\s*['"]?\s*=\s*['"][^'"]*['"]/gi,
    /#/g,
  ];
  return sqlPatterns.some((pattern) => pattern.test(input));
};

const validateMongoInjection = (input: string) =>
  /\$[a-z]+/gi.test(input) ||
  /\b(SELECT|UPDATE|INSERT|DELETE|DROP|find|update)\b/gi.test(input) ||
  /(\$ne|\$gt|\$lt|\$in|\$exists)/gi.test(input);

export const isInjectionFree = (input: string): boolean => {
  const isXssFree = !validateXss(input);
  const isSqlFree = !validateSql(input);
  const isMongoInjectionFree = !validateMongoInjection(input);

  return isXssFree && isSqlFree && isMongoInjectionFree;
};
