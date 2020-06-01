import * as AppStateTypes from 'AppStateTypes';
import { ActionTypes } from '../actions/';
import { ShareableAccount } from '../../services/shareable';

export interface Account extends ShareableAccount {
  accountId: string;
}

export const initialState: Account = {
  accountId: '',
  spotifyUserId: '',
};

export const accountReducer = (state: Account = initialState, action: AppStateTypes.RootAction) => {
  switch (action.type) {
    case ActionTypes.SET_USER: {
      const { _id } = action.payload;
      return {
        ...state,
        ...action.payload,
        accountId: _id,
      };
    }
    default:
      return state;
  }
};
