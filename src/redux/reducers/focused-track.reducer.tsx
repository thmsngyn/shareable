import * as AppStateTypes from 'AppStateTypes';
import { ActionTypes } from '../actions';
import { Track } from '../../services';

export interface FocusedTrack {
  track: Track;
  isPlaying: boolean;
  isShared: boolean;
  latestShares: Track[];
}

export const initialState: FocusedTrack = {
  track: {} as Track,
  isPlaying: false,
  isShared: false,
  latestShares: [],
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
          isShared: false, // Need to update to check shareable service
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
    case ActionTypes.SET_SHARED: {
      if (state.latestShares.find((track) => track.id === action.payload.id)) {
        return {
          ...state,
          isShared: true,
        };
      }
      return {
        ...state,
        isShared: true,
        latestShares: [action.payload, ...state.latestShares],
      };
    }
    case ActionTypes.CLEAR_LATEST_SHARES: {
      return {
        ...state,
        latestShares: [],
      };
    }
    default:
      return state;
  }
};
