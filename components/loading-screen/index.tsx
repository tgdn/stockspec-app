import React from "react";
import { motion } from "framer-motion";

import styles from "./loading-screen.module.css";
import Layout from "components/ui/layout";

export default function LoadingScreen() {
  return (
    <Layout>
      <div className={styles.background}>
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ loop: Infinity, duration: 1.5 }}
          className={styles.logo}
        >
          <span>stockspec</span>
        </motion.div>
      </div>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </Layout>
  );
}
