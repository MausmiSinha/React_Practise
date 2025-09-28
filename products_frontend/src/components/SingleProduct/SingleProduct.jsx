import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const SingleProduct = () => {
  const { uid } = useParams();

  const product = useSelector(state => state?.products?.products.filter(product => product.uid === uid));
  console.log(product);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:max-w-4xl bg-white shadow-lg rounded-2xl border border-gray-100">
 
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {product[0].product_name}
        </h1>

        <div className="space-y-3">
          <p className="text-base text-gray-600">
            <span className="font-semibold text-gray-800">Brand:</span>{" "}
            {product[0].brand}
          </p>
          <p className="text-base text-gray-600">
            <span className="font-semibold text-gray-800">Price:</span>{" "}
            <span className="text-green-600 font-bold">{product[0].price}</span>
          </p>
          <p className="text-base text-gray-600">
            <span className="font-semibold text-gray-800">Category:</span>{" "}
            {product[0].category_name}
          </p>
          <p className="text-base text-gray-600">
            <span className="font-semibold text-gray-800">Quantity:</span>{" "}
            {product[0].quantity}
          </p>
        </div>
      </div>
    </div>

  )
}

export default SingleProduct
