import { ListingOptions } from "@/types/listing-options";
import network from "@/utils/network";
import { ListingResponse } from "@/types/listing-response";
import { Song } from "@/types/song";
import { flatten, identity, mergeAll, pickBy } from "ramda";

const fetchListing = (options: ListingOptions) => {
  return network.unwrap<ListingResponse<Song>>(
    fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/songs?${new URLSearchParams(
        pickBy(
          identity,
          mergeAll(flatten(network.params(options)))
        ) as URLSearchParams
      )}`,
      {
        method: "GET",
      }
    )
  );
};

const songService = { fetchListing };

export default songService;
