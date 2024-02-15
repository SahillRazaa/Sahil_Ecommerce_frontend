import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProducts: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndex !== -1) {
        const removedProduct = state.products[productIndex];
        state.quantity -= 1;
        state.total -=
          removedProduct.price * removedProduct.quantity;
        state.products.splice(productIndex, 1);
      }
    },
    emptyProducts: (state) => {
      state.products = [];
      state.quantity = 0; 
      state.total = 0;   
    },    
  },
});

export const { addProducts, removeProducts, emptyProducts} = cartSlice.actions;
export default cartSlice.reducer;
