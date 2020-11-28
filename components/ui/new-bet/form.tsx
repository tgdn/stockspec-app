import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { createNewBet } from "lib/api";
import { ITicker } from "types/ticker";
import { ModalContent } from "components/ui/modal";
import { PrimaryButton, TertiaryButton } from "components/ui/buttons";
import Select from "components/ui/select";
import { mutate } from "swr";

const newBetSchema = yup.object().shape({
  amount: yup.object().required("An amount is required").nullable(true),
  duration: yup.object().required("You need to set a durartion").nullable(true),
  tickers: yup.array().required("You need to pick 3 tickers").nullable(true),
});

type TNewBetForm = yup.InferType<typeof newBetSchema>;

function Buttons({ submitting, close }: { submitting: boolean; close: any }) {
  return (
    <>
      {/* buttons */}
      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <PrimaryButton
            disabled={submitting}
            type="submit"
            className="inline-flex justify-center w-full"
          >
            {submitting ? "Creating..." : "Create"}
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
  const tickerOptions = tickers.map((ticker: ITicker) => ({
    value: ticker.symbol,
    label: ticker.symbol,
  }));

  const {
    register,
    control,
    handleSubmit,
    errors,
    formState,
    reset,
    setError,
  } = useForm<TNewBetForm>({
    resolver: yupResolver(newBetSchema),
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: TNewBetForm) => {
    console.log(data);
    if (data.tickers.length !== 3) {
      setError("tickers", {
        type: "local",
        message: "You need to pick 3 tickers",
      });
      return;
    }
    setSubmitting(true);

    // @ts-ignore
    data.amount = data.amount.value;
    // @ts-ignore
    data.duration = data.duration.value;
    // @ts-ignore
    data.tickers = data.tickers.map((tickerOption) => tickerOption.value);

    try {
      await createNewBet(data);
      setSubmitting(false);
      mutate("/bets/all/awaiting");
      mutate("/bets");
      close();
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* main content */}
      <ModalContent>
        <div className="text-center sm:text-left">
          <h3 className="text-xl leading-6 font-medium" id="modal-headline">
            New bet
          </h3>
          <div className="pt-6">
            <Controller
              control={control}
              as={Select}
              defaultValue={amountOptions[0]}
              name={"amount"}
              label="Amount"
              options={amountOptions}
              hasError={errors.amount}
              // @ts-ignore
              message={errors.amount?.message}
            />
          </div>
          <div className="pt-6">
            <Controller
              control={control}
              as={Select}
              defaultValue={durationOptions[0]}
              name={"duration"}
              label="Duration"
              options={durationOptions}
              hasError={errors.duration}
              // @ts-ignore
              message={errors.duration?.message}
            />
          </div>
          <div className="pt-6">
            <Controller
              control={control}
              as={Select}
              defaultValue={[]}
              name={"tickers"}
              isMulti
              label="Tickers"
              options={tickerOptions}
              hasError={errors.tickers}
              // @ts-ignore
              message={errors.tickers?.message}
            />
          </div>
        </div>
      </ModalContent>
      <Buttons submitting={submitting} close={close} />
    </form>
  );
}
