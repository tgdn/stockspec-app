import React, { useContext } from "react";
import { IBet } from "types/bet";
import {
  DashboardContext,
  IDashboardContext,
} from "providers/dashboard.provider";
import Container from "components/ui/container";
import SectionHeading from "components/dashboard/section-heading";
import StockList from "./stock-list";
import TabSelector from "./tab-selector";
import BetList from "components/ui/bet-list";
import NewBet from "components/ui/new-bet";
import { PrimaryButton } from "components/ui/buttons";

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
  const { topTickers }: IDashboardContext = useContext(DashboardContext);
  const tickers = topTickers?.results || [];
  return (
    <Container className="my-4 flex flex-col md:flex-row items-start space-y-4 md:space-y-0">
      <div className="w-full md:pr-4">
        <TabSelector />
      </div>
      <div className="w-full md:w-120 lg:w-108 xl:w-120 md:pl-2">
        <StockList tickers={tickers} loading={!topTickers} />
      </div>
    </Container>
  );
}

export default Dashboard;
