import React, { useContext } from "react";
import { ParentSize } from "@visx/responsive";
import { ITicker } from "types/ticker";

import {
  IStockSeriesContext,
  StockSeriesContext,
  StockSeriesProvider,
} from "providers/stockseries.provider";
import SectionHeading from "components/dashboard/section-heading";

import StockChart from "./stock-chart";

import styles from "./stock-list.module.css";

interface IStockList {
  tickers: Array<ITicker>;
  loading: boolean;
}

const xAccessor = (dataPoint: IStockPrice) => new Date(dataPoint.time);
const yAccessor = (dataPoint: IStockPrice) => dataPoint.price;

function PercentChange({ percentage }: { percentage: number }) {
  return <div>{100 * percentage}</div>;
}

function StockRow() {
  const { ticker }: IStockSeriesContext = useContext(StockSeriesContext);
  return (
    <div className={styles.row}>
      <div className="flex flex-col w-20 space-y-1 px-1 py-1">
        <span className="text-sm">{ticker.symbol}</span>
        <span className="truncate text-xs">{ticker.company}</span>
      </div>
      <div className="flex flex-1 overflow-hidden mx-2">
        <ParentSize>
          {({ width, height }) => <StockChart {...{ width, height }} />}
        </ParentSize>
      </div>
      <div className="flex flex-col w-12 text-xs">
        <span className="text-right">{ticker.price}</span>
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
          <StockSeriesProvider
            {...{ ticker, xAccessor, yAccessor }}
            key={`ticker-${ticker.symbol}`}
          >
            <StockRow />
          </StockSeriesProvider>
        ))}
      </div>
    </div>
  );
}
