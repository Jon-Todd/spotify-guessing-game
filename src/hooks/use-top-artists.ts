import useSWR from "swr";
import { getTopArtists } from "../utils/api";

export const useTopArtists = () => {
    // Fetch top artists from highest context
    const { data, error, isLoading } = useSWR('./getTopArtists', getTopArtists);

    console.log(data);

    return {
        artists: data?.data.items,
        isLoading,
        error
    };
};

