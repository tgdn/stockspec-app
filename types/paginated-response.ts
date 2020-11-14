export interface IPaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: Array<T>;
}
