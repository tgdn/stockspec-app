import React from "react";
import cx from "classnames";
import { ModalContent } from "components/ui/modal";
import { PrimaryButton, TertiaryButton } from "components/ui/buttons";
import { IBet } from "types/bet";
import { IPortfolio } from "types/portfolio";
import { ITicker } from "types/ticker";

interface IJoinBetModalContent {
  close: any;
  bet: IBet;
}

function Buttons({ close }: { close: any }) {
  return (
    <>
      {/* buttons */}
      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span className="mt-3 flex w-full rounded-md sm:mt-0 sm:w-auto">
          <TertiaryButton
            onClick={close}
            type="button"
            className="inline-flex justify-center w-full"
          >
            Close
          </TertiaryButton>
        </span>
      </div>
    </>
  );
}

export function JoinBetModalContent({ bet, close }: IJoinBetModalContent) {
  const { amount, duration, portfolios, start_time, end_time } = bet;
  const [portfolio1, portfolio2] = portfolios;
  const hasStarted = Boolean(start_time);
  return (
    <>
      <ModalContent>
        <div className="text-center sm:text-left">
          <h3 className="text-xl leading-6 font-medium" id="modal-headline">
            Join bet
          </h3>
          <div className="pt-6 flex flex-row">hello</div>
        </div>
      </ModalContent>
      <Buttons close={close} />
    </>
  );
}
