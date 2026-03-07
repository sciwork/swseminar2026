"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import {
  hasCookieConsent,
  needShowCookieBanner,
  setCookieConsent,
} from "@/utils/cookies";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (needShowCookieBanner() && !hasCookieConsent()) {
      setShowBanner(true);
    }
  }, []);

  const onAccept = () => {
    setCookieConsent("accepted");
    setShowBanner(false);
  };

  const onReject = () => {
    setCookieConsent("rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="tw:fixed tw:right-0 tw:bottom-0 tw:left-0 tw:z-50 tw:rounded-t-3xl tw:border-t tw:border-gray-200 tw:bg-white tw:shadow-lg">
      <div className="tw:mx-auto tw:w-11/12 tw:py-4 tw:tablet:w-3/4 tw:tablet:py-6">
        <div className="tw:flex tw:flex-col tw:gap-4 tw:tablet:flex-row tw:tablet:items-center tw:tablet:justify-between">
          <div className="tw:flex-1">
            <h3 className="tw:mb-2 tw:font-yk tw:text-xl tw:font-semibold tw:tracking-wide">
              We value your privacy
            </h3>
            <p className="tw:text-base tw:text-gray-600">
              We use cookies to enhance your browsing experience, serve
              personalised ads or content, and analyse our traffic. By clicking
              Accept All, you consent to our use of cookies.{" "}
              <a
                href="/code-of-conduct"
                className="hover:tw:text-rose-700 tw:text-rose-500 tw:underline"
              >
                Cookie Policy
              </a>
            </p>
          </div>
          <div className="tw:flex tw:flex-wrap tw:gap-3">
            <Button variant="secondary" onClick={onReject}>
              Reject All
            </Button>
            <Button variant="default" onClick={onAccept}>
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
