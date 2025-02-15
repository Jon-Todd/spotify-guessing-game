import { createContext, useEffect, useState } from 'react';
import './App.scss';
import { Guess } from './component/Guess';
import { GuessInput } from './component/GuessInput';
import { useTopArtists } from './hooks/use-top-artists';
import { Artist } from './types/artists';
import { getMoreArtistInfo } from './utils/api';

/**
 * 1 - Need to work out the location based closeness
 * 2 - Hold game state, game over, won game and reset game logic
 * 3 - Work out logging into spotify
 */

export const RandomArtistContext = createContext<Artist | null>(null);

export const App = () => {
  const [randomArtist, setRandomArtist] = useState<Artist | null>(null);
  const [guesses, setGuesses] = useState<Artist[]>([]);
  const { artists } = useTopArtists();

  const getFurtherArtistInfo = (artist: Artist): Promise<Artist> => {
    return new Promise((resolve, reject) => {
      // get more information about the artist
      getMoreArtistInfo(artist.name)
        .then((res) => {
          const { gender, area, 'life-span': lifeSpan, type } = res;
          const updatedArtistInfo = {
            ...artist,
            gender,
            country: area.name,
            debut: lifeSpan.begin ? lifeSpan.begin.slice(0, 4) : '0000',
            groupOrPerson: type,
          };

          resolve(updatedArtistInfo);
        })
        .catch(reject);
    });
  };

  const getGuessArtistInfo = async (artist: Artist): Promise<void> => {
    const updatedArtist = await getFurtherArtistInfo(artist);
    setGuesses([...guesses, updatedArtist]);
  };

  useEffect(() => {
    const getRandomArtist = async () => {
      if (!randomArtist && artists) {
        // set a random artist
        const randomArtist = artists[Math.floor(Math.random() * artists.length)];
        const updatedRandomArtist = await getFurtherArtistInfo(randomArtist);
        setRandomArtist(updatedRandomArtist);
      }
    };

    getRandomArtist();
  }, [artists, randomArtist]);

  return (
    <RandomArtistContext.Provider value={randomArtist}>
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold dark:text-gray-200 leading-normal mb-10">Your Spotle</h1>

        <GuessInput addGuess={getGuessArtistInfo} />
      </div>

      {/* Debug section */}
      {/* {randomArtist && <Guess {...randomArtist} />} */}

      <div className="flex flex-col-reverse gap-8">
        {guesses && guesses.map((guess, idx) => <Guess key={idx} {...guess} />)}
      </div>
    </RandomArtistContext.Provider>
  );
};
