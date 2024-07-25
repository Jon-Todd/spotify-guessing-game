import clsx from 'clsx';
import { FC, useContext, useEffect, useState } from 'react';
import { RandomArtistContext } from '../App';
import { Artist } from '../types/artists';

export type TValidateDebut = {
  result: 'close' | 'correct' | 'incorrect';
  recency: 'older' | 'younger' | 'neither';
};

export interface GuessProps extends Artist {}

export const Guess: FC<GuessProps> = ({ name, images, groupOrPerson, popularity, country, debut }) => {
  const randomArtist = useContext(RandomArtistContext);
  const [debutVal, setDebutVal] = useState<TValidateDebut>({ result: 'incorrect', recency: 'neither' });
  const [popularityVal, setPopularityVal] = useState<TValidateDebut>({ result: 'incorrect', recency: 'neither' });

  // for debut we want to get the year then work out if they are older or younger than the random artist
  const validateNumber = (a: number | string, b: number | string): TValidateDebut => {
    if (typeof a === 'string') {
      a = parseInt(a as string);
    }

    if (typeof b === 'string') {
      b = parseInt(b as string);
    }

    if (a === b) {
      return {
        result: 'correct',
        recency: 'neither',
      };
    }

    if (a < b + 10 && a > b - 10) {
      return {
        result: 'close',
        recency: a < b ? 'younger' : 'older' ?? 'neither',
      };
    }

    return {
      result: 'incorrect',
      recency: a < b ? 'younger' : 'older' ?? 'neither',
    };
  };

  useEffect(() => {
    if (randomArtist) {
      setDebutVal(validateNumber(debut ?? 0, randomArtist.debut ?? 11));
      setPopularityVal(validateNumber(popularity ?? 0, randomArtist.popularity ?? 11));
    }
  }, []);

  return (
    randomArtist && (
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-left gap-8 mb-10">
          <img src={images[0].url} alt={name} className="rounded-full w-32 h-32" />
          <h5 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </div>

        <div className="grid grid-cols-4 grid-rows-1">
          <div
            className={clsx({
              'h-20': true,
              'text-green-500': debutVal.result === 'correct',
              'text-yellow-500': debutVal.result === 'close',
              'text-gray-400': debutVal.result === 'incorrect',
            })}
          >
            {groupOrPerson === 'Person' ? (
              <p className="mb-3 font-normal">Birth</p>
            ) : (
              <p className="mb-3 font-semibold">Debut</p>
            )}
            <p className="text-lg">
              {debut}
              {debutVal.result !== 'correct' && (
                <p className="text-sm">{debutVal.recency === 'younger' ? 'Younger' : 'Older'}</p>
              )}
            </p>
          </div>

          <div
            className={clsx({
              'h-20': true,
              'text-green-500': groupOrPerson === randomArtist.groupOrPerson,
              'text-red-500': groupOrPerson !== randomArtist.groupOrPerson,
            })}
          >
            <p className="mb-3 font-normal">Group or Person</p>
            <p className="text-lg font-semibold">{groupOrPerson}</p>
          </div>

          <div
            className={clsx({
              'h-20': true,
              'text-green-500': popularityVal.result === 'correct',
              'text-yellow-500': popularityVal.result === 'close',
              'text-gray-400': popularityVal.result === 'incorrect',
            })}
          >
            <p className="mb-3 font-normal">Popularity</p>
            <p className="text-lg font-semibold">
              {popularity}
              {popularityVal.result !== 'correct' && (
                <p className="text-sm">{popularityVal.recency === 'younger' ? 'More popular' : 'Less popular'}</p>
              )}
            </p>
          </div>

          <div
            className={clsx({
              'h-20': true,
              'text-green-500': country === randomArtist.country,
              'text-red-500': country !== randomArtist.country,
            })}
          >
            <p className="mb-3 font-normal">Area</p>
            <p className="text-lg font-semibold">{country}</p>
          </div>
        </div>
      </div>
    )
  );
};
