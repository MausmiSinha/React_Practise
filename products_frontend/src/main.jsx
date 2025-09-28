import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import { Provider } from 'react-redux'
import { store } from './Store/store.js';
import Products from './components/Products/Products.jsx'
import SingleProduct from './components/SingleProduct/SingleProduct.jsx'
import NewProduct from './components/NewProduct/NewProduct.jsx'
import Categories from './components/Categories/Categories.jsx'
import CreateCategory from './components/CreateCategory/CreateCategory.jsx'
import SingleCategory from './components/SingleCategory/SingleCategory.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "/products",
        element: <Products/>
      },
      {
        path: "/category",
        element: <Categories/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/product/:uid",
        element: <SingleProduct />
      },
      {
        path: "/newProduct",
        element: <NewProduct />
      },
      {
        path: "/product/editProduct",
        element: <NewProduct />
      },
      {
        path: "/category/newCategory",
        element: <CreateCategory/>
      },
      {
        path: "/category/editCategory",
        element: <CreateCategory/>
      },
      {
        path: "/category/:id",
        element: <SingleCategory/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router}/>
  </Provider>
)

