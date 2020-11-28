import { useEffect } from "react";

export function useKeyDownObserver(cb: (event: any) => void) {
  useEffect(() => {
    window.addEventListener("keydown", cb);
    return () => {
      window.removeEventListener("keydown", cb);
    };
  }, [cb]);
}
