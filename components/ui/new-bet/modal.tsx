import React, { useCallback, useState } from "react";
import useSWR from "swr";
import { getTickers } from "lib/api";
import Modal from "components/ui/modal";
import { NewBetForm } from "./form";

export default function NewBet({ children }: { children: React.ReactElement }) {
  const [isOpen, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
  }, [isOpen, setOpen]);

  const open = useCallback(() => {
    setOpen(true);
  }, [isOpen, setOpen]);

  // throws
  React.Children.only(children);
  const trigger = React.cloneElement(children, {
    onClick: open,
  });

  const { data: tickers, error } = useSWR("/tickers", getTickers);

  return (
    <>
      {trigger}
      <Modal isOpen={isOpen} open={open} close={close} setOpen={setOpen}>
        {tickers ? (
          <NewBetForm tickers={tickers} close={close} />
        ) : (
          "Loading tickers..."
        )}
      </Modal>
    </>
  );
}
