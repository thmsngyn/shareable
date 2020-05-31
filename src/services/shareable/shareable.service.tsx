import { parseJson } from '../../utils';

import { SpotifyService } from '../spotify/spotify.service';
import { LOGIN_API, REGISTER_API, ADD_SHARE_API, GET_STREAM_API } from './shareable.constants';
import { ShareableAccount, StreamShare, StreamTypes } from './shareable.types';

export const ShareableService = new (class {
  constructor() {}

  get spotifyToken() {
    return SpotifyService.resolveUserToken();
  }

  private get headers() {
    return new Headers({
      'Content-Type': 'application/json',
    });
  }

  login(account: ShareableAccount): Promise<ShareableAccount> {
    return this.request(LOGIN_API, 'POST', {
      ...account,
      token: this.spotifyToken,
    });
  }

  register(account: ShareableAccount): Promise<ShareableAccount> {
    return this.request(REGISTER_API, 'POST', {
      ...account,
      token: this.spotifyToken,
    });
  }

  addShare(share: StreamShare): Promise<StreamShare> {
    return this.request(ADD_SHARE_API, 'POST', {
      ...share,
    });
  }

  getShares(accountId, type: StreamTypes = StreamTypes.Followers) {
    return this.request(`${GET_STREAM_API}/${accountId}/${type}/${this.spotifyToken}`, 'GET');
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
    }
    return response;
  }
})();
