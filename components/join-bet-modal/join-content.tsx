import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { joinBet } from "lib/api";
import { ITicker } from "types/ticker";
import { IBet } from "types/bet";
import { ModalContent } from "components/ui/modal";
import { PrimaryButton, TertiaryButton } from "components/ui/buttons";
import Select from "components/ui/select";
import { mutate } from "swr";

interface IJoinBetModalContent {
  close: any;
  bet: IBet;
  tickers: ITicker[];
}

const joinBetSchema = yup.object().shape({
  tickers: yup.array().required("You need to pick 3 tickers").nullable(true),
});

type TJoinBetForm = yup.InferType<typeof joinBetSchema>;

function Buttons({ close, submitting }: { close: any; submitting: boolean }) {
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
            {submitting ? "Joining..." : "Join bet"}
          </PrimaryButton>
        </span>
        <span className="mt-3 flex w-full rounded-md sm:mt-0 sm:w-auto">
          <TertiaryButton
            onClick={close}
            type="button"
            className="inline-flex justify-center w-full"
          >
            Close
          </TertiaryButton>
        </span>
      </div>
    </>
  );
}

export function JoinBetModalContent({
  bet,
  tickers,
  close,
}: IJoinBetModalContent) {
  const { amount, duration, portfolios, start_time, end_time } = bet;
  const [portfolio1, portfolio2] = portfolios;
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
  } = useForm<TJoinBetForm>({
    resolver: yupResolver(joinBetSchema),
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: TJoinBetForm) => {
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
    data.tickers = data.tickers.map((tickerOption) => tickerOption.value);

    try {
      await joinBet(bet, data);
      setSubmitting(false);
      mutate("/bets/all/awaiting");
      mutate("/bets/all");
      close();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalContent>
        <div className="text-center sm:text-left">
          <h3 className="text-xl leading-6 font-medium" id="modal-headline">
            Join{" "}
            <span className="text-orange-400">
              {portfolio1?.user?.username || "user"}'s
            </span>{" "}
            bet
          </h3>
          <div className="pt-6">Amount: {bet.amount}</div>
          <div className="pt-6">Duration: {bet.duration}</div>
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
      <Buttons close={close} submitting={submitting} />
    </form>
  );
}
