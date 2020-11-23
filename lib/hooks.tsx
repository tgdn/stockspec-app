import React, { useEffect, useState, useCallback } from "react";

export function useKeyDownObserver(cb: (event: any) => void) {
  useEffect(() => {
    window.addEventListener("keydown", cb);
    return () => {
      window.removeEventListener("keydown", cb);
    };
  }, [cb]);
}

export function useModalState(
  triggerElement: React.ReactElement,
  defaultIsOpen: boolean = false
) {
  const [isOpen, setOpen] = useState(defaultIsOpen);

  const close = useCallback(() => {
    setOpen(false);
  }, [isOpen, setOpen]);

  const open = useCallback(() => {
    setOpen(true);
  }, [isOpen, setOpen]);

  // throws
  React.Children.only(triggerElement);
  const trigger = React.cloneElement(triggerElement, {
    onClick: open,
  });

  return { trigger, isOpen, setOpen, close, open };
}
