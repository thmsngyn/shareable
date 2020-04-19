// Currently Playing
export interface CurrentPlaybackResponse {
  device: Device;
  shuffle_state: boolean;
  repeat_state: string;
  timestamp: number;
  context: Context;
  progress_ms: number;
  item: Item;
  currently_playing_type: string;
  actions: Actions;
  is_playing: boolean;
  error?: SpotifyError;
}
export interface Device {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}
export interface Context {
  external_urls: ExternalUrls;
  href: string;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface Item {
  album: Album;
  artists?: ArtistsEntity[] | null;
  available_markets?: string[] | null;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists?: ArtistsEntity[] | null;
  available_markets?: string[] | null;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images?: ImagesEntity[] | null;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}
export interface ArtistsEntity {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ImagesEntity {
  height: number;
  url: string;
  width: number;
}
export interface ExternalIds {
  isrc: string;
}
export interface Actions {
  disallows: Disallows;
}
export interface Disallows {
  resuming: boolean;
}

// Likes
export interface LikesResponse {
  href: string;
  items?: ItemsEntity[] | null;
  limit: number;
  next: string;
  offset: number;
  previous?: null;
  total: number;
  error?: SpotifyError;
}
export interface ItemsEntity {
  added_at: string;
  track: Track;
}
export interface Track {
  album: Album;
  artists?: ArtistsEntity[] | null;
  available_markets?: string[] | null;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

// Errors
export interface SpotifyError {
  status: number;
  message: string;
}

export enum SpotifyErrorMessages {
  TokenExpired = 'The access token expired',
}

export interface SpotifyUserProfile {
  name: string;
  externalUrl: string;
  imageUrl: string;
  email: string;
  country: string;
  error: string;
}
