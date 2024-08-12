import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  image: string;
  rating: number;
};

type CartState = {
  items: Product[];
  totalAmount: number;
};

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      state.totalAmount += parseFloat(action.payload.price);
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index > -1) {
        state.totalAmount -= parseFloat(state.items[index].price);
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
