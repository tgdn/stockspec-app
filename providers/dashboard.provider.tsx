import React, { createContext } from "react";
import useSWR from "swr";

import {
  getAllBets,
  getAllBetsAwaiting,
  getTopTickers,
  getUserBets,
} from "lib/api";
import { ITicker } from "types/ticker";
import { IBet } from "types/bet";
import { IPaginatedResponse } from "types/paginated-response";

interface IState {
  // tickers
  topTickers: IPaginatedResponse<ITicker>;
  topTickersError?: any;
  // user bets
  userBets: IPaginatedResponse<IBet>;
  userBetsError?: any;
  // all bets
  allBets: IPaginatedResponse<IBet>;
  allBetsError?: any;
  // all bets awaiting
  allBetsAwaiting: IPaginatedResponse<IBet>;
  allBetsAwaitingError?: any;
}

export interface IDashboardContext extends IState {}

export const DashboardContext = createContext({} as IDashboardContext);

export function DashboardProvider({ children }) {
  const { data: topTickers, error: topTickersError } = useSWR(
    "/tickers/top",
    getTopTickers
  );
  const { data: userBets, error: userBetsError } = useSWR("/bets", getUserBets);
  const { data: allBets, error: allBetsError } = useSWR(
    "/bets/all",
    getAllBets
  );
  const { data: allBetsAwaiting, error: allBetsAwaitingError } = useSWR(
    "/bets/all/awaiting",
    getAllBetsAwaiting
  );

  return (
    <DashboardContext.Provider
      value={{
        topTickers,
        topTickersError,
        userBets,
        userBetsError,
        allBets,
        allBetsError,
        allBetsAwaiting,
        allBetsAwaitingError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
