import React from "react";
import Link from "next/link";

import Container from "components/container";
import styles from "./navbar.module.css";

function Logo() {
  return (
    <Link href="/">
      <a className={styles.logo}>AlertMap</a>
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className={styles.header}>
      <Container>
        <Logo />
      </Container>
    </header>
  );
}
