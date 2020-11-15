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

function BetRow({ bet }: { bet: IBet }) {
  const { users = [] } = bet;
  const awaiting = users?.length < 2;

  return <div>{users.map((user) => user.username).join(" / ")}</div>;
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="flex overflow-hidden md:h-80 xl:h-96 flex-col px-4 md:px-8 py-3 md:py-5 rounded-lg bg-accent-darkgray shadow-lg">
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
  const userBetsList = userBets?.results || [];
  const allBetsList = allBets?.results || [];
  const allBetsAwaitingList = allBetsAwaiting?.results || [];
  return (
    <Container className="mt-4 flex items-start">
      <div className="w-2/3 pr-4 grid md:grid-cols-2 gap-6">
        <Card>
          <SectionHeading>Your bets</SectionHeading>
          <div className="flex-1 space-y-2">
            {userBetsList.map((bet: IBet) => (
              <BetRow bet={bet} key={`bet-${bet.id}`} />
            ))}
          </div>
          <button className="px-2 py-2 font-medium rounded-md bg-accent-lightblue text-white">
            New Bet
          </button>
        </Card>
        <Card>
          <SectionHeading>Ongoing bets</SectionHeading>
          <div className="space-y-2">
            {allBetsList.map((bet: IBet) => (
              <BetRow bet={bet} key={`bet-${bet.id}`} />
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeading>Awaiting opponent </SectionHeading>
          <div className="space-y-3">
            {allBetsAwaitingList.map((bet: IBet) => (
              <BetRow bet={bet} key={`bet-${bet.id}`} />
            ))}
          </div>
        </Card>
      </div>
      <div className="w-1/3 pl-2 pr-4">
        <StockList tickers={tickers} loading={!topTickers} />
      </div>
    </Container>
  );
}

export default Dashboard;
