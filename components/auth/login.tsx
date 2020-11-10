import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { containerVariant, itemVariant } from "./animation";
import FormControl from "components/ui/form-control";
import styles from "./login.module.css";

function LoginForm() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      key="email-login-flow"
      className={styles.loginForm}
      variants={containerVariant}
      initial="hidden"
      animate={"visible"}
    >
      <form action="" onSubmit={onSubmit} className="-mb-2">
        <FormControl
          name="email"
          placeholder="Email"
          type="email"
          variants={itemVariant}
        />
        <FormControl
          name="password"
          placeholder="Password"
          type="password"
          variants={itemVariant}
        />
        <div>
          <button className="px-6 py-3 block w-full text-white font-medium bg-blue-600 rounded-xl">
            Enter
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default function Login() {
  return (
    <>
      <h1 className="text-2xl text-center text-gray-600">stockspec</h1>
      <h2 className={styles.heading}>Sign in to get started</h2>
      <motion.div className={styles.content}>
        <AnimatePresence>
          <LoginForm />
        </AnimatePresence>
      </motion.div>
    </>
  );
}
