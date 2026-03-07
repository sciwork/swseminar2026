type Props = {
  as?: string | React.ElementType;
  className?: string;
  children: React.ReactNode;
};

const Container = ({ as: Component = "div", className, children }: Props) => {
  return (
    <Component className={className}>
      <div className="tw:mx-auto tw:w-11/12 tw:tablet:w-3/4">{children}</div>
    </Component>
  );
};

export default Container;
