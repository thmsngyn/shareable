import * as AppStateTypes from 'AppStateTypes';
import { ActionTypes } from '../actions/';
import { Track } from '../../services';

export interface FocusedTrack {
  track: Track;
  isPlaying: boolean;
}

export const initialState: FocusedTrack = {
  track: {} as Track,
  isPlaying: false,
};

export const focusedTrackReducer = (state: FocusedTrack = initialState, action: AppStateTypes.RootAction) => {
  switch (action.type) {
    case ActionTypes.SET_FOCUSED: {
      const { track: { id } = {} } = state;
      // Only update the store if it is a new track
      if (action.payload && id !== action.payload.id) {
        return {
          ...state,
          track: action.payload,
          isPlaying: true,
        };
      } else {
        return state;
      }
    }
    case ActionTypes.PAUSE_FOCUSED: {
      return {
        ...state,
        track: action.payload,
        isPlaying: false,
      };
    }
    default:
      return state;
  }
};
