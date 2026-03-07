// utils/cookieUtils.ts
import Cookies from "js-cookie";
import {
  COOKIE_IS_COOKIE_CONSENTED_KEY,
  COOKIE_SHOW_COOKIE_BANNER_KEY,
  CookieConsentValue,
} from "@/configurations/constants";

export const COOKIE_EXPIRY_DAYS = 365; // 1 year

export const needShowCookieBanner = (): boolean => {
  const value = Cookies.get(COOKIE_SHOW_COOKIE_BANNER_KEY);
  return value === "true";
};

/**
 * Get the current cookie consent value
 */
export const getCookieConsent = (): CookieConsentValue => {
  const value = Cookies.get(COOKIE_IS_COOKIE_CONSENTED_KEY);
  if (value === "accepted" || value === "rejected") {
    return value;
  }

  return undefined;
};

/**
 * Set cookie consent value
 */
export const setCookieConsent = (value: "accepted" | "rejected"): void => {
  Cookies.set(COOKIE_IS_COOKIE_CONSENTED_KEY, value, {
    expires: COOKIE_EXPIRY_DAYS,
    sameSite: "strict",
    path: "/",
  });
};

/**
 * Check if user has made a consent choice
 */
export const hasCookieConsent = (): boolean => {
  return getCookieConsent() !== undefined;
};
