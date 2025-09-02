import { orderBurgerApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  TIngredient,
  TOrder,
  TConstructorIngredient,
  TOrdersData
} from '@utils-types';

export const orderBurger = createAsyncThunk(
  'burgerConstructor/order',
  async (ingredients: string[]) => {
    const res = await orderBurgerApi(ingredients);
    return res;
  }
);

interface BurgerConstructorState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
  isLoading: boolean;
}

const initialState: BurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orderError: null,
  isLoading: false
};
const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setConstructorItems: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ];
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
      }
    },
    clearOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderError = null;
        state.isLoading = true;
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload as string;
        state.isLoading = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = initialState.constructorItems;
        state.isLoading = false;
        state.orderError = null;
      });
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderModalData: (state) => state.orderModalData,
    getOrderRequest: (state) => state.orderRequest,
    getLoading: (state) => state.isLoading,
    getError: (state) => state.orderError
  }
});

export const {
  setConstructorItems,
  removeIngredient,
  clearOrder,
  moveUpIngredient,
  moveDownIngredient
} = burgerConstructorSlice.actions;

export const {
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  getLoading,
  getError
} = burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
