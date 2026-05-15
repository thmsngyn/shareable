import config from '../../config';

// APIs
export const SPOTIFY_API_HOSTNAME = 'https://api.spotify.com';
export const PLAYER_API = `${SPOTIFY_API_HOSTNAME}/v1/me/player`;
export const SAVED_TRACKS_API = `${SPOTIFY_API_HOSTNAME}/v1/me/tracks`;
export const USER_PROFILE_API = `${SPOTIFY_API_HOSTNAME}/v1/me`;
export const USER_TOP_API = `${SPOTIFY_API_HOSTNAME}/v1/me/top`;
export const PLAYER_PLAY_API = `${SPOTIFY_API_HOSTNAME}/v1/me/player/play`;
export const GET_TRACKS_API = `${SPOTIFY_API_HOSTNAME}/v1/tracks`;

// Auth
export const AUTH_API = 'https://accounts.spotify.com/authorize';
export const TOKEN_API = 'https://accounts.spotify.com/api/token';
export const LOGIN_OAUTH = (codeChallenge: string) =>
  `${AUTH_API}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join('%20')}&response_type=code&code_challenge_method=S256&code_challenge=${codeChallenge}&show_dialog=true`;
