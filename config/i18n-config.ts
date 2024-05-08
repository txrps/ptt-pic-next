import { Lang } from "../lib/i18n";

interface i18nTypes {
  defaultLocale: Lang,
  locales: Array<Lang>
};


export const i18n : i18nTypes = {
  defaultLocale: 'en',
  locales: ['en', 'th'],
} as const

export type Locale = typeof i18n['locales'][number];