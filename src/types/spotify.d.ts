/*
  Simplified type definitions for Spotify Web API
  Omitted the properties which are irrelevant for our application
 */

export type ImageObject = {
  height: number;
  url: string;
  width: number;
};

export type CategoryObject = {
  href: string;
  icons: ImageObject[];
  id: string;
  name: string;
};

export type PlaylistObjectSimplified = {
  id: string;
  images: ImageObject[];
  name: string;
  description: string;
};

export type PagingObject = {
  href: string;
  items: [];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};

export type ArtistObject = {
  id: string;
  name: string;
};

export type AlbumObject = {
  images: ImageObject[];
  artists: ArtistObject[];
};

export type TrackObject = {
  id: string;
  name: string;
  album: AlbumObject;
};

export type PlaylistTrackObject = {
  track: TrackObject;
};

export type CategoryObjectWithPaging = CategoryObject & PagingObject;
export type PlaylistObjectWithPaging = PlaylistObjectSimplified & PagingObject;
export type PlaylistTrackObjectWithPaging = PlaylistTrackObject & PagingObject;
