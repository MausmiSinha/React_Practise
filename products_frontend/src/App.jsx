import { useEffect } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import {Outlet} from 'react-router-dom'
import productService from './Service/ProductService'
import { useDispatch } from 'react-redux'
import { getInventoryTotal, setProducts } from './Reducers/ProductSlice'
import categoryService from './Service/CategoryService'
import { setCategory } from './Reducers/CategorySlice'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    productService.getProducts()
                .then((response) => {
                  console.log("Repsonse in App.js")
                  console.log(response);
                  dispatch(setProducts(response.data));
                })
                .finally(() => {
                  console.log("Api call completed for fetching product.");
                })

    categoryService.getCategory()
              .then((response)=> {
                console.log("Response in App.js")
                console.log(response);
                dispatch(setCategory(response.data));
              })
              .finally(()=> {
                console.log("Api call completed fetching Category.");
              })
      productService.getTotalInventory()
            .then((response)=> {
                console.log("Response in App.js")
                console.log(response);
                dispatch(getInventoryTotal(response.data));
            })
            .finally(()=> {
              console.log("Api call completed for Inventory total.");
            })

  }, [])
  
  return (
    <>
      <Header/>
      <Outlet />
      <Footer />
    </>
  )
}

export default App
