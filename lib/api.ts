import fetcher from "lib/fetch";
import { API_BASE_PATH } from "lib/constants";
import { ITicker } from "types/ticker";
import { IPaginatedResponse } from "types/paginated-response";

export function getTopTickers(): Promise<IPaginatedResponse<ITicker>> {
  return fetcher(`${API_BASE_PATH}/api/tickers/top`);
}
