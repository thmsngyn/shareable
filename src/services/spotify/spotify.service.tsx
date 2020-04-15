import * as $ from 'jquery';

import { PLAYER_API } from './spotify.constants';

export const SpotifyService = new (class {
  constructor() {}

  getCurrentlyPlaying(token: string, stateHandler: Function) {
    // Make a call using the token
    $.ajax({
      url: PLAYER_API,
      type: 'GET',
      beforeSend: (xhr: any) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: (success) => stateHandler(success),
    });
  }
})();
