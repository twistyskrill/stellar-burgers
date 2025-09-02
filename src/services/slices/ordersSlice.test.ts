import { expect, test } from '@jest/globals';
import ordersSlice, {
  getUserOrderByNumber,
  getUserOrdersHistory,
  userOrdersState
} from './ordersSlice';

const initialState: userOrdersState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null
};

const mockOrders = [
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
];

describe('orders test', () => {
  test('order history pending', () => {
    const newState = ordersSlice(
      {
        ...initialState,
        isLoading: false,
        error: 'test error'
      },
      getUserOrdersHistory.pending('')
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });
  test('order history fulfilled', () => {
    const newState = ordersSlice(
      {
        ...initialState,
        isLoading: true,
        error: 'test error'
      },
      getUserOrdersHistory.fulfilled(mockOrders, '')
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeNull();
    expect(newState.orders).toEqual(mockOrders);
  });
  test('order history rejected', () => {
    const orderError = new Error('test error');
    const newState = ordersSlice(
      {
        ...initialState,
        isLoading: true
      },
      getUserOrdersHistory.rejected(orderError, '')
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(orderError.message);
  });
  test('orderByNum pending', () => {
    const newState = ordersSlice(
      {
        ...initialState,
        isLoading: false,
        error: 'test error'
      },
      getUserOrderByNumber.pending('', 1)
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });
  test('orderByNum fulfilled', () => {
    const newState = ordersSlice(
      {
        ...initialState,
        isLoading: true
      },
      getUserOrderByNumber.fulfilled(mockOrders[0], '', 1)
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.currentOrder).toEqual(mockOrders[0]);
  });
  test('orderByNum rejected', () => {
    const testErr = new Error('test error');
    const newState = ordersSlice(
      {
        ...initialState,
        isLoading: true
      },
      getUserOrderByNumber.rejected(testErr, '', 1)
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(testErr.message);
  });
});
