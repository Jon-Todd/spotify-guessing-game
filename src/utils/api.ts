import axios from 'axios';
import { ArtistsResponse } from '../types/artists';

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${client_id}:${client_secret}`);
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;
export const MUSICBRAINZ_ENDPOINT = 'https://musicbrainz.org/ws/2/';

export const getAccessToken = async () => {
  const response = await axios.post(
    TOKEN_ENDPOINT,
    {
      grant_type: 'refresh_token',
      refresh_token,
    },
    {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return response.data;
};

export const getTopArtists = async (): Promise<ArtistsResponse> => {
  try {
    const { access_token } = await getAccessToken();

    const requestConfig = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        limit: 50,
      },
    };

    const [firstPage, secondPage] = await Promise.all([
      axios.get(TOP_TRACKS_ENDPOINT, requestConfig),
      axios.get(TOP_TRACKS_ENDPOINT, {
        ...requestConfig,
        params: {
          ...requestConfig.params,
          offset: 50,
        },
      }),
    ]);

    const combinedItems = [...firstPage.data.items, ...secondPage.data.items];

    return {
      ...firstPage.data,
      items: combinedItems,
    };
  } catch (error) {
    console.error('Error fetching top artists:', error);
    throw error;
  }
};

export const getMoreArtistInfo = (artistName: string) => {
  return axios
    .get(`${MUSICBRAINZ_ENDPOINT}artist/?query=${artistName}&fmt=json`)
    .then((res) => {
      return res.data.artists[0];
    })
    .catch((error) => {
      console.error('Error fetching artist info:', error);
    });
};
