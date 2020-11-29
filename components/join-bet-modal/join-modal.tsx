import React from "react";
import useSWR from "swr";
import { getTickers } from "lib/api";
import { useModalState } from "lib/hooks";
import Modal from "components/ui/modal";
import { JoinBetModalContent } from "./join-content";
import { IBet } from "types/bet";

interface IBetModal {
  children: React.ReactElement;
  bet: IBet;
}

export default function JoinBetModal({ children, bet }: IBetModal) {
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
          <JoinBetModalContent close={close} tickers={tickers} bet={bet} />
        ) : (
          "Loading tickers..."
        )}
      </Modal>
    </>
  );
}
