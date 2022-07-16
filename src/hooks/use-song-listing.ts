import { ListingOptions } from "@/types/listing-options";
import { SongFilter } from "@/types/song-filter";
import songService from "@/services/song-service";
import { ListingResponse } from "@/types/listing-response";
import { Song } from "@/types/song";
import { useQuery } from "react-query";
import { map, values } from "ramda";

const nestedValues = (
  option: Record<string, unknown> | unknown[]
): unknown[] => {
  // if first level is of array, try expand each element recursively
  if (Array.isArray(option)) return map(nestedValues, option as any);
  // if first level is an object, try unfold object then recursively call
  if (!Array.isArray(option) && typeof option === "object")
    return nestedValues(values(option));
  // if first level is primitive, just return
  return option;
};

const useSongListing = (options: ListingOptions<SongFilter>) => {
  return useQuery<ListingResponse<Song>, ListingOptions<SongFilter>>(
    ["song-listing", ...nestedValues(options as Record<string, unknown>)],
    () => songService.fetchListing(options),
    {
      keepPreviousData: true,
    }
  );
};

export default useSongListing;
