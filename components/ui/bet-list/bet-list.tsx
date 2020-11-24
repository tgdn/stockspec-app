import React, { useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IPaginatedResponse } from "types/paginated-response";
import { IBet } from "types/bet";
import { AuthContext, IAuthContext } from "providers/auth.provider";
import BetModal from "components/bet-modal";

import styles from "./bet-list.module.css";
import { IPortfolio } from "types/portfolio";

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
  const user = portfolio?.user;
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
      <span className="px-1 font-medium truncate rounded transition duration-100">
        {username}
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

function BetRow({ bet }: { bet: IBet }) {
  const { portfolios = [] } = bet;
  const [portfolio1, portfolio2] = portfolios;
  const awaiting = (portfolios?.length || 0) < 2;

  return (
    <BetModal bet={bet}>
      <tr className="">
        <td>
          <div className="flex pr-2 space-x-1">
            <UserLinkCell portfolio={portfolio1} otherPortfolio={portfolio2} />
            <UserLinkCell portfolio={portfolio2} otherPortfolio={portfolio1} />
          </div>
        </td>
        <td>
          <AmountCell amount={bet.amount} />
        </td>
        <td className="text-right w-16">
          <span className="text-xs">
            {bet.end_time && dayjs(bet.end_time).from(dayjs(), true) + " left"}
          </span>
        </td>
      </tr>
    </BetModal>
  );
}

export default function BetList({ paginatedBets }: IBetListProps) {
  // maybe add loader in the future
  if (!paginatedBets) return null;

  const betList = paginatedBets.results;
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>players</th>
          <th>$</th>
          <th>timeleft</th>
        </tr>
      </thead>
      <tbody>
        {betList.map((bet: IBet) => (
          <BetRow bet={bet} key={`bet-${bet.id}`} />
        ))}
      </tbody>
    </table>
  );
}
