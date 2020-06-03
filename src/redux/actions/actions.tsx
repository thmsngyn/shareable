import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { action } from 'typesafe-actions';

import { SpotifyService, Track } from '../../services';
import { ShareableAccount, ShareableService, StreamShare, ShareableErrorCodes } from '../../services/shareable';
import { FocusedTrack } from '../reducers/focused-track.reducer';
import { Account } from '../reducers/account.reducer';

// use typescript enum rather than action constants
export enum ActionTypes {
  PAUSE_FOCUSED = 'PAUSE_FOCUSED',
  SET_FOCUSED = 'SET_FOCUSED',
  SET_USER = 'SET_USER',
  SET_SHARED = 'SET_SHARED',
  CLEAR_LATEST_SHARES = 'CLEAR_LATEST_SHARES',
}

// State actions
export const pauseFocused = (track: Track) => action(ActionTypes.PAUSE_FOCUSED, track);
export const setFocused = (track: Track) => action(ActionTypes.SET_FOCUSED, track);
export const setUser = (user: ShareableAccount) => action(ActionTypes.SET_USER, user);
export const setShared = (track: Track) => action(ActionTypes.SET_SHARED, track);
export const clearLatestShares = () => action(ActionTypes.CLEAR_LATEST_SHARES);

// Thunk actions
export const playSong = (track: Track): ThunkAction<void, {}, {}, AnyAction> => {
  // Thunk middleware will pass the dispatch method to this function
  return (dispatch): void => {
    SpotifyService.playSongs([track.uri]);
    dispatch(setFocused(track));
  };
};

// TODO: Support optional params to share a non-focused track
export const shareSong = (): ThunkAction<void, any, {}, AnyAction> => {
  return (dispatch, getState): void => {
    const {
      focusedTrack: {
        track: { id: trackId },
      },
      account: { accountId },
      focusedTrack,
    }: { focusedTrack: FocusedTrack; account: Account } = getState();
    const share = { trackId, accountId };

    ShareableService.addShare(share).then((response) => {
      const { code } = response;

      if (code === ShareableErrorCodes.EntityAlreadyExists) {
        return;
      }
      dispatch(setShared(focusedTrack.track));
    });
  };
};
