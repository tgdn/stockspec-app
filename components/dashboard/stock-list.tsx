import React from "react";
import { ITicker } from "types/ticker";
import SectionHeading from "components/dashboard/section-heading";

import styles from "./stock-list.module.css";

interface IStockList {
  tickers: Array<ITicker>;
  loading: boolean;
}

function StockRow({ ticker }: { ticker: ITicker }) {
  return (
    <div className={styles.row}>
      <div className="flex flex-col w-20 space-y-1">
        <span className="text-sm">{ticker.symbol}</span>
        <span className="truncate text-xs">{ticker.company}</span>
      </div>
      <div className="flex-1"></div>
      <div className="flex flex-col text-xs">
        <span>price</span>
        <span>chg</span>
      </div>
    </div>
  );
}

export default function StockList({ tickers, loading }: IStockList) {
  return (
    <div className={styles.container}>
      <SectionHeading>Most used</SectionHeading>
      <div className="space-y-3">
        {tickers.map((ticker: ITicker) => (
          <StockRow key={`ticker-${ticker.symbol}`} ticker={ticker} />
        ))}
      </div>
    </div>
  );
}
