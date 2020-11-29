import React, { HTMLAttributes } from "react";
import cx from "classnames";

interface IButtonProps {
  as?: string | React.FunctionComponent | React.ComponentClass;
  children?: React.ReactNode;
  className?: string;
  [prop: string]: any;
}

export function Button({
  as = "button",
  children,
  className,
  ...otherProps
}: IButtonProps) {
  const props: HTMLAttributes<any> = {
    className: cx(
      className,
      "px-4 py-2 text-base sm:text-sm font-medium rounded leading-6 sm:leading-5 transition ease-in-out duration-150"
    ),
    ...otherProps,
  };
  return React.createElement(as, props as any, children);
}

export function PrimaryButton({ className, ...props }: any) {
  return (
    <Button
      className="bg-gradient-to-r from-orange-300 to-yellow-200 text-orange-800 hover:to-orange-300 border border-transparent shadow-sm transition duration-75"
      {...props}
    ></Button>
  );
}

export function TertiaryButton({ className, ...props }: any) {
  return (
    <Button
      className="text-gray-400 hover:text-gray-100 border border-transparent"
      {...props}
    ></Button>
  );
}
