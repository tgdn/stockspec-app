import React from "react";
import Meta from "components/meta";
import styles from "./layout.module.css";

interface IProps {
  children: React.ReactNode;
  bgColor?: string;
}

export default function Layout({ children, bgColor, ...extraProps }: IProps) {
  return (
    <>
      <Meta {...extraProps} />
      <div className={styles.layout}>
        <main>{children}</main>
      </div>
      <style jsx global>{`
        body {
          background-color: ${bgColor || "none"};
        }
      `}</style>
    </>
  );
}
