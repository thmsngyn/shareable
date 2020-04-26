import * as AppStateTypes from 'AppStateTypes';
import { ActionTypes } from '../actions/';

interface CurrentlyPlaying {
  track: any;
  isPlaying: boolean;
}

export const initialState: CurrentlyPlaying = {
  track: undefined,
  isPlaying: false,
};

export const currentlyPlayingReducer = (state: CurrentlyPlaying = initialState, action: AppStateTypes.RootAction) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENTLY_FOCUSED: {
      return {
        ...state,
        track: action.payload,
        isPlaying: true,
      };
    }
    case ActionTypes.PLAY_SONG: {
      return {
        ...state,
        track: action.payload,
        isPlaying: true,
      };
    }
    case ActionTypes.PAUSE_SONG: {
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
