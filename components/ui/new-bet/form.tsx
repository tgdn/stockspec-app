import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ITicker } from "types/ticker";
import { ModalContent } from "components/ui/modal";
import { PrimaryButton, TertiaryButton } from "components/ui/buttons";
import Select from "components/ui/select";

function Buttons({ close }) {
  return (
    <>
      {/* buttons */}
      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <PrimaryButton
            className="inline-flex justify-center w-full"
            onClick={close}
            type="button"
          >
            Create
          </PrimaryButton>
        </span>
        <span className="mt-3 flex w-full rounded-md sm:mt-0 sm:w-auto">
          <TertiaryButton
            onClick={close}
            type="button"
            className="inline-flex justify-center w-full"
          >
            Cancel
          </TertiaryButton>
        </span>
      </div>
    </>
  );
}
const amountOptions = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
];

const durationOptions = [
  { value: "1D", label: "A day" },
  { value: "1W", label: "A week" },
];

export function NewBetForm({
  tickers,
  close,
}: {
  close: any;
  tickers: ITicker[];
}) {
  console.log(tickers);
  const tickerOptions = tickers.map((ticker: ITicker) => ({
    value: ticker.symbol,
    label: ticker.symbol,
  }));

  return (
    <form>
      {/* main content */}
      <ModalContent>
        <div className="text-center sm:text-left">
          <h3 className="text-xl leading-6 font-medium" id="modal-headline">
            New bet
          </h3>
          <div className="mt-4">
            <Select label="Amount" options={amountOptions} />
          </div>
          <div className="mt-2">
            <Select label="Duration" options={durationOptions} />
          </div>
          <div className="mt-2">
            <Select isMulti label="Tickers" options={tickerOptions} />
          </div>
        </div>
      </ModalContent>
      <Buttons close={close} />
    </form>
  );
}
