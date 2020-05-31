import { combineReducers } from 'redux';
import { focusedTrackReducer } from './focused-track.reducer';
import { accountReducer } from './account.reducer';

const rootReducer = combineReducers({
  focusedTrack: focusedTrackReducer,
  account: accountReducer,
});

export default rootReducer;
