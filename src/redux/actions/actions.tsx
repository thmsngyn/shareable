import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { action } from 'typesafe-actions';

import { SpotifyService } from '../../services';

// use typescript enum rather than action constants
export enum ActionTypes {
  PAUSE_FOCUSED = 'PAUSE_FOCUSED',
  SET_FOCUSED = 'SET_FOCUSED',
}

// State actions
export const pauseFocused = (song: any) => action(ActionTypes.PAUSE_FOCUSED, song);
export const setFocused = (song: any) => action(ActionTypes.SET_FOCUSED, song);

// Thunk actions
export const playSong = (track: any): ThunkAction<void, {}, {}, AnyAction> => {
  // Thunk middleware will pass the dispatch method to this function
  return (dispatch): void => {
    SpotifyService.playSongs([track.uri]);
    dispatch(setFocused(track));
  };
};
