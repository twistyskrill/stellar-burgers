import { expect, test } from '@jest/globals';
import ingredientsSlice, {
  getIngredients,
  IngredientsState
} from './ingredientsSlice';

export const initialState: IngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  ingredients: [],
  selectedIngredient: null,
  isLoading: false,
  hasError: false
};

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

describe('ingredients test', () => {
  test('pending test', () => {
    const newState = ingredientsSlice(
      {
        ...initialState,
        isLoading: false,
        hasError: true
      },
      getIngredients.pending('')
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.hasError).toBe(false);
  });
  test('fulfilled test', () => {
    const newState = ingredientsSlice(
      {
        ...initialState,
        isLoading: true
      },
      getIngredients.fulfilled(mockIngredient, '')
    );
    expect(newState.ingredients[0]).toEqual(mockIngredient[0]);
    expect(newState.isLoading).toBe(false);
  });
  test('rejected test', () => {
    const newError = new Error('test error');
    const newState = ingredientsSlice(
      {
        ...initialState,
        isLoading: true,
        hasError: false
      },
      getIngredients.rejected(newError, '')
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.hasError).toBe(true);
  });
});
