import React from "react";
import { IPaginatedResponse } from "types/paginated-response";
import { ITicker } from "types/ticker";
import SectionHeading from "components/dashboard/section-heading";

interface IStockList {
  tickers: Array<ITicker>;
  loading: boolean;
}

export default function StockList({ tickers, loading }: IStockList) {
  return (
    <div>
      <SectionHeading>Top stocks</SectionHeading>
      <div className="space-y-3">
        {tickers.map((ticker: ITicker) => (
          <div key={`ticker-${ticker.symbol}`}>{ticker.symbol}</div>
        ))}
      </div>
    </div>
  );
}
