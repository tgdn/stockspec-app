import React, { useContext } from "react";
import cx from "classnames";
import { ParentSize } from "@visx/responsive";
import { ITicker } from "types/ticker";

import {
  IStockSeriesContext,
  StockSeriesContext,
  StockSeriesProvider,
} from "providers/stockseries.provider";
import { IStockPrice } from "types/stock-price";

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
  if (!percentage || isNaN(percentage)) return null;
  return (
    <div
      className={cx(styles.percentageChg, {
        [styles.neg]: percentage < 0,
        [styles.pos]: percentage >= 0,
      })}
    >
      {percentage >= 0 && "+"}
      {(100 * percentage).toFixed(2)}%
    </div>
  );
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
      <div className="flex flex-col justify-around w-12 text-xs">
        <span className="text-right font-medium">
          {ticker.last_price && parseFloat(ticker.last_price)?.toFixed(2)}
        </span>
        <PercentChange percentage={parseFloat(ticker.percentage_change)} />
      </div>
    </div>
  );
}

export default function StockList({ tickers, loading }: IStockList) {
  return (
    <div className={styles.container}>
      <SectionHeading>Hot tickers</SectionHeading>
      <div className="-mx-3 sm:mx-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-0 sm:gap-2 lg:gap-3">
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
