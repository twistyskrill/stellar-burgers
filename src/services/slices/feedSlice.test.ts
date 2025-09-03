import { expect, test } from '@jest/globals';
import feedSlice, { getFeedsAll, initialState } from './feedSlice';

const testOrders = {
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-09-02T13:46:25.234Z',
      updatedAt: '2024-09-02T13:46:25.914Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Антарианский краторный бессмертный минеральный экзо-плантаго био-марсианский бургер',
      createdAt: '2024-09-02T07:36:55.648Z',
      updatedAt: '2024-09-02T07:36:56.126Z',
      number: 2
    },
    {
      _id: '3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный space бургер',
      createdAt: '2024-09-02T07:34:44.831Z',
      updatedAt: '2024-09-02T07:34:45.280Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('feed test', () => {
  test('pending test', () => {
    const newState = feedSlice.reducer(
      {
        ...initialState,
        error: 'test error'
      },
      getFeedsAll.pending('')
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });
  test('fulfilled test', () => {
    const newState = feedSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeedsAll.fulfilled(testOrders, '')
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.feed).toEqual(testOrders);
  });
  test('rejected test', () => {
    const testError = new Error('test error');
    const newState = feedSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeedsAll.rejected(testError, '')
    );
    expect(newState.error).toBe(testError.message);
  });
});
