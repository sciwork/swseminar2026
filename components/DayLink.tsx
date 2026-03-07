"use client";

import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const Link = ({
  active,
  children,
  to,
}: {
  active?: boolean;
  children: React.ReactNode;
  to: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === to || active === true;
  return (
    <NextLink
      className={clsx(
        "tw:font-yk tw:text-xl tw:leading-loose tw:no-underline tw:hover:text-rose-600 tw:tablet:text-3xl",
        {
          "tw:cursor-default tw:text-rose-600": isActive,
        },
      )}
      href={to}
      onClick={(e) => {
        if (isActive) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </NextLink>
  );
};

export default Link;
