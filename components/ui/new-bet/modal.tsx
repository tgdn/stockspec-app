import React, { useCallback, useState } from "react";
import useSWR from "swr";
import { getTickers } from "lib/api";
import Modal from "components/ui/modal";
import { NewBetForm } from "./form";
import { useModalState } from "lib/hooks";

export default function NewBet({ children }: { children: React.ReactElement }) {
  const { trigger, isOpen, open, close, setOpen } = useModalState(
    children,
    false
  );
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
