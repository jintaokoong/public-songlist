export interface ListingResponse<T> {
  data: T[];
  record: number;
  totalPages: number;
}
