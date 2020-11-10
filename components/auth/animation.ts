import { Variants } from "framer-motion";

export const containerVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: {
      default: {
        duration: 0.1,
      },
      scale: {
        duration: 1,
      },
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      delay: 0,
      when: "beforeChildren",
      staggerChildren: 0.03,
    },
  },
};

export const basicFlowVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      when: "beforeChildren",
    },
  },
};

export const itemVariant: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
