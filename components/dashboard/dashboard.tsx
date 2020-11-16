import React, { useContext } from "react";
import { IBet } from "types/bet";
import { ITicker } from "types/ticker";
import {
  DashboardContext,
  IDashboardContext,
} from "providers/dashboard.provider";
import Container from "components/ui/container";
import SectionHeading from "components/dashboard/section-heading";
import StockList from "./stock-list";
import BetList from "components/ui/bet-list";

function BetRow({ bet }: { bet: IBet }) {
  const { users = [] } = bet;
  const awaiting = users?.length < 2;

  return <div>{users.map((user) => user.username).join(" / ")}</div>;
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="flex overflow-hidden lg:h-80 xl:h-96 flex-col px-4 xl:px-6 py-3 rounded-lg bg-accent-darkgray shadow-lg">
    {children}
  </div>
);

function Dashboard() {
  const {
    topTickers,
    userBets,
    allBets,
    allBetsAwaiting,
  }: IDashboardContext = useContext(DashboardContext);
  const tickers = topTickers?.results || [];
  return (
    <Container className="my-4 flex items-start">
      <div className="w-2/3 pr-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 gap-6">
        <Card>
          <SectionHeading>Your bets</SectionHeading>
          <div className="flex-1">
            <BetList paginatedBets={userBets} />
          </div>
          <button className="px-2 py-2 font-medium rounded-md bg-accent-lightblue text-white">
            New Bet
          </button>
        </Card>
        <Card>
          <SectionHeading>Ongoing bets</SectionHeading>
          <BetList paginatedBets={allBets} />
        </Card>
        <Card>
          <SectionHeading>Awaiting opponent </SectionHeading>
          <BetList paginatedBets={allBetsAwaiting} />
        </Card>
      </div>
      <div className="w-1/3 pl-2">
        <StockList tickers={tickers} loading={!topTickers} />
      </div>
    </Container>
  );
}

export default Dashboard;
