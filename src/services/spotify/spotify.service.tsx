import { hash, parseJson } from '../../utils';
import { StorageService, StorageKeys } from '../storage';

import { PLAYER_API, SAVED_TRACKS_API, USER_PROFILE_API } from './spotify.constants';
import { CurrentPlaybackResponse, LikesResponse, SpotifyErrorMessages, SpotifyUserProfile } from './spotify.types';

export const SpotifyService = new (class {
  token: string = '';
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

  private async setUserProfile() {
    const profileFromStorage = StorageService.get(StorageKeys.UserProfile);

    if (!profileFromStorage) {
      const response = await this.getUserProfile();
      const { display_name: displayName, external_urls, images, email, country } = response;
      const imageUrl = images && images[0].url;
      const externalUrl = external_urls && external_urls.spotify;

      const userProfile = {
        displayName,
        externalUrl,
        email,
        country,
        imageUrl,
      };
      StorageService.set(StorageKeys.UserProfile, JSON.stringify(userProfile));
    }
  }

  async userProfile(): Promise<SpotifyUserProfile> {
    const profileFromStorage = StorageService.get(StorageKeys.UserProfile);

    if (!profileFromStorage) {
      const response = await this.getUserProfile();
      const { display_name: name, external_urls, images, email, country } = response;
      const imageUrl = images && images[0].url;
      const externalUrl = external_urls && external_urls.spotify;

      const userProfile = {
        name,
        externalUrl,
        email,
        country,
        imageUrl,
      };
      StorageService.set(StorageKeys.UserProfile, JSON.stringify(userProfile));
      return userProfile;
    } else {
      return JSON.parse(profileFromStorage);
    }
  }

  userIsLoggedIn(): boolean {
    return !!this.resolveUserToken();
  }

  resolveUserToken(): string {
    // Set token
    this.token = hash.access_token;
    const tokenFromStorage = StorageService.get(StorageKeys.SpotifyToken);

    if (!!tokenFromStorage || !!this.token) {
      this.token = tokenFromStorage || this.token;
      this.setUserProfile();
      this.resolveTokenInStorage(!!tokenFromStorage, this.token);
      return this.token;
    }
    return '';
  }

  getUserProfile(): Promise<any> {
    return this.request(USER_PROFILE_API, 'GET').then((userProfile) => userProfile);
  }

  getCurrentlyPlaying(): Promise<CurrentPlaybackResponse> {
    // Make a call using the token
    return this.request(PLAYER_API, 'GET').then((currentPlaying: CurrentPlaybackResponse) => {
      if (!currentPlaying) {
        return {
          item: undefined,
          is_playing: undefined,
          progress_ms: undefined,
        } as any;
      }
      return currentPlaying;
    });
  }

  getLikes(): Promise<LikesResponse> {
    return this.request(`${SAVED_TRACKS_API}/?limit=10`, 'GET').then((likes: LikesResponse) => likes);
  }

  request(url: string, method: string): Promise<any> {
    return fetch(url, {
      method: method,
      headers: this.headers,
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
