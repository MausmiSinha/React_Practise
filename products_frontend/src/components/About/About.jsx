import React from 'react'
import { useSelector } from 'react-redux'

const About = () => {

  const state = useSelector((state) => {
    console.log("Redux State:", state);
    return state;
  });


  const totalInventory = useSelector(state => state?.products?.totalInventory);
  console.log("TotalInventory:", totalInventory);

  return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Store Value
        </h1>
        <p className="text-gray-500 mb-6">
          Overview of your total inventory in the store
        </p>
        <div className="bg-indigo-100 rounded-lg py-6 px-4">
          <p className="text-sm text-gray-600">Total Inventory</p>
          <p className="text-4xl font-extrabold text-indigo-600 mt-2">
            {totalInventory}
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
