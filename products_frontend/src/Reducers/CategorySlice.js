import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
import { deleteProductOfCategory } from './ProductSlice';

const initialState = {
    categories: [{}]
}

const CategorySlice = createSlice({
      name: 'categorySlice',
      initialState,
      reducers: {
        setCategory: (state, action)=> {
            console.log("Going to set category");
            state.categories = action.payload;
        },
        postCategory: (state,action)=> {
          console.log("Performing post action on store");
          state.categories = [
                ...state.categories,
                action.payload
            ]
        },
        deleteCategory: (state,action)=>{
          console.log("Performing delete action on store");
          console.log(action.payload);
          state.categories = state.categories.filter(c => c.id !== action.payload?.id);
        },
        updateCategory: (state,action)=> {
          console.log("Performing patch action on store");
          const index = state.categories.findIndex(categories => categories.id === action.payload.id);
          if(index !== -1){
            state.categories[index] = {
              ...state.categories[index],
              ...action.payload
            }
            state.edtCategory= {}
          }
        }
      }
})

export const {setCategory, postCategory, deleteCategory, updateCategory}= CategorySlice.actions

export default CategorySlice.reducer

