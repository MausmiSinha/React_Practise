import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'

const SingleCategory = () => {
  const { id } = useParams();

  const cat = useSelector(state => {

    const initialData = state.categories.categories;
    const filteredData = initialData.filter(c => c.id === id)[0]
    return filteredData
  });

  console.log("Displaying Category");
  console.log(cat);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:max-w-4xl bg-white shadow-lg rounded-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {cat?.name}
        </h1>

        <div className="space-y-3">
            <p className="text-base text-gray-600">
              <span className="font-semibold text-gray-800">Description:</span>{" "}
              <span className="text-green-600 font-bold">{cat?.description}</span>
            </p>
        </div>
      </div>
    </div>
  )
}

export default SingleCategory
