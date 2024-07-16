import { FC } from "react";
import { GuessType } from "../types/guess";
import { GuessPanel } from "./GuessPanel";

export interface GuessProps {
    guess: GuessType
}

export const Guess: FC<GuessProps> = ({
    guess
}) => {

    // hook to work out if the guess is close or not for each value

    return (
        <div className="w-6/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ guess.name }</h5>
        
            <div className="grid grid-cols-3 grid-rows-2">

                {
                    Object.entries(guess).map(([key, value]) => {
                        
                        // don't show the name
                        if (key === 'name') {
                            return null;
                        }
                        return <GuessPanel key={key} label={key} value={value} guess="close" />
                    })
                }

                {/* <div className="flex flex-col mb-10">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Debut</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{debut}</p>
                </div>

                <div className="flex flex-col h-20">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Members</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{members}</p>
                </div>

                <div className="flex flex-col h-20">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Popularity</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{popularity}</p>
                </div>

                <div className="flex flex-col h-20">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Gender</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{gender}</p>
                </div>

                <div className="flex flex-col h-20">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Genre</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{genre}</p>
                </div>

                <div className="flex flex-col h-20">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Nationality</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{nationality}</p>
                </div> */}

            </div>
        </div>
    )
}