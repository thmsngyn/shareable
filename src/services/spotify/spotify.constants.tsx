import config from '../../config';

// APIs — routed through backend proxy
export const SPOTIFY_PROXY_HOSTNAME = config.shareableServiceHostname;
export const PLAYER_API = `${SPOTIFY_PROXY_HOSTNAME}/spotify-proxy/v1/me/player`;
export const SAVED_TRACKS_API = `${SPOTIFY_PROXY_HOSTNAME}/spotify-proxy/v1/me/tracks`;
export const USER_PROFILE_API = `${SPOTIFY_PROXY_HOSTNAME}/spotify-proxy/v1/me`;
export const USER_TOP_API = `${SPOTIFY_PROXY_HOSTNAME}/spotify-proxy/v1/me/top`;
export const PLAYER_PLAY_API = `${SPOTIFY_PROXY_HOSTNAME}/spotify-proxy/v1/me/player/play`;
export const GET_TRACKS_API = `${SPOTIFY_PROXY_HOSTNAME}/spotify-proxy/v1/tracks`;
