// Language detection with priority:
// 1. Saved user choice (localStorage)
// 2. Browser language (navigator.language)
// 3. IP geolocation fallback
// 4. English default

import { LANGUAGES } from "./translations";

const SUPPORTED_LANGS = Object.keys(LANGUAGES);
const STORAGE_KEY = "blueLanguage";

// Browser language tag → our language code
const BROWSER_LANG_MAP = {
  ro: "ro",
  zh: "zh",
  "zh-cn": "zh",
  "zh-tw": "zh",
  "zh-hk": "zh",
  "zh-sg": "zh",
  es: "es",
  "es-es": "es",
  "es-mx": "es",
  "es-ar": "es",
  "es-co": "es",
  "es-cl": "es",
  "es-pe": "es",
  "es-ve": "es",
  "es-ec": "es",
  "es-bo": "es",
  "es-py": "es",
  "es-uy": "es",
  "es-gt": "es",
  "es-hn": "es",
  "es-sv": "es",
  "es-ni": "es",
  "es-cr": "es",
  "es-pa": "es",
  "es-cu": "es",
  "es-do": "es",
  fr: "fr",
  "fr-fr": "fr",
  "fr-be": "fr",
  "fr-ch": "fr",
  "fr-ca": "fr",
  "fr-sn": "fr",
  "fr-ci": "fr",
  "fr-cm": "fr",
  "fr-cd": "fr",
  "fr-mg": "fr",
  de: "de",
  "de-de": "de",
  "de-at": "de",
  "de-ch": "de",
  pt: "pt",
  "pt-pt": "pt",
  "pt-br": "pt",
  "pt-ao": "pt",
  "pt-mz": "pt",
  ar: "ar",
  "ar-sa": "ar",
  "ar-ae": "ar",
  "ar-eg": "ar",
  "ar-iq": "ar",
  "ar-sy": "ar",
  "ar-jo": "ar",
  "ar-lb": "ar",
  "ar-kw": "ar",
  "ar-qa": "ar",
  "ar-bh": "ar",
  "ar-om": "ar",
  "ar-ye": "ar",
  "ar-ly": "ar",
  "ar-sd": "ar",
  "ar-tn": "ar",
  "ar-ma": "ar",
  "ar-dz": "ar",
  hi: "hi",
  "hi-in": "hi",
  ja: "ja",
  "ja-jp": "ja",
  ko: "ko",
  "ko-kr": "ko",
  en: "en",
  "en-us": "en",
  "en-gb": "en",
  "en-au": "en",
  "en-ca": "en",
  "en-nz": "en",
  "en-ie": "en",
  "en-za": "en",
};

// IP country code → our language code
const COUNTRY_LANG_MAP = {
  // Romanian
  RO: "ro",
  // Chinese
  CN: "zh",
  TW: "zh",
  HK: "zh",
  MO: "zh",
  SG: "zh",
  // Spanish
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  BO: "es",
  PY: "es",
  UY: "es",
  GT: "es",
  HN: "es",
  SV: "es",
  NI: "es",
  CR: "es",
  PA: "es",
  CU: "es",
  DO: "es",
  PR: "es",
  // French
  FR: "fr",
  BE: "fr",
  CH: "de",
  SN: "fr",
  CI: "fr",
  CM: "fr",
  CD: "fr",
  MG: "fr",
  ML: "fr",
  BF: "fr",
  TG: "fr",
  RW: "fr",
  MU: "fr",
  DJ: "fr",
  KM: "fr",
  BJ: "fr",
  GA: "fr",
  GN: "fr",
  NE: "fr",
  // German (override CH back — CH is mixed but commonly German side)
  DE: "de",
  AT: "de",
  LI: "de",
  // Portuguese
  PT: "pt",
  BR: "pt",
  AO: "pt",
  MZ: "pt",
  CV: "pt",
  ST: "pt",
  GW: "pt",
  // Arabic
  SA: "ar",
  AE: "ar",
  EG: "ar",
  IQ: "ar",
  SY: "ar",
  JO: "ar",
  LB: "ar",
  KW: "ar",
  QA: "ar",
  BH: "ar",
  OM: "ar",
  YE: "ar",
  LY: "ar",
  SD: "ar",
  TN: "ar",
  MA: "ar",
  DZ: "ar",
  MR: "ar",
  SO: "ar",
  PS: "ar",
  // Hindi
  IN: "hi",
  // Japanese
  JP: "ja",
  // Korean
  KR: "ko",
  // English (explicit)
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  IE: "en",
  ZA: "en",
  NG: "en",
  GH: "en",
  KE: "en",
  UG: "en",
  TZ: "en",
};

// 1) Check saved preference
export function getSavedLanguage() {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  } catch {}
  return null;
}

// 2) Detect from browser
export function getBrowserLanguage() {
  if (typeof window === "undefined" || !navigator?.language) return null;
  const langs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const lang of langs) {
    const lower = lang.toLowerCase();
    if (BROWSER_LANG_MAP[lower]) return BROWSER_LANG_MAP[lower];
    // Try just the primary subtag
    const primary = lower.split("-")[0];
    if (BROWSER_LANG_MAP[primary]) return BROWSER_LANG_MAP[primary];
  }
  return null;
}

// 3) IP-based fallback (async)
export async function getIPLanguage() {
  try {
    // Using ipapi.co — free, no API key needed, returns country_code
    const res = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error("IP lookup failed");
    const data = await res.json();
    const countryCode = data?.country_code?.toUpperCase();
    if (countryCode && COUNTRY_LANG_MAP[countryCode]) {
      return COUNTRY_LANG_MAP[countryCode];
    }
  } catch {
    // Silently fall through to default
  }
  return null;
}

// Save user choice
export function saveLanguage(lang) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
}

// Full detection chain (returns a promise)
// Priority: saved → browser → IP → 'en'
export async function detectLanguage() {
  const saved = getSavedLanguage();
  if (saved) return { lang: saved, source: "saved" };

  const browser = getBrowserLanguage();
  if (browser) return { lang: browser, source: "browser" };

  const ip = await getIPLanguage();
  if (ip) return { lang: ip, source: "ip" };

  return { lang: "en", source: "default" };
}
