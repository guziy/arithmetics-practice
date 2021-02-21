import supportedLocales from "@/config/supported-locales"

// ...

export function supportedLocalesInclude(locale) {
  return Object.keys(supportedLocales).includes(locale)
}