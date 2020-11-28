import React, { useCallback, useState, useContext } from "react";
import cx from "classnames";
import {
  DashboardContext,
  IDashboardContext,
} from "providers/dashboard.provider";
import { PrimaryButton } from "components/ui/buttons";
import NewBet from "components/ui/new-bet";
import BetList from "components/ui/bet-list";

function Ongoing() {
  const { allBets }: IDashboardContext = useContext(DashboardContext);
  return <BetList paginatedBets={allBets} />;
}

function Awaiting() {
  const { allBetsAwaiting }: IDashboardContext = useContext(DashboardContext);
  return <BetList paginatedBets={allBetsAwaiting} />;
}

function Past() {
  const { allBets }: IDashboardContext = useContext(DashboardContext);
  return <BetList paginatedBets={allBets} />;
}

const tablist = {
  ongoing: {
    label: "Ongoing",
    component: Ongoing,
  },
  awaiting: {
    label: "Awaiting",
    component: Awaiting,
  },
  past: {
    label: "Past",
    component: Past,
  },
};

function TabLabel({ children, isCurrent, setCurrent }) {
  return (
    <div
      onClick={setCurrent}
      className={cx(
        "cursor-pointer select-none md:text-lg px-2 py-3 md:px-3 md:py-2 ",
        {
          "border-b-4": isCurrent,
          "text-gray-300": !isCurrent,
          "text-white": isCurrent,
          "font-medium": isCurrent,
        }
      )}
    >
      {children}
    </div>
  );
}

function Tabs({ children, setCurrent, currentTab }) {
  return (
    <div className="flex items-center p-1 border-b-4 border-gray-700">
      <div className="flex -mb-2 md:-mb-2">
        {Object.entries(tablist).map(([key, tab]) => (
          <TabLabel setCurrent={setCurrent(key)} isCurrent={currentTab === key}>
            {tab.label}
          </TabLabel>
        ))}
      </div>
      <div className="ml-auto">{children}</div>
    </div>
  );
}

export default function TabSelector() {
  const [currentTab, setTab] = useState(Object.keys(tablist)[0]);
  const setCurrent = useCallback(
    (key: string) => () => {
      setTab(key);
    },
    [currentTab, setTab]
  );
  const CurrentTab = tablist[currentTab].component;

  return (
    <div className="border-4 rounded-md border-gray-700">
      <Tabs {...{ currentTab, setCurrent }}>
        <NewBet>
          <PrimaryButton>New Bet</PrimaryButton>
        </NewBet>
      </Tabs>
      <div>
        <CurrentTab />
      </div>
    </div>
  );
}
