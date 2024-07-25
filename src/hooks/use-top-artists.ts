import useSWR from "swr";
import { getTopArtists } from "../utils/api";

export const useTopArtists = () => {
    // Fetch top artists from highest context
    const { data, error, isLoading } = useSWR('./getTopArtists', getTopArtists);

    return {
        artists: data?.items,
        isLoading,
        error,
    };
};

