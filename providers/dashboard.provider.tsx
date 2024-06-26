import React, { createContext, useState, useCallback } from "react";
import useSWR from "swr";

import {
  getAllBets,
  getAllBetsAwaiting,
  getAllBetsPast,
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
  // all bets pas
  allBetsPast: IPaginatedResponse<IBet>;
  allBetsPastError?: any;
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
  const [currentTab, setTab] = useState(tablist[0] as TabKey);
  const setCurrentTab = useCallback(
    (key: TabKey) => () => {
      setTab(key);
    },
    [currentTab, setTab]
  );

  const { data: topTickers, error: topTickersError } = useSWR(
    "/tickers/top",
    getTopTickers
  );
  const { data: userBets, error: userBetsError } = useSWR("/bets", getUserBets);
  const { data: allBets, error: allBetsError } = useSWR(
    currentTab === "ongoing" && "/bets/all",
    getAllBets
  );
  const { data: allBetsAwaiting, error: allBetsAwaitingError } = useSWR(
    currentTab === "awaiting" && "/bets/all/awaiting",
    getAllBetsAwaiting
  );
  const { data: allBetsPast, error: allBetsPastError } = useSWR(
    currentTab === "past" && "/bets/all/past",
    getAllBetsPast
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
        allBetsPast,
        allBetsPastError,
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
