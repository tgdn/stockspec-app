import React, { createContext } from "react";
import useSWR from "swr";

import { getTopTickers } from "lib/api";
import { ITicker } from "types/ticker";
import { IPaginatedResponse } from "types/paginated-response";

interface IState {
  topTickers: IPaginatedResponse<ITicker>;
  topTickersError?: any;
}

export interface IDashboardContext extends IState {}

export const DashboardContext = createContext({} as IDashboardContext);

export function DashboardProvider({ children }) {
  const { data: topTickers, error: topTickersError } = useSWR(
    "/tickers/top",
    getTopTickers
  );
  return (
    <DashboardContext.Provider value={{ topTickers, topTickersError }}>
      {children}
    </DashboardContext.Provider>
  );
}
