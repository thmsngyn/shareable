import { hash, parseJson } from '../../utils';
import { StorageService, StorageKeys } from '../storage';

import { PLAYER_API, SAVED_TRACKS_API, USER_PROFILE_API, USER_TOP_API, PLAYER_PLAY_API } from './spotify.constants';
import {
  CurrentPlaybackResponse,
  LikesResponse,
  SpotifyErrorMessages,
  SpotifyUserProfile,
  SpotifyTimeRange,
  SpotifyTopType,
} from './spotify.types';

export const SpotifyService = new (class {
  private token: string = '';
  constructor() {}

  private get headers() {
    return new Headers({
      Authorization: 'Bearer ' + this.token,
    });
  }

  private resolveTokenInStorage(hasTokenInStorage: boolean, token: string) {
    if (!hasTokenInStorage) {
      StorageService.set(StorageKeys.SpotifyToken, token);
      StorageService.setExpiration(StorageKeys.SpotifyToken, 36000000); // 1 hr
    } else {
      StorageService.checkExpiration();
    }
  }

  logout() {
    this.token = '';
  }

  async userProfile(): Promise<SpotifyUserProfile> {
    const profileFromStorage = StorageService.get(StorageKeys.UserProfile);

    if (!profileFromStorage) {
      const response = await this.getUserProfile();
      const { display_name: displayName, external_urls, images, email, country, followers, error, uri, id } = response;
      const imageUrl = images && images.length && images[0].url;
      const externalUrl = external_urls && external_urls.spotify;

      const userProfile = {
        displayName,
        externalUrl,
        email,
        country,
        imageUrl,
        followers: followers && followers.total,
        error,
        uri,
        id,
      };
      StorageService.set(StorageKeys.UserProfile, JSON.stringify(userProfile));
      return userProfile;
    } else {
      return JSON.parse(profileFromStorage);
    }
  }

  userIsLoggedIn(): boolean {
    return !!this.token;
  }

  resolveUserToken(): string {
    // Set token
    this.token = hash.access_token;
    const tokenFromStorage = StorageService.get(StorageKeys.SpotifyToken);

    if (!!tokenFromStorage || !!this.token) {
      this.token = tokenFromStorage || this.token;
      this.resolveTokenInStorage(!!tokenFromStorage, this.token);
      return this.token;
    }
    return '';
  }

  getUserProfile(): Promise<any> {
    return this.request(USER_PROFILE_API, 'GET');
  }

  getCurrentlyPlaying(): Promise<CurrentPlaybackResponse> {
    // Make a call using the token
    return this.request(PLAYER_API, 'GET');
  }

  /**
   * Transfer playback to a new device and determine if it should start playing.
   * @param deviceIds array of device ids to transfer playback to, only a single device id is currently supported
   * @param play true: ensure playback happens on new device. false or not provided: keep the current playback state.
   */
  transferPlayback(deviceIds: string[], play: boolean = false): Promise<any> {
    return this.request(PLAYER_API, 'PUT', { device_ids: deviceIds, play });
  }

  getLikes(limit: number = 10, offset: number = 0): Promise<LikesResponse> {
    return this.request(`${SAVED_TRACKS_API}?limit=${limit}&offset=${offset}`, 'GET');
  }

  getTop(
    type: SpotifyTopType,
    timeRange: SpotifyTimeRange = SpotifyTimeRange.ShortTerm,
    limit: number = 10,
    offset: number = 0
  ): Promise<any> {
    return this.request(`${USER_TOP_API}/${type}?limit=${limit}&offset=${offset}&time_range=${timeRange}`, 'GET');
  }

  playSongs(uris: string[]): Promise<any> {
    return this.request(`${PLAYER_PLAY_API}`, 'PUT', { uris });
  }

  request(url: string, method: string, body?: any): Promise<any> {
    return fetch(url, {
      method,
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then(parseJson)
      .then(this.errorHandler.bind(this));
  }

  errorHandler(response: any) {
    const { error } = response;
    if (error) {
      switch (error.message) {
        case SpotifyErrorMessages.TokenExpired:
          StorageService.remove(StorageKeys.SpotifyToken);
      }
    }
    return response;
  }
})();
