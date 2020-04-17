import { clientId, redirectUri, scopes } from '../../config';

// APIs
export const SPOTIFY_API_HOSTNAME = 'https://api.spotify.com';
export const PLAYER_API = `${SPOTIFY_API_HOSTNAME}/v1/me/player`;

// Auth
export const AUTH_API = 'https://accounts.spotify.com/authorize';
export const LOGIN_OAUTH = `${AUTH_API}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;
