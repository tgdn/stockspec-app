import React, { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { extent, max, min } from "d3-array";
import { scaleTime, scaleLinear } from "@visx/scale";

import { ITicker } from "types/ticker";
import { IStockPrice } from "types/stock-price";
import { getStockSeries } from "lib/api";

interface IProps {
  ticker: ITicker;
  width: any;
  height: any;
  children: React.ReactNode;
}

interface IState {
  ticker: ITicker;
  prices: Array<IStockPrice>;
  error?: any;
  delta: number;
  percentageChg: number;
  chart: {
    width: any;
    height: any;
    x: any;
    y: any;
    yScale: any;
  };
}

export interface IStockSeriesContext extends IState {}

export const StockSeriesContext = createContext({} as IStockSeriesContext);

const xAccessor = (dataPoint: IStockPrice) => new Date(dataPoint.time);
const yAccessor = (dataPoint: IStockPrice) => parseFloat(dataPoint.price);

export function StockSeriesProvider({
  ticker,
  width,
  height,
  children,
}: IProps) {
  let { data, error } = useSWR(`/series/${ticker.symbol}`, getStockSeries);

  let prices = data;
  let percentageChg = 0.0;
  let delta = 0;
  if (prices) {
    prices = data.slice(70);
    const start = yAccessor(prices[0]);
    const end = yAccessor(prices[prices.length - 1]);
    delta = end - start;
    percentageChg = (delta / start) * 100;
  }
  const margin = { left: 0, right: 0, top: 0, bottom: 0 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const maxY = max(prices || [], yAccessor);
  const minY = min(prices || [], yAccessor);

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(prices || [], xAccessor),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [minY, maxY],
    nice: true,
  });

  return (
    <StockSeriesContext.Provider
      value={{
        ticker,
        prices,
        error,
        delta,
        percentageChg,
        chart: {
          width,
          height,
          x: (d: IStockPrice) => xScale(xAccessor(d)),
          y: (d: IStockPrice) => yScale(yAccessor(d)),
          yScale,
        },
      }}
    >
      {children}
    </StockSeriesContext.Provider>
  );
}
