import { combineReducers } from 'redux';
import { focusedTrackReducer } from './currently-playing.reducer';

const rootReducer = combineReducers({
  focusedTrack: focusedTrackReducer,
});

export default rootReducer;
