import React, { useCallback, useState } from "react";
import cx from "classnames";
import { PrimaryButton } from "components/ui/buttons";
import NewBet from "components/ui/new-bet";

const tablist = {
  ongoing: {
    label: "Ongoing",
    component: () => <>ongoing</>,
  },
  awaiting: {
    label: "Awaiting",
    component: () => <>awaiting</>,
  },
  past: {
    label: "Past",
    component: () => <>past</>,
  },
};

function TabLabel({ children, isCurrent, setCurrent }) {
  return (
    <div
      onClick={setCurrent}
      className={cx("cursor-pointer select-none text-lg px-3 py-1 ", {
        "border-b-4": isCurrent,
        "text-gray-300": !isCurrent,
        "text-white": isCurrent,
        "font-medium": isCurrent,
      })}
    >
      {children}
    </div>
  );
}

function Tabs({ children, setCurrent, currentTab }) {
  return (
    <div className="flex items-center p-1 border-b-4 border-gray-700">
      <div className="flex -mb-2">
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
