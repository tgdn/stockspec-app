import { ITicker } from "./ticker";
import { IUser } from "./user";

export interface IPortfolio {
  user: IUser;
  tickers?: Array<ITicker>;
  perf?: number;
  created_at: string;
  updated_at: string;
}
