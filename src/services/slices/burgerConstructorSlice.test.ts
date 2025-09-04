import { expect, test } from '@jest/globals';
import burgerConstructorSlice, {
  clearOrder,
  moveDownIngredient,
  moveUpIngredient,
  removeIngredient,
  setConstructorItems,
  initialState
} from './burgerConstructorSlice';

describe('constructor test', () => {
  const mockIngredient = [
    {
      id: '1',
      _id: '1',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    },
    {
      id: '2',
      _id: '2',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];
  const mockBun = [
    {
      id: '3',
      _id: '3',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  ];
  test('add ingredient', () => {
    const newState = burgerConstructorSlice(
      initialState,
      setConstructorItems(mockIngredient[0])
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0].name).toEqual(
      mockIngredient[0].name
    );
  });
  test('remove ingredient', () => {
    const initialState = {
      constructorItems: {
        bun: mockBun[0],
        ingredients: mockIngredient
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null,
      isLoading: false
    };

    const newState = burgerConstructorSlice(
      initialState,
      removeIngredient(mockIngredient[0].id)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0].name).toEqual(
      mockIngredient[1].name
    );
  });
  test('add bun', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null,
      isLoading: false
    };
    const newState = burgerConstructorSlice(
      initialState,
      setConstructorItems(mockBun[0])
    );
    expect(newState.constructorItems.bun?.name).toEqual(mockBun[0].name);
  });
  test('move Up ingedient', () => {
    const initialState = {
      constructorItems: {
        bun: mockBun[0],
        ingredients: mockIngredient
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null,
      isLoading: false
    };
    const newState = burgerConstructorSlice(initialState, moveUpIngredient(1));
    expect(newState.constructorItems.ingredients[0].name).toEqual(
      mockIngredient[1].name
    );
    expect(newState.constructorItems.ingredients[1].name).toEqual(
      mockIngredient[0].name
    );
  });
  test('move Down ingredient', () => {
    const initialState = {
      constructorItems: {
        bun: mockBun[0],
        ingredients: mockIngredient
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null,
      isLoading: false
    };
    const newState = burgerConstructorSlice(
      initialState,
      moveDownIngredient(0)
    );
    expect(newState.constructorItems.ingredients[1].name).toEqual(
      mockIngredient[0].name
    );
    expect(newState.constructorItems.ingredients[0].name).toEqual(
      mockIngredient[1].name
    );
  });
  test('clear order', () => {
    const initialState = {
      constructorItems: {
        bun: mockBun[0],
        ingredients: mockIngredient
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null,
      isLoading: false
    };
    const newState = burgerConstructorSlice(initialState, clearOrder());
    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
