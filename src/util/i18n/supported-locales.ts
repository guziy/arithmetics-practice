import {supportedLocales} from "../../config/supported-locales"
import { Locale } from "vue-i18n"

// ...

export function supportedLocalesInclude(locale: Locale) {
  return Object.keys(supportedLocales).includes(locale)
}