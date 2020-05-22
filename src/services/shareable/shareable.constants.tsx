import config from '../../config';

// APIs
export const SHAREABLE_SERVICE_API_HOSTNAME = config.shareableServiceHostname;
export const LOGIN_API = `${SHAREABLE_SERVICE_API_HOSTNAME}/accounts/login`;
export const REGISTER_API = `${SHAREABLE_SERVICE_API_HOSTNAME}/accounts`;
export const GET_STREAM_API = `${SHAREABLE_SERVICE_API_HOSTNAME}/stream`;
export const ADD_SHARE_API = `${SHAREABLE_SERVICE_API_HOSTNAME}/stream/share`;
export const REMOVE_SHARE_API = `${SHAREABLE_SERVICE_API_HOSTNAME}/stream/share`;

export enum ShareableErrorCodes {
  AccountNotFound = 1000,
  EntityAlreadyExists = 1001,
  InvalidAccessSpotifyAccessToken = 1002,
  SpotifyAccessTokenExpired = 1003,
}
