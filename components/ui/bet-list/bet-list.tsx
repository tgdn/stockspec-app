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

import styles from "./bet-list.module.css";
import { IPortfolio } from "types/portfolio";
import CurrencyEuro from "components/icons/currency-euro";

dayjs.extend(relativeTime);

interface IBetListProps {
  paginatedBets: IPaginatedResponse<IBet>;
}

interface IUserCellProps {
  portfolio?: IPortfolio;
  otherPortfolio?: IPortfolio;
}

const JoinButton = () => (
  <button className="text-sm px-2 font-medium rounded bg-yellow-600">
    join
  </button>
);

function UserLinkCell({ portfolio, otherPortfolio }: IUserCellProps) {
  const {
    user: { id },
  }: IAuthContext = useContext(AuthContext);
  const { user, perf } = portfolio || {};
  const isOtherCurrentUser = otherPortfolio?.user?.id === id;

  if (!user && !isOtherCurrentUser) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <JoinButton />
      </div>
    );
  } else if (!user) return null;

  const { username } = user;
  return (
    <div className="flex items-center text-sm py-2 flex-1">
      <span className="px-1 font-medium truncate rounded transition duration-100 space-x-1">
        <span className="truncate">{username}</span>
        {perf && (
          <span
            className={cx("text-xs", {
              "text-accent-green": perf > 0,
              "text-accent-red": perf < 0,
            })}
          >
            {(100 * perf).toFixed(2)}%
          </span>
        )}
      </span>
    </div>
  );
}

function DurationCell({ duration }) {
  return (
    <div className="text-center text-xs flex items-center justify-center">
      <span className="bg-accent-lightblack px-1 p-0.5 rounded">
        {duration}
      </span>
    </div>
  );
}

function AmountCell({ amount }) {
  return <div className="text-center text-sm">{amount}</div>;
}

function PortfolioLine({ portfolio }: { portfolio: IPortfolio }) {
  if (!portfolio) {
    return (
      <div>
        <JoinButton />
      </div>
    );
  }
  return <div>{portfolio.user.username}</div>;
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
          <PortfolioLine portfolio={portfolio1} />
          <PortfolioLine portfolio={portfolio2} />
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 justify-end">
            <span>{amount}</span>
            <CurrencyEuro className="w-6 h-6 text-gray-500" />
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
