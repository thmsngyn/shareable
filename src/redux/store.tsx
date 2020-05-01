import { createStore, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import * as AppStateTypes from 'AppStateTypes';

import config from '../config';

import rootReducer from './reducers';

const middleware = [reduxThunk];

let store: Store<AppStateTypes.ReducerState>;

if (config.obfuscateDevTools) {
  store = createStore(rootReducer, applyMiddleware(...middleware));
} else {
  // Only allow redux dev tools in a dev environment
  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
}

export default store;
