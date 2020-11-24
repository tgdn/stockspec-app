import fetcher from "lib/fetch";
import { API_BASE_PATH } from "lib/constants";
import { ITicker } from "types/ticker";
import { IBet } from "types/bet";
import { IPaginatedResponse } from "types/paginated-response";
import { IStockPrice } from "types/stock-price";

export function getTopTickers(): Promise<IPaginatedResponse<ITicker>> {
  return fetcher(`${API_BASE_PATH}/api/tickers/top`);
}

export function getUserBets(): Promise<IPaginatedResponse<IBet>> {
  return fetcher(`${API_BASE_PATH}/api/bets/`);
}

export function getAllBets(): Promise<IPaginatedResponse<IBet>> {
  return fetcher(`${API_BASE_PATH}/api/bets/all`);
}

export function getBet(betid: number): Promise<IBet> {
  return fetcher(`${API_BASE_PATH}/api/bets/${betid}`);
}

export function getAllBetsAwaiting(): Promise<IPaginatedResponse<IBet>> {
  return fetcher(`${API_BASE_PATH}/api/bets/all/awaiting`);
}

const url_re = /^\/series\/(.+)/;
export function getStockSeries(url: string): Promise<IStockPrice[]> {
  const [_, symbol] = url_re.exec(url);
  return fetcher(`${API_BASE_PATH}/api/series/${symbol}`);
}

export function getTickers(): Promise<ITicker[]> {
  return fetcher(`${API_BASE_PATH}/api/tickers`);
}

// POST/PUT

export function createNewBet(data: any): Promise<IBet> {
  return fetcher(`${API_BASE_PATH}/api/bets/`, { method: "post", data });
}
