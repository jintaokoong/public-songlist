import { PaginationOptions } from "./pagination-options";

export interface ListingOptions<T = unknown> {
  pagination?: PaginationOptions;
  filters?: T;
}
