import { IUser } from "./user";
import { IPortfolio } from "./portfolio";

export enum BetDuration {
  OneDay = "1D",
  OneWeek = "1W",
}

export interface IBet {
  id: number;
  users: Array<IUser>;
  amount: number;
  portfolios?: Array<IPortfolio>;
  duration: BetDuration;
  winner?: IUser;
  start_time?: Date;
  end_time?: Date;
  created_at: Date;
}
