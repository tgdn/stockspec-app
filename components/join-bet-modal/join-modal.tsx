import React from "react";
import useSWR from "swr";
import { getBet } from "lib/api";
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
  const { data, error } = useSWR(`/bets/${bet.id}`, () => getBet(bet.id));
  return (
    <>
      {trigger}
      <Modal isOpen={isOpen} open={open} close={close} setOpen={setOpen}>
        {data ? (
          <JoinBetModalContent close={close} bet={data} />
        ) : (
          "Loading bet..."
        )}
      </Modal>
    </>
  );
}
