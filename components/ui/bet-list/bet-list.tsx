import React, { useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IPaginatedResponse } from "types/paginated-response";
import { IBet } from "types/bet";
import { IUser } from "types/user";
import { AuthContext, IAuthContext } from "providers/auth.provider";

import styles from "./bet-list.module.css";

dayjs.extend(relativeTime);

interface IBetListProps {
  paginatedBets: IPaginatedResponse<IBet>;
}

const JoinButton = () => (
  <button className="text-sm px-2 font-medium rounded bg-yellow-600">
    join
  </button>
);

function UserLinkCell({
  user,
  otherUser,
}: {
  user?: IUser;
  otherUser?: IUser;
}) {
  const {
    user: { id },
  }: IAuthContext = useContext(AuthContext);
  const isOtherCurrentUser = otherUser?.id === id;

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
      <a
        href="#"
        className="px-1 font-medium truncate rounded transition duration-100 hover:text-blue-400"
      >
        {username}
      </a>
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
  const { users = [] } = bet;
  const [user1, user2] = users;
  const awaiting = users?.length < 2;

  return (
    <tr className="">
      <td>
        <div className="flex pr-2 space-x-1">
          <UserLinkCell user={user1} otherUser={user2} />
          <UserLinkCell user={user2} otherUser={user1} />
        </div>
      </td>
      <td>
        <AmountCell amount={bet.amount} />
      </td>
      <td>
        <DurationCell duration={bet.duration} />
      </td>
      <td className="text-right w-16">
        <span className="text-xs">
          {bet.end_time && dayjs(bet.end_time).from(dayjs(), true) + " left"}
        </span>
      </td>
    </tr>
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
          <th>length</th>
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
