import hash from '../../utils/hash';
import { StorageService, StorageKeys } from '../storage';

import { PLAYER_API, SpotifyErrorMessage } from './spotify.constants';
import { CurrentPlayback } from './spotify.types';

export const SpotifyService = new (class {
  token: string = '';
  constructor() {}

  resolveUserToken(): string {
    // Set token
    this.token = hash.access_token;
    const tokenFromStorage = StorageService.get(StorageKeys.SpotifyToken);

    if (!!tokenFromStorage || !!this.token) {
      this.token = tokenFromStorage || this.token;

      if (!tokenFromStorage) {
        StorageService.set(StorageKeys.SpotifyToken, this.token);
        StorageService.setExpiration(StorageKeys.SpotifyToken, 36000000); // 1 hr
      } else {
        StorageService.checkExpiration();
      }

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
            case SpotifyErrorMessage.TokenExpired:
              StorageService.remove(StorageKeys.SpotifyToken);
          }
        }
        return currentPlaying;
      });
  }

  // getLikes(token: string, )
})();
