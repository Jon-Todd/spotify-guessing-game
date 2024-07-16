import useSWR from 'swr';
import './App.scss';
import { GuessInput } from './component/GuessInput';
import { getTopTracks } from './utils/api';

export const App = () => {

  const { data, error, isLoading } = useSWR(getTopTracks);

  console.log(data, error, isLoading)

  // const [guesses, setGuesses] = useState<GuessType[]>([
  //   {
  //     debut: 2015,
  //     members: 7,
  //     popularity: 304,
  //     genre: 'K-pop',
  //     name: 'Stray Kids',
  //     gender: 'mixed',
  //     nationality: 'South Korean'
  //   }
  // ])

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-10'>Spotify Guessing Game</h1>

      <GuessInput />

      {/* {guesses.map(({ name, ...guess }) => <Guess guess={guess} />)} */}
    </div>
  )
}