import { combineReducers } from 'redux';
import { currentlyPlayingReducer } from './currently-playing.reducer';

const rootReducer = combineReducers({
  currentlyPlaying: currentlyPlayingReducer,
});

export default rootReducer;
