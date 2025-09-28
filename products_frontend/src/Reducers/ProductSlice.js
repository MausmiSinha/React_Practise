import { createSlice } from '@reduxjs/toolkit';
import React from 'react'

const initialState = {
    products: [{}],
    totalInventory: 0.0
}
const ProductSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            console.log("Going to set products");
            state.products = action.payload;
        },
        postProduct: (state, action) => {
            console.log("Performing dispatch action for new Product.");
            console.log(action.payload);
            state.products = [
                ...state.products,
                action.payload
            ]
        },
        deleteProduct: (state, action)=>{
            console.log("Deleting product from store");
            console.log(action.payload);
            state.products = state.products.filter(p => p.uid !== action.payload);
        },
        getInventoryTotal: (state, action)=>{
            console.log("Going to set total inventory");
            state.totalInventory = action.payload;
        },
        deleteProductOfCategory: (state,action) => {
            console.log("Cascading Delete product");
            state.products = state.products.filter(p => p.category_name !== action.payload)
        },
        updateProduct: (state,action) => {
            console.log("Inside ProductSlice updating product to: ");
            console.log(action.payload);
            const index = state.products.findIndex(p => p.uid === action.payload.uid);
            if(index !== -1){
                state.products[index] = {
                    ...state.products[index],
                    ...action.payload
                }
            }
        }
    }
})

export const {setProducts, postProduct, deleteProduct, getInventoryTotal, deleteProductOfCategory, updateProduct}= ProductSlice.actions

export default ProductSlice.reducer
