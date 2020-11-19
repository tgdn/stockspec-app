import { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useKeyDownObserver } from "lib/hooks";

function ModalOverlay() {
  return (
    <>
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-600 opacity-75" />
      </div>
      {/* This element is to trick the browser into centering the modal contents. */}
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />​
    </>
  );
}

export function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>;
}

export default function Modal({ children, isOpen, open, close, setOpen }) {
  const modalRootId = "modal-root";
  const [mountExists, setMountExists] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") {
      throw Error("Cannot open a modal on the server");
    }

    let modalRoot = document.getElementById(modalRootId);
    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.id = modalRootId;
      document.body.appendChild(modalRoot);
    }
    setMountExists(true);
  }, []);

  const handleEscape = useCallback(
    (event: any) => {
      if (!isOpen) return;
      if (event.key === "Escape" || event.keyCode === 27) {
        close();
      }
    },
    [isOpen, close]
  );

  useKeyDownObserver(handleEscape);

  if (!isOpen) return null;

  const modal = (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <ModalOverlay />
        <div
          className="inline-block align-bottom bg-accent-lighterblack rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {children}
        </div>
      </div>
    </div>
  );

  return (
    mountExists &&
    ReactDOM.createPortal(modal, document.getElementById(modalRootId))
  );
}
