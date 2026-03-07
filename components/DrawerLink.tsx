import clsx from "clsx";
import NextLink from "next/link";

const DrawerLink = ({
  children,
  to,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  to: string;
  secondary?: boolean;
  is_blank?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
}) => {
  return (
    <NextLink
      className="tw:block tw:w-full tw:font-yk"
      href={to}
      target={props.is_blank ? "_blank" : "_self"}
      onClick={onClick}
    >
      <div
        className={clsx(
          "tw:px-7 tw:py-2 tw:text-2xl tw:font-medium tw:hover:text-sky-400",
          {
            "tw:leading-none tw:text-gray-400": props.secondary,
            "tw:leading-loose tw:text-black": !props.secondary,
          },
        )}
      >
        {children}
      </div>
    </NextLink>
  );
};

export default DrawerLink;
