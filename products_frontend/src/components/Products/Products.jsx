import React from 'react'
import { useSelector } from 'react-redux';
import Product from '../Product/Product';
import FloatingPlusButton from '../FloatingPlusButton/FloatingPlusButton';

const Products = () => {
    const products = useSelector(state => state?.products?.products);
    console.log("products");
    console.log(products);

    return (

        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        style={{padding:"2em"}}>
            {
                products &&
                products.map((p, i) => (
                    <Product data={p} key={i} />
                ))
            }
            <FloatingPlusButton />
        </div>

    )
}

export default Products
