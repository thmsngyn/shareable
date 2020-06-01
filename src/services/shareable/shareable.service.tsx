import { parseJson } from '../../utils';

import { SpotifyService } from '../spotify/spotify.service';
import { LOGIN_API, REGISTER_API, ADD_SHARE_API, GET_STREAM_API } from './shareable.constants';
import { ShareableAccount, StreamTypes, StreamShares, StreamShare } from './shareable.types';
import { StorageService, StorageKeys } from '../storage';

export const ShareableService = new (class {
  constructor() {}

  get spotifyToken() {
    return SpotifyService.resolveUserToken();
  }

  private get headers() {
    return new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${StorageService.get(StorageKeys.ShareableJwt)}` || '',
      'OAuth-Authorization': `Bearer ${this.spotifyToken}`,
    });
  }

  login(account: ShareableAccount): Promise<ShareableAccount> {
    return this.request(LOGIN_API, 'POST', {
      ...account,
    });
  }

  register(account: ShareableAccount): Promise<ShareableAccount> {
    return this.request(REGISTER_API, 'POST', {
      ...account,
    });
  }

  addShare(share: StreamShare): Promise<StreamShare> {
    return this.request(ADD_SHARE_API, 'POST', {
      ...share,
    });
  }

  getShares(accountId, type: StreamTypes = StreamTypes.Followers): Promise<StreamShares> {
    return this.request(`${GET_STREAM_API}/${accountId}?type=${type}`, 'GET');
  }

  request(url: string, method: string, body?: any): Promise<any> {
    return fetch(url, {
      method,
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then(this.saveAuthHeader.bind(this))
      .then(parseJson)
      .then(this.errorHandler.bind(this));
  }

  private saveAuthHeader(response: Response) {
    const { headers } = response;
    const shareableJwt = headers.get('X-Auth-Token');

    if (shareableJwt) {
      StorageService.set(StorageKeys.ShareableJwt, shareableJwt);
    }
    return response;
  }

  private errorHandler(response: any) {
    const { error } = response;
    if (error) {
    }
    return response;
  }
})();
