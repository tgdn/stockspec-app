import React, { useContext } from "react";
import {
  DashboardContext,
  IDashboardContext,
} from "providers/dashboard.provider";

function Dashboard() {
  const { topTickers }: IDashboardContext = useContext(DashboardContext);
  const { results: tickers } = topTickers;
  return (
    <div>
      {tickers.map((ticker, idx) => (
        <div>{ticker.symbol}</div>
      ))}
    </div>
  );
}

export default Dashboard;
