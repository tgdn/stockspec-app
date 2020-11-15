import React, { useContext } from "react";
import cx from "classnames";
import { ParentSize } from "@visx/responsive";
import { LinePath, AreaClosed } from "@visx/shape";
import { ITicker } from "types/ticker";
import { extent, max, min } from "d3-array";

import {
  IStockSeriesContext,
  StockSeriesContext,
  StockSeriesProvider,
} from "providers/stockseries.provider";
import { IStockPrice } from "types/stock-price";
import SectionHeading from "components/dashboard/section-heading";

import styles from "./stock-list.module.css";

interface IStockList {
  tickers: Array<ITicker>;
  loading: boolean;
}

function StockChart() {
  const {
    prices,
    delta,
    chart: { width, height, x, y, yScale },
  }: IStockSeriesContext = useContext(StockSeriesContext);
  if (!prices) return null;

  const curveClassName = delta > 0 ? styles.pos : styles.neg;
  const areaFill = delta > 0 ? "url(#gradient-green)" : "url(#gradient-red)";

  return (
    <svg width={width} height={height}>
      <g>
        <LinePath
          data={prices}
          x={x}
          y={y}
          fill="transparent"
          strokeWidth={2}
          className={cx(styles.curve, curveClassName)}
        />
        <AreaClosed
          data={prices}
          x={x}
          y={y}
          yScale={yScale}
          strokeWidth={2}
          stroke="transparent"
          fill={areaFill}
        />
      </g>
    </svg>
  );
}

function StockRow({ ticker }: { ticker: ITicker }) {
  return (
    <div className={styles.row}>
      <div className="flex flex-col w-20 space-y-1">
        <span className="text-sm">{ticker.symbol}</span>
        <span className="truncate text-xs">{ticker.company}</span>
      </div>
      <div className="flex flex-1 overflow-hidden mx-2">
        <ParentSize>
          {({ width, height }) => (
            <StockSeriesProvider {...{ ticker, width, height }}>
              <StockChart />
            </StockSeriesProvider>
          )}
        </ParentSize>
      </div>
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
          <StockRow ticker={ticker} key={`ticker-${ticker.symbol}`} />
        ))}
      </div>
    </div>
  );
}
