import fetcher from "lib/fetch";
import { API_BASE_PATH } from "lib/constants";
import { ITicker } from "types/ticker";
import { IBet } from "types/bet";
import { IPaginatedResponse } from "types/paginated-response";

export function getTopTickers(): Promise<IPaginatedResponse<ITicker>> {
  return fetcher(`${API_BASE_PATH}/api/tickers/top`);
}

export function getUserBets(): Promise<IPaginatedResponse<IBet>> {
  return fetcher(`${API_BASE_PATH}/api/bets`);
}

export function getAllBets(): Promise<IPaginatedResponse<IBet>> {
  return fetcher(`${API_BASE_PATH}/api/bets/all`);
}

export function getAllBetsAwaiting(): Promise<IPaginatedResponse<IBet>> {
  return fetcher(`${API_BASE_PATH}/api/bets/all/awaiting`);
}
