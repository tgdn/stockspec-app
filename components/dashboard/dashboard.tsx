import React, { useContext } from "react";
import { IBet } from "types/bet";
import { ITicker } from "types/ticker";
import {
  DashboardContext,
  IDashboardContext,
} from "providers/dashboard.provider";
import Container from "components/ui/container";

function BetRow({ bet }: { bet: IBet }) {
  const { users = [] } = bet;
  const awaiting = users?.length < 2;

  return <div>{users.map((user) => user.username).join(" / ")}</div>;
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-4 text-white text-xl font-medium">{children}</h2>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="flex md:h-80 xl:h-96 flex-col px-4 md:px-8 py-3 md:py-5 rounded-lg bg-accent-darkgray shadow-lg">
    {children}
  </div>
);

function Dashboard() {
  const { topTickers, userBets, allBets }: IDashboardContext = useContext(
    DashboardContext
  );
  const tickers = topTickers?.results || [];
  const userBetsList = userBets?.results || [];
  const allBetsList = allBets?.results || [];
  return (
    <Container className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <SectionHeading>Top stocks</SectionHeading>
        <div className="space-y-3">
          {tickers.map((ticker: ITicker) => (
            <div key={`ticker-${ticker.symbol}`}>{ticker.symbol}</div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionHeading>Awaiting opponent</SectionHeading>
        <div className="space-y-3">
          {tickers.map((ticker: ITicker) => (
            <div key={`ticker-${ticker.symbol}`}>{ticker.symbol}</div>
          ))}
        </div>
      </Card>
    </Container>
  );
}

export default Dashboard;
