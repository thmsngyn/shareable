declare module 'AppStateTypes' {
  import { StateType, ActionType } from 'typesafe-actions';
  // 1 for reducer, 1 for action creators
  export type ReducerState = StateType<typeof import('../redux/reducers').default>;
  export type RootAction = ActionType<typeof import('../redux/actions/actions')>;
}
