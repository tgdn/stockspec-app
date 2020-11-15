import React, { useContext } from "react";
import Link from "next/link";

import Container from "components/ui/container";
import styles from "./navbar.module.css";
import { AuthContext, IAuthContext } from "providers/auth.provider";

function Logo() {
  return (
    <Link href="/">
      <a className={styles.logo}>
        {/* <img src="/logo.svg" alt="" /> */}
        <span>stockspec</span>
      </a>
    </Link>
  );
}

function Name() {
  const {
    user: { username, first_name, last_name },
  }: IAuthContext = useContext(AuthContext);
  const name =
    first_name && last_name ? `${first_name} ${last_name}` : username;

  return (
    <div className="flex items-center space-x-2 cursor-default rounded-full px-2.5 py-1.5 transition duration-300 hover:bg-accent-darkgray">
      <div
        className="rounded-full w-6 h-6 bg-center bg-cover"
        style={{
          backgroundImage: `url(http://gravatar.com/avatar?f=y&d=identicon)`,
        }}
      ></div>
      <span className="font-medium">{name}</span>
    </div>
  );
}

export default function Navbar() {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className="flex-1">
          <Logo />
        </div>
        <div className="flex items-center">
          <Name />
        </div>
      </Container>
    </header>
  );
}
