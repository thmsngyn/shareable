import { hash, parseJson } from '../../utils';
import { StorageService, StorageKeys } from '../storage';

import { PLAYER_API, SAVED_TRACKS_API } from './spotify.constants';
import { CurrentPlaybackResponse, LikesResponse, SpotifyErrorMessages } from './spotify.types';

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

  getCurrentlyPlaying(): Promise<CurrentPlaybackResponse> {
    // Make a call using the token
    return fetch(PLAYER_API, {
      method: 'GET',
      headers: this.headers,
    })
      .then(parseJson)
      .then(this.errorHandler.bind(this))
      .then((currentPlaying: CurrentPlaybackResponse) => {
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
    return fetch(`${SAVED_TRACKS_API}/?limit=10`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(parseJson)
      .then(this.errorHandler.bind(this))
      .then((likes: LikesResponse) => likes);
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
