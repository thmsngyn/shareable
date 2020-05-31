import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { action } from 'typesafe-actions';

import { SpotifyService, Track } from '../../services';
import { ShareableAccount, ShareableService, StreamShare } from '../../services/shareable';
import { FocusedTrack } from '../reducers/focused-track.reducer';
import { Account } from '../reducers/account.reducer';

// use typescript enum rather than action constants
export enum ActionTypes {
  PAUSE_FOCUSED = 'PAUSE_FOCUSED',
  SET_FOCUSED = 'SET_FOCUSED',
  SET_USER = 'SET_USER',
  SET_SHARED = 'SET_SHARED',
}

// State actions
export const pauseFocused = (track: Track) => action(ActionTypes.PAUSE_FOCUSED, track);
export const setFocused = (track: Track) => action(ActionTypes.SET_FOCUSED, track);
export const setUser = (user: ShareableAccount) => action(ActionTypes.SET_USER, user);
export const setShared = (share: StreamShare) => action(ActionTypes.SET_SHARED, share);

// Thunk actions
export const playSong = (track: Track): ThunkAction<void, {}, {}, AnyAction> => {
  // Thunk middleware will pass the dispatch method to this function
  return (dispatch): void => {
    SpotifyService.playSongs([track.uri]);
    dispatch(setFocused(track));
  };
};

export const shareSong = (): ThunkAction<void, any, {}, AnyAction> => {
  return (dispatch, getState): void => {
    const {
      focusedTrack: {
        track: { id: trackId },
      },
      account: { accountId },
    }: { focusedTrack: FocusedTrack; account: Account } = getState();
    const share = { trackId, accountId };
    ShareableService.addShare(share);

    dispatch(setShared(share));
  };
};
