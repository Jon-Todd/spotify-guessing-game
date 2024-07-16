import clsx from "clsx";
import { FC } from "react";

export interface GuessPanelProps {
    guess: 'close' | 'true' | 'false';
    label: string;
    value: string;
}

export const GuessPanel: FC<GuessPanelProps> = ({ guess, label, value }) => {

    // hook to work out how close it is
    const { }

    return (
        <div className={clsx('flex', 'flex-col', 'mb-10', {
            'spotify-gg-close': guess === 'close',
            'spotify-gg-true': guess,
            'spotify-gg-false': !guess
        })}>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{label}</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
    )
};