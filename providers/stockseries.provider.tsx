import React, { createContext } from "react";
import useSWR from "swr";

import { ITicker } from "types/ticker";
import { IStockPrice } from "types/stock-price";
import { getStockSeries } from "lib/api";

interface IProps {
  ticker: ITicker;
  children: React.ReactNode;
  xAccessor: any;
  yAccessor: any;
}

interface IState {
  ticker: ITicker;
  prices: Array<IStockPrice>;
  error?: any;
  percentageChange: number;
  delta: number;
  xAccessor: any;
  yAccessor: any;
}

export interface IStockSeriesContext extends IState {}

export const StockSeriesContext = createContext({} as IStockSeriesContext);

export function StockSeriesProvider({
  ticker,
  xAccessor,
  yAccessor,
  children,
}: IProps) {
  const { data, error } = useSWR(`/series/${ticker.symbol}`, getStockSeries);

  let prices = data;
  let percentageChange = 0.0;
  let delta = 0;

  if (prices && prices.length > 0) {
    prices = prices.slice(Math.max(prices.length - 20, 0));
    const start = yAccessor(prices[prices.length - 2]);
    const end = yAccessor(prices[prices.length - 1]);
    delta = end - start;
    percentageChange = delta / start;
  }

  return (
    <StockSeriesContext.Provider
      value={{
        ticker,
        prices,
        error,
        percentageChange,
        delta,
        xAccessor,
        yAccessor,
      }}
    >
      {children}
    </StockSeriesContext.Provider>
  );
}
