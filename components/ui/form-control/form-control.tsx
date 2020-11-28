import React from "react";
import cx from "classnames";
import { motion, Variants } from "framer-motion";

import styles from "./form-control.module.css";

interface IFormControlProps {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  hasError?: boolean;
  message?: string;
  variants?: Variants;
  [prop: string]: any;
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-red-500 mb-6"
    >
      {message}
    </motion.p>
  );
}

export function Label({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <label htmlFor={id} className="font-medium text-base text-gray-200">
      {children}
    </label>
  );
}

function FormControl(props: IFormControlProps, ref: React.Ref<any>) {
  const {
    type = "text",
    name,
    label,
    className,
    onChange,
    variants,
    hasError,
    message,
    ...otherProps
  } = props;

  const { id = `${name}-id` } = props;

  return (
    <>
      <motion.div
        variants={variants}
        className={cx(styles.field, styles.light, className, {
          [styles.hasError]: hasError,
        })}
      >
        {label && <Label id={id}>{label}</Label>}
        <input id={id} {...{ name, type }} {...otherProps} ref={ref} />
      </motion.div>
      {hasError && message && (
        <ErrorMessage key={`${name}-error`} message={message} />
      )}
    </>
  );
}

export default React.forwardRef(FormControl);
