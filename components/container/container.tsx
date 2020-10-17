import React from "react";
import classnames from "classnames";
import styles from "./container.module.css";

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: IContainerProps) {
  const cx = classnames(styles.container, "lg:container", className);
  return <div className={cx}>{children}</div>;
}
