import React, { useContext } from "react";
import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IPaginatedResponse } from "types/paginated-response";
import { IBet } from "types/bet";
import { AuthContext, IAuthContext } from "providers/auth.provider";
import BetModal from "components/bet-modal";
import EuroIcon from "components/icons/currency-euro";
import ClockIcon from "components/icons/clock";
import SparklesIcon from "components/icons/sparkles";

import styles from "./bet-list.module.css";
import { IPortfolio } from "types/portfolio";
import { IUser } from "types/user";

dayjs.extend(relativeTime);

interface IBetListProps {
  paginatedBets: IPaginatedResponse<IBet>;
}

const JoinButton = () => (
  <button className="text-sm px-2 font-medium rounded bg-yellow-600">
    join
  </button>
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
      <div>
        <JoinButton />
      </div>
    );
  } else if (!portfolio) {
    return <div className="text-gray-400">Awaiting oponent</div>;
  }

  return (
    <div className="flex">
      <div className="flex space-x-1 truncate w-40">
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
  const { amount, end_time, duration } = bet;
  const { portfolios = [] } = bet;
  const [portfolio1, portfolio2] = portfolios;
  const isPast = dayjs(end_time || undefined).isBefore(dayjs(), "day");
  const awaiting = (portfolios?.length || 0) < 2;

  return (
    <BetModal bet={bet}>
      <div className="flex px-3 py-2 last:border-b-0 border-b-2 border-gray-700 cursor-pointer hover:bg-gray-800">
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
        <div className="text-right">
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
    </BetModal>
  );
}

export default function BetList({ paginatedBets }: IBetListProps) {
  // maybe add loader in the future
  if (!paginatedBets) return null;

  const betList = paginatedBets.results;

  return (
    <div>
      {betList.map((bet: IBet) => (
        <BetRow bet={bet} key={`bet-${bet.id}`} />
      ))}
    </div>
  );
}
