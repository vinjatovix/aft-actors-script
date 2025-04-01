import { formatDistanceToNow, Locale } from "date-fns";
import { gl } from "date-fns/locale";

const localeMap: { [key: string]: Locale } = {
  es_gl: gl,
};

export const getTimeAgo = (date: string, locale = "es_gl") => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: localeMap[locale],
  });
};
