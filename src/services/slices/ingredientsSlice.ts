import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);

interface IngredientsState {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  ingredients: TIngredient[];
  selectedIngredient: TIngredient | null;
  isLoading: boolean;
  hasError: boolean;
}

export const initialState: IngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  ingredients: [],
  selectedIngredient: null,
  isLoading: false,
  hasError: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setBuns: (state, action: PayloadAction<TIngredient[]>) => {
      state.buns = action.payload;
    },
    setMains: (state, action: PayloadAction<TIngredient[]>) => {
      state.mains = action.payload;
    },
    setSauces: (state, action: PayloadAction<TIngredient[]>) => {
      state.sauces = action.payload;
    },
    setSelectedIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.selectedIngredient = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIsLoading: (state) => state.isLoading
  }
});

export const {
  setBuns,
  setHasError,
  setSauces,
  setMains,
  setIsLoading,
  setSelectedIngredient
} = ingredientsSlice.actions;
export const { getIngredientsSelector, getIsLoading } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
