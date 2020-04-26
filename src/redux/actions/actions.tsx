import { action } from 'typesafe-actions';

// use typescript enum rather than action constants
export enum ActionTypes {
  PLAY_SONG = 'PLAY_SONG',
  PAUSE_SONG = 'PAUSE_SONG',
  SET_CURRENTLY_FOCUSED = 'SET_CURRENTLY_FOCUSED',
}

export const currentlyPlayingActions = {
  addSong: (song: any) => action(ActionTypes.PLAY_SONG, song),
  pauseSong: (song: any) => action(ActionTypes.PAUSE_SONG, song),
  setCurrentlyFocused: (song: any) => action(ActionTypes.SET_CURRENTLY_FOCUSED, song),
};
