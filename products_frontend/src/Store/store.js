import React from 'react'
import productReducer from "../Reducers/ProductSlice"
import categoryReducer from "../Reducers/CategorySlice"
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer
    }
})