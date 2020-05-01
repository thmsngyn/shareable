import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { action } from 'typesafe-actions';

import { SpotifyService, Track } from '../../services';

// use typescript enum rather than action constants
export enum ActionTypes {
  PAUSE_FOCUSED = 'PAUSE_FOCUSED',
  SET_FOCUSED = 'SET_FOCUSED',
}

// State actions
export const pauseFocused = (track: Track) => action(ActionTypes.PAUSE_FOCUSED, track);
export const setFocused = (track: Track) => action(ActionTypes.SET_FOCUSED, track);

// Thunk actions
export const playSong = (track: Track): ThunkAction<void, {}, {}, AnyAction> => {
  // Thunk middleware will pass the dispatch method to this function
  return (dispatch): void => {
    SpotifyService.playSongs([track.uri]);
    dispatch(setFocused(track));
  };
};
