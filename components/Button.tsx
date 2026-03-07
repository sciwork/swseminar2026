import clsx from "clsx";
import NextLink, { LinkProps as InternalLinkProps } from "next/link";
import { HTMLProps, MouseEvent } from "react";

type Props = {
  className?: string;
  variant?: "default" | "action" | "secondary";
  btnSize?: "medium" | "small";
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
};

const Button = ({
  className,
  variant = "default",
  btnSize = "medium",
  children,
  to,
  onClick,
  ...rest
}: Props & HTMLProps<HTMLButtonElement>) => {
  let Component: any = to ? NextLink : "button";
  let props:
    | {
        href?: string;
        onClick?: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
      }
    | InternalLinkProps = {};

  if (to) {
    props["href"] = to;
  }

  if (onClick) {
    props["onClick"] = onClick;
  }

  return (
    <Component
      className={clsx(
        "tw:rounded-full tw:px-4 tw:py-1 tw:font-bold tw:no-underline tw:outline-none tw:focus:ring-2",
        className,
        {
          "tw:bg-rose-500 tw:text-white tw:hover:bg-rose-700":
            variant === "default",
          "tw:bg-orange-400 tw:text-white tw:hover:bg-orange-600":
            variant === "action",
          "tw:bg-gray-200 tw:text-gray-800 tw:hover:bg-gray-300":
            variant === "secondary",
          "tw:px-4 tw:py-1 tw:text-base": btnSize === "medium",
          "tw:p-1 tw:text-xs": btnSize === "small",
        },
      )}
      {...props}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Button;
