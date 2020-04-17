import hash from '../../utils/hash';
import { StorageService, StorageKeys } from '../storage';

import { PLAYER_API } from './spotify.constants';
import { CurrentPlayback, SpotifyErrorMessages } from './spotify.types';

export const SpotifyService = new (class {
  token: string = '';
  constructor() {}

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

  getCurrentlyPlaying(): Promise<CurrentPlayback> {
    // Make a call using the token
    return fetch(PLAYER_API, {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + this.token,
      }),
    })
      .then((response) => response.json())
      .then((currentPlaying: CurrentPlayback) => {
        const { error } = currentPlaying;
        if (error) {
          switch (error.message) {
            case SpotifyErrorMessages.TokenExpired:
              StorageService.remove(StorageKeys.SpotifyToken);
          }
        }
        return currentPlaying;
      });
  }

  // getLikes(token: string, )
})();
