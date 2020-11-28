import React, { useCallback, useState, useContext } from "react";
import cx from "classnames";
import {
  TabKey,
  DashboardContext,
  IDashboardContext,
} from "providers/dashboard.provider";
import { PrimaryButton } from "components/ui/buttons";
import NewBet from "components/ui/new-bet";
import BetList from "components/ui/bet-list";

const borderColor = "border-gray-600";

function Ongoing(): React.ReactElement {
  const { allBets }: IDashboardContext = useContext(DashboardContext);
  return <BetList paginatedBets={allBets} />;
}

function Awaiting(): React.ReactElement {
  const { allBetsAwaiting }: IDashboardContext = useContext(DashboardContext);
  return <BetList paginatedBets={allBetsAwaiting} />;
}

function Past(): React.ReactElement {
  const { allBetsPast }: IDashboardContext = useContext(DashboardContext);
  return <BetList paginatedBets={allBetsPast} />;
}

interface ITabOption {
  label: string;
  component: React.FunctionComponent | React.ReactChild;
}

const tabmap: Record<TabKey, ITabOption> = {
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
        "cursor-pointer select-none md:text-lg px-2 py-3 md:px-3 md:py-2 border-b-4 border-transparent",
        {
          "border-white": isCurrent,
          "hover:border-gray-500": !isCurrent,
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
    <div className={cx("flex items-center p-1 border-b-4", borderColor)}>
      <div className="flex -mb-2 md:-mb-2">
        {Object.entries(tabmap).map(([key, tab]: [TabKey, ITabOption]) => (
          <TabLabel
            key={`tab-${key}`}
            setCurrent={setCurrent(key)}
            isCurrent={currentTab === key}
          >
            {tab.label}
          </TabLabel>
        ))}
      </div>
      <div className="ml-auto">{children}</div>
    </div>
  );
}

export default function TabSelector() {
  const {
    currentTab,
    actions: { setCurrentTab },
  }: IDashboardContext = useContext(DashboardContext);
  const CurrentTab = tabmap[currentTab].component as React.FunctionComponent<
    any
  >;

  return (
    <div className={cx("border-4 rounded-md", borderColor)}>
      <Tabs currentTab={currentTab} setCurrent={setCurrentTab}>
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
