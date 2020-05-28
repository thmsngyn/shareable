import { combineReducers } from 'redux';
import { focusedTrackReducer } from './currently-playing.reducer';
import { accountReducer } from './account.reducer';

const rootReducer = combineReducers({
  focusedTrack: focusedTrackReducer,
  account: accountReducer,
});

export default rootReducer;
