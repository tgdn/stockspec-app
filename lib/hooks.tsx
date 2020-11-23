import { useEffect, useState, useCallback } from "react";

export function useKeyDownObserver(cb: (event: any) => void) {
  useEffect(() => {
    window.addEventListener("keydown", cb);
    return () => {
      window.removeEventListener("keydown", cb);
    };
  }, [cb]);
}

export function useModalState(defaultIsOpen: boolean = false) {
  const [isOpen, setOpen] = useState(defaultIsOpen);

  const close = useCallback(() => {
    setOpen(false);
  }, [isOpen, setOpen]);

  const open = useCallback(() => {
    setOpen(true);
  }, [isOpen, setOpen]);

  return { isOpen, setOpen, close, open };
}
