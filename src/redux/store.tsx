import * as AppStateTypes from 'AppStateTypes';

import config from '../config';

import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

let store: Store<AppStateTypes.ReducerState>;

if (config.obfuscateDevTools) {
  store = createStore(rootReducer);
} else {
  store = createStore(rootReducer, composeWithDevTools());
}

export default store;
