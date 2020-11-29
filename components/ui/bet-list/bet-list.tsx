import React, { useContext } from "react";
import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IPaginatedResponse } from "types/paginated-response";
import { IBet } from "types/bet";
import { AuthContext, IAuthContext } from "providers/auth.provider";
import BetModal from "components/bet-modal";
import JoinBetModal from "components/join-bet-modal";
import EuroIcon from "components/icons/currency-euro";
import ClockIcon from "components/icons/clock";
import SparklesIcon from "components/icons/sparkles";

import styles from "./bet-list.module.css";
import { IPortfolio } from "types/portfolio";
import { IUser } from "types/user";

dayjs.extend(relativeTime);

interface IBetListProps {
  paginatedBets: IPaginatedResponse<IBet>;
  fetchError?: any;
}

const JoinButton = () => (
  <span
    className={cx(
      "font-medium py-0.5 px-1.5 -ml-1.5 rounded border",
      "text-white bg-blueGray-600 border-blueGray-600",
      "group-hover:text-blueGray-800 group-hover:bg-blueGray-300 group-hover:border-blueGray-300"
    )}
  >
    Join this bet
  </span>
);

interface IPortfolioLine {
  portfolio: IPortfolio;
  otherPortfolio: IPortfolio;
  winner?: IUser;
}

function PortfolioLine({ portfolio, otherPortfolio, winner }: IPortfolioLine) {
  const {
    user: { id },
  }: IAuthContext = useContext(AuthContext);
  const { perf } = portfolio || {};
  const isOtherCurrentUser = otherPortfolio?.user?.id === id;
  const isWinning = perf > otherPortfolio?.perf;

  // return join button if awaiting and not self
  if (!portfolio && !isOtherCurrentUser) {
    return (
      <div className="leading-loose">
        <JoinButton />
      </div>
    );
  } else if (!portfolio) {
    return (
      <div className="leading-loose text-sm text-gray-400">
        Awaiting oponent
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="flex space-x-1 items-center truncate w-40 leading-loose">
        <span>{portfolio.user.username}</span>
        {winner && winner.id == portfolio.user.id && (
          <SparklesIcon className="w-5 h-5 text-yellow-300" />
        )}
      </div>
      {perf && (
        <span
          className={cx({
            // "text-accent-green": perf > 0,
            "font-black": isWinning,
            "text-accent-green": isWinning && perf > 0,
            "text-accent-red": isWinning && perf < 0,
            "text-gray-300": !isWinning,
          })}
        >
          {perf > 0 && "+"}
          {(100 * perf).toFixed(2)}%
        </span>
      )}
    </div>
  );
}

function BetRow({ bet }: { bet: IBet }) {
  const {
    user: { id },
  }: IAuthContext = useContext(AuthContext);
  const { amount, end_time, duration } = bet;
  const { portfolios = [] } = bet;
  const [portfolio1, portfolio2] = portfolios;
  const isSelf = portfolio1?.user?.id === id || portfolio2?.user?.id === id;
  const isPast = dayjs(end_time || undefined).isBefore(dayjs(), "day");
  const isAwaiting = (portfolios?.length || 0) < 2;
  // here we allow others to click and join bet
  const Modal = !isAwaiting || isSelf ? BetModal : JoinBetModal;

  return (
    <Modal bet={bet}>
      <div
        className={cx(
          "flex px-3 py-2 group last:rounded-b last:border-b-0 border-b-2",
          "cursor-pointer border-gray-700 hover:bg-accent-lightblack",
          "transition duration-75"
        )}
      >
        <div className="flex-1">
          <PortfolioLine
            portfolio={portfolio1}
            otherPortfolio={portfolio2}
            winner={bet.winner}
          />
          <PortfolioLine
            portfolio={portfolio2}
            otherPortfolio={portfolio1}
            winner={bet.winner}
          />
        </div>
        <div className="text-right items-center leading-loose">
          <div className="flex items-center space-x-2 justify-end">
            <span>{amount}</span>
            <EuroIcon className="w-6 h-6 text-gray-500" />
          </div>
          <div className="flex items-center space-x-2 justify-end">
            <span>
              {portfolios.length == 2 && end_time && !isPast ? (
                <>{dayjs(end_time).from(dayjs(), true) + " left"}</>
              ) : (
                <>{duration == "1W" ? "1 week" : "1 day"}</>
              )}
            </span>
            <ClockIcon className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </div>
    </Modal>
  );
}

function BetRowPlaceholder() {
  return (
    <div className="flex px-3 py-2 last:rounded-b last:border-b-0 border-b-2 border-gray-700 animate-pulse">
      <div className="flex-1">
        {new Array(2).fill(null).map((_, idx) => (
          <div
            className="flex items-center"
            key={`bet-row-placeholder-userline-${idx}`}
          >
            <div className="flex space-x-1 truncate w-40">
              <span
                className={cx(
                  "h-5 my-1.5 bg-gray-600 rounded",
                  idx === 1 ? "w-16" : "w-10"
                )}
              />
            </div>
            <div className="flex text-gray-600 items-center space-x-1">
              <span
                className={cx(
                  "inline-block h-5 my-1.5 rounded bg-gray-600",
                  idx == 1 ? "w-12" : "w-14"
                )}
              />
              <span>%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BetList({ paginatedBets }: IBetListProps) {
  // maybe add loader in the future
  if (!paginatedBets)
    return (
      <div>
        {new Array(5).fill(null).map((_, idx) => (
          <BetRowPlaceholder key={`bet-row-placeholder-${idx}`} />
        ))}
      </div>
    );

  const betList = paginatedBets.results;

  return (
    <div>
      {betList.map((bet: IBet) => (
        <BetRow bet={bet} key={`bet-${bet.id}`} />
      ))}
    </div>
  );
}
