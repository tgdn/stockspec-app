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

function ErrorMessage({ message }: { message: string }) {
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

function FormControl(props: IFormControlProps, ref: React.Ref<any>) {
  const {
    type = "text",
    name,
    className,
    onChange,
    variants,
    hasError,
    message,
    ...otherProps
  } = props;

  return (
    <>
      <motion.div
        variants={variants}
        className={cx(styles.field, className, { [styles.hasError]: hasError })}
      >
        <input {...{ name, type }} {...otherProps} ref={ref} />
      </motion.div>
      {hasError && message && (
        <ErrorMessage key={`${name}-error`} message={message} />
      )}
    </>
  );
}

export default React.forwardRef(FormControl);
