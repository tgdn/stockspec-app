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
      "px-4 py-2 text-base sm:text-sm font-medium rounded-md leading-6 sm:leading-5 transition ease-in-out duration-150"
    ),
    ...otherProps,
  };
  return React.createElement(as, props as any, children);
}

export function PrimaryButton({ className, ...props }: any) {
  return (
    <Button
      className="bg-gradient-to-b from-accent-lightblue to-accent-darkblue hover:via-accent-lightblue bg-accent-lightblue text-white border border-transparent shadow-sm"
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
