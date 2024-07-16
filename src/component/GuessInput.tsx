import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { FC } from "react";
import useSWR from "swr";
import { getTopArtists } from "../utils/api";

const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.name,
});


export const GuessInput: FC = () => {


    // Fetch top artists from highest context
    const { data, isLoading } = useSWR('./getTopArtists', getTopArtists);
    console.log("🚀 ~ data:", data)



    return (
        <div className="flex rounded-lg shadow-sm w-96 mb-20">
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
                <Autocomplete style={{width: '100%'}} options={data.items} renderInput={(params) => <TextField {...params} label="Artist" filterOptions={filterOptions} getOptionLabel={(option) => option.name}  />} />
            }
        </div>
    )
}