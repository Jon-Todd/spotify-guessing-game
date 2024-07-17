import { Autocomplete, TextField } from "@mui/material";
import { FC } from "react";
import { useTopArtists } from "../hooks/use-top-artists";
import { Artist } from "../types/artists";

interface GuessInputProps {
    addGuess: (guess: Artist) => void;
}

export const GuessInput: FC<GuessInputProps> = ({
    addGuess
}) => {
    const { artists } = useTopArtists();

    return (
        <div className="flex rounded-lg shadow-sm w-96 mb-20">
            {
                artists &&
                <Autocomplete
                    style={{width: '100%'}}
                    options={artists}
                    renderInput={(params) => <TextField {...params} label="Artists" />}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => value && addGuess(value)}
                />
            }
        </div>
    )
}