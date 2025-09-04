import { expect, test } from '@jest/globals';
import store, { rootReducer } from './store';

describe('rootReducer test', () => {
  test('initial state test', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(store.getState());
  });
});
