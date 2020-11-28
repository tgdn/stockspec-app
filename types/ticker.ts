export interface ITicker {
  symbol: string;
  timezone: string;
  company: string;
  description: string;
  exchange: string;
  country: string;
  sector: string;
  industry: string;
  beta?: string;
  logo_url?: string;
  last_price?: string;
  delta?: string;
  percentage_change?: string;
}
