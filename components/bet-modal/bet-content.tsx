import React from "react";
import cx from "classnames";
import { ModalContent } from "components/ui/modal";
import { PrimaryButton, TertiaryButton } from "components/ui/buttons";
import { IBet } from "types/bet";
import { IPortfolio } from "types/portfolio";
import { ITicker } from "types/ticker";

interface IBetModalContent {
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

function Portfolio({
  portfolio,
  hasStarted,
}: {
  portfolio: IPortfolio;
  hasStarted: boolean;
}) {
  if (!portfolio) return <div className="flex-1" />;

  const { tickers, user, perf } = portfolio;
  return (
    <div className="flex-1 text-center">
      <div className="text-xl pb-4">{user.username}</div>
      <div>
        {hasStarted ? (
          <span
            className={cx("text-5xl", {
              "text-accent-green": perf > 0,
              "text-accent-red": perf < 0,
            })}
          >
            {(100 * perf).toFixed(2)}%
          </span>
        ) : (
          <span>Not started</span>
        )}
      </div>
      <div className="text-left px-2">
        {tickers?.map((ticker: ITicker, idx) => (
          <div key={`${portfolio.user.id}-ticker-${idx}`}>{ticker.symbol}</div>
        ))}
      </div>
    </div>
  );
}

export function BetModalContent({ bet, close }: IBetModalContent) {
  const { amount, duration, portfolios, start_time, end_time } = bet;
  const [portfolio1, portfolio2] = portfolios;
  const hasStarted = Boolean(start_time);
  return (
    <>
      <ModalContent>
        <div className="text-center sm:text-left">
          <h3 className="text-xl leading-6 font-medium" id="modal-headline">
            View bet
          </h3>
          <div className="pt-6 flex flex-row">
            <Portfolio portfolio={portfolio1} hasStarted={hasStarted} />
            <Portfolio portfolio={portfolio2} hasStarted={hasStarted} />
          </div>
        </div>
      </ModalContent>
      <Buttons close={close} />
    </>
  );
}
