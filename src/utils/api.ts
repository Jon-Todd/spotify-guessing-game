import axios from 'axios';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;





const formData = new URLSearchParams();
formData.append('grant_type', 'refresh_token');
formData.append('refresh_token', refresh_token!);

export const getAccessToken = async () => {
  const response = await axios.post(TOKEN_ENDPOINT, formData, {
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });

  return response.data()
}

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken()

  return axios.get(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

// interface AuthResponse {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
// }

// export const auth = async (): Promise<void> => {
//   const data = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;

//   // don't do call if we already have a token stored
//   if (!localStorage.getItem('token')) {
//       try {
//         const response = await axios.post<AuthResponse>(
//           'https://accounts.spotify.com/api/token',
//           data,
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//             }
//           }
//         );

//         console.log(response.data);

//         // store token in local storage
//         localStorage.setItem('token', response.data.access_token);

//       } catch (error) {
//         throw new Error(`Error fetching auth token: ${error}`);
//       }
//   }

// };

// export const fetchUserTopArtists = async (): Promise<void> => {
//     const token = localStorage.getItem('token');
//     const url = 'https://api.spotify.com/v1/me/top/artists?limit=50&offset=0';

//     const headers = {
//         'Authorization': `Bearer ${token}`
//     };

//     try {
//         const response = await axios.get(url, {
//             headers
//         });
//         return response.data;
//     }

//     catch (error: unknown) {
//         console.error('Error fetching top artists', error);

//         if (error.response.message === 'The access token expired') {
//             localStorage.removeItem('token');
//             await auth();
//             return fetchUserTopArtists();
//         }
//     }
// };
