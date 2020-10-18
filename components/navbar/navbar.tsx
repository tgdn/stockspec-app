import React from "react";
import Link from "next/link";

import Container from "components/container";
import styles from "./navbar.module.css";

function Logo() {
  return (
    <Link href="/">
      <a className={styles.logo}>
        <img src="/logo.svg" alt="" />
        <span>AlertMap</span>
      </a>
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Logo />
      </Container>
    </header>
  );
}
