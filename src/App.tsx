import useSWR from 'swr';
import './App.scss';
import { GuessInput } from './component/GuessInput';
import { getTopArtists } from './utils/api';

export const App = () => {

  const { data, error, isLoading } = useSWR('./getTopArtists', getTopArtists);

  console.log(data, error, isLoading)

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading data</div>}
      {!isLoading &&
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-10'>Spotify Guessing Game</h1>

          <GuessInput />

          {/* {guesses.map(({ name, ...guess }) => <Guess guess={guess} />)} */}
        </div>
      }
    
    </>
  )
}