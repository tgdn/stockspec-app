import React from "react";

import Layout from "components/ui/layout";
import Container from "components/ui/container";

import Navbar from "./navbar";
import styles from "./auth-layout.module.css";

interface IAuthLayout {
  children: React.ReactNode;
}

interface IFieldsetProps {
  children: React.ReactNode;
}

function Fieldset({ children }: IFieldsetProps) {
  return <div className={styles.fieldset}>{children}</div>;
}

export default function AuthLayout({ children }: IAuthLayout) {
  return (
    <Layout bgColor="#1F2125">
      {/* <Navbar /> */}
      <Container className={styles.container}>
        <Fieldset>{children}</Fieldset>
      </Container>
    </Layout>
  );
}
