import React, { createContext, useState, useCallback } from "react";
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

export const tablist = ["ongoing", "awaiting", "past"] as const;
export type TabKey = typeof tablist[number];

interface IState {
  currentTab: TabKey;
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

export interface IDashboardContext extends IState {
  actions: {
    setCurrentTab: (key: TabKey) => () => void;
  };
}

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

  const [currentTab, setTab] = useState(tablist[0] as TabKey);
  const setCurrentTab = useCallback(
    (key: TabKey) => () => {
      setTab(key);
    },
    [currentTab, setTab]
  );

  return (
    <DashboardContext.Provider
      value={{
        currentTab,
        topTickers,
        topTickersError,
        userBets,
        userBetsError,
        allBets,
        allBetsError,
        allBetsAwaiting,
        allBetsAwaitingError,
        actions: {
          setCurrentTab,
        },
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
