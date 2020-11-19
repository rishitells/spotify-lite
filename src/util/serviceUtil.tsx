import Buffer from 'buffer';
import {
  CategoryObjectWithPaging,
  PlaylistObjectWithPaging,
  PlaylistTrackObjectWithPaging,
} from '../types/spotify';

const clientId = '8ec49d2d8ee94bb499ffe6777a3b7754';
const clientSecret = 'a26d689065cf4d78aba42b77312e53e5';
const encodedAuth = new Buffer.Buffer(`${clientId}:${clientSecret}`).toString(
  'base64',
);

export const getAccessToken = (): Promise<string> => {
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedAuth}`,
    },
    body: 'grant_type=client_credentials',
  })
    .then((res) => res.json())
    .then((res) => {
      return res.access_token;
    });
};

export const fetchAllCategories = async (): Promise<{
  categories: CategoryObjectWithPaging;
}> => {
  const accessToken = await getAccessToken();

  return fetch('https://api.spotify.com/v1/browse/categories?country=US', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};

export const getPlaylists = async (
  categoryId: string,
): Promise<{playlists: PlaylistObjectWithPaging}> => {
  const accessToken = await getAccessToken();

  return fetch(
    `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  ).then((res) => res.json());
};

export const getPlaylistItems = async (
  playlistId: string,
): Promise<PlaylistTrackObjectWithPaging> => {
  const accessToken = await getAccessToken();

  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
