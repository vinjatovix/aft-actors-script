import { formatDistanceToNow, Locale } from 'date-fns';
import { es, enUS, gl, ca, eu, fr, it, pt, ro } from 'date-fns/locale';

const localeMap: { [key: string]: Locale } = {
  'es-GL': gl,
  es: es,
  en: enUS,
  ca: ca,
  eu: eu,
  fr: fr,
  it: it,
  pt: pt,
  ro: ro
};

export const getTimeAgo = (date: string, locale = 'es-GL') => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: localeMap[locale]
  });
};
