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

  if (prices && prices.length > 0) {
    prices = prices.slice(Math.max(prices.length - 30, 0));
  }

  return (
    <StockSeriesContext.Provider
      value={{
        ticker,
        prices,
        error,
        xAccessor,
        yAccessor,
      }}
    >
      {children}
    </StockSeriesContext.Provider>
  );
}
