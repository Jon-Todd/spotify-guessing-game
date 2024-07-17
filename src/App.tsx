import { useState } from 'react';
import './App.scss';
import { GuessInput } from './component/GuessInput';
import { Artist } from './types/artists';

export const App = () => {

  const [guesses, setGuesses] = useState<Artist[]>([]);

  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-10'>Spotify Guessing Game</h1>

        <GuessInput addGuess={(artist) => setGuesses([...guesses, artist])} />
      </div>

      {
        guesses &&
        guesses.map((guess, index) => (
          <div key={index} className='flex flex-col items-center mt-10'>
            <h2 className='text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight mb-5'>Guess {index + 1}</h2>
            <img src={guess.images[0].url} alt={guess.name} className='rounded-full w-32 h-32 mb-5' />
            <p className='text-lg font-semibold text-gray-900'>{guess.name}</p>
          </div>
        ))
      }
    </>
  )
}